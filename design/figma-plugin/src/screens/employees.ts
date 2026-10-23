import { colors, mix, radii, screen } from '../tokens';
import type { IconName } from '../icons';
import {
  avatar,
  divider,
  frame,
  hstack,
  icon,
  setFillWidth,
  spacer,
  text,
  vstack
} from '../primitives';
import {
  activityRow,
  button,
  field,
  horizontalRule,
  iconButton,
  iconTile,
  infoBanner,
  keyValueRow,
  progressBar,
  searchField,
  sectionHeader,
  segmented,
  statusPill,
  tableFooter,
  tag,
  dataTable,
  type TableColumn,
  type TableRow,
  type FieldOptions
} from '../patterns';
import { appScreen, type PageOptions } from '../patterns/shell';
import {
  activityFeed,
  bankAccounts,
  clientName,
  clients,
  dateLabel,
  dateTimeLabel,
  employeeTransactions,
  employees,
  formatNumber,
  money,
  momoAccounts,
  statusLabel,
  transactions,
  type Employee,
  type Transaction
} from '../data';
import {
  cardTitleBar,
  clientTitlePrefix,
  detailsGrid,
  employeeTabs,
  employeeTitlePrefix,
  filterBar,
  filterButton,
  fixtureNotice,
  miniStat
} from './shared';

const selectedEmployee = employees[0]!;

function employeePageOptions(
  employee: Employee,
  active: 'transactions' | 'momo' | 'activity' | 'bank' | 'cards'
): PageOptions {
  return {
    nav: 'employees',
    breadcrumbs: ['Employees', employee.name],
    title: employee.name,
    titlePrefix: employeeTitlePrefix(employee),
    titleAddon: (row) => statusPill(row, employee.status, { size: 'sm' }),
    subtitle: `${employee.employeeId} · ${clientName(employee.clientId)} · ${employee.operator} payout to ${employee.momoMasked}`,
    actions: (row) => {
      button(row, 'Edit employee', { variant: 'secondary', icon: 'edit' });
      iconButton(row, 'more', { size: 38, stroke: colors.border, background: colors.surface });
    },
    tabs: employeeTabs(active)
  };
}

function snapshotField(parent: FrameNode, label: string, value: string, width: number): FrameNode {
  const node = vstack(`Snapshot · ${label}`, { width, gap: 2, fill: null });
  parent.appendChild(node);
  text(node, label.toUpperCase(), {
    token: 'micro',
    weight: 'semibold',
    color: colors.mutedLight,
    width,
    fill: false
  });
  text(node, value, {
    token: 'bodySmall',
    weight: 'medium',
    color: colors.ink,
    width,
    fill: false
  });
  return node;
}

function employeeSnapshot(parent: FrameNode, employee: Employee): FrameNode {
  const row = hstack('Employee snapshot', {
    width: screen.contentWidth,
    height: 156,
    gap: 16,
    fill: null,
    align: 'CENTER'
  });
  parent.appendChild(row);

  const detailsCard = vstack('Employment card', {
    width: 744,
    height: 156,
    padding: 20,
    gap: 12,
    fill: colors.surface,
    stroke: colors.border,
    radius: radii.md
  });
  row.appendChild(detailsCard);
  const labelRow = hstack('Employment header', {
    width: 704,
    height: 18,
    fill: null,
    justify: 'SPACE_BETWEEN',
    align: 'CENTER'
  });
  detailsCard.appendChild(labelRow);
  text(labelRow, 'EMPLOYMENT & CONTACT', {
    token: 'eyebrow',
    color: colors.mutedLight,
    fill: false,
    hug: true
  });
  tag(labelRow, 'Roster verified', 'success', { icon: 'checkCircle', size: 'sm' });

  const grid = hstack('Snapshot grid', { width: 704, height: 86, gap: 24, fill: null, align: 'MIN' });
  detailsCard.appendChild(grid);
  const columns = [
    [
      { label: 'Employer', value: clientName(employee.clientId) },
      { label: 'Base salary', value: money(employee.baseSalary) }
    ],
    [
      { label: 'Employee ID', value: employee.employeeId },
      { label: 'Joined', value: employee.joined }
    ],
    [
      { label: 'Primary phone', value: employee.phone },
      { label: 'Location', value: `${employee.city}, ${employee.region}` }
    ]
  ];
  columns.forEach((column, index) => {
    const col = vstack('Snapshot column', {
      width: index === 0 ? 240 : 208,
      gap: 10,
      fill: null
    });
    grid.appendChild(col);
    column.forEach((item) => snapshotField(col, item.label, item.value, index === 0 ? 240 : 208));
  });

  const balanceCard = vstack('Balance card', {
    width: 368,
    height: 156,
    padding: 20,
    gap: 5,
    fill: colors.mintSoft,
    radius: radii.md
  });
  row.appendChild(balanceCard);
  const balanceHeader = hstack('Balance header', { width: 328, height: 18, fill: null, align: 'CENTER' });
  balanceCard.appendChild(balanceHeader);
  icon(balanceHeader, 'wallet', colors.onMintSoft, 15);
  text(balanceHeader, 'AVAILABLE BALANCE', {
    token: 'eyebrow',
    color: colors.onMintSoft,
    fill: false,
    hug: true
  });
  text(balanceCard, money(employee.balance), {
    size: 28,
    lineHeight: 34,
    weight: 'bold',
    color: colors.onMintSoft,
    letterSpacing: -0.6,
    width: 328,
    fill: false
  });
  const meta = hstack('Balance meta', { width: 328, height: 18, fill: null, justify: 'SPACE_BETWEEN', align: 'CENTER' });
  balanceCard.appendChild(meta);
  text(meta, `Base salary ${money(employee.baseSalary)}`, {
    token: 'caption',
    color: colors.muted,
    fill: false,
    hug: true
  });
  text(meta, 'Next payday 28 Oct', {
    token: 'caption',
    color: colors.muted,
    fill: false,
    hug: true
  });
  const progressRow = hstack('Early pay progress', { width: 328, height: 18, fill: null, align: 'CENTER' });
  balanceCard.appendChild(progressRow);
  text(progressRow, 'Early access used this month', {
    token: 'caption',
    color: colors.muted,
    fill: false,
    hug: true
  });
  spacer(progressRow, 1, true);
  text(progressRow, '64%', {
    token: 'caption',
    weight: 'semibold',
    color: colors.onMintSoft,
    fill: false,
    hug: true
  });
  progressBar(balanceCard, 64, { width: 328, height: 5, color: colors.onMintSoft, track: mix(colors.mintSoft, colors.onMintSoft, 0.14) });
  return row;
}

