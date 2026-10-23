import fs from 'node:fs';
import path from 'node:path';
import { ROUTES } from './spec/routes';
import {
  EXPECTED_ROUTE_COUNT,
  EXPECTED_SCREEN_COUNT,
  SCREENS,
  SCREEN_GROUPS
} from './spec/screens';
import { BUILDERS } from './screens';
import {
  ACCOUNT_STATUSES,
  INVOICE_STATUSES,
  OPERATORS,
  PAY_RUN_STATUSES,
  TRANSACTION_STATUSES,
  TRANSACTION_TYPES,
  admins,
  clients,
  employees,
  invoiceStats,
  invoiceTotal,
  invoices,
  payRuns,
  transactions,
  type AccountStatus,
  type InvoiceStatus,
  type Operator,
  type PayRunStatus,
  type TransactionStatus,
  type TransactionType
} from './data';
import {
  board,
  boardColors,
  contrastRatio,
  darkColors,
  lightColors,
  type ThemeColors
} from './tokens';

const failures: string[] = [];
let checks = 0;

function check(condition: boolean, message: string): void {
  checks += 1;
  if (!condition) {
    failures.push(message);
  }
}

function unique<T>(values: T[]): boolean {
  return new Set(values).size === values.length;
}

function scanRoutes(): string[] {
  const appRoot = path.resolve(process.cwd(), '..', '..', 'src', 'app');
  check(fs.existsSync(appRoot), `Dashboard app root not found at ${appRoot}`);
  const pages: string[] = [];
  const walk = (dir: string): void => {
    fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        return;
      }
      if (/^page\.(js|jsx|ts|tsx)$/.test(entry.name)) {
        pages.push(full);
      }
    });
  };
  walk(appRoot);

  return pages
    .map((file) => {
      const relative = path.relative(appRoot, file);
      const segments = path.dirname(relative).split(path.sep).filter((segment) => segment !== '.');
      const kept = segments.filter((segment) => !(segment.startsWith('(') && segment.endsWith(')')));
      return kept.length ? `/${kept.join('/')}` : '/';
    })
    .sort();
}

function validateRoutes(): void {
  const scanned = scanRoutes();
  const catalog = ROUTES.map((route) => route.path);
  check(scanned.length === 30, `Expected 30 page routes in src/app, found ${scanned.length}.`);
  check(catalog.length === EXPECTED_ROUTE_COUNT, `Expected 30 route catalog rows, found ${catalog.length}.`);
  check(unique(catalog), 'Route catalog contains duplicate paths.');
  check(unique(scanned), 'Route scanner returned duplicate paths.');
  scanned.forEach((route) => check(catalog.includes(route), `Filesystem route ${route} is missing from the catalog.`));
  catalog.forEach((route) => check(scanned.includes(route), `Catalog route ${route} does not exist in src/app.`));

  const live = ROUTES.filter((route) => route.representation !== 'excluded');
  check(live.length === 29, `Expected 29 live routes, found ${live.length}.`);
  const excluded = ROUTES.filter((route) => route.representation === 'excluded');
  check(excluded.length === 1, `Expected exactly 1 excluded route, found ${excluded.length}.`);
  check(excluded[0]?.path === '/', 'The only excluded route must be the root redirect.');
  const defaultTabs = live.filter((route) => route.representation === 'default-tab');
  check(defaultTabs.length === 2, `Expected 2 default-tab routes, found ${defaultTabs.length}.`);
  check(
    defaultTabs.some((route) => route.path === '/dashboard/users/[id]/transactions') &&
      defaultTabs.some((route) => route.path === '/dashboard/clients/[id]/transactions'),
    'The two merged transaction routes must be the employee and client transaction tabs.'
  );
  live.forEach((route) => {
    check(Boolean(route.screenId), `Live route ${route.path} has no screen.`);
    check(route.note.trim().length > 0, `Route ${route.path} has an empty handoff note.`);
  });
  ROUTES.forEach((route) => {
    if (route.representation === 'default-tab') {
      check(Boolean(route.screenId), `Default-tab route ${route.path} has no screen.`);
    }
    if (route.screenId) {
      check(
        SCREENS.some((screen) => screen.id === route.screenId),
        `Route ${route.path} points at missing screen ${route.screenId}.`
      );
    }
  });
}

