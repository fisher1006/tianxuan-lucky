'use client';

import { motion } from 'framer-motion';
import { LoveFortune, DailyFortune, MatchResult, ReunionFortune } from '@/types';

interface FortuneCardProps {
  type: 'love' | 'daily' | 'match' | 'reunion';
  data: LoveFortune | DailyFortune | MatchResult | ReunionFortune;
}

export default function FortuneCard({ type, data }: FortuneCardProps) {
  const rankColors = {
    super_lucky: 'from-yellow-400 to-orange-500',
    lucky: 'from-pink-400 to-rose-500',
    average: 'from-gray-400 to-gray-500',
    bad: 'from-gray-500 to-gray-600'
  };

  const rankLabels = {
    super_lucky: '🌟 上上签',
    lucky: '✨ 上签',
    average: '🌿 中签',
    bad: '💨 下签'
  };

  if (type === 'love' || type === 'reunion') {
    const fortune = data as LoveFortune | ReunionFortune;
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-auto"
      >
        <div className={`bg-gradient-to-br ${rankColors[fortune.rank]} rounded-3xl p-1 shadow-2xl`}>
          <div className="bg-white rounded-[22px] p-8">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="text-6xl mb-4"
              >
                {fortune.emoji}
              </motion.div>
              
              <h3 className="text-2xl font-bold text-[#4A3540] mb-2">
                {fortune.title}
              </h3>
              
              <div className={`inline-block px-4 py-1 rounded-full text-white text-sm font-medium mb-4 bg-gradient-to-r ${rankColors[fortune.rank]}`}>
                {rankLabels[fortune.rank]}
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                {fortune.description}
              </p>
              
              <div className="bg-[#FFF9F5] rounded-2xl p-4">
                <h4 className="font-bold text-[#FF6B9D] mb-3">💡 运势建议</h4>
                <ul className="space-y-2">
                  {fortune.tips.map((tip, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="text-gray-600 text-sm flex items-start gap-2"
                    >
                      <span className="text-[#FF6B9D]">•</span>
                      {tip}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* 装饰花瓣 */}
        <div className="absolute -top-4 -right-4 text-4xl opacity-50">🌸</div>
        <div className="absolute -bottom-4 -left-4 text-4xl opacity-50">🌸</div>
      </motion.div>
    );
  }

  if (type === 'daily') {
    const fortune = data as DailyFortune;
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-auto"
      >
        <div className="bg-gradient-to-br from-[#FF6B9D] to-[#C4A7E7] rounded-3xl p-1 shadow-2xl">
          <div className="bg-white rounded-[22px] p-8">
            <div className="text-center">
              <h3 className="text-xl font-bold text-[#4A3540] mb-6">
                🌸 今日桃花运
              </h3>
              
              {/* 桃花指数 */}
              <div className="relative mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring' }}
                  className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] to-[#C4A7E7]"
                >
                  {fortune.loveIndex}
                </motion.div>
                <p className="text-gray-500 text-sm">桃花指数</p>
                
                {/* 进度条 */}
                <div className="mt-4 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${fortune.loveIndex}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-[#FF6B9D] to-[#C4A7E7]"
                  />
                </div>
              </div>
              
              {/* 幸运信息 */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-[#FFF9F5] rounded-2xl p-3">
                  <div className="text-2xl mb-1">🎨</div>
                  <div className="text-xs text-gray-500">幸运色</div>
                  <div className="font-bold text-[#4A3540]">{fortune.color}</div>
                </div>
                <div className="bg-[#FFF9F5] rounded-2xl p-3">
                  <div className="text-2xl mb-1">🔢</div>
                  <div className="text-xs text-gray-500">幸运数</div>
                  <div className="font-bold text-[#4A3540]">{fortune.number}</div>
                </div>
                <div className="bg-[#FFF9F5] rounded-2xl p-3">
                  <div className="text-2xl mb-1">🧭</div>
                  <div className="text-xs text-gray-500">幸运方向</div>
                  <div className="font-bold text-[#4A3540]">{fortune.direction}</div>
                </div>
              </div>
              
              {/* 提示 */}
              <div className="bg-gradient-to-r from-[#FF6B9D]/10 to-[#C4A7E7]/10 rounded-2xl p-4">
                <p className="text-[#4A3540]">{fortune.tip}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (type === 'match') {
    const result = data as MatchResult;
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-auto"
      >
        <div className="bg-gradient-to-br from-pink-400 to-purple-500 rounded-3xl p-1 shadow-2xl">
          <div className="bg-white rounded-[22px] p-8">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="text-6xl mb-4"
              >
                {result.score >= 80 ? '💖' : result.score >= 60 ? '💕' : '💔'}
              </motion.div>
              
              {/* 匹配度数字 */}
              <div className="mb-4">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] to-[#C4A7E7]"
                >
                  {result.score}%
                </motion.span>
              </div>
              
              <h3 className="text-2xl font-bold text-[#4A3540] mb-2">
                {result.comment}
              </h3>
              
              <div className="bg-[#FFF9F5] rounded-2xl p-4 mb-4">
                <p className="text-gray-600">{result.advice}</p>
              </div>
              
              {/* 进度条 */}
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${result.score}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className={`h-full ${result.score >= 70 ? 'bg-gradient-to-r from-pink-400 to-rose-500' : result.score >= 50 ? 'bg-gradient-to-r from-yellow-400 to-orange-400' : 'bg-gradient-to-r from-gray-400 to-gray-500'}`}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return null;
}