function txCell(tx: Transaction): { text: string; sub?: string } {
  return {
    text: tx.type === 'WITHDRAW' ? 'Withdrawal' : 'Payroll funding',
    sub: `${tx.ref} · ${tx.operator ?? 'Bank transfer'}${tx.destinationMasked ? ` ${tx.destinationMasked}` : ''}`
  };
}

function employeeLedgerCard(employee: Employee): FrameNode {
  const card = vstack('Employee ledger card', {
    width: screen.contentWidth,
    height: 517,
    fill: colors.surface,
    stroke: colors.border,
    radius: radii.md,
    clip: true
  });
  const rows = employeeTransactions(employee.id);
  cardTitleBar(card, {
    width: screen.contentWidth,
    title: 'Transactions',
    subtitle: `${rows.length} entries · newest first`,
    icon: 'transactions',
    action: 'Download CSV',
    actionIcon: 'download'
  });
  const toolbar = filterBar(card);
  segmented(toolbar, ['All', 'Successful', 'Failed'], 0);
  spacer(toolbar, 1, true);
  filterButton(toolbar, 'Last 30 days', { icon: 'calendar' });
  filterButton(toolbar, 'All types', { icon: 'filter' });

  const columns: TableColumn[] = [
    { key: 'date', label: 'DATE', width: 150 },
    { key: 'transaction', label: 'TRANSACTION', width: 320 },
    { key: 'amount', label: 'AMOUNT', width: 140, type: 'money', align: 'RIGHT' },
    { key: 'fee', label: 'FEE', width: 90, type: 'money', align: 'RIGHT' },
    { key: 'balance', label: 'BALANCE AFTER', width: 170, type: 'money', align: 'RIGHT' },
    { key: 'status', label: 'STATUS', width: 118, type: 'status', align: 'RIGHT' },
    { key: 'more', label: '', width: 100, type: 'action', align: 'RIGHT' }
  ];
  const tableRows: TableRow[] = rows.map((tx) => ({
    date: dateTimeLabel(tx.date),
    transaction: txCell(tx),
    amount: { text: money(tx.amount), color: tx.type === 'DEPOSIT' ? colors.success : colors.ink },
    fee: { text: money(tx.fee), color: colors.muted },
    balance: { text: tx.type === 'WITHDRAW' ? money(tx.balanceAfter) : '—' },
    status: { text: statusLabel(tx.status), status: tx.status },
    more: { text: '' }
  }));
  dataTable(card, { width: screen.contentWidth, columns, rows: tableRows, rowHeight: 47 });
  tableFooter(card, {
    width: screen.contentWidth,
    shown: `Showing 1–${rows.length} of ${rows.length} ledger entries`,
    current: 1,
    pages: 1
  });
  return card;
}

function payoutDestinationCard(
  parent: FrameNode,
  operator: string,
  masked: string,
  preferred: boolean,
  status: string
): FrameNode {
  const node = vstack(`Payout · ${operator}`, {
    width: 344,
    height: 160,
    padding: 16,
    gap: 8,
    fill: colors.surfaceSunken,
    stroke: colors.border,
    radius: radii.md
  });
  parent.appendChild(node);
  const header = hstack('Destination header', { width: 312, height: 26, fill: null, align: 'CENTER' });
  node.appendChild(header);
  const tile = hstack('Operator tile', {
    width: 28,
    height: 28,
    fill: operator === 'MTN' ? colors.cobaltSoft : colors.warningSoft,
    radius: radii.sm,
    justify: 'CENTER',
    align: 'CENTER'
  });
  header.appendChild(tile);
  icon(tile, 'phone', operator === 'MTN' ? colors.cobaltText : colors.warning, 14);
  const copy = vstack('Operator copy', { gap: 0, fill: null, width: 150 });
  header.appendChild(copy);
  text(copy, `${operator} Mobile Money`, {
    token: 'caption',
    weight: 'semibold',
    color: colors.ink,
    width: 150,
    fill: false
  });
  text(copy, 'Verified payout account', {
    token: 'caption',
    color: colors.muted,
    width: 150,
    fill: false
  });
  spacer(header, 1, true);
  if (preferred) {
    tag(header, 'Preferred', 'success', { size: 'sm' });
  }
  text(node, masked, {
    size: 24,
    lineHeight: 30,
    weight: 'bold',
    color: colors.ink,
    letterSpacing: -0.3,
    width: 312,
    fill: false
  });
  const footer = hstack('Destination footer', { width: 312, height: 22, fill: null, justify: 'SPACE_BETWEEN', align: 'CENTER' });
  node.appendChild(footer);
  statusPill(footer, status, { size: 'sm' });
  button(footer, 'Manage', { variant: 'ghost', compact: true, trailingIcon: 'chevronRight' });
  return node;
}

