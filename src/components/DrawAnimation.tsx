'use client';

import { motion } from 'framer-motion';

interface DrawAnimationProps {
  isDrawing: boolean;
  type: 'lottery' | 'fortune' | 'match';
}

export default function DrawAnimation({ isDrawing, type }: DrawAnimationProps) {
  if (!isDrawing) return null;

  const renderLotteryAnimation = () => (
    <div className="relative w-48 h-64 mx-auto">
      {/* 抽签筒 */}
      <motion.div
        animate={{
          rotate: [-5, 5, -5, 5, 0],
        }}
        transition={{
          duration: 0.5,
          repeat: 5,
          repeatType: 'reverse',
        }}
        className="absolute inset-0"
      >
        <div className="w-full h-full bg-gradient-to-b from-[#FF6B9D] to-[#C4A7E7] rounded-3xl flex items-center justify-center shadow-2xl">
          <div className="w-3/4 h-3/4 bg-[#4A3540]/20 rounded-2xl" />
        </div>
      </motion.div>
      
      {/* 签文飞出效果 */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 100, rotate: -180 }}
          animate={{ 
            opacity: [0, 1, 0], 
            y: -100, 
            rotate: 0,
            x: (i - 2) * 30
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.2,
            repeat: Infinity,
          }}
          className="absolute top-1/2 left-1/2 w-8 h-24 bg-white rounded-lg shadow-lg border-2 border-[#FF6B9D]"
        />
      ))}
      
      {/* 粒子效果 */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          initial={{ 
            x: '50%', 
            y: '50%', 
            scale: 0,
          }}
          animate={{ 
            x: `${50 + (Math.random() - 0.5) * 200}%`, 
            y: `${50 + (Math.random() - 0.5) * 200}%`, 
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 1 + Math.random(),
            repeat: Infinity,
            delay: Math.random() * 0.5,
          }}
          className="absolute w-2 h-2 rounded-full bg-[#FFD700]"
        />
      ))}
    </div>
  );

  const renderFortuneAnimation = () => (
    <div className="relative w-64 h-64 mx-auto">
      {/* 桃花运进度条 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-48 h-48 rounded-full border-8 border-[#FF6B9D]/20"
        />
        <motion.div
          className="absolute w-48 h-48 rounded-full border-8 border-transparent border-t-[#FF6B9D] border-r-[#C4A7E7]"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* 桃花瓣 */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              top: '50%',
              left: '50%',
            }}
            animate={{
              x: Math.cos((i * 45 * Math.PI) / 180) * 80,
              y: Math.sin((i * 45 * Math.PI) / 180) * 80,
              opacity: [0.5, 1, 0.5],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            🌸
          </motion.div>
        ))}
      </div>
      
      {/* 中心文字 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-2xl"
        >
          💖
        </motion.span>
      </div>
    </div>
  );

  const renderMatchAnimation = () => (
    <div className="relative w-64 h-40 mx-auto flex items-center justify-center gap-8">
      {/* 两颗心 */}
      <motion.div
        animate={{ 
          x: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
        className="text-6xl"
      >
        💕
      </motion.div>
      
      <motion.div
        animate={{ 
          x: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: 0.2,
        }}
        className="text-6xl"
      >
        💗
      </motion.div>
      
      {/* 碰撞效果 */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: [0, 2, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#FF6B9D]/30 to-[#C4A7E7]/30 blur-xl" />
      </motion.div>
    </div>
  );

  return (
    <div className="py-12">
      {type === 'lottery' && renderLotteryAnimation()}
      {type === 'fortune' && renderFortuneAnimation()}
      {type === 'match' && renderMatchAnimation()}
    </div>
  );
}
