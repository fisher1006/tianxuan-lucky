'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import DrawAnimation from '@/components/DrawAnimation';
import FortuneCard from '@/components/FortuneCard';
import ShareButton from '@/components/ShareButton';
import { reunionFortunes, getRandomFortune } from '@/data/fortunes';
import { ReunionFortune } from '@/types';
import { getLocalVerifiedStatus } from '@/lib/utils';

export default function ReunionPage() {
  const [step, setStep] = useState<'input' | 'drawing' | 'result'>('input');
  const [nickname, setNickname] = useState('');
  const [splitDate, setSplitDate] = useState('');
  const [result, setResult] = useState<ReunionFortune | null>(null);
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
    if (!nickname || !splitDate) return;
    
    setStep('drawing');
    
    // 模拟抽签过程
    setTimeout(() => {
      const fortune = getRandomFortune(reunionFortunes);
      setResult(fortune);
      setStep('result');
    }, 3000);
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
          💝 复合抽签
        </h1>
        <p className="text-gray-500">
          旧爱能否重归于好？
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
          
          <div>
            <label className="block text-gray-600 mb-2">分手时间</label>
            <input
              type="month"
              value={splitDate}
              onChange={(e) => setSplitDate(e.target.value)}
              placeholder="选择分手时间"
              className="w-full px-4 py-3 border-2 border-[#FF6B9D]/30 rounded-2xl focus:border-[#FF6B9D] focus:outline-none bg-white/50"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDraw}
            disabled={!nickname || !splitDate}
            className="w-full py-4 bg-gradient-to-r from-[#FF6B9D] to-[#C4A7E7] text-white font-bold rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            开始抽签 ✨
          </motion.button>

          <p className="text-center text-gray-400 text-sm">
            💡 此测算仅供娱乐参考
          </p>
        </motion.div>
      )}

      {/* 抽签动画 */}
      {step === 'drawing' && (
        <DrawAnimation isDrawing={true} type="lottery" />
      )}

      {/* 结果展示 */}
      {step === 'result' && result && (
        <div className="max-w-md mx-auto">
          <FortuneCard type="reunion" data={result} />
          
          <div className="mt-6 space-y-3">
            <ShareButton
              title={`💝 我的复合抽签结果：${result.title}`}
              text={`${result.emoji} ${result.description}\n\n${result.tips.join('\n')}`}
            />
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRetry}
              className="w-full py-4 bg-white border-2 border-[#FF6B9D] text-[#FF6B9D] font-bold rounded-2xl transition-all"
            >
              再抽一次 🔄
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}