export function B01Employees(): FrameNode {
  return appScreen(
    {
      nav: 'employees',
      breadcrumbs: ['AirliPay', 'Operations', 'Employees'],
      title: 'Employees',
      subtitle: '12,482 active employees across 18 employers. Showing the most recent roster entries.',
      actions: (row) => {
        button(row, 'Import', { variant: 'secondary', icon: 'upload', compact: true });
        button(row, 'Add employee', { variant: 'primary', icon: 'plus', compact: true });
      }
    },
    (body) => {
      const stats = hstack('Employee stats', {
        width: screen.contentWidth,
        height: 76,
        gap: 16,
        fill: null,
        align: 'CENTER'
      });
      body.appendChild(stats);
      miniStat(stats, {
        label: 'Active employees',
        value: '12,482',
        icon: 'users',
        tone: 'success',
        footnote: '+3.2%',
        width: 365
      });
      miniStat(stats, {
        label: 'Payout-ready',
        value: '12,150',
        icon: 'checkCircle',
        tone: 'brand',
        footnote: '97.3%',
        width: 365
      });
      miniStat(stats, {
        label: 'Missing destination',
        value: '14',
        icon: 'alert',
        tone: 'warning',
        footnote: 'needs action',
        width: 365
      });

      const filters = filterBar(body);
      searchField(filters, { width: 300, placeholder: 'Search name, employee ID or phone' });
      filterButton(filters, 'All employers', { icon: 'clients' });
      filterButton(filters, 'Status', { icon: 'filter' });
      spacer(filters, 1, true);
      text(filters, 'Updated 2m ago', {
        token: 'caption',
        color: colors.mutedLight,
        fill: false,
        hug: true
      });

      const main = hstack('Employee content', {
        width: screen.contentWidth,
        height: 584,
        gap: 16,
        fill: null,
        align: 'MIN'
      });
      body.appendChild(main);

      const tableCard = vstack('Employees table card', {
        width: 776,
        height: 584,
        fill: colors.surface,
        stroke: colors.border,
        radius: radii.md,
        clip: true
      });
      main.appendChild(tableCard);
      cardTitleBar(tableCard, {
        width: 776,
        title: 'Employee roster',
        subtitle: '8 shown',
        icon: 'users',
        action: 'Columns',
        actionIcon: 'sliders'
      });

      const columns: TableColumn[] = [
        { key: 'employee', label: 'EMPLOYEE', width: 290, type: 'identity' },
        { key: 'employer', label: 'EMPLOYER', width: 186 },
        { key: 'status', label: 'STATUS', width: 104, type: 'status' },
        { key: 'wallet', label: 'WALLET', width: 130, type: 'money', align: 'RIGHT' },
        { key: 'more', label: '', width: 26, type: 'action', align: 'RIGHT' }
      ];
      const rows: TableRow[] = employees.slice(0, 8).map((employee) => ({
        employee: {
          text: employee.name,
          sub: `${employee.employeeId} · ${employee.email}`,
          initials: employee.initials,
          avatarTone: employee.status === 'BLOCKED' ? 'error' : 'brand'
        },
        employer: { text: clientName(employee.clientId) },
        status: { text: statusLabel(employee.status), status: employee.status },
        wallet: { text: money(employee.balance) },
        more: { text: '' }
      }));
      dataTable(tableCard, {
        width: 776,
        columns,
        rows,
        rowHeight: 55,
        selectedIndex: 0
      });
      tableFooter(tableCard, {
        width: 776,
        shown: '8 of 12,482 employees',
        current: 1,
        pages: 624
      });

      const inspector = vstack('Employee inspector', {
        width: 336,
        height: 584,
        padding: 20,
        gap: 10,
        fill: colors.surface,
        stroke: colors.border,
        radius: radii.md
      });
      main.appendChild(inspector);
      const inspectorHeader = hstack('Inspector identity', { width: 296, height: 44, gap: 10, fill: null, align: 'CENTER' });
      inspector.appendChild(inspectorHeader);
      avatar(inspectorHeader, selectedEmployee.initials, {
        size: 40,
        bg: colors.cobaltSoft,
        color: colors.cobaltText
      });
      const identity = vstack('Inspector name', { gap: 1, fill: null, width: 214 });
      inspectorHeader.appendChild(identity);
      text(identity, selectedEmployee.name, {
        token: 'bodyStrong',
        weight: 'semibold',
        color: colors.ink,
        width: 214,
        fill: false
      });
      text(identity, selectedEmployee.employeeId, {
        token: 'caption',
        color: colors.muted,
        width: 214,
        fill: false
      });
      statusPill(inspectorHeader, selectedEmployee.status, { size: 'sm' });

      horizontalRule(inspector, 296);

      const balance = vstack('Inspector balance', {
        width: 296,
        height: 82,
        padding: 12,
        gap: 2,
        fill: colors.mintSoft,
        radius: radii.sm
      });
      inspector.appendChild(balance);
      text(balance, 'AVAILABLE BALANCE', {
        token: 'eyebrow',
        color: colors.muted,
        width: 272,
        fill: false
      });
      text(balance, money(selectedEmployee.balance), {
        token: 'h3',
        weight: 'bold',
        color: colors.onMintSoft,
        width: 272,
        fill: false
      });
      text(balance, 'Next payday 28 Oct 2026', {
        token: 'caption',
        color: colors.muted,
        width: 272,
        fill: false
      });

      keyValueRow(inspector, 'Employer', clientName(selectedEmployee.clientId), { width: 296 });
      keyValueRow(inspector, 'Base salary', money(selectedEmployee.baseSalary), { width: 296 });
      keyValueRow(inspector, 'Payout destination', `${selectedEmployee.operator} ${selectedEmployee.momoMasked}`, {
        width: 296
      });
      keyValueRow(inspector, 'Location', `${selectedEmployee.city}, ${selectedEmployee.region}`, {
        width: 296
      });

      horizontalRule(inspector, 296);
      const recentHeader = hstack('Recent activity header', {
        width: 296,
        height: 22,
        fill: null,
        justify: 'SPACE_BETWEEN',
        align: 'CENTER'
      });
      inspector.appendChild(recentHeader);
      text(recentHeader, 'Recent activity', {
        token: 'bodySmall',
        weight: 'semibold',
        color: colors.ink,
        fill: false,
        hug: true
      });
      text(recentHeader, 'View all', {
        token: 'caption',
        weight: 'semibold',
        color: colors.cobaltText,
        fill: false,
        hug: true
      });
      employeeTransactions(selectedEmployee.id)
        .slice(0, 2)
        .forEach((tx) => {
          const row = hstack('Recent activity row', { width: 296, height: 34, gap: 8, fill: null, align: 'CENTER' });
          inspector.appendChild(row);
          iconTile(row, tx.status === 'FAILED' ? 'alert' : 'arrowUpRight', {
            tone: tx.status === 'FAILED' ? 'error' : 'success',
            size: 24,
            iconSize: 12
          });
          const copy = vstack('Recent copy', { gap: 0, fill: null, width: 230 });
          row.appendChild(copy);
          text(copy, tx.status === 'FAILED' ? 'Withdrawal failed' : 'Withdrawal sent', {
            token: 'caption',
            weight: 'medium',
            color: colors.ink,
            width: 230,
            fill: false
          });
          text(copy, `${dateLabel(tx.date)} · ${money(tx.amount)}`, {
            token: 'caption',
            color: colors.muted,
            width: 230,
            fill: false
          });
        });

      spacer(inspector, 1, true);
      button(inspector, 'Open profile', { width: 296, variant: 'primary', trailingIcon: 'arrowRight' });
      button(inspector, 'Edit employee', { width: 296, variant: 'secondary', icon: 'edit' });
    }
  );
}

