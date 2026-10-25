'use client';

import Link from 'next/link';
import { Fragment, forwardRef, useId } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { cn } from '@/lib/cn';
import { STATUS_LABELS } from '@/lib/capabilities';
import { Icon } from './Icon';
import { Sparkline } from './Charts';

const BUTTON_VARIANTS = {
  primary: 'bg-mint text-on-mint hover:brightness-[0.97] active:brightness-95',
  secondary: 'border border-border bg-surface text-ink hover:bg-surface-raised',
  ghost: 'text-ink-soft hover:bg-surface-sunken',
  danger: 'bg-error-soft text-error hover:brightness-[0.97]',
  inverse: 'bg-white text-navy hover:bg-surface-raised',
  outlineOnDark: 'border border-white/25 text-white hover:bg-white/10',
};

const BUTTON_SIZES = {
  sm: 'h-8 gap-1.5 rounded-sm px-3 text-xs',
  md: 'h-[38px] gap-2 rounded-sm px-3.5 text-[13px]',
  lg: 'h-11 gap-2 rounded-sm px-5 text-sm',
};

export function buttonClass({ variant = 'primary', size = 'md', fullWidth = false, className = '' } = {}) {
  return cn(
    'inline-flex shrink-0 items-center justify-center font-semibold transition-colors duration-150 disabled:pointer-events-none disabled:opacity-40',
    BUTTON_VARIANTS[variant] || BUTTON_VARIANTS.primary,
    BUTTON_SIZES[size] || BUTTON_SIZES.md,
    fullWidth && 'w-full',
    className
  );
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  trailingIcon,
  loading = false,
  fullWidth = false,
  className = '',
  href,
  type = 'button',
  ...props
}) {
  const content = (
    <>
      {loading ? (
        <Icon name="refresh" size={size === 'sm' ? 14 : 16} className="animate-spin" />
      ) : icon ? (
        <Icon name={icon} size={size === 'sm' ? 14 : 16} />
      ) : null}
      <span>{children}</span>
      {trailingIcon ? <Icon name={trailingIcon} size={size === 'sm' ? 14 : 15} /> : null}
    </>
  );
  const classes = buttonClass({ variant, size, fullWidth, className });
  if (href && !props.disabled) {
    return (
      <Link href={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }
  return (
    <button type={type} className={classes} {...props} disabled={props.disabled || loading}>
      {content}
    </button>
  );
}

export function IconButton({
  icon,
  label,
  variant = 'ghost',
  size = 34,
  iconSize,
  className = '',
  ...props
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-sm transition-colors duration-150 disabled:opacity-40',
        variant === 'secondary'
          ? 'border border-border bg-surface text-ink-soft hover:bg-surface-raised'
          : 'text-muted hover:bg-surface-sunken hover:text-ink',
        className
      )}
      style={{ width: size, height: size }}
      {...props}
    >
      <Icon name={icon} size={iconSize || Math.round(size * 0.52)} />
    </button>
  );
}

export function Avatar({ name = '', initials, size = 36, tone = 'brand', className = '' }) {
  const label =
    initials ||
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('') ||
    '—';
  const tones = {
    brand: 'bg-cobalt-soft text-cobalt-text',
    mint: 'bg-mint-soft text-on-mint-soft',
    neutral: 'bg-surface-sunken text-muted',
    warning: 'bg-warning-soft text-warning',
    error: 'bg-error-soft text-error',
    success: 'bg-success-soft text-success',
  };
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full font-semibold',
        tones[tone] || tones.brand,
        className
      )}
      style={{ width: size, height: size, fontSize: Math.max(10, Math.round(size * 0.33)) }}
      aria-hidden="true"
    >
      {label}
    </span>
  );
}

const STATUS_TONES = {
  success: { pill: 'bg-success-soft text-success', dot: 'bg-success' },
  warning: { pill: 'bg-warning-soft text-warning', dot: 'bg-warning' },
  error: { pill: 'bg-error-soft text-error', dot: 'bg-error' },
  info: { pill: 'bg-info-soft text-info', dot: 'bg-info' },
  neutral: { pill: 'bg-surface-sunken text-muted', dot: 'bg-muted-light' },
  mint: { pill: 'bg-mint-soft text-on-mint-soft', dot: 'bg-mint' },
};

