export const ROLES = {
  ADMIN: 'ADMIN',
  CLIENT: 'CLIENT',
  USER: 'USER',
};

export function normalizeRole(role) {
  return String(role || '').toUpperCase();
}

export function isAdmin(role) {
  return normalizeRole(role) === ROLES.ADMIN;
}

export function isClient(role) {
  return normalizeRole(role) === ROLES.CLIENT;
}

export function isUser(role) {
  return normalizeRole(role) === ROLES.USER;
}

export function canManageClients(role) {
  return isAdmin(role);
}

export function canManageTeam(role) {
  return isAdmin(role);
}

export function canViewPayments(role) {
  return isAdmin(role);
}

export function sameId(left, right) {
  if (left === undefined || left === null || right === undefined || right === null) {
    return false;
  }
  return String(left) === String(right);
}

export function scopeUsers(users, role, userId) {
  if (!Array.isArray(users)) return [];
  if (isClient(role)) {
    return users.filter((user) => sameId(user?.client_id, userId));
  }
  return users;
}

export function buildUserMap(users) {
  const map = new Map();
  (Array.isArray(users) ? users : []).forEach((user) => {
    if (user?.id !== undefined) {
      map.set(String(user.id), user);
    }
  });
  return map;
}

export function scopeTransactions(transactions, role, userId, userMap) {
  if (!Array.isArray(transactions)) return [];
  if (!isClient(role)) {
    return transactions;
  }
  return transactions.filter((transaction) => {
    const user = userMap?.get(String(transaction?.user_id));
    return sameId(user?.client_id, userId);
  });
}

export function scopeInvoices(invoices, role, userId) {
  if (!Array.isArray(invoices)) return [];
  if (isClient(role)) {
    return invoices.filter((invoice) => sameId(invoice?.client_id, userId));
  }
  return invoices;
}

export function canEditEmployee(role) {
  return isAdmin(role) || isClient(role);
}

export function canEditClient(role) {
  return isAdmin(role);
}

export function canEditAdmin(role) {
  return isAdmin(role);
}
