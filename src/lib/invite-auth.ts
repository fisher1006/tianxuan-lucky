export const INVITE_ACCESS_COOKIE = 'invite_access';

export function getInviteProductKey(): string {
  return process.env.INVITE_PRODUCT_KEY || 'tianxuan-lucky';
}

export function getInviteApiBaseUrl(): string {
  const apiBaseUrl = process.env.INVITE_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error('Missing INVITE_API_BASE_URL environment variable');
  }

  return apiBaseUrl;
}
