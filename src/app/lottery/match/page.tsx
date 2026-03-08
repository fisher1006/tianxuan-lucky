'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import DrawAnimation from '@/components/DrawAnimation';
import FortuneCard from '@/components/FortuneCard';
import ShareButton from '@/components/ShareButton';
import { calculateMatchScore, getMatchResult } from '@/data/fortunes';
import { MatchResult } from '@/types';

const zodiacSigns = [
  '白羊座', '金牛座', '双子座', '巨蟹座',
  '狮子座', '处女座', '天秤座', '天蝎座',
  '射手座', '摩羯座', '水瓶座', '双鱼座'
];

export default function MatchPage() {
  const [step, setStep] = useState<'input' | 'drawing' | 'result'>('input');
  const [yourBirthday, setYourBirthday] = useState('');
  const [yourZodiac, setYourZodiac] = useState('');
  const [otherBirthday, setOtherBirthday] = useState('');
  const [otherZodiac, setOtherZodiac] = useState('');
  const [result, setResult] = useState<MatchResult | null>(null);

  const handleMatch = () => {
    if (!yourBirthday || !otherBirthday) return;
    
    setStep('drawing');
    
    // 模拟匹配过程
    setTimeout(() => {
      const score = calculateMatchScore(
        { birthday: yourBirthday, zodiac: yourZodiac || undefined },
        { birthday: otherBirthday, zodiac: otherZodiac || undefined }
      );
      const matchResult = getMatchResult(score);
      setResult(matchResult);
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
          💖 相亲匹配度
        </h1>
        <p className="text-gray-500">
          输入信息，测算匹配指数
        </p>
      </motion.div>

      {/* 输入步骤 */}
      {step === 'input' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-md mx-auto space-y-6"
        >
          {/* 你的信息 */}
          <div className="bg-white/50 rounded-2xl p-4">
            <h3 className="font-bold text-[#FF6B9D] mb-4">👤 你的信息</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-gray-600 text-sm mb-1">出生日期</label>
                <input
                  type="date"
                  value={yourBirthday}
                  onChange={(e) => setYourBirthday(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-[#FF6B9D]/30 rounded-xl focus:border-[#FF6B9D] focus:outline-none bg-white/50"
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm mb-1">星座（可选）</label>
                <select
                  value={yourZodiac}
                  onChange={(e) => setYourZodiac(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-[#FF6B9D]/30 rounded-xl focus:border-[#FF6B9D] focus:outline-none bg-white/50"
                >
                  <option value="">选择星座</option>
                  {zodiacSigns.map(zodiac => (
                    <option key={zodiac} value={zodiac}>{zodiac}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 对方信息 */}
          <div className="bg-white/50 rounded-2xl p-4">
            <h3 className="font-bold text-[#C4A7E7] mb-4">💕 对方信息</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-gray-600 text-sm mb-1">出生日期</label>
                <input
                  type="date"
                  value={otherBirthday}
                  onChange={(e) => setOtherBirthday(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-[#C4A7E7]/30 rounded-xl focus:border-[#C4A7E7] focus:outline-none bg-white/50"
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm mb-1">星座（可选）</label>
                <select
                  value={otherZodiac}
                  onChange={(e) => setOtherZodiac(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-[#C4A7E7]/30 rounded-xl focus:border-[#C4A7E7] focus:outline-none bg-white/50"
                >
                  <option value="">选择星座</option>
                  {zodiacSigns.map(zodiac => (
                    <option key={zodiac} value={zodiac}>{zodiac}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleMatch}
            disabled={!yourBirthday || !otherBirthday}
            className="w-full py-4 bg-gradient-to-r from-[#FF6B9D] to-[#C4A7E7] text-white font-bold rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            开始匹配 ✨
          </motion.button>
        </motion.div>
      )}

      {/* 匹配动画 */}
      {step === 'drawing' && (
        <DrawAnimation isDrawing={true} type="match" />
      )}

      {/* 结果展示 */}
      {step === 'result' && result && (
        <div className="max-w-md mx-auto">
          <FortuneCard type="match" data={result} />
          
          <div className="mt-6 space-y-3">
            <ShareButton
              title={`💖 我们的匹配度：${result.score}%`}
              text={`匹配度：${result.score}%\n${result.comment}\n\n${result.advice}`}
            />
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRetry}
              className="w-full py-4 bg-white border-2 border-[#FF6B9D] text-[#FF6B9D] font-bold rounded-2xl transition-all"
            >
              重新匹配 🔄
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}
