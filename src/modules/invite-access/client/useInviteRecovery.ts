'use client';

import { useEffect, useState } from 'react';
import { INVITE_SESSION_STORAGE_KEY } from '@/lib/invite-auth';

interface UseInviteRecoveryOptions {
  isVerified: boolean;
}

export function useInviteRecovery({ isVerified }: UseInviteRecoveryOptions) {
  const [restoringAccess, setRestoringAccess] = useState(false);

  useEffect(() => {
    const restoreOrSyncInviteSession = async () => {
      const savedSessionToken = window.localStorage.getItem(INVITE_SESSION_STORAGE_KEY);

      if (isVerified) {
        if (savedSessionToken) return;

        try {
          const response = await fetch('/api/invite/session', { method: 'GET' });
          const result = await response.json();

          if (response.ok && result.success && result.sessionToken) {
            window.localStorage.setItem(INVITE_SESSION_STORAGE_KEY, result.sessionToken);
          }
        } catch {
          // ignore sync failure
        }

        return;
      }

      if (!savedSessionToken) return;

      setRestoringAccess(true);

      try {
        const response = await fetch('/api/invite/session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: savedSessionToken }),
        });
        const result = await response.json();

        if (response.ok && result.success) {
          if (result.sessionToken) {
            window.localStorage.setItem(INVITE_SESSION_STORAGE_KEY, result.sessionToken);
          }
          window.location.reload();
          return;
        }

        window.localStorage.removeItem(INVITE_SESSION_STORAGE_KEY);
      } catch {
        // ignore restore failure
      } finally {
        setRestoringAccess(false);
      }
    };

    void restoreOrSyncInviteSession();
  }, [isVerified]);

  return { restoringAccess };
}
