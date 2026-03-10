import { NextRequest, NextResponse } from 'next/server';
import { verifyInviteSessionToken, createInviteSessionToken, setInviteAccessCookie } from '@/lib/invite-session';
import { INVITE_ACCESS_COOKIE } from '@/lib/invite-auth';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token || typeof token !== 'string') {
      return NextResponse.json({ success: false, error: '缺少会话凭证' }, { status: 400 });
    }

    const result = verifyInviteSessionToken(token);

    if (!result.valid) {
      return NextResponse.json({ success: false, error: '会话凭证无效', reason: result.reason }, { status: 401 });
    }

    const response = NextResponse.json(
      { success: true, sessionToken: createInviteSessionToken() },
      { status: 200 }
    );

    return setInviteAccessCookie(response);
  } catch {
    return NextResponse.json({ success: false, error: '会话恢复失败' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const hasAccess = request.cookies.get(INVITE_ACCESS_COOKIE)?.value === 'granted';

  if (!hasAccess) {
    return NextResponse.json({ success: false, error: '当前未解锁' }, { status: 401 });
  }

  return NextResponse.json(
    { success: true, sessionToken: createInviteSessionToken() },
    { status: 200 }
  );
}
