export const ACCOUNT_STATUSES = ['ACTIVE', 'PENDING', 'DEACTIVATED', 'BLOCKED', 'BANNED'];

export const STATUS_LABELS = {
  ACTIVE: 'Active',
  PENDING: 'Pending',
  DEACTIVATED: 'Deactivated',
  BLOCKED: 'Blocked',
  BANNED: 'Banned',
};

// Mirrors the API transition table in
// AirliPayApi/src/common/utils/status-transitions.ts.
export const EMPLOYEE_STATUS_TRANSITIONS = {
  ACTIVE: ['PENDING', 'DEACTIVATED', 'BLOCKED', 'BANNED'],
  PENDING: ['ACTIVE', 'DEACTIVATED', 'BLOCKED', 'BANNED'],
  DEACTIVATED: ['ACTIVE', 'PENDING', 'BANNED'],
  BLOCKED: ['ACTIVE', 'DEACTIVATED', 'BANNED'],
  BANNED: ['ACTIVE'],
};

const CLIENT_MANAGED_STATUSES = ['ACTIVE', 'PENDING', 'DEACTIVATED', 'BLOCKED'];

export function employeeStatusOptions(currentStatus, actorIsAdmin) {
  const current = String(currentStatus || '').toUpperCase();
  const allowed = EMPLOYEE_STATUS_TRANSITIONS[current] || [];
  return allowed
    .filter((status) => actorIsAdmin || CLIENT_MANAGED_STATUSES.includes(status))
    .map((status) => ({ value: status, label: STATUS_LABELS[status] || status }));
}

export const ADMIN_STATUS_OPTIONS = ['ACTIVE', 'PENDING', 'DEACTIVATED', 'BLOCKED'].map(
  (status) => ({ value: status, label: STATUS_LABELS[status] || status })
);

export const INVOICE_STATUS_OPTIONS = [
  { value: 'NOT_TREATED', label: 'Not treated' },
  { value: 'PENDING_CONFIRMATION', label: 'Pending confirmation' },
  { value: 'TREATED', label: 'Treated' },
];

export function invoiceStatusLabel(status) {
  return (
    INVOICE_STATUS_OPTIONS.find((option) => option.value === String(status || '').toUpperCase())
      ?.label || status || '—'
  );
}
