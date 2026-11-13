'use client';

import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, Transition } from '@headlessui/react';
import { cn } from '@/lib/cn';
import { commandItemsForRole } from '@/lib/route-catalog';
import { Icon } from '@/components/backoffice';

export function CommandPalette({ open, onClose, role }) {
  const router = useRouter();
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');
  const [highlight, setHighlight] = useState(0);
  const items = useMemo(() => commandItemsForRole(role), [role]);
  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return items;
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(value) ||
        String(item.detail || '').toLowerCase().includes(value) ||
        item.href.toLowerCase().includes(value)
    );
  }, [items, query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setHighlight(0);
      window.setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [open]);

  useEffect(() => {
    setHighlight(0);
  }, [query]);

  const go = (item) => {
    if (!item) return;
    onClose();
    router.push(item.href);
  };

  const onKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlight((index) => Math.min(filtered.length - 1, index + 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlight((index) => Math.max(0, index - 1));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      go(filtered[highlight]);
    }
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-[90]">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-overlay" aria-hidden="true" />
        </Transition.Child>
        <div className="fixed inset-0 flex items-start justify-center px-4 pt-[12vh]">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-150"
            enterFrom="opacity-0 translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in duration-100"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Dialog.Panel className="w-full max-w-[560px] overflow-hidden rounded-xl border border-border bg-surface shadow-overlay">
              <Dialog.Title className="sr-only">Command menu</Dialog.Title>
              <div className="flex h-12 items-center gap-2 border-b border-border px-4">
                <Icon name="search" size={17} className="text-muted" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Search pages and actions…"
                  className="h-full min-w-0 flex-1 bg-transparent text-[13px] text-ink outline-none placeholder:text-muted-light"
                />
                <span className="rounded-xs border border-border bg-surface-sunken px-1.5 py-0.5 text-[9px] text-muted">ESC</span>
              </div>
              <div className="bo-scroll max-h-[360px] overflow-y-auto p-2">
                {filtered.length ? (
                  filtered.map((item, index) => (
                    <button
                      key={item.key}
                      type="button"
                      onMouseEnter={() => setHighlight(index)}
                      onClick={() => go(item)}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-left transition-colors',
                        index === highlight ? 'bg-surface-sunken' : 'bg-transparent'
                      )}
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xs bg-cobalt-soft text-cobalt-text">
                        <Icon name={item.icon || 'arrowRight'} size={15} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[12px] font-medium text-ink">{item.label}</span>
                        <span className="block truncate text-[10px] text-muted">{item.detail || item.href}</span>
                      </span>
                      <Icon name="arrowRight" size={14} className="text-muted-light" />
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-10 text-center">
                    <p className="text-sm font-medium text-ink">No matches</p>
                    <p className="mt-1 text-xs text-muted">Try another route or action.</p>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3 border-t border-border px-4 py-2 text-[9px] text-muted-light">
                <span>↑↓ Navigate</span>
                <span>↵ Open</span>
                <span className="ml-auto">AirliPay Operations</span>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