export function statusTone(status) {
  const value = String(status || '').toUpperCase();
  if (['ACTIVE', 'SUCCESS', 'TREATED', 'SETTLED', 'VERIFIED', 'FUNDED', 'COMPLETE'].includes(value)) {
    return 'success';
  }
  if (['PENDING', 'PENDING_CONFIRMATION', 'SCHEDULED', 'PROCESSING', 'AWAITING', 'REVIEWED'].includes(value)) {
    return 'warning';
  }
  if (['FAILED', 'BLOCKED', 'BANNED', 'NOT_TREATED', 'NEEDS_ATTENTION', 'AT_RISK', 'CANCELLED'].includes(value)) {
    return 'error';
  }
  return 'neutral';
}

export function statusLabel(status) {
  const value = String(status || '').toUpperCase();
  const labels = {
    ACTIVE: 'Active',
    PENDING: 'Pending',
    PENDING_CONFIRMATION: 'Pending',
    DEACTIVATED: 'Deactivated',
    BLOCKED: 'Blocked',
    BANNED: 'Banned',
    SUCCESS: 'Success',
    FAILED: 'Failed',
    TREATED: 'Treated',
    NOT_TREATED: 'Not treated',
    SETTLED: 'Settled',
    SCHEDULED: 'Scheduled',
    PROCESSING: 'Processing',
    NEEDS_ATTENTION: 'Needs attention',
    FUNDED: 'Funded',
    AWAITING: 'Awaiting',
    AT_RISK: 'At risk',
    VERIFIED: 'Verified',
    CANCELLED: 'Cancelled',
    REVIEWED: 'Reviewed',
  };
  return labels[value] || value.replaceAll('_', ' ').toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
}

export function StatusPill({ status, label, tone, dot = true, size = 'md', className = '' }) {
  const resolvedTone = tone || statusTone(status);
  const styles = STATUS_TONES[resolvedTone] || STATUS_TONES.neutral;
  return (
    <span
      className={cn(
        'inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full font-semibold',
        size === 'sm' ? 'h-5 px-2 text-[10px]' : 'h-6 px-2.5 text-[11px]',
        styles.pill,
        className
      )}
    >
      {dot ? <span className={cn('h-1.5 w-1.5 shrink-0 rounded-full', styles.dot)} aria-hidden="true" /> : null}
      {label || statusLabel(status)}
    </span>
  );
}

export function Tag({ children, tone = 'neutral', icon, className = '' }) {
  const styles = STATUS_TONES[tone] || STATUS_TONES.neutral;
  return (
    <span
      className={cn(
        'inline-flex h-6 shrink-0 items-center gap-1.5 rounded-xs px-2 text-[10px] font-semibold',
        styles.pill,
        className
      )}
    >
      {icon ? <Icon name={icon} size={12} /> : null}
      {children}
    </span>
  );
}

export function CountBadge({ children, tone = 'neutral' }) {
  const styles = STATUS_TONES[tone] || STATUS_TONES.neutral;
  return (
    <span className={cn('inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-semibold', styles.pill)}>
      {children}
    </span>
  );
}

export function Kbd({ children = '⌘ K' }) {
  return (
    <kbd className="inline-flex h-5 items-center rounded-xs border border-border bg-surface-sunken px-1.5 text-[10px] font-medium text-muted">
      {children}
    </kbd>
  );
}

export function Card({ children, className = '', as: Component = 'div', ...props }) {
  return (
    <Component className={cn('rounded-lg border border-border bg-surface', className)} {...props}>
      {children}
    </Component>
  );
}

export function SectionHeading({ title, description, action, icon, className = '' }) {
  return (
    <div className={cn('flex flex-wrap items-center justify-between gap-3', className)}>
      <div className="flex min-w-0 items-center gap-2">
        {icon ? <Icon name={icon} size={16} className="shrink-0 text-muted" /> : null}
        <h2 className="truncate text-[15px] font-semibold text-ink">{title}</h2>
        {description ? <span className="truncate text-xs text-muted">{description}</span> : null}
      </div>
      {action}
    </div>
  );
}

