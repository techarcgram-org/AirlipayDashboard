'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { logout } from '@/app/apiServices/authService';
import { Button, InlineNotice, Modal } from '@/components/backoffice';
import { useAuth } from '@/components/auth/AuthProvider';
import { SESSION_POLICY } from '@/lib/auth/session';

const ACTIVITY_EVENTS = ['pointerdown', 'keydown', 'touchstart', 'wheel', 'scroll'];

function loginRedirect(pathname, reason) {
  const next =
    pathname && pathname.startsWith('/dashboard')
      ? `&next=${encodeURIComponent(pathname)}`
      : '';
  return `/login?reason=${reason}${next}`;
}

export function IdleSessionGuard() {
  const { session, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const [warningOpen, setWarningOpen] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(SESSION_POLICY.warningSeconds);
  const lastActivityRef = useRef(Date.now());
  const endingRef = useRef(false);

  const endSession = useCallback(async () => {
    if (endingRef.current) return;
    endingRef.current = true;
    try {
      await logout({ source: 'idle' });
    } catch {
      // The token may already be invalid; clear the local session regardless.
    }
    queryClient.clear();
    signOut();
    router.replace(loginRedirect(pathname, 'idle'));
  }, [pathname, queryClient, router, signOut]);

  const markActive = useCallback(() => {
    lastActivityRef.current = Date.now();
    setSecondsLeft(SESSION_POLICY.warningSeconds);
    setWarningOpen(false);
  }, []);

  useEffect(() => {
    lastActivityRef.current = Date.now();
  }, []);

  useEffect(() => {
    if (!session?.token) return undefined;
    const onActivity = (event) => {
      if (endingRef.current) return;
      // Clicks on the warning's own actions must reach the button instead of
      // closing the dialog as "activity".
      const target = event?.target;
      if (target instanceof Element && target.closest('[data-idle-action]')) {
        return;
      }
      markActive();
    };
    ACTIVITY_EVENTS.forEach((eventName) =>
      window.addEventListener(eventName, onActivity, { passive: true })
    );
    return () =>
      ACTIVITY_EVENTS.forEach((eventName) =>
        window.removeEventListener(eventName, onActivity)
      );
  }, [markActive, session?.token]);

  useEffect(() => {
    if (!session?.token) return undefined;
    endingRef.current = false;
    const interval = window.setInterval(() => {
      const elapsed = Date.now() - lastActivityRef.current;
      if (elapsed >= SESSION_POLICY.idleMs) {
        endSession();
        return;
      }
      if (elapsed >= SESSION_POLICY.idleMs - SESSION_POLICY.warningMs) {
        setWarningOpen(true);
        setSecondsLeft(
          Math.max(0, Math.ceil((SESSION_POLICY.idleMs - elapsed) / 1000))
        );
      }
    }, 1000);
    return () => window.clearInterval(interval);
  }, [endSession, session?.token]);

  if (!session?.token) {
    return null;
  }

  return (
    <Modal
      open={warningOpen}
      onClose={markActive}
      title="Still there?"
      description="You have been inactive for a while."
      footer={
        <>
          <Button variant="secondary" onClick={endSession} data-idle-action>
            Sign out now
          </Button>
          <Button onClick={markActive} icon="check" data-idle-action>
            Stay signed in
          </Button>
        </>
      }
    >
      <div className="space-y-3">
        <InlineNotice tone="warning" title={`Signing out in ${secondsLeft}s`}>
          Move the pointer or press any key to keep your session open.
        </InlineNotice>
        <p className="text-[11px] leading-5 text-muted">
          For security, the console signs you out after {SESSION_POLICY.idleMinutes}{' '}
          minutes without activity. The token is revoked on the server when the
          timeout fires. Remembered sessions keep you signed in between visits,
          but expire after {SESSION_POLICY.rememberAbsoluteDays} days and still
          follow the inactivity rule.
        </p>
      </div>
    </Modal>
  );
}
