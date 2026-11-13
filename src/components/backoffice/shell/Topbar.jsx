'use client';

import Link from 'next/link';
import { Fragment } from 'react';
import { Menu, Popover, Transition } from '@headlessui/react';
import { cn } from '@/lib/cn';
import { environmentLabel } from '@/lib/route-catalog';
import { roleLabel } from '@/components/auth/AuthProvider';
import { useTheme } from '@/components/theme/ThemeProvider';
import { Avatar, Icon } from '@/components/backoffice';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

function NotificationPanel() {
  return (
    <div className="w-[320px] rounded-lg border border-border bg-surface p-4 shadow-overlay">
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-semibold text-ink">Notifications</p>
        <span className="rounded-xs bg-surface-sunken px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-muted">
          Not connected
        </span>
      </div>
      <div className="mt-4 flex flex-col items-center gap-2 rounded-sm border border-dashed border-border px-4 py-5 text-center">
        <Icon name="bell" size={18} className="text-muted-light" />
        <p className="text-xs font-medium text-ink-soft">No notification feed yet</p>
        <p className="text-[11px] leading-5 text-muted">Alerts will appear here when the admin notification API is available.</p>
      </div>
    </div>
  );
}

export function Topbar({
  session,
  role,
  onOpenPalette,
  onOpenSidebar,
  onSignOut,
}) {
  const environment = environmentLabel();
  const name = session?.profile?.name || 'AirliPay member';
  const email = session?.profile?.email || '';
  const { theme } = useTheme();
  const shortcut = '⌘ K';

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface">
      <div className="mx-auto flex h-16 w-full max-w-[1192px] items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-sm text-muted hover:bg-surface-sunken hover:text-ink xl:hidden"
          aria-label="Open navigation"
          onClick={onOpenSidebar}
        >
          <Icon name="menu" size={20} />
        </button>

        <div className="hidden items-center gap-2 lg:flex">
          <span className="inline-flex h-6 items-center gap-1.5 rounded-full border border-border bg-surface-sunken px-2.5 text-[10px] font-semibold text-ink-soft">
            <span className={cn('h-1.5 w-1.5 rounded-full', environment === 'Production' ? 'bg-success' : 'bg-warning')} />
            {environment}
          </span>
          <span className="text-[11px] text-muted">Operations</span>
        </div>

        <button
          type="button"
          onClick={onOpenPalette}
          className="ml-auto flex h-9 max-w-[330px] flex-1 items-center gap-2 rounded-sm border border-border bg-field px-3 text-left text-[12px] text-muted-light transition-colors hover:border-border-strong sm:ml-6 lg:ml-0"
          aria-label="Open command menu"
        >
          <Icon name="search" size={16} />
          <span className="min-w-0 flex-1 truncate">Search operations…</span>
          <span className="hidden rounded-xs border border-border bg-surface-sunken px-1.5 py-0.5 text-[9px] text-muted sm:inline-flex">
            {shortcut}
          </span>
        </button>

        <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
          <ThemeToggle />
          <a
            href="mailto:support@airlipay.cm"
            className="inline-flex h-9 w-9 items-center justify-center rounded-sm text-muted transition-colors hover:bg-surface-sunken hover:text-ink"
            aria-label="Contact support"
            title="Contact support"
          >
            <Icon name="help" size={18} />
          </a>
          <Popover className="relative">
            <Popover.Button
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-sm text-muted transition-colors hover:bg-surface-sunken hover:text-ink"
              aria-label="Notifications"
              title="Notifications"
            >
              <Icon name="bell" size={18} />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-150"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute right-0 z-50 mt-2">
                <NotificationPanel />
              </Popover.Panel>
            </Transition>
          </Popover>
          <span className="mx-1 hidden h-5 w-px bg-border sm:block" />
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center gap-2 rounded-sm p-1 text-left transition-colors hover:bg-surface-sunken">
              <Avatar name={name} size={30} tone="mint" />
              <span className="hidden min-w-0 flex-col sm:flex">
                <span className="max-w-[110px] truncate text-[11px] font-semibold text-ink">{name}</span>
                <span className="text-[10px] text-muted">{roleLabel(role)}</span>
              </span>
              <Icon name="chevronDown" size={13} className="hidden text-muted sm:block" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-150"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Menu.Items className="absolute right-0 z-50 mt-2 w-60 overflow-hidden rounded-lg border border-border bg-surface py-1 shadow-overlay focus:outline-none">
                <div className="border-b border-border px-3 py-2.5">
                  <p className="truncate text-[12px] font-semibold text-ink">{name}</p>
                  {email ? <p className="mt-0.5 truncate text-[10px] text-muted">{email}</p> : null}
                  <p className="mt-1 text-[10px] font-medium text-muted-light">{roleLabel(role)}</p>
                </div>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/dashboard/profile"
                      className={cn('flex items-center gap-2 px-3 py-2 text-[12px]', active ? 'bg-surface-sunken text-ink' : 'text-ink-soft')}
                    >
                      <Icon name="profile" size={15} />
                      My profile
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      onClick={onSignOut}
                      className={cn('flex w-full items-center gap-2 px-3 py-2 text-left text-[12px]', active ? 'bg-error-soft text-error' : 'text-ink-soft')}
                    >
                      <Icon name="logout" size={15} />
                      Sign out
                    </button>
                  )}
                </Menu.Item>
                <div className="mt-1 border-t border-border px-3 py-2 text-[10px] text-muted-light">
                  {theme === 'dark' ? 'Dark theme' : 'Light theme'} · {environment}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </header>
  );
}
