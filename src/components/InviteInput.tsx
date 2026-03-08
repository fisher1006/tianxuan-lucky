'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { validateInviteCode, setLocalVerifiedStatus } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface InviteInputProps {
  onVerified?: () => void;
}

export default function InviteInput({ onVerified }: InviteInputProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleVerify = async () => {
    setError('');
    setLoading(true);
    
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const result = validateInviteCode(code);
    
    if (result.valid) {
      setSuccess(true);
      setLocalVerifiedStatus(true);
      
      // 延迟跳转到首页
      setTimeout(() => {
        router.push('/');
      }, 1500);
      
      if (onVerified) {
        onVerified();
      }
    } else {
      setError(result.error || '邀请码无效');
    }
    
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-center text-[#4A3540] mb-6">
          🔐 输入邀请码解锁
        </h2>
        
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="例: LOVE-ABCD.EFGH"
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
          disabled={loading || !code}
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
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-2xl"
            >
              ✨ 验证成功！
            </motion.span>
          ) : (
            '立即解锁'
          )}
        </motion.button>
        
        <p className="text-center text-gray-500 text-sm mt-4">
          需要邀请码？请联系客服获取
        </p>
      </div>
      
      {/* 成功动画 */}
      {success && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 pointer-events-none flex items-center justify-center"
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: '50%', 
                y: '50%', 
                scale: 0,
                rotate: Math.random() * 360
              }}
              animate={{ 
                x: `${Math.random() * 100}%`, 
                y: `${Math.random() * 100}%`, 
                scale: 1,
                opacity: 0
              }}
              transition={{ 
                duration: 1 + Math.random(), 
                delay: Math.random() * 0.3 
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
