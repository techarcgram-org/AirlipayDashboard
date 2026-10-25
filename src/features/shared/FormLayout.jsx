'use client';

import Link from 'next/link';
import { Card, InlineNotice } from '@/components/backoffice';

export function FormSection({ title, description, children, action, first = false }) {
  return (
    <div className={`px-5 py-5 ${first ? '' : 'border-t border-border'}`}>
      {title ? (
        <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
          <div>
            <h2 className="text-[14px] font-semibold text-ink">{title}</h2>
            {description ? <p className="mt-0.5 text-[11px] leading-5 text-muted">{description}</p> : null}
          </div>
          {action}
        </div>
      ) : null}
      {children}
    </div>
  );
}

export function FormGrid({ children, columns = 2 }) {
  return (
    <div className={columns === 3 ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3' : 'grid grid-cols-1 gap-4 sm:grid-cols-2'}>
      {children}
    </div>
  );
}

export function FormActions({ children, note }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-surface-raised px-5 py-4">
      <p className="max-w-md text-[11px] leading-5 text-muted">{note}</p>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}

export function FormCard({ children }) {
  return <Card className="overflow-hidden">{children}</Card>;
}

export function FormError({ error }) {
  if (!error) return null;
  const message =
    error?.response?.data?.message ||
    error?.message ||
    'The request could not be completed. Check the details and try again.';
  return (
    <InlineNotice tone="error" title="Could not save" className="mb-4">
      {Array.isArray(message) ? message.join(' ') : message}
    </InlineNotice>
  );
}

export function CancelLink({ href, children = 'Cancel' }) {
  return (
    <Link
      href={href}
      className="inline-flex h-[38px] items-center justify-center rounded-sm border border-border bg-surface px-3.5 text-[13px] font-semibold text-ink transition-colors hover:bg-surface-raised"
    >
      {children}
    </Link>
  );
}

