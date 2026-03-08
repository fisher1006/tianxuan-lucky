'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import InviteInput from '@/components/InviteInput';

export default function VerifyPage() {
  const [isVerified, setIsVerified] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl animate-bounce">🔐</div>
      </div>
    );
  }

  // 如果已经验证，直接跳转首页
  if (typeof window !== 'undefined' && localStorage.getItem('invite_verified') === 'true') {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
    return null;
  }

  return (
    <div className="min-h-screen p-4">
      {/* 背景装饰 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {['🔐', '✨', '💖', '🌸'][i % 4]}
          </motion.div>
        ))}
      </div>

      {/* 返回首页 */}
      <Link href="/" className="inline-flex items-center gap-2 text-gray-500 py-4">
        <span>←</span> 返回首页
      </Link>

      {/* 标题 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-[#4A3540] mb-2">
          🔐 邀请码验证
        </h1>
        <p className="text-gray-500">
          输入邀请码，解锁所有功能
        </p>
      </motion.div>

      {/* 邀请码输入 */}
      <InviteInput onVerified={() => setIsVerified(true)} />

      {/* 提示信息 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="max-w-md mx-auto mt-8"
      >
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 text-sm text-gray-600">
          <h4 className="font-bold text-[#4A3540] mb-2">💡 温馨提示</h4>
          <ul className="space-y-1">
            <li>• 邀请码有效期30天</li>
            <li>• 每个邀请码只能使用一次</li>
            <li>• 验证成功后无需重复输入</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
