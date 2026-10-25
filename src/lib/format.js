const moneyFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat('en-US');

export function isNil(value) {
  return value === null || value === undefined || value === '';
}

export function formatNumber(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return '—';
  return numberFormatter.format(number);
}

export function formatMoney(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return '—';
  return `XAF ${moneyFormatter.format(number)}`;
}

export function formatCompactMoney(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return '—';
  if (Math.abs(number) >= 1_000_000_000) {
    return `XAF ${(number / 1_000_000_000).toFixed(2)}B`;
  }
  if (Math.abs(number) >= 1_000_000) {
    return `XAF ${(number / 1_000_000).toFixed(2)}M`;
  }
  if (Math.abs(number) >= 1_000) {
    return `XAF ${Math.round(number / 1_000)}K`;
  }
  return formatMoney(number);
}

function parseDate(value) {
  if (isNil(value)) return null;
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  if (typeof value === 'string') {
    const ddmmyyyy = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    if (ddmmyyyy) {
      const [, day, month, year] = ddmmyyyy;
      const date = new Date(Number(year), Number(month) - 1, Number(day));
      return Number.isNaN(date.getTime()) ? null : date;
    }
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatDate(value) {
  const date = parseDate(value);
  if (!date) return '—';
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function formatShortDate(value) {
  const date = parseDate(value);
  if (!date) return '—';
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
  }).format(date);
}

export function formatDateTime(value) {
  const date = parseDate(value);
  if (!date) return '—';
  const datePart = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
  const timePart = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
  return `${datePart} · ${timePart}`;
}

export function formatTime(value) {
  const date = parseDate(value);
  if (!date) return '—';
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}

export function toInputDate(value) {
  const date = parseDate(value);
  if (!date) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function toApiDate(value) {
  if (!value) return '';
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) return value;
  const date = parseDate(value);
  if (!date) return '';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}/${date.getFullYear()}`;
}

export function initials(name, fallback = '—') {
  const value = String(name || '').trim();
  if (!value) return fallback;
  return value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export function isoDayKey(value) {
  const date = parseDate(value);
  if (!date) return null;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
