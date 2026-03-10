import { createHmac, timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';
import { INVITE_ACCESS_COOKIE, getInviteProductKey } from '@/lib/invite-auth';

const SESSION_MAX_AGE = 60 * 60 * 24 * 30;
const SESSION_TOKEN_VERSION = 1;

function getSessionSecret() {
  return process.env.INVITE_SESSION_SECRET || `${getInviteProductKey()}::invite-session`;
}

function toBase64Url(input: string) {
  return Buffer.from(input).toString('base64url');
}

function fromBase64Url(input: string) {
  return Buffer.from(input, 'base64url').toString('utf8');
}

function sign(payload: string) {
  return createHmac('sha256', getSessionSecret()).update(payload).digest('base64url');
}

export function createInviteSessionToken() {
  const exp = Date.now() + SESSION_MAX_AGE * 1000;
  const payload = JSON.stringify({ v: SESSION_TOKEN_VERSION, productKey: getInviteProductKey(), exp });
  const encodedPayload = toBase64Url(payload);
  const signature = sign(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export function verifyInviteSessionToken(token: string) {
  const [encodedPayload, signature] = token.split('.');

  if (!encodedPayload || !signature) {
    return { valid: false as const, reason: 'format' };
  }

  const expectedSignature = sign(encodedPayload);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    actualBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(actualBuffer, expectedBuffer)
  ) {
    return { valid: false as const, reason: 'signature' };
  }

  try {
    const payload = JSON.parse(fromBase64Url(encodedPayload)) as {
      v: number;
      productKey: string;
      exp: number;
    };

    if (payload.v !== SESSION_TOKEN_VERSION || payload.productKey !== getInviteProductKey()) {
      return { valid: false as const, reason: 'payload' };
    }

    if (typeof payload.exp !== 'number' || payload.exp <= Date.now()) {
      return { valid: false as const, reason: 'expired' };
    }

    return { valid: true as const, exp: payload.exp };
  } catch {
    return { valid: false as const, reason: 'parse' };
  }
}

export function setInviteAccessCookie(response: NextResponse) {
  response.cookies.set({
    name: INVITE_ACCESS_COOKIE,
    value: 'granted',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });

  return response;
}
