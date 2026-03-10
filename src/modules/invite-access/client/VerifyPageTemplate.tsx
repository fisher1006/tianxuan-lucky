'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { InviteInput } from '@/modules/invite-access/client';

const floatingDecorations = [
  { left: '10%', top: '14%', duration: 3.1, delay: 0.2 },
  { left: '26%', top: '70%', duration: 4.0, delay: 0.7 },
  { left: '41%', top: '22%', duration: 3.6, delay: 1.1 },
  { left: '58%', top: '80%', duration: 4.4, delay: 0.5 },
  { left: '71%', top: '34%', duration: 3.8, delay: 1.4 },
  { left: '86%', top: '66%', duration: 4.2, delay: 0.9 },
  { left: '19%', top: '46%', duration: 3.5, delay: 1.6 },
  { left: '79%', top: '16%', duration: 3.9, delay: 0.3 },
];

interface VerifyPageTemplateProps {
  backHref?: string;
  title?: string;
  description?: string;
  successRedirectPath?: string;
}

export default function VerifyPageTemplate({
  backHref = '/',
  title = '🔐 邀请码验证',
  description = '输入邀请码，解锁所有功能',
  successRedirectPath = '/',
}: VerifyPageTemplateProps) {
  return (
    <div className="min-h-screen p-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {floatingDecorations.map((item, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-20"
            style={{ left: item.left, top: item.top }}
            animate={{ y: [0, -20, 0], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: item.duration, repeat: Infinity, delay: item.delay }}
          >
            {['🔐', '✨', '💖', '🌸'][i % 4]}
          </motion.div>
        ))}
      </div>

      <Link href={backHref} className="inline-flex items-center gap-2 text-gray-500 py-4">
        <span>←</span> 返回首页
      </Link>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-[#4A3540] mb-2">{title}</h1>
        <p className="text-gray-500">{description}</p>
      </motion.div>

      <InviteInput successRedirectPath={successRedirectPath} />

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