function validateScreens(): void {
  check(SCREENS.length === EXPECTED_SCREEN_COUNT, `Expected 27 screens, found ${SCREENS.length}.`);
  check(unique(SCREENS.map((screen) => screen.id)), 'Screen IDs are not unique.');
  check(unique(SCREENS.map((screen) => screen.builder)), 'Screen builders are not unique.');
  check(SCREENS.every((screen) => screen.caption.trim().length > 0), 'Every screen needs a caption.');

  const expectedGroups: Record<string, number> = {
    access: 3,
    employees: 8,
    clients: 8,
    team: 4,
    finance: 4
  };
  Object.entries(expectedGroups).forEach(([key, count]) => {
    const actual = SCREENS.filter((screen) => screen.group === key).length;
    check(actual === count, `Group ${key} expected ${count} screens, found ${actual}.`);
  });
  SCREEN_GROUPS.forEach((group) => {
    check(
      SCREENS.some((screen) => screen.group === group.key),
      `Screen group ${group.key} has no screens.`
    );
  });

  const screenBuilderNames = SCREENS.map((screen) => screen.builder).sort();
  const builderNames = Object.keys(BUILDERS).sort();
  check(
    JSON.stringify(screenBuilderNames) === JSON.stringify(builderNames),
    `Builder map and screen registry differ. Screens: ${screenBuilderNames.join(', ')}; builders: ${builderNames.join(', ')}`
  );
  SCREENS.forEach((screen) => {
    const builder = BUILDERS[screen.builder];
    check(typeof builder === 'function', `Missing builder function for ${screen.id} (${screen.builder}).`);
    const routes = ROUTES.filter((route) => route.screenId === screen.id);
    check(routes.length > 0, `Screen ${screen.id} has no routes.`);
    if (screen.dataStatus !== 'live') {
      check(
        screen.tags.includes(screen.dataStatus as (typeof screen.tags)[number]),
        `Non-live screen ${screen.id} must carry a matching data-status tag.`
      );
    }
  });

  const b03 = SCREENS.find((screen) => screen.id === 'B03');
  const c03 = SCREENS.find((screen) => screen.id === 'C03');
  check(Boolean(b03?.tags.includes('merged')), 'B03 must be tagged as a merged route screen.');
  check(Boolean(c03?.tags.includes('merged')), 'C03 must be tagged as a merged route screen.');
  check(
    ROUTES.filter((route) => route.screenId === 'B03').length === 2 &&
      ROUTES.filter((route) => route.screenId === 'C03').length === 2,
    'B03 and C03 must each represent two routes.'
  );
}

