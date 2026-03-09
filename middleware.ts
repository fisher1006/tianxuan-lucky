import { NextRequest, NextResponse } from 'next/server';
import { INVITE_ACCESS_COOKIE } from '@/lib/invite-auth';

export function middleware(request: NextRequest) {
  const hasInviteAccess = request.cookies.get(INVITE_ACCESS_COOKIE)?.value === 'granted';

  if (!hasInviteAccess) {
    const verifyUrl = new URL('/verify', request.url);
    verifyUrl.searchParams.set('next', request.nextUrl.pathname);
    return NextResponse.redirect(verifyUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/lottery/:path*'],
};