import { routesForScreen, type DataStatus } from './routes';

export type ScreenGroupKey = 'access' | 'employees' | 'clients' | 'team' | 'finance';
export type ScreenTag = 'merged' | 'fixture' | 'concept' | 'ui-gap' | 'proposed';

export interface ScreenSpec {
  id: string;
  title: string;
  group: ScreenGroupKey;
  builder: string;
  dataStatus: DataStatus;
  tags: ScreenTag[];
  caption: string;
}

export interface ScreenGroup {
  key: ScreenGroupKey;
  label: string;
  title: string;
  description: string;
}

export const SCREEN_GROUPS: ScreenGroup[] = [
  {
    key: 'access',
    label: 'Access',
    title: 'Access and command centre',
    description: 'Sign in, the operations overview and the signed-in account.'
  },
  {
    key: 'employees',
    label: 'Employees',
    title: 'Employees',
    description: 'Roster, creation, profile, payout accounts and audit history.'
  },
  {
    key: 'clients',
    label: 'Clients',
    title: 'Clients',
    description: 'Employer portfolio, onboarding, funding and payroll billing.'
  },
  {
    key: 'team',
    label: 'Team',
    title: 'Team and access',
    description: 'Admins, invitations and the proposed granular access model.'
  },
  {
    key: 'finance',
    label: 'Finance',
    title: 'Money movement',
    description: 'Ledger, invoices and the proposed payout-run orchestrator.'
  }
];

