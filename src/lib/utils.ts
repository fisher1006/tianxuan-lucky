import CryptoJS from 'crypto-js';
import { InviteValidation } from '@/types';

const SECRET_KEY = 'tianxuan-lucky-2026-secret';

// 生成邀请码
export function generateInviteCode(tool: string, expiresDays: number = 30): string {
  // 生成只包含字母数字的nonce（去掉易混淆字符和特殊字符）
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
  let nonce = '';
  for (let i = 0; i < 4; i++) {
    nonce += chars[Math.floor(Math.random() * chars.length)];
  }
  const timestamp = Date.now().toString(36).toUpperCase();
  const data = `${tool}|${expiresDays}|${timestamp}|${nonce}`;
  
  // 使用 HMAC-SHA1 计算签名
  const sig = CryptoJS.HmacSHA1(data, SECRET_KEY).toString().substring(0, 4).toUpperCase();
  
  // 格式：TOOL-NONC.SIGN
  return `${tool}-${nonce}.${sig}`;
}

// 验证邀请码
export function validateInviteCode(code: string): InviteValidation {
  try {
    const parts = code.toUpperCase().split('.');
    if (parts.length !== 2) {
      return { valid: false, error: '邀请码格式错误' };
    }
    
    const [toolNonce, sig] = parts;
    const toolAndNonce = toolNonce.replace(/-/g, ''); // 去掉破折号
    const tool = toolAndNonce.substring(0, 4);
    const nonce = toolAndNonce.substring(4);
    
    if (nonce.length !== 4) {
      return { valid: false, error: '邀请码格式错误' };
    }
    
    // 尝试不同的过期天数（1-90天）和时间窗口
    const now = Date.now();
    
    for (let days = 1; days <= 90; days++) {
      // 尝试当前时间戳附近的不同偏移（15分钟为单位，7天内）
      // 注意：生成时用的是过去的时间戳，所以验证时应该用 now - offset * ...
      for (let offset = -672; offset <= 672; offset++) {
        const ts = (now - offset * 900000).toString(36).toUpperCase();
        const d = `${tool}|${days}|${ts}|${nonce}`;
        const s = CryptoJS.HmacSHA1(d, SECRET_KEY).toString().substring(0, 4).toUpperCase();
        if (s === sig) {
          return { valid: true, data: { tool, expiresDays: days, nonce } };
        }
      }
    }
    
    return { valid: false, error: '邀请码无效' };
  } catch (e) {
    return { valid: false, error: '邀请码解析失败' };
  }
}

// 检查本地验证状态
export function getLocalVerifiedStatus(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('invite_verified') === 'true';
}

// 设置本地验证状态
export function setLocalVerifiedStatus(verified: boolean): void {
  if (typeof window === 'undefined') return;
  if (verified) {
    localStorage.setItem('invite_verified', 'true');
  } else {
    localStorage.removeItem('invite_verified');
  }
}
