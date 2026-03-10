import {
  DEFAULT_INVITE_GUIDE_URL,
  INVITE_GUIDE_BUTTON_TEXT,
  INVITE_RESTORE_MESSAGE,
  INVITE_STATUS_MESSAGE,
} from '@/modules/invite-access/shared/constants';

export const inviteGuideUrl = (process.env.NEXT_PUBLIC_INVITE_GUIDE_URL || DEFAULT_INVITE_GUIDE_URL).trim();
export const inviteGuideButtonText = INVITE_GUIDE_BUTTON_TEXT;
export const inviteRestoreMessage = INVITE_RESTORE_MESSAGE;
export const inviteStatusMessage = INVITE_STATUS_MESSAGE;