export function formSectionTitle(parent: FrameNode, title: string, subtitle: string, width: number): void {
  const row = hstack(`Form section · ${title}`, {
    width,
    height: 24,
    fill: null,
    justify: 'SPACE_BETWEEN',
    align: 'CENTER'
  });
  parent.appendChild(row);
  text(row, title, {
    token: 'bodyStrong',
    weight: 'semibold',
    color: colors.ink,
    fill: false,
    hug: true
  });
  text(row, subtitle, {
    token: 'caption',
    color: colors.mutedLight,
    fill: false,
    hug: true
  });
  horizontalRule(parent, width);
}

export function fieldRow(
  parent: FrameNode,
  left: FieldOptions,
  right: FieldOptions | null,
  width = 696
): FrameNode {
  const row = hstack('Form row', { width, gap: 16, fill: null, align: 'MIN' });
  parent.appendChild(row);
  field(row, { ...left, width: 340 });
  if (right) {
    field(row, { ...right, width: 340 });
  }
  return row;
}

function employeeFormBody(body: FrameNode, employee?: Employee): void {
  const form = vstack('Employee form', {
    width: 744,
    height: 740,
    padding: 24,
    gap: 13,
    fill: colors.surface,
    stroke: colors.border,
    radius: radii.md
  });
  body.appendChild(form);

  formSectionTitle(form, 'Identity', 'Employee details from the roster', 696);
  fieldRow(
    form,
    {
      label: 'Full name',
      value: employee?.name,
      placeholder: 'e.g. Awa Fongang',
      icon: 'profile',
      required: true
    },
    {
      label: 'Work email',
      value: employee?.email,
      placeholder: 'name@employer.cm',
      icon: 'mail',
      required: true
    }
  );
  fieldRow(
    form,
    {
      label: 'Date of birth',
      value: employee?.dob,
      placeholder: 'DD/MM/YYYY',
      icon: 'calendar',
      required: true
    },
    {
      label: 'Sex',
      value: employee?.sex === 'F' ? 'Female' : employee?.sex === 'M' ? 'Male' : undefined,
      placeholder: 'Select sex',
      variant: 'select',
      required: true
    }
  );

  formSectionTitle(form, 'Employment', 'Set the employer and payroll profile', 696);
  fieldRow(
    form,
    {
      label: 'Employer',
      value: employee ? clientName(employee.clientId) : undefined,
      placeholder: 'Select employer',
      variant: 'select',
      required: true
    },
    {
      label: 'Employee ID',
      value: employee?.employeeId,
      placeholder: 'e.g. EMP-10482',
      required: true
    }
  );
  fieldRow(
    form,
    {
      label: 'Base salary · monthly',
      value: employee ? money(employee.baseSalary) : undefined,
      placeholder: 'XAF 0',
      required: true
    },
    {
      label: 'Payout channel',
      value: employee ? `${employee.operator} Mobile Money` : 'Mobile money',
      placeholder: 'Select channel',
      variant: 'select',
      required: true
    }
  );

  formSectionTitle(form, 'Contact & address', 'Used for account recovery and location reporting', 696);
  fieldRow(
    form,
    {
      label: 'Street',
      value: employee?.street,
      placeholder: 'Street address',
      icon: 'mapPin'
    },
    {
      label: 'City',
      value: employee?.city,
      placeholder: 'City'
    }
  );
  fieldRow(
    form,
    {
      label: 'Region',
      value: employee?.region,
      placeholder: 'Select region',
      variant: 'select'
    },
    {
      label: 'Primary phone',
      value: employee?.phone,
      placeholder: '+237 6 00 00 00 00',
      icon: 'phone',
      required: true
    }
  );
  fieldRow(
    form,
    {
      label: 'Secondary phone',
      placeholder: '+237 6 00 00 00 00',
      icon: 'phone'
    },
    null
  );

  const footer = hstack('Form footer', { width: 696, height: 22, gap: 8, fill: null, align: 'CENTER' });
  form.appendChild(footer);
  icon(footer, 'info', colors.mutedLight, 13);
  text(footer, employee ? 'Changes are audited and visible to the employer.' : 'An invitation and payout setup link will be sent after creation.', {
    token: 'caption',
    color: colors.muted,
    fill: false,
    hug: true
  });

  if (employee) {
    const helper = vstack('Employee helper', {
      width: 368,
      height: 740,
      padding: 24,
      gap: 14,
      fill: colors.surface,
      stroke: colors.border,
      radius: radii.md
    });
    body.appendChild(helper);
    const identity = hstack('Helper identity', { width: 320, height: 44, gap: 10, fill: null, align: 'CENTER' });
    helper.appendChild(identity);
    avatar(identity, employee.initials, { size: 40 });
    const identityCopy = vstack('Helper identity copy', { gap: 1, fill: null, width: 270 });
    identity.appendChild(identityCopy);
    text(identityCopy, employee.name, {
      token: 'bodyStrong',
      weight: 'semibold',
      color: colors.ink,
      width: 270,
      fill: false
    });
    text(identityCopy, `${employee.employeeId} · ${clientName(employee.clientId)}`, {
      token: 'caption',
      color: colors.muted,
      width: 270,
      fill: false
    });
    horizontalRule(helper, 320);
    sectionHeader(helper, 'Record health', {
      width: 320,
      icon: 'shieldCheck'
    });
    keyValueRow(helper, 'Identity verified', 'Complete', { width: 320 });
    keyValueRow(helper, 'Payout destination', `${employee.operator} ${employee.momoMasked}`, { width: 320 });
    keyValueRow(helper, 'Employer match', 'Verified', { width: 320 });
    horizontalRule(helper, 320);
    sectionHeader(helper, 'Danger zone', { width: 320, icon: 'alert' });
    infoBanner(helper, {
      title: 'Deactivating stops new payouts',
      body: 'Ledger history is retained. Reactivation is available to an admin.',
      tone: 'warning',
      width: 320
    });
    button(helper, 'Deactivate employee', { width: 320, variant: 'danger', icon: 'pause' });
    spacer(helper, 1, true);
    text(helper, 'Last updated 18 Oct 2026 by Nadège Mballa', {
      token: 'caption',
      color: colors.mutedLight,
      width: 320,
      fill: false
    });
  } else {
    const helper = vstack('New employee helper', {
      width: 368,
      height: 740,
      padding: 24,
      gap: 16,
      fill: colors.surface,
      stroke: colors.border,
      radius: radii.md
    });
    body.appendChild(helper);
    sectionHeader(helper, 'Before you create', { width: 320, icon: 'info' });
    [
      { number: '1', title: 'Verify the employer', body: 'The employee inherits payout funding from this client.' },
      { number: '2', title: 'Confirm the destination', body: 'The employee chooses a mobile money or bank account at setup.' },
      { number: '3', title: 'Send the invitation', body: 'The AirliPay app completes activation and terms acceptance.' }
    ].forEach((step) => {
      const row = hstack('Setup step', { width: 320, height: 70, gap: 10, fill: null, align: 'MIN' });
      helper.appendChild(row);
      const number = hstack('Step number', {
        width: 26,
        height: 26,
        fill: colors.cobaltSoft,
        radius: 999,
        justify: 'CENTER',
        align: 'CENTER'
      });
      row.appendChild(number);
      text(number, step.number, {
        token: 'caption',
        weight: 'semibold',
        color: colors.cobaltText,
        align: 'CENTER',
        width: 26,
        fill: false
      });
      const copy = vstack('Step copy', { gap: 2, fill: null, width: 284 });
      row.appendChild(copy);
      text(copy, step.title, {
        token: 'caption',
        weight: 'semibold',
        color: colors.ink,
        width: 284,
        fill: false
      });
      text(copy, step.body, {
        token: 'caption',
        color: colors.muted,
        width: 284,
        fill: false
      });
    });
    horizontalRule(helper, 320);
    const importCard = vstack('Bulk import card', {
      width: 320,
      height: 210,
      padding: 16,
      gap: 10,
      fill: colors.surfaceSunken,
      stroke: colors.border,
      strokeWeight: 1,
      radius: radii.md
    });
    helper.appendChild(importCard);
    const importHeader = hstack('Import header', { width: 288, height: 20, gap: 7, fill: null, align: 'CENTER' });
    importCard.appendChild(importHeader);
    icon(importHeader, 'upload', colors.cobaltText, 15);
    text(importHeader, 'Adding a whole roster?', {
      token: 'caption',
      weight: 'semibold',
      color: colors.ink,
      fill: false,
      hug: true
    });
    text(importCard, 'Upload a CSV with up to 5,000 employees. We validate employer IDs and payout channels before creating anything.', {
      token: 'caption',
      color: colors.muted,
      width: 288,
      fill: false
    });
    button(importCard, 'Choose CSV file', { width: 288, variant: 'secondary', icon: 'upload' });
    button(importCard, 'Download template', { width: 288, variant: 'ghost', trailingIcon: 'download' });
    spacer(helper, 1, true);
    infoBanner(helper, {
      title: 'PII handling',
      body: 'Only authorised admins can view employee identity and contact data.',
      tone: 'info',
      width: 320
    });
  }
}

