'use client';

import { Fragment, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Dialog, Transition } from '@headlessui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/components/auth/AuthProvider';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { BrandMark } from '@/components/backoffice';
import { routeTitle } from '@/lib/route-catalog';
import { Sidebar, BrandWordmark } from './Sidebar';
import { Topbar } from './Topbar';
import { CommandPalette } from './CommandPalette';

function ConsoleBoot() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas">
      <div className="flex flex-col items-center gap-3">
        <BrandMark size={36} />
        <p className="text-xs font-medium text-muted">Opening operations console…</p>
      </div>
    </div>
  );
}

export function AppShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { session, ready, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    if (ready && !session?.token) {
      router.replace('/login');
    }
  }, [ready, router, session?.token]);

  useEffect(() => {
    if (!ready || !session?.token) return;
    document.title = `${routeTitle(pathname)} · AirliPay Operations`;
  }, [pathname, ready, session?.token]);

  useEffect(() => {
    setSidebarOpen(false);
    setPaletteOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event) => {
      const modifier = event.metaKey || event.ctrlKey;
      if (modifier && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  if (!ready) {
    return <ConsoleBoot />;
  }

  if (!session?.token) {
    return <ConsoleBoot />;
  }

  const handleSignOut = () => {
    signOut();
    queryClient.clear();
    router.replace('/login');
  };

  return (
    <div className="min-h-screen bg-canvas">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-sm focus:bg-mint focus:px-3 focus:py-2 focus:text-xs focus:font-semibold focus:text-on-mint"
      >
        Skip to content
      </a>

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[248px] xl:block">
        <Sidebar pathname={pathname} role={session.role} session={session} />
      </aside>

      <Transition show={sidebarOpen} as={Fragment}>
        <Dialog onClose={() => setSidebarOpen(false)} className="relative z-[80] xl:hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-overlay" aria-hidden="true" />
          </Transition.Child>
          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="ease-in duration-150"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-[272px] max-w-[82vw] flex-col shadow-overlay">
                <Dialog.Title className="sr-only">Navigation</Dialog.Title>
                <Sidebar
                  pathname={pathname}
                  role={session.role}
                  session={session}
                  onNavigate={() => setSidebarOpen(false)}
                  onClose={() => setSidebarOpen(false)}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <div className="min-h-screen xl:pl-[248px]">
        <Topbar
          session={session}
          role={session.role}
          onOpenPalette={() => setPaletteOpen(true)}
          onOpenSidebar={() => setSidebarOpen(true)}
          onSignOut={handleSignOut}
        />
        <main id="main-content" className="mx-auto w-full max-w-[1192px] px-4 pb-10 pt-5 sm:px-6 lg:px-8 xl:pt-6">
          <div className="bo-fade-in">{children}</div>
        </main>
      </div>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} role={session.role} />
    </div>
  );
}