function validateData(): void {
  check(unique(clients.map((client) => client.id)), 'Client IDs are not unique.');
  check(unique(employees.map((employee) => employee.id)), 'Employee IDs are not unique.');
  check(unique(admins.map((admin) => admin.id)), 'Admin IDs are not unique.');
  check(unique(transactions.map((transaction) => transaction.id)), 'Transaction IDs are not unique.');
  check(unique(invoices.map((invoice) => invoice.id)), 'Invoice IDs are not unique.');
  check(unique(payRuns.map((run) => run.id)), 'Payout run IDs are not unique.');

  const clientIds = new Set(clients.map((client) => client.id));
  const employeeIds = new Set(employees.map((employee) => employee.id));
  const accountStatuses = new Set<string>(ACCOUNT_STATUSES);
  const transactionStatuses = new Set<string>(TRANSACTION_STATUSES);
  const transactionTypes = new Set<string>(TRANSACTION_TYPES);
  const invoiceStatuses = new Set<string>(INVOICE_STATUSES);
  const operators = new Set<string>(OPERATORS);
  const payRunStatuses = new Set<string>(PAY_RUN_STATUSES);

  [...clients.map((client) => client.status), ...employees.map((employee) => employee.status), ...admins.map((admin) => admin.status)].forEach(
    (status) => check(accountStatuses.has(status), `Unknown account status ${status}.`)
  );
  employees.forEach((employee) => {
    check(clientIds.has(employee.clientId), `Employee ${employee.name} references a missing client.`);
    check(employee.baseSalary > 0, `Employee ${employee.name} needs a positive base salary.`);
    check(employee.balance >= 0, `Employee ${employee.name} has a negative balance.`);
  });
  transactions.forEach((transaction) => {
    check(transactionStatuses.has(transaction.status), `Unknown transaction status ${transaction.status}.`);
    check(transactionTypes.has(transaction.type), `Unknown transaction type ${transaction.type}.`);
    check(clientIds.has(transaction.clientId), `Transaction ${transaction.ref} references a missing client.`);
    if (transaction.employeeId) {
      check(employeeIds.has(transaction.employeeId), `Transaction ${transaction.ref} references a missing employee.`);
    }
    if (transaction.operator) {
      check(operators.has(transaction.operator), `Unknown operator ${transaction.operator}.`);
    }
    check(transaction.amount > 0, `Transaction ${transaction.ref} needs a positive amount.`);
    check(transaction.fee >= 0, `Transaction ${transaction.ref} has a negative fee.`);
  });
  invoices.forEach((invoice) => {
    check(invoiceStatuses.has(invoice.status), `Unknown invoice status ${invoice.status}.`);
    check(clientIds.has(invoice.clientId), `Invoice ${invoice.number} references a missing client.`);
    check(invoice.totalAmount > 0, `Invoice ${invoice.number} has no amount.`);
    check(
      Math.abs(invoiceTotal(invoice) - invoice.totalAmount) < 0.001,
      `Invoice ${invoice.number} line items do not add up to its total.`
    );
    check(invoice.lineItems.length > 0, `Invoice ${invoice.number} has no line items.`);
  });
  payRuns.forEach((run) => {
    check(payRunStatuses.has(run.status), `Unknown payout-run status ${run.status}.`);
    check(run.fundedPct >= 0 && run.fundedPct <= 100, `Payout run ${run.reference} has an invalid funded percentage.`);
  });

  const stats = invoiceStats();
  check(stats.allCount === invoices.length, 'Invoice stats count does not match the invoice table.');
  check(stats.outstandingCount === 3, `Expected 3 outstanding invoices, found ${stats.outstandingCount}.`);
  check(stats.treatedCount === invoices.filter((invoice) => invoice.status === 'TREATED').length, 'Treated invoice count is inconsistent.');
  check(employees.filter((employee) => employee.clientId === 'cl_penda').length >= 6, 'Penda Logistics needs a realistic roster.');

  // Enum helpers keep the mock-vs-schema contract explicit in the source.
  const statuses: AccountStatus[] = [...ACCOUNT_STATUSES];
  const txStatuses: TransactionStatus[] = [...TRANSACTION_STATUSES];
  const txTypes: TransactionType[] = [...TRANSACTION_TYPES];
  const invStatuses: InvoiceStatus[] = [...INVOICE_STATUSES];
  const opValues: Operator[] = [...OPERATORS];
  const runStatuses: PayRunStatus[] = [...PAY_RUN_STATUSES];
  check(statuses.length === 5, 'Account status enum drifted from the Prisma schema.');
  check(txStatuses.length === 3, 'Transaction status enum drifted from the Prisma schema.');
  check(txTypes.length === 2, 'Transaction type enum drifted from the Prisma schema.');
  check(invStatuses.length === 3, 'Invoice status enum drifted from the Prisma schema.');
  check(opValues.length === 7, 'Momо operator enum drifted from the Prisma schema.');
  check(runStatuses.length === 4, 'Payout-run concept enums are incomplete.');
}

