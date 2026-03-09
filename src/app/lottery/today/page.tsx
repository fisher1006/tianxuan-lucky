'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import DrawAnimation from '@/components/DrawAnimation';
import FortuneCard from '@/components/FortuneCard';
import ShareButton from '@/components/ShareButton';
import { getDailyFortuneByDate } from '@/data/fortunes';
import { DailyFortune } from '@/types';
import { getLocalVerifiedStatus } from '@/lib/utils';

export default function TodayFortunePage() {
  const [step, setStep] = useState<'input' | 'drawing' | 'result'>('input');
  const [nickname, setNickname] = useState('');
  const [result, setResult] = useState<DailyFortune | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const verified = getLocalVerifiedStatus();
    setIsVerified(verified);
    if (!verified) {
      router.push('/verify');
    }
  }, [router]);

  if (!mounted || !isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">验证中...</div>
      </div>
    );
  }

  const handleDraw = () => {
    if (!nickname) return;
    
    setStep('drawing');
    
    // 模拟测算过程
    setTimeout(() => {
      const today = new Date().toISOString().split('T')[0];
      const fortune = getDailyFortuneByDate(today);
      setResult(fortune);
      setStep('result');
    }, 2500);
  };

  const handleRetry = () => {
    setStep('input');
    setResult(null);
  };

  return (
    <div className="min-h-screen p-4 pb-20">
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
          💕 今日桃花运
        </h1>
        <p className="text-gray-500">
          看看今天的爱情运势如何
        </p>
      </motion.div>

      {/* 输入步骤 */}
      {step === 'input' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-md mx-auto space-y-4"
        >
          <div>
            <label className="block text-gray-600 mb-2">你的昵称</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="输入你的昵称"
              className="w-full px-4 py-3 border-2 border-[#FF6B9D]/30 rounded-2xl focus:border-[#FF6B9D] focus:outline-none bg-white/50"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDraw}
            disabled={!nickname}
            className="w-full py-4 bg-gradient-to-r from-[#FF6B9D] to-[#C4A7E7] text-white font-bold rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            开始测算 ✨
          </motion.button>
        </motion.div>
      )}

      {/* 测算动画 */}
      {step === 'drawing' && (
        <DrawAnimation isDrawing={true} type="fortune" />
      )}

      {/* 结果展示 */}
      {step === 'result' && result && (
        <div className="max-w-md mx-auto">
          <FortuneCard type="daily" data={result} />
          
          <div className="mt-6 space-y-3">
            <ShareButton
              title={`💕 我的今日桃花运：${result.loveIndex}分`}
              text={`桃花指数：${result.loveIndex}\n幸运色：${result.color}\n幸运数字：${result.number}\n幸运方向：${result.direction}\n\n${result.tip}`}
            />
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRetry}
              className="w-full py-4 bg-white border-2 border-[#FF6B9D] text-[#FF6B9D] font-bold rounded-2xl transition-all"
            >
              重新测算 🔄
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}