export function B02NewEmployee(): FrameNode {
  return appScreen(
    {
      nav: 'employees',
      breadcrumbs: ['Employees', 'New employee'],
      title: 'New employee',
      subtitle: 'Create an employee record for an AirliPay client. Required fields are marked.',
      actions: (row) => {
        button(row, 'Cancel', { variant: 'ghost' });
        button(row, 'Create employee', { variant: 'primary', icon: 'plus' });
      }
    },
    (body) => {
      const layout = hstack('Form layout', {
        width: screen.contentWidth,
        height: 740,
        gap: 16,
        fill: null,
        align: 'MIN'
      });
      body.appendChild(layout);
      employeeFormBody(layout);
    }
  );
}

export function B03EmployeeProfile(): FrameNode {
  return appScreen(employeePageOptions(selectedEmployee, 'transactions'), (body) => {
    employeeSnapshot(body, selectedEmployee);
    body.appendChild(employeeLedgerCard(selectedEmployee));
  });
}

export function B04MomoAccounts(): FrameNode {
  return appScreen(employeePageOptions(selectedEmployee, 'momo'), (body) => {
    employeeSnapshot(body, selectedEmployee);
    const row = hstack('Momo content', {
      width: screen.contentWidth,
      height: 517,
      gap: 16,
      fill: null,
      align: 'MIN'
    });
    body.appendChild(row);

    const left = vstack('Payout destinations card', {
      width: 744,
      height: 517,
      padding: 20,
      gap: 13,
      fill: colors.surface,
      stroke: colors.border,
      radius: radii.md
    });
    row.appendChild(left);
    sectionHeader(left, 'Payout destinations', {
      width: 704,
      subtitle: 'Preferred first, fallback second',
      icon: 'phone'
    });
    const cards = hstack('Destination cards', { width: 704, height: 160, gap: 16, fill: null, align: 'CENTER' });
    left.appendChild(cards);
    momoAccounts.forEach((account, index) =>
      payoutDestinationCard(cards, account.operator, account.phoneMasked, index === 0, account.status)
    );
    horizontalRule(left, 704);
    sectionHeader(left, 'Recent payouts to these accounts', { width: 704, icon: 'clock' });
    employeeTransactions(selectedEmployee.id)
      .slice(0, 3)
      .forEach((tx) => {
        const payoutRow = hstack('Recent payout row', {
          width: 704,
          height: 44,
          fill: null,
          align: 'CENTER'
        });
        left.appendChild(payoutRow);
        iconTile(payoutRow, 'phone', { tone: 'neutral', size: 26, iconSize: 13 });
        const copy = vstack('Payout copy', { gap: 1, fill: null, width: 440 });
        payoutRow.appendChild(copy);
        text(copy, `${tx.operator} · ${tx.destinationMasked}`, {
          token: 'caption',
          weight: 'medium',
          color: colors.ink,
          width: 440,
          fill: false
        });
        text(copy, dateTimeLabel(tx.date), {
          token: 'caption',
          color: colors.muted,
          width: 440,
          fill: false
        });
        spacer(payoutRow, 1, true);
        text(payoutRow, money(tx.amount), {
          token: 'caption',
          weight: 'semibold',
          color: colors.ink,
          fill: false,
          hug: true
        });
        statusPill(payoutRow, tx.status, { size: 'sm' });
      });
    const coolingNote = hstack('Destination note', {
      width: 704,
      height: 40,
      paddingX: 12,
      gap: 8,
      fill: colors.infoSoft,
      radius: radii.sm,
      align: 'CENTER'
    });
    left.appendChild(coolingNote);
    icon(coolingNote, 'info', colors.info, 14);
    text(coolingNote, 'New destinations enter a 24-hour cooling period before payouts.', {
      token: 'caption',
      color: colors.info,
      fill: false,
      hug: true
    });

    const right = vstack('Payout rules', {
      width: 368,
      height: 517,
      padding: 20,
      gap: 12,
      fill: colors.surface,
      stroke: colors.border,
      radius: radii.md
    });
    row.appendChild(right);
    sectionHeader(right, 'Payout rules', { width: 328, icon: 'sliders' });
    keyValueRow(right, 'Preferred', `MTN · ${momoAccounts[0]!.phoneMasked}`, { width: 328 });
    keyValueRow(right, 'Fallback', `Orange · ${momoAccounts[1]!.phoneMasked}`, { width: 328 });
    keyValueRow(right, 'Currency', 'XAF', { width: 328 });
    keyValueRow(right, 'Schedule', 'Payday + on demand', { width: 328 });
    horizontalRule(right, 328);
    sectionHeader(right, 'Account safety', { width: 328, icon: 'shieldCheck' });
    const safety = vstack('Safety steps', {
      width: 328,
      gap: 8,
      padding: 14,
      fill: colors.surfaceSunken,
      radius: radii.sm
    });
    right.appendChild(safety);
    [
      'Both accounts are verified against the employee name.',
      'Changes are blocked during a payout run.',
      'Notifications are sent on every change.'
    ].forEach((line) => {
      const item = hstack('Safety line', { width: 300, gap: 7, fill: null, align: 'MIN' });
      safety.appendChild(item);
      icon(item, 'checkCircle', colors.success, 13);
      text(item, line, {
        token: 'caption',
        color: colors.muted,
        width: 280,
        fill: false
      });
    });
    spacer(right, 1, true);
    tag(right, 'Data: user_mobile_money_accounts', 'brand', { icon: 'database', size: 'sm' });
    button(right, 'Update preference', { width: 328, variant: 'secondary', icon: 'edit' });
  });
}

