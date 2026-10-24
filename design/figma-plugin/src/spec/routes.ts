export type RouteRepresentation = 'direct' | 'default-tab' | 'excluded';
export type DataStatus = 'live' | 'fixture' | 'concept' | 'ui-gap' | 'proposed';

export interface RouteSpec {
  group: 'Root' | 'Access' | 'Employees' | 'Clients' | 'Team' | 'Finance';
  path: string;
  screenId: string | null;
  representation: RouteRepresentation;
  dataStatus: DataStatus;
  note: string;
}

/** The canonical route map for the current dashboard, including the root redirect. */
export const ROUTES: RouteSpec[] = [
  {
    group: 'Root',
    path: '/',
    screenId: null,
    representation: 'excluded',
    dataStatus: 'live',
    note: 'Redirects to /login; no standalone screen.'
  },
  {
    group: 'Access',
    path: '/login',
    screenId: 'A01',
    representation: 'direct',
    dataStatus: 'live',
    note: 'Username + password, matching the current API.'
  },
  {
    group: 'Access',
    path: '/dashboard',
    screenId: 'A02',
    representation: 'direct',
    dataStatus: 'live',
    note: 'Metric blocks become an operations command centre.'
  },
  {
    group: 'Access',
    path: '/dashboard/profile',
    screenId: 'A03',
    representation: 'direct',
    dataStatus: 'live',
    note: 'Read-only account profile; moved into primary navigation.'
  },
  {
    group: 'Employees',
    path: '/dashboard/users',
    screenId: 'B01',
    representation: 'direct',
    dataStatus: 'live',
    note: 'Working search, filters and row inspector.'
  },
  {
    group: 'Employees',
    path: '/dashboard/users/addUser',
    screenId: 'B02',
    representation: 'direct',
    dataStatus: 'live',
    note: 'Grouped form; CSV import preserved as a secondary path.'
  },
  {
    group: 'Employees',
    path: '/dashboard/users/[id]',
    screenId: 'B03',
    representation: 'direct',
    dataStatus: 'live',
    note: 'Employee snapshot and ledger.'
  },
  {
    group: 'Employees',
    path: '/dashboard/users/[id]/transactions',
    screenId: 'B03',
    representation: 'default-tab',
    dataStatus: 'live',
    note: 'Consolidated into the default Transactions tab.'
  },
  {
    group: 'Employees',
    path: '/dashboard/users/[id]/momo-accounts',
    screenId: 'B04',
    representation: 'direct',
    dataStatus: 'live',
    note: 'Uses user_mobile_money_accounts; missing-data guard required.'
  },
  {
    group: 'Employees',
    path: '/dashboard/users/[id]/activity-feed',
    screenId: 'B05',
    representation: 'direct',
    dataStatus: 'fixture',
    note: 'Current page is generated fixture data; needs a real audit feed.'
  },
  {
    group: 'Employees',
    path: '/dashboard/users/[id]/bank-accounts',
    screenId: 'B06',
    representation: 'direct',
    dataStatus: 'fixture',
    note: 'Current page is fixture data; list-banks endpoint exists.'
  },
  {
    group: 'Employees',
    path: '/dashboard/users/[id]/debit-cards',
    screenId: 'B07',
    representation: 'direct',
    dataStatus: 'concept',
    note: 'No current card product or backend. Concept only.'
  },
  {
    group: 'Employees',
    path: '/dashboard/users/[id]/edit',
    screenId: 'B08',
    representation: 'direct',
    dataStatus: 'live',
    note: 'Same grouped form as create, prefilled.'
  },
  {
    group: 'Clients',
    path: '/dashboard/clients',
    screenId: 'C01',
    representation: 'direct',
    dataStatus: 'live',
    note: 'Employer list with payout context.'
  },
  {
    group: 'Clients',
    path: '/dashboard/clients/addClient',
    screenId: 'C02',
    representation: 'direct',
    dataStatus: 'live',
    note: 'Invitation replaces the current raw password fields.'
  },
  {
    group: 'Clients',
    path: '/dashboard/clients/payment',
    screenId: 'C07',
    representation: 'direct',
    dataStatus: 'fixture',
    note: 'Legacy static table; retained as a payment-schedule view.'
  },
  {
    group: 'Clients',
    path: '/dashboard/clients/[id]',
    screenId: 'C03',
    representation: 'direct',
    dataStatus: 'live',
    note: 'Client snapshot, funding and ledger.'
  },
  {
    group: 'Clients',
    path: '/dashboard/clients/[id]/transactions',
    screenId: 'C03',
    representation: 'default-tab',
    dataStatus: 'live',
    note: 'Consolidated into the default Transactions tab.'
  },
  {
    group: 'Clients',
    path: '/dashboard/clients/[id]/user-roster',
    screenId: 'C04',
    representation: 'direct',
    dataStatus: 'live',
    note: 'Roster gets bulk actions and per-employee drill-down.'
  },
  {
    group: 'Clients',
    path: '/dashboard/clients/[id]/bank-accounts',
    screenId: 'C05',
    representation: 'direct',
    dataStatus: 'fixture',
    note: 'Current page uses random fixture accounts; needs a client-bank API.'
  },
  {
    group: 'Clients',
    path: '/dashboard/clients/[id]/payment-history',
    screenId: 'C06',
    representation: 'direct',
    dataStatus: 'live',
    note: 'Invoice status must write to the invoice resource, not the client.'
  },
  {
    group: 'Clients',
    path: '/dashboard/clients/[id]/edit',
    screenId: 'C08',
    representation: 'direct',
    dataStatus: 'live',
    note: 'Invitation and identity sections; no password fields.'
  },
  {
    group: 'Team',
    path: '/dashboard/admins',
    screenId: 'D01',
    representation: 'direct',
    dataStatus: 'live',
    note: 'Team list; granular role model is a proposed extension.'
  },
  {
    group: 'Team',
    path: '/dashboard/admins/addAdmin',
    screenId: 'D02',
    representation: 'direct',
    dataStatus: 'live',
    note: 'Invite flow replaces creating an admin with a raw password.'
  },
  {
    group: 'Team',
    path: '/dashboard/admins/[id]',
    screenId: 'D03',
    representation: 'direct',
    dataStatus: 'ui-gap',
    note: 'The current page body is blank although GET /admin/:id exists.'
  },
  {
    group: 'Team',
    path: '/dashboard/admins/[id]/edit',
    screenId: 'D04',
    representation: 'direct',
    dataStatus: 'live',
    note: 'Edit access and contact; reset access via email.'
  },
  {
    group: 'Finance',
    path: '/dashboard/transactions',
    screenId: 'E01',
    representation: 'direct',
    dataStatus: 'live',
    note: 'Dense ledger with real filters and row-level detail.'
  },
  {
    group: 'Finance',
    path: '/dashboard/invoices',
    screenId: 'E02',
    representation: 'direct',
    dataStatus: 'live',
    note: 'Invoice list; metrics are not invoice statuses.'
  },
  {
    group: 'Finance',
    path: '/dashboard/invoices/[id]',
    screenId: 'E03',
    representation: 'direct',
    dataStatus: 'live',
    note: 'Document, transaction summary and status timeline in one review screen.'
  },
  {
    group: 'Finance',
    path: '/dashboard/payments',
    screenId: 'E04',
    representation: 'direct',
    dataStatus: 'proposed',
    note: 'Current duplicate invoice table becomes payout-run orchestration. New API required.'
  }
];

export const ROUTE_COUNT = ROUTES.length;

export function routeByPath(path: string): RouteSpec | undefined {
  return ROUTES.find((route) => route.path === path);
}

export function routesForScreen(screenId: string): RouteSpec[] {
  return ROUTES.filter((route) => route.screenId === screenId);
}