export const SCREENS: ScreenSpec[] = [
  {
    id: 'A01',
    title: 'Sign in',
    group: 'access',
    builder: 'A01SignIn',
    dataStatus: 'live',
    tags: [],
    caption: 'Username + password · matches POST /auth/login'
  },
  {
    id: 'A02',
    title: 'Operations overview',
    group: 'access',
    builder: 'A02Overview',
    dataStatus: 'live',
    tags: [],
    caption: 'Metrics, cash movement, next payout run and recent activity'
  },
  {
    id: 'A03',
    title: 'My profile',
    group: 'access',
    builder: 'A03Profile',
    dataStatus: 'live',
    tags: [],
    caption: 'Signed-in admin identity, access and recent security events'
  },
  {
    id: 'B01',
    title: 'Employees',
    group: 'employees',
    builder: 'B01Employees',
    dataStatus: 'live',
    tags: [],
    caption: 'Searchable roster with wallet, employer and status context'
  },
  {
    id: 'B02',
    title: 'New employee',
    group: 'employees',
    builder: 'B02NewEmployee',
    dataStatus: 'live',
    tags: [],
    caption: 'Grouped create form; CSV import remains a secondary route'
  },
  {
    id: 'B03',
    title: 'Employee profile',
    group: 'employees',
    builder: 'B03EmployeeProfile',
    dataStatus: 'live',
    tags: ['merged'],
    caption: 'Transactions default tab · also represents /users/[id]/transactions'
  },
  {
    id: 'B04',
    title: 'Mobile money accounts',
    group: 'employees',
    builder: 'B04MomoAccounts',
    dataStatus: 'live',
    tags: [],
    caption: 'Payout destinations from user_mobile_money_accounts'
  },
  {
    id: 'B05',
    title: 'Activity feed',
    group: 'employees',
    builder: 'B05Activity',
    dataStatus: 'fixture',
    tags: ['fixture'],
    caption: 'FIXTURE · real audit feed required'
  },
  {
    id: 'B06',
    title: 'Bank accounts',
    group: 'employees',
    builder: 'B06BankAccounts',
    dataStatus: 'fixture',
    tags: ['fixture'],
    caption: 'FIXTURE UI · list-banks endpoint exists'
  },
  {
    id: 'B07',
    title: 'Debit cards',
    group: 'employees',
    builder: 'B07DebitCards',
    dataStatus: 'concept',
    tags: ['concept'],
    caption: 'CONCEPT · no current card product or backend'
  },
  {
    id: 'B08',
    title: 'Edit employee',
    group: 'employees',
    builder: 'B08EditEmployee',
    dataStatus: 'live',
    tags: [],
    caption: 'Prefilled form with destructive actions separated'
  },
  {
    id: 'C01',
    title: 'Clients',
    group: 'clients',
    builder: 'C01Clients',
    dataStatus: 'live',
    tags: [],
    caption: 'Employer portfolio with funding and payout context'
  },
  {
    id: 'C02',
    title: 'New client',
    group: 'clients',
    builder: 'C02NewClient',
    dataStatus: 'live',
    tags: [],
    caption: 'Invitation replaces raw password creation'
  },
  {
    id: 'C03',
    title: 'Client profile',
    group: 'clients',
    builder: 'C03ClientProfile',
    dataStatus: 'live',
    tags: ['merged'],
    caption: 'Transactions default tab · also represents /clients/[id]/transactions'
  },
  {
    id: 'C04',
    title: 'Workforce roster',
    group: 'clients',
    builder: 'C04ClientRoster',
    dataStatus: 'live',
    tags: [],
    caption: 'Employer roster with status, payout account and ledger drill-down'
  },
  {
    id: 'C05',
    title: 'Funding accounts',
    group: 'clients',
    builder: 'C05ClientFunding',
    dataStatus: 'fixture',
    tags: ['fixture'],
    caption: 'FIXTURE · client bank-account API required'
  },
  {
    id: 'C06',
    title: 'Payment history',
    group: 'clients',
    builder: 'C06PaymentHistory',
    dataStatus: 'live',
    tags: [],
    caption: 'Invoice-backed history; status writes stay on the invoice resource'
  },
  {
    id: 'C07',
    title: 'Client payouts',
    group: 'clients',
    builder: 'C07ClientPayouts',
    dataStatus: 'fixture',
    tags: ['fixture'],
    caption: 'LEGACY FIXTURE · retained as a payment-schedule view'
  },
  {
    id: 'C08',
    title: 'Edit client',
    group: 'clients',
    builder: 'C08EditClient',
    dataStatus: 'live',
    tags: [],
    caption: 'Company, contact, funding and access in one form'
  },
  {
    id: 'D01',
    title: 'Team & access',
    group: 'team',
    builder: 'D01Team',
    dataStatus: 'live',
    tags: [],
    caption: 'Admins with invitation state; granular roles are proposed'
  },
  {
    id: 'D02',
    title: 'Invite admin',
    group: 'team',
    builder: 'D02InviteAdmin',
    dataStatus: 'live',
    tags: [],
    caption: 'Invitation-based onboarding; no raw password field'
  },
  {
    id: 'D03',
    title: 'Admin profile',
    group: 'team',
    builder: 'D03AdminProfile',
    dataStatus: 'ui-gap',
    tags: ['ui-gap'],
    caption: 'UI GAP · current page body is blank; API supports the view'
  },
  {
    id: 'D04',
    title: 'Edit admin',
    group: 'team',
    builder: 'D04EditAdmin',
    dataStatus: 'live',
    tags: [],
    caption: 'Access and contact editing with email-based reset'
  },
  {
    id: 'E01',
    title: 'Transactions ledger',
    group: 'finance',
    builder: 'E01Transactions',
    dataStatus: 'live',
    tags: [],
    caption: 'Dense ledger, filters and export'
  },
  {
    id: 'E02',
    title: 'Invoices',
    group: 'finance',
    builder: 'E02Invoices',
    dataStatus: 'live',
    tags: [],
    caption: 'Treated / not treated are invoice states, not overview paid / unpaid metrics'
  },
  {
    id: 'E03',
    title: 'Invoice detail',
    group: 'finance',
    builder: 'E03InvoiceDetail',
    dataStatus: 'live',
    tags: [],
    caption: 'Document, included transactions and status timeline'
  },
  {
    id: 'E04',
    title: 'Payout runs',
    group: 'finance',
    builder: 'E04PayoutRuns',
    dataStatus: 'proposed',
    tags: ['proposed'],
    caption: 'PROPOSED · replaces the duplicate payments table; new API required'
  }
];

export const EXPECTED_SCREEN_COUNT = 27;
export const SCREENS_PER_THEME = EXPECTED_SCREEN_COUNT;
export const EXPECTED_ROUTE_COUNT = 30;

export function groupFor(key: ScreenGroupKey): ScreenGroup {
  const group = SCREEN_GROUPS.find((item) => item.key === key);
  if (!group) {
    throw new Error(`Unknown screen group: ${key}`);
  }
  return group;
}

export function screenById(id: string): ScreenSpec | undefined {
  return SCREENS.find((screen) => screen.id === id);
}

export function primaryRouteFor(screen: ScreenSpec): string {
  const routes = routesForScreen(screen.id);
  const direct = routes.find((route) => route.representation === 'direct');
  return direct?.path ?? routes[0]?.path ?? '—';
}

export function groupScreenCount(key: ScreenGroupKey): number {
  return SCREENS.filter((screen) => screen.group === key).length;
}

export function tagLabel(tag: ScreenTag): string {
  const labels: Record<ScreenTag, string> = {
    merged: 'MERGED',
    fixture: 'FIXTURE',
    concept: 'CONCEPT',
    'ui-gap': 'UI GAP',
    proposed: 'PROPOSED'
  };
  return labels[tag];
}
