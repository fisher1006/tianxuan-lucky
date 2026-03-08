'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ShareButtonProps {
  title: string;
  text: string;
}

export default function ShareButton({ title, text }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareText = `${title}\n\n${text}\n\n🔗 快来测测你的桃花运吧！`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: '天选桃花运',
          text: shareText,
        });
      } catch (err) {
        // 用户取消分享
      }
    } else {
      // 复制到剪贴板
      try {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('复制失败:', err);
      }
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleShare}
      className="w-full py-4 bg-gradient-to-r from-[#FF6B9D] to-[#C4A7E7] text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
    >
      {copied ? (
        <>
          <span>✨</span> 已复制到剪贴板
        </>
      ) : (
        <>
          <span>📤</span> 分享给朋友
        </>
      )}
    </motion.button>
  );
}
