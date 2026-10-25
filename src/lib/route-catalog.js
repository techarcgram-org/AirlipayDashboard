export const ALL_ROLES = ['ADMIN', 'CLIENT', 'USER'];
export const ADMIN_ONLY = ['ADMIN'];

export const NAV_GROUPS = [
  {
    key: 'workspace',
    label: 'Workspace',
    items: [
      { key: 'overview', label: 'Overview', href: '/dashboard', icon: 'overview', roles: ALL_ROLES },
      { key: 'employees', label: 'Employees', href: '/dashboard/users', icon: 'users', roles: ALL_ROLES },
      { key: 'clients', label: 'Clients', href: '/dashboard/clients', icon: 'clients', roles: ADMIN_ONLY },
      { key: 'team', label: 'Team & access', href: '/dashboard/admins', icon: 'team', roles: ADMIN_ONLY },
    ],
  },
  {
    key: 'money',
    label: 'Money',
    items: [
      {
        key: 'transactions',
        label: 'Transactions',
        href: '/dashboard/transactions',
        icon: 'transactions',
        roles: ALL_ROLES,
      },
      { key: 'invoices', label: 'Invoices', href: '/dashboard/invoices', icon: 'invoices', roles: ALL_ROLES },
      { key: 'payments', label: 'Payments', href: '/dashboard/payments', icon: 'payments', roles: ADMIN_ONLY },
    ],
  },
  {
    key: 'account',
    label: 'Account',
    items: [
      { key: 'profile', label: 'My profile', href: '/dashboard/profile', icon: 'profile', roles: ALL_ROLES },
    ],
  },
];

export const QUICK_ACTIONS = [
  {
    key: 'add-employee',
    label: 'Add employee',
    detail: 'Create an employee record',
    href: '/dashboard/users/addUser',
    icon: 'userPlus',
    roles: ALL_ROLES,
  },
  {
    key: 'add-client',
    label: 'Add client',
    detail: 'Onboard an employer',
    href: '/dashboard/clients/addClient',
    icon: 'clients',
    roles: ADMIN_ONLY,
  },
  {
    key: 'invite-admin',
    label: 'Invite admin',
    detail: 'Create an operations admin',
    href: '/dashboard/admins/addAdmin',
    icon: 'team',
    roles: ADMIN_ONLY,
  },
];

export function navGroupsForRole(role) {
  return NAV_GROUPS.map((group) => ({
    ...group,
    items: group.items.filter((item) => item.roles.includes(role)),
  })).filter((group) => group.items.length > 0);
}

export function canAccess(role, roles) {
  return Array.isArray(roles) ? roles.includes(role) : true;
}

export function activeNavKey(pathname) {
  if (!pathname) return '';
  if (pathname === '/dashboard') return 'overview';
  if (pathname.startsWith('/dashboard/users')) return 'employees';
  if (pathname.startsWith('/dashboard/clients')) return 'clients';
  if (pathname.startsWith('/dashboard/admins')) return 'team';
  if (pathname.startsWith('/dashboard/transactions')) return 'transactions';
  if (pathname.startsWith('/dashboard/invoices')) return 'invoices';
  if (pathname.startsWith('/dashboard/payments')) return 'payments';
  if (pathname.startsWith('/dashboard/profile')) return 'profile';
  return '';
}

export function topLevelForPath(pathname) {
  const key = activeNavKey(pathname);
  for (const group of NAV_GROUPS) {
    const item = group.items.find((entry) => entry.key === key);
    if (item) return item;
  }
  return null;
}

export function commandItemsForRole(role) {
  const items = [];
  navGroupsForRole(role).forEach((group) => {
    group.items.forEach((item) => {
      items.push({
        key: `nav-${item.key}`,
        label: item.label,
        detail: group.label,
        href: item.href,
        icon: item.icon,
        roles: item.roles,
      });
    });
  });
  QUICK_ACTIONS.filter((action) => action.roles.includes(role)).forEach((action) => items.push(action));
  return items;
}

export function routeTitle(pathname) {
  if (!pathname) return 'AirliPay Operations';
  if (pathname === '/login') return 'Sign in';
  if (pathname === '/dashboard') return 'Overview';
  if (pathname === '/dashboard/users') return 'Employees';
  if (pathname === '/dashboard/users/addUser') return 'New employee';
  if (/^\/dashboard\/users\/[^/]+\/edit$/.test(pathname)) return 'Edit employee';
  if (/^\/dashboard\/users\/[^/]+\/momo-accounts$/.test(pathname)) return 'Mobile money';
  if (/^\/dashboard\/users\/[^/]+\/activity-feed$/.test(pathname)) return 'Activity';
  if (/^\/dashboard\/users\/[^/]+\/bank-accounts$/.test(pathname)) return 'Bank accounts';
  if (/^\/dashboard\/users\/[^/]+\/debit-cards$/.test(pathname)) return 'Debit cards';
  if (/^\/dashboard\/users\/[^/]+(\/transactions)?$/.test(pathname)) return 'Employee profile';
  if (pathname === '/dashboard/clients') return 'Clients';
  if (pathname === '/dashboard/clients/addClient') return 'New client';
  if (pathname === '/dashboard/clients/payment') return 'Client payouts';
  if (/^\/dashboard\/clients\/[^/]+\/edit$/.test(pathname)) return 'Edit client';
  if (/^\/dashboard\/clients\/[^/]+\/user-roster$/.test(pathname)) return 'Workforce roster';
  if (/^\/dashboard\/clients\/[^/]+\/bank-accounts$/.test(pathname)) return 'Funding accounts';
  if (/^\/dashboard\/clients\/[^/]+\/payment-history$/.test(pathname)) return 'Payment history';
  if (/^\/dashboard\/clients\/[^/]+(\/transactions)?$/.test(pathname)) return 'Client profile';
  if (pathname === '/dashboard/admins') return 'Team & access';
  if (pathname === '/dashboard/admins/addAdmin') return 'Invite admin';
  if (/^\/dashboard\/admins\/[^/]+\/edit$/.test(pathname)) return 'Edit admin';
  if (/^\/dashboard\/admins\/[^/]+$/.test(pathname)) return 'Admin profile';
  if (pathname === '/dashboard/transactions') return 'Transactions';
  if (pathname === '/dashboard/invoices') return 'Invoices';
  if (/^\/dashboard\/invoices\/[^/]+$/.test(pathname)) return 'Invoice';
  if (pathname === '/dashboard/payments') return 'Payout runs';
  if (pathname === '/dashboard/profile') return 'My profile';
  return 'AirliPay Operations';
}

export function environmentLabel() {
  return process.env.NODE_ENV === 'production' ? 'Production' : 'Preview';
}