function validateBoard(): void {
  check(board.columns.length === 3, 'The board must use three screen columns.');
  check(board.screenWidth === 1440 && board.screenHeight === 960, 'Board screens must be 1440×960.');
  check(board.rowPitch === 1100, 'Board row pitch must be 1100 for the caption rhythm.');
  check(
    board.columns.every((x, index) => x + board.screenWidth <= board.width && (index === 0 || x > board.columns[index - 1]! + board.screenWidth)),
    'Board columns overlap or escape the page width.'
  );
  const rows = Math.ceil(EXPECTED_SCREEN_COUNT / 3);
  check(rows === 9, '27 screens must occupy nine rows.');
  check(
    board.rowPitch > board.screenHeight + 56,
    'Row pitch must leave room for the caption above the next screen.'
  );
  check(board.width === 4656, 'The board width must stay 4656 for the three-column gallery.');
  check(EXPECTED_SCREEN_COUNT * 2 === 54, 'The design must generate 54 desktop frames.');
  const markers = [
    'airlipayBackofficeBoard',
    'airlipayBackofficeSection',
    'airlipayBackofficeScreen',
    'airlipayBackofficePlate',
    'airlipayBackofficeRoute'
  ];
  markers.forEach((marker) => {
    check(
      !['airlipayBoard', 'airlipaySection', 'airlipayScreen'].includes(marker),
      `Marker ${marker} collides with the mobile plugin.`
    );
  });
}

function validateContrast(): void {
  const pairs = (palette: ThemeColors) => [
    ['ink on surface', palette.ink, palette.surface],
    ['ink on canvas', palette.ink, palette.canvas],
    ['muted on surface', palette.muted, palette.surface],
    ['muted on canvas', palette.muted, palette.canvas],
    ['onMint on mint', palette.onMint, palette.mint],
    ['success on successSoft', palette.success, palette.successSoft],
    ['warning on warningSoft', palette.warning, palette.warningSoft],
    ['error on errorSoft', palette.error, palette.errorSoft],
    ['info on infoSoft', palette.info, palette.infoSoft],
    ['cobaltText on cobaltSoft', palette.cobaltText, palette.cobaltSoft],
    ['sidebarText on sidebar', palette.sidebarText, palette.sidebarBg],
    ['sidebarMuted on sidebar', palette.sidebarMuted, palette.sidebarBg]
  ] as Array<[string, string, string]>;

  (['light', 'dark'] as const).forEach((theme) => {
    const palette = theme === 'light' ? lightColors : darkColors;
    pairs(palette).forEach(([label, fg, bg]) => {
      const ratio = contrastRatio(fg, bg);
      check(ratio >= 4.5, `${theme} ${label} contrast is ${ratio.toFixed(2)}, below 4.5.`);
    });
  });

  [
    ['board text', boardColors.text, boardColors.bg],
    ['board muted', boardColors.muted, boardColors.bg],
    ['board faint', boardColors.faint, boardColors.bg],
    ['board mint', boardColors.mint, boardColors.bg],
    ['board cobalt', boardColors.cobalt, boardColors.bg]
  ].forEach(([label, fg, bg]) => {
    const ratio = contrastRatio(fg, bg);
    check(ratio >= 4.5, `${label} contrast is ${ratio.toFixed(2)}, below 4.5.`);
  });
}

validateRoutes();
validateScreens();
validateData();
validateBoard();
validateContrast();

if (failures.length) {
  console.error(`Validation failed (${failures.length} of ${checks} checks):`);
  failures.forEach((failure) => console.error(`  ✗ ${failure}`));
  process.exitCode = 1;
} else {
  console.log(
    `Validation passed: ${checks} checks · ${ROUTES.length} route rows · 29 live routes · ${SCREENS.length} screens · 54 app frames · 2 themes · mobile tokens.`
  );
}
