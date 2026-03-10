'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { INVITE_CODE_STORAGE_KEY, INVITE_SESSION_STORAGE_KEY } from '@/lib/invite-auth';
import {
  inviteGuideButtonText,
  inviteGuideUrl,
  inviteRestoreMessage,
  inviteStatusMessage,
} from '@/modules/invite-access/shared/public';

interface InviteInputProps {
  onVerified?: () => void;
  successRedirectPath?: string;
}

export default function InviteInput({ onVerified, successRedirectPath = '/' }: InviteInputProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [restoring, setRestoring] = useState(true);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    const restoreInviteAccess = async () => {
      const savedSessionToken = window.localStorage.getItem(INVITE_SESSION_STORAGE_KEY);
      const savedCode = window.localStorage.getItem(INVITE_CODE_STORAGE_KEY);

      if (savedCode) {
        setCode(savedCode);
      }

      if (!savedSessionToken) {
        setRestoring(false);
        return;
      }

      try {
        const response = await fetch('/api/invite/session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: savedSessionToken }),
        });

        const result = await response.json();

        if (cancelled) return;

        if (response.ok && result.success) {
          if (result.sessionToken) {
            window.localStorage.setItem(INVITE_SESSION_STORAGE_KEY, result.sessionToken);
          }
          router.push(successRedirectPath);
          router.refresh();
          return;
        }

        window.localStorage.removeItem(INVITE_SESSION_STORAGE_KEY);
      } catch {
        // ignore restore failure
      } finally {
        if (!cancelled) {
          setRestoring(false);
        }
      }
    };

    void restoreInviteAccess();

    return () => {
      cancelled = true;
    };
  }, [router, successRedirectPath]);

  const handleVerify = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/invite/redeem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        window.localStorage.setItem(INVITE_CODE_STORAGE_KEY, code);
        if (result.sessionToken) {
          window.localStorage.setItem(INVITE_SESSION_STORAGE_KEY, result.sessionToken);
        }
        setSuccess(true);

        setTimeout(() => {
          router.push(successRedirectPath);
          router.refresh();
        }, 800);

        onVerified?.();
      } else {
        setError(result.error || inviteStatusMessage[result.status] || '邀请码无效');
      }
    } catch {
      setError('邀请码服务暂时不可用，请稍后再试');
    } finally {
      setLoading(false);
    }
  };

  if (restoring) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl text-center text-gray-500">
          {inviteRestoreMessage}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-center text-[#4A3540] mb-6">🔐 输入邀请码解锁</h2>

        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="例: TIAN-ABCD-EFGH"
          className="w-full px-4 py-3 text-center text-lg tracking-wider border-2 border-[#FF6B9D]/30 rounded-2xl focus:border-[#FF6B9D] focus:outline-none transition-colors bg-white/50"
        />

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-center mt-3 text-sm"
          >
            {error}
          </motion.p>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleVerify}
          disabled={loading || restoring || !code}
          className="w-full mt-6 py-4 bg-gradient-to-r from-[#FF6B9D] to-[#C4A7E7] text-white font-bold rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              验证中...
            </span>
          ) : success ? (
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-2xl">
              ✨ 验证成功！
            </motion.span>
          ) : (
            '立即解锁'
          )}
        </motion.button>

        <a
          href={inviteGuideUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 mt-3 py-3 rounded-2xl border border-[#FF6B9D]/25 bg-[#FFF7FB] text-[#B4557A] font-medium transition-all hover:border-[#FF6B9D]/40 hover:bg-[#FFF0F7]"
        >
          <span>🎫</span>
          <span>{inviteGuideButtonText}</span>
        </a>

        <p className="text-center text-gray-500 text-sm mt-4 leading-6">需要邀请码？可前往闲鱼商品查看获取方式</p>
      </div>

      {success && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 pointer-events-none flex items-center justify-center">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: '50%',
                y: '50%',
                scale: 0,
                rotate: Math.random() * 360,
              }}
              animate={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                scale: 1,
                opacity: 0,
              }}
              transition={{
                duration: 1 + Math.random(),
                delay: Math.random() * 0.3,
              }}
              className="absolute text-2xl"
            >
              {['✨', '🌸', '💖', '🌟', '💕'][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
