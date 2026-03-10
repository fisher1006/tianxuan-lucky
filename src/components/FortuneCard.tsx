'use client';

import { motion } from 'framer-motion';
import { LoveFortune, DailyFortune, MatchResult, ReunionFortune, FortuneTip, LuckyElement } from '@/types';

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
    
    // 判断 tips 的格式
    const isNewTipFormat = (tip: string | FortuneTip): tip is FortuneTip => {
      return typeof tip === 'object' && 'emoji' in tip && 'text' in tip;
    };
    
    // 获取显示内容：优先使用 overview，否则使用 description
    const displayContent = fortune.overview || fortune.description;
    
    // 幸运元素
    const lucky = fortune.lucky as LuckyElement | undefined;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-auto"
      >
        <div className={`bg-gradient-to-br ${rankColors[fortune.rank]} rounded-3xl p-1 shadow-2xl`}>
          <div className="bg-white rounded-[22px] p-6">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="text-6xl mb-4"
              >
                {fortune.emoji}
              </motion.div>
              
              <h3 className="text-2xl font-bold text-[#4A3540] mb-1">
                {fortune.title}
              </h3>
              
              {fortune.subtitle && (
                <p className="text-gray-400 text-sm mb-3">{fortune.subtitle}</p>
              )}
              
              <div className={`inline-block px-4 py-1 rounded-full text-white text-sm font-medium mb-4 bg-gradient-to-r ${rankColors[fortune.rank]}`}>
                {rankLabels[fortune.rank]}
              </div>
              
              {/* 诗意化解读 */}
              {fortune.overview && (
                <div className="bg-gradient-to-r from-[#FFF9F5] to-[#FEF0E5] rounded-2xl p-4 mb-4">
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {fortune.overview}
                  </p>
                </div>
              )}
              
              <p className="text-gray-600 leading-relaxed mb-4">
                {displayContent}
              </p>
              
              {/* 幸运元素展示 */}
              {lucky && (
                <div className="grid grid-cols-5 gap-2 mb-4">
                  <div className="bg-[#FFF9F5] rounded-xl p-2">
                    <div className="text-lg mb-0.5">🎨</div>
                    <div className="text-xs text-gray-500">幸运色</div>
                    <div className="font-bold text-[#4A3540] text-xs">{lucky.color}</div>
                  </div>
                  <div className="bg-[#FFF9F5] rounded-xl p-2">
                    <div className="text-lg mb-0.5">🔢</div>
                    <div className="text-xs text-gray-500">幸运数</div>
                    <div className="font-bold text-[#4A3540] text-xs">{lucky.number}</div>
                  </div>
                  <div className="bg-[#FFF9F5] rounded-xl p-2">
                    <div className="text-lg mb-0.5">⏰</div>
                    <div className="text-xs text-gray-500">黄金时间</div>
                    <div className="font-bold text-[#4A3540] text-xs">{lucky.time}</div>
                  </div>
                  <div className="bg-[#FFF9F5] rounded-xl p-2">
                    <div className="text-lg mb-0.5">🧭</div>
                    <div className="text-xs text-gray-500">幸运方向</div>
                    <div className="font-bold text-[#4A3540] text-xs">{lucky.direction}</div>
                  </div>
                  <div className="bg-[#FFF9F5] rounded-xl p-2">
                    <div className="text-lg mb-0.5">📍</div>
                    <div className="text-xs text-gray-500">幸运地</div>
                    <div className="font-bold text-[#4A3540] text-xs">{lucky.place}</div>
                  </div>
                </div>
              )}
              
              {/* 能量画像 */}
              {fortune.energyProfile && (
                <div className="bg-gradient-to-r from-[#FFF9F5] to-[#FEF0E5] rounded-2xl p-4 mb-4">
                  <h4 className="font-bold text-[#FF6B9D] mb-3">⚡ 能量画像</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {fortune.energyProfile.romanticEnergy !== undefined && (
                      <div className="bg-white rounded-xl p-2">
                        <div className="text-xs text-gray-500">浪漫能量</div>
                        <div className="font-bold text-[#4A3540]">{fortune.energyProfile.romanticEnergy}%</div>
                      </div>
                    )}
                    {fortune.energyProfile.charmAura !== undefined && (
                      <div className="bg-white rounded-xl p-2">
                        <div className="text-xs text-gray-500">魅力气场</div>
                        <div className="font-bold text-[#4A3540]">{fortune.energyProfile.charmAura}%</div>
                      </div>
                    )}
                    {fortune.energyProfile.soulResonance !== undefined && (
                      <div className="bg-white rounded-xl p-2">
                        <div className="text-xs text-gray-500">灵魂共振</div>
                        <div className="font-bold text-[#4A3540]">{fortune.energyProfile.soulResonance}%</div>
                      </div>
                    )}
                    {fortune.energyProfile.emotionalDepth !== undefined && (
                      <div className="bg-white rounded-xl p-2">
                        <div className="text-xs text-gray-500">情感深度</div>
                        <div className="font-bold text-[#4A3540]">{fortune.energyProfile.emotionalDepth}%</div>
                      </div>
                    )}
                    {fortune.energyProfile.fateConnection !== undefined && (
                      <div className="bg-white rounded-xl p-2">
                        <div className="text-xs text-gray-500">命运牵绊</div>
                        <div className="font-bold text-[#4A3540]">{fortune.energyProfile.fateConnection}%</div>
                      </div>
                    )}
                    {fortune.energyProfile.spiritualAwareness !== undefined && (
                      <div className="bg-white rounded-xl p-2">
                        <div className="text-xs text-gray-500">灵性觉知</div>
                        <div className="font-bold text-[#4A3540]">{fortune.energyProfile.spiritualAwareness}%</div>
                      </div>
                    )}
                    {fortune.energyProfile.adventureIndex !== undefined && (
                      <div className="bg-white rounded-xl p-2">
                        <div className="text-xs text-gray-500">冒险指数</div>
                        <div className="font-bold text-[#4A3540]">{fortune.energyProfile.adventureIndex}%</div>
                      </div>
                    )}
                    {fortune.energyProfile.aestheticPerception !== undefined && (
                      <div className="bg-white rounded-xl p-2">
                        <div className="text-xs text-gray-500">美学感知</div>
                        <div className="font-bold text-[#4A3540]">{fortune.energyProfile.aestheticPerception}%</div>
                      </div>
                    )}
                    {fortune.energyProfile.earthEnergy !== undefined && (
                      <div className="bg-white rounded-xl p-2">
                        <div className="text-xs text-gray-500">大地能量</div>
                        <div className="font-bold text-[#4A3540]">{fortune.energyProfile.earthEnergy}%</div>
                      </div>
                    )}
                    {fortune.energyProfile.waterEnergy !== undefined && (
                      <div className="bg-white rounded-xl p-2">
                        <div className="text-xs text-gray-500">水流能量</div>
                        <div className="font-bold text-[#4A3540]">{fortune.energyProfile.waterEnergy}%</div>
                      </div>
                    )}
                    {fortune.energyProfile.windEnergy !== undefined && (
                      <div className="bg-white rounded-xl p-2">
                        <div className="text-xs text-gray-500">风之能量</div>
                        <div className="font-bold text-[#4A3540]">{fortune.energyProfile.windEnergy}%</div>
                      </div>
                    )}
                    {fortune.energyProfile.growthEnergy !== undefined && (
                      <div className="bg-white rounded-xl p-2">
                        <div className="text-xs text-gray-500">生长能量</div>
                        <div className="font-bold text-[#4A3540]">{fortune.energyProfile.growthEnergy}%</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* 今日星象 */}
              {fortune.celestial && (
                <div className="bg-gradient-to-r from-[#F0F4FF] to-[#E8F4F8] rounded-2xl p-4 mb-4">
                  <h4 className="font-bold text-[#6B8DD6] mb-3">🌟 今日星象</h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {fortune.celestial.planet && (
                      <div className="bg-white rounded-xl px-3 py-2">
                        <span className="text-sm">🪐 {fortune.celestial.planet}</span>
                      </div>
                    )}
                    {fortune.celestial.aspect && (
                      <div className="bg-white rounded-xl px-3 py-2">
                        <span className="text-sm">✨ {fortune.celestial.aspect}</span>
                      </div>
                    )}
                    {fortune.celestial.moonPhase && (
                      <div className="bg-white rounded-xl px-3 py-2">
                        <span className="text-sm">🌙 {fortune.celestial.moonPhase}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* 详细解读 */}
              {fortune.readings && fortune.readings.length > 0 && (
                <div className="space-y-3 mb-4">
                  {fortune.readings.map((reading, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="bg-white rounded-2xl p-4 border border-[#FFF9F5]"
                    >
                      <h4 className="font-bold text-[#4A3540] mb-2">{reading.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{reading.content}</p>
                    </motion.div>
                  ))}
                </div>
              )}
              
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
                      {isNewTipFormat(tip) ? (
                        <>
                          <span className="text-lg">{tip.emoji}</span>
                          <span>{tip.text}</span>
                        </>
                      ) : (
                        <>
                          <span className="text-[#FF6B9D]">•</span>
                          {tip}
                        </>
                      )}
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
    // 获取幸运元素
    const lucky = fortune.lucky;
    const time = fortune.time || lucky?.time;
    const place = fortune.place || lucky?.place;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-auto"
      >
        <div className="bg-gradient-to-br from-[#FF6B9D] to-[#C4A7E7] rounded-3xl p-1 shadow-2xl">
          <div className="bg-white rounded-[22px] p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-[#4A3540] mb-4">
                🌸 今日桃花运
              </h3>
              
              {/* 诗意解读 */}
              {fortune.overview && (
                <div className="bg-gradient-to-r from-[#FFF9F5] to-[#FEF0E5] rounded-2xl p-4 mb-4">
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {fortune.overview}
                  </p>
                </div>
              )}
              
              {/* 桃花指数 */}
              <div className="relative mb-4">
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
                <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${fortune.loveIndex}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-[#FF6B9D] to-[#C4A7E7]"
                  />
                </div>
              </div>
              
              {/* 幸运元素展示 - 5列布局 */}
              <div className="grid grid-cols-5 gap-1.5 mb-4">
                <div className="bg-[#FFF9F5] rounded-xl p-2">
                  <div className="text-lg mb-0.5">🎨</div>
                  <div className="text-xs text-gray-500">幸运色</div>
                  <div className="font-bold text-[#4A3540] text-xs">{fortune.color}</div>
                </div>
                <div className="bg-[#FFF9F5] rounded-xl p-2">
                  <div className="text-lg mb-0.5">🔢</div>
                  <div className="text-xs text-gray-500">幸运数</div>
                  <div className="font-bold text-[#4A3540] text-xs">{fortune.number}</div>
                </div>
                <div className="bg-[#FFF9F5] rounded-xl p-2">
                  <div className="text-lg mb-0.5">⏰</div>
                  <div className="text-xs text-gray-500">黄金时间</div>
                  <div className="font-bold text-[#4A3540] text-xs">{time || '-'}</div>
                </div>
                <div className="bg-[#FFF9F5] rounded-xl p-2">
                  <div className="text-lg mb-0.5">🧭</div>
                  <div className="text-xs text-gray-500">幸运方向</div>
                  <div className="font-bold text-[#4A3540] text-xs">{fortune.direction}</div>
                </div>
                <div className="bg-[#FFF9F5] rounded-xl p-2">
                  <div className="text-lg mb-0.5">📍</div>
                  <div className="text-xs text-gray-500">幸运地</div>
                  <div className="font-bold text-[#4A3540] text-xs">{place || '-'}</div>
                </div>
              </div>
              
              {/* 能量画像 */}
              {fortune.energyProfile && (
                <div className="bg-gradient-to-r from-[#FFF9F5] to-[#FEF0E5] rounded-2xl p-4 mb-4">
                  <h4 className="font-bold text-[#FF6B9D] mb-3">⚡ 能量画像</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {fortune.energyProfile.romanticEnergy !== undefined && (
                      <div className="bg-white rounded-xl p-2">
                        <div className="text-xs text-gray-500">浪漫能量</div>
                        <div className="font-bold text-[#4A3540]">{fortune.energyProfile.romanticEnergy}%</div>
                      </div>
                    )}
                    {fortune.energyProfile.charmAura !== undefined && (
                      <div className="bg-white rounded-xl p-2">
                        <div className="text-xs text-gray-500">魅力气场</div>
                        <div className="font-bold text-[#4A3540]">{fortune.energyProfile.charmAura}%</div>
                      </div>
                    )}
                    {fortune.energyProfile.soulResonance !== undefined && (
                      <div className="bg-white rounded-xl p-2">
                        <div className="text-xs text-gray-500">灵魂共振</div>
                        <div className="font-bold text-[#4A3540]">{fortune.energyProfile.soulResonance}%</div>
                      </div>
                    )}
                    {fortune.energyProfile.emotionalDepth !== undefined && (
                      <div className="bg-white rounded-xl p-2">
                        <div className="text-xs text-gray-500">情感深度</div>
                        <div className="font-bold text-[#4A3540]">{fortune.energyProfile.emotionalDepth}%</div>
                      </div>
                    )}
                    {fortune.energyProfile.fateConnection !== undefined && (
                      <div className="bg-white rounded-xl p-2">
                        <div className="text-xs text-gray-500">命运牵绊</div>
                        <div className="font-bold text-[#4A3540]">{fortune.energyProfile.fateConnection}%</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* 今日星象 */}
              {fortune.celestial && (
                <div className="bg-gradient-to-r from-[#F0F4FF] to-[#E8F4F8] rounded-2xl p-4 mb-4">
                  <h4 className="font-bold text-[#6B8DD6] mb-3">🌟 今日星象</h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {fortune.celestial.planet && (
                      <div className="bg-white rounded-xl px-3 py-2">
                        <span className="text-sm">🪐 {fortune.celestial.planet}</span>
                      </div>
                    )}
                    {fortune.celestial.aspect && (
                      <div className="bg-white rounded-xl px-3 py-2">
                        <span className="text-sm">✨ {fortune.celestial.aspect}</span>
                      </div>
                    )}
                    {fortune.celestial.moonPhase && (
                      <div className="bg-white rounded-xl px-3 py-2">
                        <span className="text-sm">🌙 {fortune.celestial.moonPhase}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* 详细解读 */}
              {fortune.readings && fortune.readings.length > 0 && (
                <div className="space-y-3 mb-4">
                  {fortune.readings.map((reading, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="bg-white rounded-2xl p-4 border border-[#FFF9F5]"
                    >
                      <h4 className="font-bold text-[#4A3540] mb-2">{reading.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{reading.content}</p>
                    </motion.div>
                  ))}
                </div>
              )}
              
              {/* 提示 */}
              <div className="bg-gradient-to-r from-[#FF6B9D]/10 to-[#C4A7E7]/10 rounded-2xl p-3">
                <p className="text-[#4A3540] text-sm">{fortune.tip}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (type === 'match') {
    const result = data as MatchResult;
    const lucky = result.lucky;
    const isNewTipFormat = (tip: string | FortuneTip): tip is FortuneTip => {
      return typeof tip === 'object' && 'emoji' in tip && 'text' in tip;
    };
    const rank = result.rank || (result.score >= 88 ? 'super_lucky' : result.score >= 76 ? 'lucky' : result.score >= 52 ? 'average' : 'bad');

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-auto"
      >
        <div className={`bg-gradient-to-br ${rankColors[rank]} rounded-3xl p-1 shadow-2xl`}>
          <div className="bg-white rounded-[22px] p-6">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="text-6xl mb-3"
              >
                {result.score >= 88 ? '💞' : result.score >= 76 ? '💖' : result.score >= 64 ? '💕' : result.score >= 52 ? '💫' : '💔'}
              </motion.div>

              <div className="mb-3">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] to-[#C4A7E7]"
                >
                  {result.score}%
                </motion.span>
                <p className="text-gray-500 text-sm mt-1">匹配指数</p>
              </div>

              <h3 className="text-2xl font-bold text-[#4A3540] mb-1">
                {result.comment}
              </h3>

              {result.subtitle && (
                <p className="text-gray-400 text-sm mb-3">{result.subtitle}</p>
              )}

              <div className={`inline-block px-4 py-1 rounded-full text-white text-sm font-medium mb-4 bg-gradient-to-r ${rankColors[rank]}`}>
                {rankLabels[rank]}
              </div>

              {result.overview && (
                <div className="bg-gradient-to-r from-[#FFF9F5] to-[#FEF0E5] rounded-2xl p-4 mb-4">
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {result.overview}
                  </p>
                </div>
              )}

              <div className="bg-[#FFF9F5] rounded-2xl p-4 mb-4">
                <p className="text-gray-600 text-sm leading-relaxed">{result.advice}</p>
              </div>

              {lucky && (
                <div className="grid grid-cols-5 gap-1.5 mb-4">
                  <div className="bg-[#FFF9F5] rounded-xl p-2">
                    <div className="text-lg mb-0.5">🎨</div>
                    <div className="text-xs text-gray-500">幸运色</div>
                    <div className="font-bold text-[#4A3540] text-xs">{lucky.color}</div>
                  </div>
                  <div className="bg-[#FFF9F5] rounded-xl p-2">
                    <div className="text-lg mb-0.5">🔢</div>
                    <div className="text-xs text-gray-500">幸运数</div>
                    <div className="font-bold text-[#4A3540] text-xs">{lucky.number}</div>
                  </div>
                  <div className="bg-[#FFF9F5] rounded-xl p-2">
                    <div className="text-lg mb-0.5">⏰</div>
                    <div className="text-xs text-gray-500">黄金时间</div>
                    <div className="font-bold text-[#4A3540] text-xs">{lucky.time}</div>
                  </div>
                  <div className="bg-[#FFF9F5] rounded-xl p-2">
                    <div className="text-lg mb-0.5">🧭</div>
                    <div className="text-xs text-gray-500">幸运方向</div>
                    <div className="font-bold text-[#4A3540] text-xs">{lucky.direction}</div>
                  </div>
                  <div className="bg-[#FFF9F5] rounded-xl p-2">
                    <div className="text-lg mb-0.5">📍</div>
                    <div className="text-xs text-gray-500">幸运地</div>
                    <div className="font-bold text-[#4A3540] text-xs">{lucky.place}</div>
                  </div>
                </div>
              )}

              {result.energyProfile && (
                <div className="bg-gradient-to-r from-[#FFF9F5] to-[#FEF0E5] rounded-2xl p-4 mb-4">
                  <h4 className="font-bold text-[#FF6B9D] mb-3">⚡ 匹配画像</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white rounded-xl p-2">
                      <div className="text-xs text-gray-500">浪漫能量</div>
                      <div className="font-bold text-[#4A3540]">{result.energyProfile.romanticEnergy}%</div>
                    </div>
                    <div className="bg-white rounded-xl p-2">
                      <div className="text-xs text-gray-500">魅力气场</div>
                      <div className="font-bold text-[#4A3540]">{result.energyProfile.charmAura}%</div>
                    </div>
                    <div className="bg-white rounded-xl p-2">
                      <div className="text-xs text-gray-500">灵魂共振</div>
                      <div className="font-bold text-[#4A3540]">{result.energyProfile.soulResonance}%</div>
                    </div>
                    <div className="bg-white rounded-xl p-2">
                      <div className="text-xs text-gray-500">情感深度</div>
                      <div className="font-bold text-[#4A3540]">{result.energyProfile.emotionalDepth}%</div>
                    </div>
                    <div className="bg-white rounded-xl p-2 col-span-2">
                      <div className="text-xs text-gray-500">命运牵绊</div>
                      <div className="font-bold text-[#4A3540]">{result.energyProfile.fateConnection}%</div>
                    </div>
                  </div>
                </div>
              )}

              {result.celestial && (
                <div className="bg-gradient-to-r from-[#F0F4FF] to-[#E8F4F8] rounded-2xl p-4 mb-4">
                  <h4 className="font-bold text-[#6B8DD6] mb-3">🌟 关系星象</h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <div className="bg-white rounded-xl px-3 py-2">
                      <span className="text-sm">🪐 {result.celestial.planet}</span>
                    </div>
                    <div className="bg-white rounded-xl px-3 py-2">
                      <span className="text-sm">✨ {result.celestial.aspect}</span>
                    </div>
                    <div className="bg-white rounded-xl px-3 py-2">
                      <span className="text-sm">🌙 {result.celestial.moonPhase}</span>
                    </div>
                  </div>
                </div>
              )}

              {result.readings && result.readings.length > 0 && (
                <div className="space-y-3 mb-4">
                  {result.readings.map((reading, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="bg-white rounded-2xl p-4 border border-[#FFF9F5] text-left"
                    >
                      <h4 className="font-bold text-[#4A3540] mb-2">{reading.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{reading.content}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {result.tips && result.tips.length > 0 && (
                <div className="bg-[#FFF9F5] rounded-2xl p-4 text-left">
                  <h4 className="font-bold text-[#FF6B9D] mb-3 text-center">💡 相处建议</h4>
                  <ul className="space-y-2">
                    {result.tips.map((tip, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="text-gray-600 text-sm flex items-start gap-2"
                      >
                        {isNewTipFormat(tip) ? (
                          <>
                            <span className="text-lg">{tip.emoji}</span>
                            <span>{tip.text}</span>
                          </>
                        ) : (
                          <>
                            <span className="text-[#FF6B9D]">•</span>
                            {tip}
                          </>
                        )}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${result.score}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className={`h-full ${result.score >= 76 ? 'bg-gradient-to-r from-pink-400 to-rose-500' : result.score >= 52 ? 'bg-gradient-to-r from-yellow-400 to-orange-400' : 'bg-gradient-to-r from-gray-400 to-gray-500'}`}
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