export function B05Activity(): FrameNode {
  return appScreen(employeePageOptions(selectedEmployee, 'activity'), (body) => {
    employeeSnapshot(body, selectedEmployee);
    const card = vstack('Activity card', {
      width: screen.contentWidth,
      height: 517,
      fill: colors.surface,
      stroke: colors.border,
      radius: radii.md,
      clip: true
    });
    body.appendChild(card);
    cardTitleBar(card, {
      width: screen.contentWidth,
      title: 'Activity',
      subtitle: 'Account events and payout history',
      icon: 'activity',
      action: 'Export activity',
      actionIcon: 'download'
    });
    const toolbar = filterBar(card);
    segmented(toolbar, ['All events', 'Payouts', 'Profile'], 0);
    spacer(toolbar, 1, true);
    tag(toolbar, 'Fixture surface', 'warning', { icon: 'alert', size: 'sm' });
    filterButton(toolbar, 'Last 90 days', { icon: 'calendar' });

    activityFeed.slice(0, 6).forEach((item, index) => {
      activityRow(card, {
        title: item.title,
        detail: item.detail,
        date: item.date,
        actor: item.actor,
        meta: item.meta,
        tone: item.tone,
        width: screen.contentWidth
      });
      if (index < 5) {
        horizontalRule(card, screen.contentWidth);
      }
    });
    const footer = hstack('Activity footer', {
      width: screen.contentWidth,
      height: 40,
      paddingX: 20,
      gap: 7,
      fill: colors.warningSoft,
      align: 'CENTER'
    });
    card.appendChild(footer);
    icon(footer, 'alert', colors.warning, 14);
    text(footer, 'Illustrative feed. A real audit endpoint is required before this view ships.', {
      token: 'caption',
      color: colors.warning,
      fill: false,
      hug: true
    });
  });
}

