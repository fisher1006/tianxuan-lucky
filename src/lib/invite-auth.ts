export const INVITE_ACCESS_COOKIE = 'invite_access';
export const INVITE_CODE_STORAGE_KEY = 'tianxuan_invite_code';
export const INVITE_SESSION_STORAGE_KEY = 'tianxuan_invite_session';

export function getInviteProductKey(): string {
  return (process.env.INVITE_PRODUCT_KEY || 'tianxuan-lucky').trim();
}

export function getInviteApiBaseUrl(): string {
  const apiBaseUrl = process.env.INVITE_API_BASE_URL?.trim();

  if (!apiBaseUrl) {
    throw new Error('Missing INVITE_API_BASE_URL environment variable');
  }

  return apiBaseUrl;
}

export function getInviteGuideUrl(): string {
  return (process.env.NEXT_PUBLIC_INVITE_GUIDE_URL || 'https://m.tb.cn/h.ie7IijM?tk=sMOqUvGcot4').trim();
}
