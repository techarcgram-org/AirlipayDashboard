'use client';

import Link from 'next/link';
import { cn } from '@/lib/cn';
import { activeNavKey, navGroupsForRole } from '@/lib/route-catalog';
import { roleLabel } from '@/components/auth/AuthProvider';
import { Avatar, Icon } from '@/components/backoffice';

function SidebarItem({ item, active, onNavigate }) {
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        'group flex h-9 items-center gap-2.5 rounded-sm px-2.5 text-[13px] transition-colors',
        active
          ? 'bg-nav-active font-semibold text-sidebar-text'
          : 'font-medium text-sidebar-muted hover:bg-white/5 hover:text-sidebar-text'
      )}
      aria-current={active ? 'page' : undefined}
    >
      <Icon name={item.icon} size={17} className={active ? 'text-nav-active-text' : 'text-sidebar-faint group-hover:text-sidebar-muted'} />
      <span className="min-w-0 flex-1 truncate">{item.label}</span>
    </Link>
  );
}

export function Sidebar({ pathname, role, session, onNavigate, onClose }) {
  const groups = navGroupsForRole(role);
  const active = activeNavKey(pathname);
  const name = session?.profile?.name || 'AirliPay member';
  const displayRole = roleLabel(role);

  return (
    <div className="flex h-full min-h-0 flex-col bg-sidebar px-4 pb-4 pt-4 text-sidebar-text">
      <div className="flex h-10 items-center gap-2.5 px-1">
        <BrandWordmark />
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="ml-auto inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-sm text-sidebar-muted transition-colors hover:bg-white/10 hover:text-sidebar-text"
            aria-label="Close navigation"
          >
            <Icon name="close" size={17} />
          </button>
        ) : (
          <span className="ml-auto rounded-xs px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-sidebar-faint">
            Ops
          </span>
        )}
      </div>

      <div className="mt-3 flex items-center gap-2.5 rounded-sm border border-sidebar-border bg-sidebar-card px-2.5 py-2.5">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xs bg-mint text-[13px] font-extrabold text-on-mint">
          A
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[12px] font-semibold text-sidebar-text">AirliPay HQ</p>
          <p className="truncate text-[10px] text-sidebar-faint">Operations workspace</p>
        </div>
      </div>

      <nav className="bo-scroll mt-5 min-h-0 flex-1 space-y-5 overflow-y-auto pr-0.5" aria-label="Primary navigation">
        {groups.map((group) => (
          <div key={group.key}>
            <p className="mb-1.5 px-2.5 text-[9px] font-semibold uppercase tracking-[0.13em] text-sidebar-faint">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <SidebarItem key={item.key} item={item} active={item.key === active} onNavigate={onNavigate} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="mt-4 space-y-2">
        <a
          href="mailto:support@airlipay.cm"
          className="flex h-9 items-center gap-2.5 rounded-sm border border-sidebar-border px-2.5 text-[11px] text-sidebar-muted transition-colors hover:bg-white/5 hover:text-sidebar-text"
        >
          <Icon name="help" size={15} className="text-sidebar-faint" />
          <span className="flex-1">Help & support</span>
          <Icon name="external" size={12} className="text-sidebar-faint" />
        </a>
        <div className="flex items-center gap-2 px-2.5 text-[10px] text-sidebar-faint">
          <span className="h-1.5 w-1.5 rounded-full bg-mint" aria-hidden="true" />
          <span>Console access</span>
          <span className="ml-auto">{roleLabel(role) || 'Member'}</span>
        </div>
        <Link
          href="/dashboard/profile"
          onClick={onNavigate}
          className="flex items-center gap-2.5 rounded-sm bg-sidebar-card px-2.5 py-2 transition-colors hover:bg-sidebar-border"
        >
          <Avatar name={name} size={30} tone="mint" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-semibold text-sidebar-text">{name}</p>
            <p className="truncate text-[10px] text-sidebar-faint">{displayRole}</p>
          </div>
          <Icon name="more" size={15} className="text-sidebar-muted" />
        </Link>
      </div>
    </div>
  );
}

export function BrandWordmark({ compact = false, color = 'text-sidebar-text' }) {
  return (
    <span className={cn('inline-flex items-center gap-2', color)}>
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mint">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path d="M4.5 20.5c5.4-8.7 12.8-10.2 23-5.4" stroke="#0A2540" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="7.2" cy="18.7" r="2.1" fill="#245BFF" />
          <circle cx="25.8" cy="14.6" r="1.7" fill="#0A2540" />
        </svg>
      </span>
      {!compact ? <span className="text-[20px] font-extrabold tracking-[-0.04em]">AirliPay</span> : null}
    </span>
  );
}