export function B06BankAccounts(): FrameNode {
  return appScreen(employeePageOptions(selectedEmployee, 'bank'), (body) => {
    employeeSnapshot(body, selectedEmployee);
    const card = vstack('Bank accounts card', {
      width: screen.contentWidth,
      height: 517,
      padding: 20,
      gap: 16,
      fill: colors.surface,
      stroke: colors.border,
      radius: radii.md
    });
    body.appendChild(card);
    sectionHeader(card, 'Linked bank accounts', {
      width: 1088,
      subtitle: 'Used for larger settlements',
      icon: 'bank'
    });

    const accountRow = hstack('Bank cards', { width: 1088, height: 150, gap: 16, fill: null, align: 'CENTER' });
    card.appendChild(accountRow);
    bankAccounts.forEach((account, index) => {
      const node = vstack('Bank account', {
        width: 352,
        height: 150,
        padding: 16,
        gap: 6,
        fill: index === 0 ? colors.cobaltSoft : colors.surfaceSunken,
        stroke: index === 0 ? colors.cobalt : colors.border,
        radius: radii.md
      });
      accountRow.appendChild(node);
      const top = hstack('Bank top', { width: 320, height: 28, fill: null, align: 'CENTER' });
      node.appendChild(top);
      iconTile(top, 'bank', { tone: index === 0 ? 'brand' : 'neutral', size: 28, iconSize: 14 });
      const copy = vstack('Bank copy', { gap: 0, fill: null, width: 200 });
      top.appendChild(copy);
      text(copy, account.bank, {
        token: 'caption',
        weight: 'semibold',
        color: colors.ink,
        width: 200,
        fill: false
      });
      text(copy, account.label, {
        token: 'caption',
        color: colors.muted,
        width: 200,
        fill: false
      });
      spacer(top, 1, true);
      if (index === 0) {
        tag(top, 'Primary', 'brand', { size: 'sm' });
      }
      text(node, account.accountMasked, {
        size: 22,
        lineHeight: 28,
        weight: 'bold',
        color: colors.ink,
        width: 320,
        fill: false
      });
      const footer = hstack('Bank footer', { width: 320, height: 20, fill: null, justify: 'SPACE_BETWEEN', align: 'CENTER' });
      node.appendChild(footer);
      statusPill(footer, account.status, { size: 'sm' });
      text(footer, `Added ${account.added}`, {
        token: 'caption',
        color: colors.mutedLight,
        fill: false,
        hug: true
      });
    });

    horizontalRule(card, 1088);
    const lower = hstack('Bank lower', { width: 1088, height: 174, gap: 16, fill: null, align: 'MIN' });
    card.appendChild(lower);
    const settlement = vstack('Settlement settings', {
      width: 536,
      height: 174,
      padding: 16,
      gap: 8,
      fill: colors.surfaceSunken,
      radius: radii.md
    });
    lower.appendChild(settlement);
    text(settlement, 'Settlement settings', {
      token: 'bodyStrong',
      weight: 'semibold',
      color: colors.ink,
      width: 504,
      fill: false
    });
    text(settlement, 'Primary bank account', {
      token: 'caption',
      color: colors.muted,
      width: 504,
      fill: false
    });
    keyValueRow(settlement, 'Afriland First Bank', '•••• 4821', { width: 504 });
    divider(settlement, colors.border);
    keyValueRow(settlement, 'Auto-settle employer funding', 'Enabled', { width: 504, valueColor: colors.success });

    const statusCard = vstack('Verification card', {
      width: 536,
      height: 174,
      padding: 16,
      gap: 8,
      fill: colors.warningSoft,
      radius: radii.md
    });
    lower.appendChild(statusCard);
    const statusTitle = hstack('Verification title', { width: 504, height: 20, gap: 7, fill: null, align: 'CENTER' });
    statusCard.appendChild(statusTitle);
    icon(statusTitle, 'alert', colors.warning, 15);
    text(statusTitle, 'Fixture surface', {
      token: 'caption',
      weight: 'semibold',
      color: colors.warning,
      fill: false,
      hug: true
    });
    text(statusCard, 'The current bank page generates random accounts. The API exposes a list-banks endpoint; a real account model and verification flow are still required.', {
      token: 'caption',
      color: colors.inkSoft,
      width: 504,
      fill: false
    });
    button(statusCard, 'View API note', { variant: 'ghost', compact: true, trailingIcon: 'external' });

    const actionRow = hstack('Bank actions', { width: 1088, height: 38, gap: 8, fill: null, align: 'CENTER' });
    card.appendChild(actionRow);
    button(actionRow, 'Add bank account', { variant: 'secondary', icon: 'plus' });
    button(actionRow, 'Set primary account', { variant: 'ghost', icon: 'checkCircle' });
    spacer(actionRow, 1, true);
    tag(actionRow, 'Read-only in v1', 'neutral', { size: 'sm' });
  });
}

