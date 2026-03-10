'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  inviteGuideButtonText,
  inviteGuideUrl,
  inviteRestoreMessage,
} from '@/modules/invite-access/shared/public';
import { useInviteRecovery } from '@/modules/invite-access/client/useInviteRecovery';

interface InviteGateProps {
  isVerified: boolean;
  title: string;
  lockedMessage?: string;
  verifyPath?: string;
  children: React.ReactNode;
}

export default function InviteGate({
  isVerified,
  title,
  lockedMessage = '需要邀请码才能使用',
  verifyPath = '/verify',
  children,
}: InviteGateProps) {
  const { restoringAccess } = useInviteRecovery({ isVerified });

  if (!isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl mb-6"
          >
            🔒
          </motion.div>
          <h1 className="text-3xl font-bold text-[#4A3540] mb-4">{title}</h1>
          <p className="text-gray-500 mb-8">{restoringAccess ? inviteRestoreMessage : lockedMessage}</p>
          <div className="flex flex-col items-center gap-3">
            <Link
              href={verifyPath}
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#FF6B9D] to-[#C4A7E7] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              输入邀请码解锁
            </Link>
            <a
              href={inviteGuideUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-[#FF6B9D]/25 bg-white/70 text-[#B4557A] font-medium shadow-sm transition-all hover:bg-white hover:border-[#FF6B9D]/40"
            >
              <span>🎫</span>
              <span>{inviteGuideButtonText}</span>
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}