export function Breadcrumbs({ items = [] }) {
  if (!items.length) return null;
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5">
      {items.map((item, index) => {
        const last = index === items.length - 1;
        return (
          <span key={`${item.label}-${index}`} className="flex items-center gap-1.5">
            {item.href && !last ? (
              <Link href={item.href} className="text-xs text-muted-light transition-colors hover:text-ink">
                {item.label}
              </Link>
            ) : (
              <span className={cn('text-xs', last ? 'font-medium text-ink-soft' : 'text-muted-light')}>
                {item.label}
              </span>
            )}
            {!last ? <Icon name="chevronRight" size={12} className="text-muted-light" /> : null}
          </span>
        );
      })}
    </nav>
  );
}

export function Tabs({ items = [], className = '' }) {
  return (
    <div className={cn('bo-scroll -mb-px flex items-center gap-6 overflow-x-auto border-b border-border', className)}>
      {items.map((item) => {
        const content = (
          <span className="flex h-10 shrink-0 items-center gap-1.5 text-[13px]">
            <span className={item.active ? 'font-semibold text-ink' : 'font-medium text-muted'}>{item.label}</span>
            {item.count !== undefined ? <CountBadge tone={item.active ? 'brand' : 'neutral'}>{item.count}</CountBadge> : null}
          </span>
        );
        const classes = cn(
          '-mb-px flex h-10 shrink-0 items-center border-b-2 transition-colors',
          item.active ? 'border-mint' : 'border-transparent hover:border-border'
        );
        return item.href ? (
          <Link key={item.key || item.label} href={item.href} className={classes} aria-current={item.active ? 'page' : undefined}>
            {content}
          </Link>
        ) : (
          <button
            key={item.key || item.label}
            type="button"
            onClick={item.onClick}
            className={classes}
            aria-current={item.active ? 'page' : undefined}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
}

export function PageHeader({
  breadcrumbs = [],
  title,
  description,
  actions,
  badge,
  meta,
  tabs,
  children,
  className = '',
}) {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <h1 className="text-[26px] font-bold leading-tight tracking-[-0.03em] text-ink sm:text-[28px]">{title}</h1>
          {badge}
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
      </div>
      {description ? <p className="-mt-1 max-w-3xl text-sm leading-5 text-muted">{description}</p> : null}
      {meta ? <div className="flex flex-wrap items-center gap-2">{meta}</div> : null}
      {tabs?.length ? <Tabs items={tabs} className="mt-1" /> : null}
      {children}
    </div>
  );
}

export function ProgressBar({ value = 0, tone = 'mint', height = 6, className = '', label }) {
  const pct = Math.max(0, Math.min(100, Number(value) || 0));
  const fills = {
    mint: 'bg-mint',
    cobalt: 'bg-cobalt',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
  };
  return (
    <div
      className={cn('w-full overflow-hidden rounded-full bg-surface-sunken', className)}
      style={{ height }}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label || undefined}
    >
      <div className={cn('h-full rounded-full transition-[width] duration-300', fills[tone] || fills.mint)} style={{ width: `${pct}%` }} />
    </div>
  );
}

export function KpiCard({ label, value, icon, hint, delta, deltaTone = 'success', series, seriesColor, footer }) {
  return (
    <Card className="flex min-h-[124px] flex-col justify-between gap-3 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-1.5 text-xs text-muted">
          {icon ? <Icon name={icon} size={15} /> : null}
          <span className="truncate">{label}</span>
        </div>
        {series?.length ? <Sparkline data={series} color={seriesColor} width={70} height={26} /> : null}
      </div>
      <div className="flex items-end justify-between gap-2">
        <p className="bo-numeric text-[25px] font-bold leading-8 tracking-[-0.03em] text-ink">{value}</p>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        {delta ? (
          <Tag tone={deltaTone} icon={deltaTone === 'error' ? 'trendDown' : 'trendUp'}>
            {delta}
          </Tag>
        ) : null}
        {hint ? <span className="text-[11px] text-muted-light">{hint}</span> : null}
        {footer}
      </div>
    </Card>
  );
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Search…',
  className = '',
  id,
  shortcut,
  onKeyDown,
  ...props
}) {
  return (
    <div className={cn('relative flex h-[38px] items-center rounded-sm border border-border bg-field px-3 focus-within:border-cobalt', className)}>
      <Icon name="search" size={16} className="mr-2 shrink-0 text-muted-light" />
      <input
        id={id}
        type="search"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="h-full min-w-0 flex-1 bg-transparent text-[13px] text-ink outline-none placeholder:text-muted-light [&::-webkit-search-cancel-button]:hidden"
        {...props}
      />
      {shortcut ? <Kbd>{shortcut}</Kbd> : null}
    </div>
  );
}

export function SelectControl({
  value,
  onChange,
  options = [],
  placeholder,
  icon,
  className = '',
  label,
  name,
  id,
  ...props
}) {
  return (
    <div className={cn('relative flex h-[38px] items-center rounded-sm border border-border bg-surface pl-3 pr-8 text-[13px]', className)}>
      {icon ? <Icon name={icon} size={15} className="mr-2 shrink-0 text-muted" /> : null}
      <select
        id={id}
        name={name}
        aria-label={label}
        value={value}
        onChange={onChange}
        className="h-full min-w-0 flex-1 appearance-none bg-transparent text-[13px] text-ink-soft outline-none"
        {...props}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Icon name="chevronDown" size={14} className="pointer-events-none absolute right-3 text-muted" />
    </div>
  );
}

export function SegmentedControl({ items = [], value, onChange, className = '', ariaLabel }) {
  return (
    <div
      className={cn('inline-flex h-[34px] items-center gap-0.5 rounded-sm border border-border bg-surface-sunken p-[3px]', className)}
      role="group"
      aria-label={ariaLabel}
    >
      {items.map((item) => {
        const itemValue = typeof item === 'string' ? item : item.value;
        const label = typeof item === 'string' ? item : item.label;
        const active = value === itemValue;
        return (
          <button
            key={itemValue}
            type="button"
            onClick={() => onChange?.(itemValue)}
            className={cn(
              'inline-flex h-[26px] items-center justify-center rounded-[5px] px-2.5 text-[11px] font-medium transition',
              active ? 'bg-surface font-semibold text-ink shadow-sm' : 'text-muted hover:text-ink'
            )}
            aria-pressed={active}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export function Field({ label, htmlFor, required, error, hint, children, className = '' }) {
  return (
    <div className={cn('flex min-w-0 flex-col gap-1.5', className)}>
      {label ? (
        <label htmlFor={htmlFor} className="flex items-center gap-0.5 text-[12px] font-medium text-ink-soft">
          {label}
          {required ? <span className="text-error">*</span> : null}
        </label>
      ) : null}
      {children}
      {error ? (
        <p className="text-[11px] font-medium text-error" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="text-[11px] leading-4 text-muted">{hint}</p>
      ) : null}
    </div>
  );
}

const inputBase =
  'flex h-[40px] w-full items-center rounded-sm border bg-field text-[13px] text-ink transition-colors placeholder:text-muted-light focus:border-cobalt focus:outline-none disabled:cursor-not-allowed disabled:bg-surface-sunken disabled:text-muted';

export const TextInput = forwardRef(function TextInput(
  { icon, error, className = '', id, ...props },
  ref
) {
  if (icon) {
    return (
      <div className={cn('relative flex items-center', className)}>
        <Icon name={icon} size={16} className="pointer-events-none absolute left-3 text-muted" />
        <input
          ref={ref}
          id={id}
          className={cn(inputBase, 'pl-9 pr-3', error ? 'border-error' : 'border-border')}
          {...props}
        />
      </div>
    );
  }
  return (
    <input
      ref={ref}
      id={id}
      className={cn(inputBase, 'px-3', error ? 'border-error' : 'border-border', className)}
      {...props}
    />
  );
});

export function SelectField({ options = [], placeholder, error, className = '', id, ...props }) {
  return (
    <div className={cn('relative flex items-center', className)}>
      <select
        id={id}
        className={cn(inputBase, 'appearance-none px-3 pr-8', error ? 'border-error' : 'border-border')}
        {...props}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Icon name="chevronDown" size={15} className="pointer-events-none absolute right-3 text-muted" />
    </div>
  );
}

export function TextArea({ error, className = '', ...props }) {
  return (
    <textarea
      className={cn(
        'min-h-[88px] w-full resize-y rounded-sm border bg-field px-3 py-2.5 text-[13px] text-ink placeholder:text-muted-light focus:border-cobalt focus:outline-none',
        error ? 'border-error' : 'border-border',
        className
      )}
      {...props}
    />
  );
}

export function Checkbox({ label, className = '', id, ...props }) {
  const autoId = useId();
  const inputId = id || autoId;
  return (
    <label htmlFor={inputId} className={cn('inline-flex cursor-pointer items-center gap-2 text-[13px] text-ink-soft', className)}>
      <input
        id={inputId}
        type="checkbox"
        className="h-4 w-4 rounded-[3px] border-border text-cobalt accent-[var(--cobalt)]"
        {...props}
      />
      {label}
    </label>
  );
}

export function Switch({ checked, onChange, label, className = '', disabled = false }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={cn(
        'inline-flex h-5 w-9 shrink-0 items-center rounded-full p-[3px] transition-colors disabled:opacity-50',
        checked ? 'bg-cobalt' : 'bg-border-strong',
        className
      )}
    >
      <span
        className={cn(
          'block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform',
          checked ? 'translate-x-4' : 'translate-x-0'
        )}
      />
    </button>
  );
}

const NOTICE_TONES = {
  info: 'border-info bg-info-soft text-info',
  warning: 'border-warning bg-warning-soft text-warning',
  error: 'border-error bg-error-soft text-error',
  success: 'border-success bg-success-soft text-success',
  neutral: 'border-border bg-surface-sunken text-muted',
};

export function InlineNotice({ tone = 'info', title, children, icon, action, className = '' }) {
  const classes = NOTICE_TONES[tone] || NOTICE_TONES.info;
  return (
    <div className={cn('flex flex-wrap items-start gap-2.5 rounded-sm border px-3.5 py-3', classes, className)} role={tone === 'error' ? 'alert' : 'note'}>
      <Icon name={icon || (tone === 'error' ? 'alert' : tone === 'warning' ? 'clock' : 'info')} size={16} className="mt-0.5 shrink-0" />
      <div className="min-w-0 flex-1">
        {title ? <p className="text-[12px] font-semibold leading-5">{title}</p> : null}
        {children ? <div className="text-[11px] leading-5 opacity-90">{children}</div> : null}
      </div>
      {action}
    </div>
  );
}

const CAP_TONES = {
  fixture: 'warning',
  'legacy-fixture': 'neutral',
  concept: 'neutral',
  proposed: 'info',
  'ui-gap': 'warning',
  missing: 'warning',
};

export function SupportNotice({ capability, className = '', actions }) {
  if (!capability) return null;
  return (
    <InlineNotice
      tone={CAP_TONES[capability.status] || 'warning'}
      icon={capability.status === 'concept' ? 'sparkle' : capability.status === 'proposed' ? 'info' : 'alert'}
      title={capability.title || STATUS_LABELS[capability.status]}
      action={
        actions ? (
          <div className="flex flex-wrap items-center gap-2">
            <Tag tone={CAP_TONES[capability.status] || 'neutral'}>{STATUS_LABELS[capability.status] || capability.status}</Tag>
            {actions}
          </div>
        ) : (
          <Tag tone={CAP_TONES[capability.status] || 'neutral'}>{STATUS_LABELS[capability.status] || capability.status}</Tag>
        )
      }
      className={className}
    >
      {capability.description}
    </InlineNotice>
  );
}

export function EmptyState({ icon = 'search', title, description, action, className = '' }) {
  return (
    <div className={cn('flex min-h-[260px] flex-col items-center justify-center gap-3 px-6 py-10 text-center', className)}>
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-sm bg-cobalt-soft text-cobalt-text">
        <Icon name={icon} size={20} />
      </span>
      <div>
        <p className="text-[15px] font-semibold text-ink">{title}</p>
        {description ? <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-muted">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function ErrorState({ title = 'Something went wrong', error, action, className = '' }) {
  return (
    <EmptyState
      icon="alert"
      title={title}
      description={error?.message || 'The API request failed. Try again in a moment.'}
      action={action}
      className={className}
    />
  );
}

export function PageLoading({ rows = 4 }) {
  return (
    <div className="flex flex-col gap-4" aria-label="Loading page" aria-busy="true">
      <div className="h-8 w-56 rounded-sm bo-skeleton" />
      <div className="h-4 w-96 max-w-full rounded-sm bo-skeleton" />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-28 rounded-lg border border-border bg-surface p-4">
            <div className="h-3 w-24 rounded-sm bo-skeleton" />
            <div className="mt-5 h-7 w-32 rounded-sm bo-skeleton" />
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-border bg-surface p-4">
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="flex items-center gap-4 border-b border-border py-3 last:border-0">
            <div className="h-8 w-8 rounded-full bo-skeleton" />
            <div className="h-3 w-36 rounded-sm bo-skeleton" />
            <div className="ml-auto h-3 w-24 rounded-sm bo-skeleton" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function KeyValue({ label, value, className = '', valueClassName = '' }) {
  return (
    <div className={cn('flex items-baseline justify-between gap-3 py-1', className)}>
      <span className="shrink-0 text-[12px] text-muted">{label}</span>
      <span className={cn('min-w-0 text-right text-[12px] font-medium text-ink', valueClassName)}>{value}</span>
    </div>
  );
}

export function Divider({ className = '' }) {
  return <div className={cn('h-px w-full bg-border', className)} />;
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
}) {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };
  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-[80]">
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
        <div className="fixed inset-0 flex items-center justify-center overflow-y-auto p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Dialog.Panel className={cn('bo-fade-in w-full overflow-hidden rounded-xl border border-border bg-surface shadow-overlay', sizes[size] || sizes.md)}>
              <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
                <div>
                  <Dialog.Title className="text-base font-semibold text-ink">{title}</Dialog.Title>
                  {description ? (
                    <Dialog.Description className="mt-1 text-xs leading-5 text-muted">{description}</Dialog.Description>
                  ) : null}
                </div>
                <IconButton icon="close" label="Close dialog" onClick={onClose} />
              </div>
              <div className="max-h-[70vh] overflow-y-auto px-5 py-4 bo-scroll">{children}</div>
              {footer ? <div className="flex flex-wrap justify-end gap-2 border-t border-border px-5 py-3">{footer}</div> : null}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export function Pagination({ page = 1, pages = 1, onPageChange, label, className = '' }) {
  return (
    <div className={cn('flex flex-wrap items-center justify-between gap-2', className)}>
      <p className="text-[11px] text-muted">{label}</p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange?.(Math.max(1, page - 1))}
          disabled={page <= 1}
          className="inline-flex h-7 items-center gap-1 rounded-sm border border-border bg-surface px-2 text-[11px] font-medium text-ink-soft disabled:opacity-40"
        >
          <Icon name="chevronLeft" size={12} />
          Previous
        </button>
        <span className="min-w-12 text-center text-[11px] text-muted">
          {page} / {Math.max(1, pages)}
        </span>
        <button
          type="button"
          onClick={() => onPageChange?.(Math.min(pages, page + 1))}
          disabled={page >= pages}
          className="inline-flex h-7 items-center gap-1 rounded-sm border border-border bg-surface px-2 text-[11px] font-medium text-ink-soft disabled:opacity-40"
        >
          Next
          <Icon name="chevronRight" size={12} />
        </button>
      </div>
    </div>
  );
}