export function B07DebitCards(): FrameNode {
  return appScreen(employeePageOptions(selectedEmployee, 'cards'), (body) => {
    employeeSnapshot(body, selectedEmployee);
    const row = hstack('Cards content', {
      width: screen.contentWidth,
      height: 517,
      gap: 16,
      fill: null,
      align: 'MIN'
    });
    body.appendChild(row);

    const visual = vstack('Card visual card', {
      width: 744,
      height: 517,
      padding: 24,
      gap: 18,
      fill: colors.surface,
      stroke: colors.border,
      radius: radii.md
    });
    row.appendChild(visual);
    sectionHeader(visual, 'AirliPay debit card', {
      width: 696,
      subtitle: 'Concept exploration',
      icon: 'card'
    });
    const cardArt = frame('Debit card artwork', {
      width: 420,
      height: 252,
      fill: colors.brandSurface,
      radius: radii.xl,
      clip: true
    });
    visual.appendChild(cardArt);
    const glow = frame('Card glow', {
      width: 300,
      height: 300,
      fill: mix(colors.brandSurface, colors.mint, 0.18),
      radius: 999
    });
    cardArt.appendChild(glow);
    glow.x = 260;
    glow.y = -100;
    const brand = hstack('Card brand', { width: 360, height: 30, gap: 8, fill: null, align: 'CENTER' });
    cardArt.appendChild(brand);
    brand.x = 24;
    brand.y = 22;
    icon(brand, 'wallet', colors.onBrand, 20);
    text(brand, 'Awa Fongang', {
      token: 'caption',
      weight: 'semibold',
      color: colors.onBrand,
      fill: false,
      hug: true
    });
    const chip = frame('Card chip', {
      width: 40,
      height: 30,
      fill: colors.mint,
      radius: 6
    });
    cardArt.appendChild(chip);
    chip.x = 24;
    chip.y = 82;
    const chipLine = frame('Chip rule', { width: 28, height: 1, fill: colors.brandSurface });
    chip.appendChild(chipLine);
    chipLine.x = 6;
    chipLine.y = 15;
    text(cardArt, '••••  ••••  ••••  7321', {
      size: 22,
      lineHeight: 28,
      weight: 'semibold',
      color: colors.onBrand,
      letterSpacing: 1.4,
      width: 360,
      fill: false
    }).y = 138;
    const cardText = cardArt.children[cardArt.children.length - 1] as TextNode;
    cardText.x = 24;
    const holder = text(cardArt, 'AWA FONGANG', {
      token: 'micro',
      weight: 'semibold',
      color: colors.onBrandMuted,
      width: 240,
      fill: false
    });
    holder.x = 24;
    holder.y = 214;
    const network = text(cardArt, 'airlipay', {
      size: 16,
      weight: 'extrabold',
      lineHeight: 20,
      color: colors.mint,
      width: 120,
      align: 'RIGHT',
      fill: false
    });
    network.x = 276;
    network.y = 210;

    const description = vstack('Card copy', { width: 696, gap: 10, fill: null });
    visual.appendChild(description);
    text(description, 'A physical card, funded by the same wallet', {
      token: 'h3',
      color: colors.ink,
      width: 696,
      fill: false
    });
    text(description, 'This concept explores instant issuance, tap-to-pay and merchant controls. It is not a shipped capability and no card API exists today.', {
      token: 'bodySmall',
      color: colors.muted,
      width: 650,
      fill: false
    });
    const featureRow = hstack('Card features', { width: 696, height: 60, gap: 10, fill: null, align: 'CENTER' });
    description.appendChild(featureRow);
    [
      { icon: 'zap' as IconName, label: 'Instant issue' },
      { icon: 'lock' as IconName, label: 'Freeze anytime' },
      { icon: 'globe' as IconName, label: 'Tap to pay' }
    ].forEach((feature) => {
      const tile = hstack('Feature', {
        gap: 7,
        height: 32,
        paddingX: 10,
        fill: colors.surfaceSunken,
        radius: radii.sm,
        align: 'CENTER'
      });
      featureRow.appendChild(tile);
      icon(tile, feature.icon, colors.cobaltText, 14);
      text(tile, feature.label, {
        token: 'caption',
        weight: 'medium',
        color: colors.inkSoft,
        fill: false,
        hug: true
      });
    });

    const side = vstack('Card roadmap', {
      width: 368,
      height: 517,
      padding: 20,
      gap: 14,
      fill: colors.surface,
      stroke: colors.border,
      radius: radii.md
    });
    row.appendChild(side);
    tag(side, 'Concept · not shipped', 'warning', { icon: 'alert', size: 'sm' });
    text(side, 'What would need to exist', {
      token: 'h3',
      color: colors.ink,
      width: 328,
      fill: false
    });
    [
      'Card issuer and KYC partnership',
      'Wallet-to-card funding and limits',
      'Merchant controls and dispute handling',
      'Frozen / lost-card lifecycle'
    ].forEach((item, index) => {
      const rowItem = hstack('Roadmap item', { width: 328, height: 42, gap: 9, fill: null, align: 'CENTER' });
      side.appendChild(rowItem);
      const num = hstack('Roadmap number', {
        width: 22,
        height: 22,
        fill: colors.surfaceSunken,
        radius: 999,
        justify: 'CENTER',
        align: 'CENTER'
      });
      rowItem.appendChild(num);
      text(num, String(index + 1), {
        token: 'micro',
        weight: 'semibold',
        color: colors.muted,
        align: 'CENTER',
        width: 22,
        fill: false
      });
      text(rowItem, item, {
        token: 'caption',
        color: colors.inkSoft,
        width: 288,
        fill: false
      });
    });
    horizontalRule(side, 328);
    text(side, 'Not part of the current route map. The debit-cards page reuses the bank-accounts fixture today.', {
      token: 'caption',
      color: colors.muted,
      width: 328,
      fill: false
    });
    spacer(side, 1, true);
    button(side, 'Notify me when ready', { width: 328, variant: 'secondary', icon: 'bell', disabled: true });
  });
}

export function B08EditEmployee(): FrameNode {
  return appScreen(
    {
      nav: 'employees',
      breadcrumbs: ['Employees', selectedEmployee.name, 'Edit'],
      title: 'Edit employee',
      subtitle: `Update ${selectedEmployee.name}'s identity, employment and payout details.`,
      actions: (row) => {
        button(row, 'Cancel', { variant: 'ghost' });
        button(row, 'Save changes', { variant: 'primary', icon: 'check' });
      }
    },
    (body) => {
      const layout = hstack('Edit form layout', {
        width: screen.contentWidth,
        height: 740,
        gap: 16,
        fill: null,
        align: 'MIN'
      });
      body.appendChild(layout);
      employeeFormBody(layout, selectedEmployee);
    }
  );
}
