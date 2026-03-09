import { NextRequest, NextResponse } from 'next/server';
import { getInviteApiBaseUrl, getInviteProductKey, INVITE_ACCESS_COOKIE } from '@/lib/invite-auth';

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { success: false, status: 'invalid', error: '请输入邀请码' },
        { status: 400 }
      );
    }

    const upstream = await fetch(`${getInviteApiBaseUrl()}/api/invite/redeem`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
        productKey: getInviteProductKey(),
        site: 'tianxuan-lucky-web',
      }),
      cache: 'no-store',
    });

    const result = await upstream.json();

    if (!upstream.ok || !result.success) {
      return NextResponse.json(result, { status: upstream.status || 400 });
    }

    const response = NextResponse.json(result, { status: 200 });
    response.cookies.set({
      name: INVITE_ACCESS_COOKIE,
      value: 'granted',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  } catch (error) {
    const message = error instanceof Error && error.message.includes('INVITE_API_BASE_URL')
      ? '服务端缺少 INVITE_API_BASE_URL 环境变量配置'
      : '邀请码服务暂时不可用';

    return NextResponse.json(
      { success: false, status: 'invalid', error: message },
      { status: 500 }
    );
  }
}
