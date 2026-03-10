'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { InviteGate } from '@/modules/invite-access/client';

const features = [
  {
    id: 'love',
    title: '脱单抽签',
    description: '求一支上上签，桃花自然来',
    emoji: '🌸',
    href: '/lottery/love',
    gradient: 'from-pink-400 to-rose-500',
  },
  {
    id: 'today',
    title: '今日桃花运',
    description: '看看今天的爱情运势如何',
    emoji: '💕',
    href: '/lottery/today',
    gradient: 'from-purple-400 to-pink-500',
  },
  {
    id: 'match',
    title: '相亲匹配度',
    description: '输入信息，测算匹配指数',
    emoji: '💖',
    href: '/lottery/match',
    gradient: 'from-rose-400 to-orange-400',
  },
  {
    id: 'reunion',
    title: '复合抽签',
    description: '旧爱能否重归于好？',
    emoji: '💝',
    href: '/lottery/reunion',
    gradient: 'from-violet-400 to-purple-500',
  },
];

const floatingDecorations = [
  { left: '8%', top: '12%', duration: 3.2, delay: 0.1 },
  { left: '22%', top: '72%', duration: 4.1, delay: 0.4 },
  { left: '35%', top: '28%', duration: 3.7, delay: 0.8 },
  { left: '48%', top: '82%', duration: 4.3, delay: 1.1 },
  { left: '57%', top: '14%', duration: 3.5, delay: 0.6 },
  { left: '68%', top: '63%', duration: 4.4, delay: 1.3 },
  { left: '76%', top: '24%', duration: 3.4, delay: 0.9 },
  { left: '84%', top: '78%', duration: 4.2, delay: 1.5 },
  { left: '91%', top: '39%', duration: 3.6, delay: 0.3 },
  { left: '14%', top: '48%', duration: 4.0, delay: 1.0 },
];

interface HomePageClientProps {
  isVerified: boolean;
}

export default function HomePageClient({ isVerified }: HomePageClientProps) {
  return (
    <InviteGate isVerified={isVerified} title="天选桃花运">
      <div className="min-h-screen p-4 pb-20">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {floatingDecorations.map((item, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl opacity-20"
              style={{
                left: item.left,
                top: item.top,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: item.duration,
                repeat: Infinity,
                delay: item.delay,
              }}
            >
              {['🌸', '🌹', '💕', '✨', '🌟'][i % 5]}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center pt-8 mb-12 relative"
        >
          <h1 className="text-4xl font-bold text-[#4A3540] mb-2">🌸 天选桃花运</h1>
          <p className="text-gray-500">测算你的爱情运势</p>
        </motion.div>

        <div className="max-w-md mx-auto space-y-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={feature.href}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`bg-gradient-to-r ${feature.gradient} rounded-3xl p-1 shadow-lg`}
                >
                  <div className="bg-white rounded-[22px] p-6 flex items-center gap-4">
                    <div className="text-4xl">{feature.emoji}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#4A3540]">{feature.title}</h3>
                      <p className="text-gray-500 text-sm">{feature.description}</p>
                    </div>
                    <div className="text-2xl text-gray-300">→</div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-400 text-sm mt-12"
        >
          💡 每天限测3次，请珍惜每次机会
        </motion.p>
      </div>
    </InviteGate>
  );
}
