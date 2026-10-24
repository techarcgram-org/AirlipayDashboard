import { colors, mix, radii, screen } from '../tokens';
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
  button,
  dataTable,
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
  type FieldOptions,
  type TableColumn,
  type TableRow
} from '../patterns';
import { appScreen, type PageOptions } from '../patterns/shell';
import {
  clientRoster,
  clientTransactions,
  clients,
  dateLabel,
  dateTimeLabel,
  employeeTransactions,
  formatNumber,
  invoiceStats,
  invoices,
  money,
  shortDate,
  statusLabel,
  type Client,
  type Transaction
} from '../data';
import {
  cardTitleBar,
  clientTabs,
  clientTitlePrefix,
  detailsGrid,
  filterBar,
  filterButton,
  fixtureNotice,
  miniStat
} from './shared';
import { fieldRow, formSectionTitle } from './employees';

const selectedClient = clients[0]!;

function clientPageOptions(
  client: Client,
  active: 'transactions' | 'roster' | 'funding' | 'history'
): PageOptions {
  return {
    nav: 'clients',
    breadcrumbs: ['Clients', client.name],
    title: client.name,
    titlePrefix: clientTitlePrefix(client),
    titleAddon: (row) => statusPill(row, client.status, { size: 'sm' }),
    subtitle: `${client.industry} · ${formatNumber(client.employeeCount)} employees · Account manager ${client.manager}`,
    actions: (row) => {
      button(row, 'Payout settings', { variant: 'secondary', icon: 'settings' });
      iconButton(row, 'more', { size: 38, stroke: colors.border, background: colors.surface });
    },
    tabs: clientTabs(active)
  };
}

function snapshotField(parent: FrameNode, label: string, value: string, width: number): FrameNode {
  const node = vstack(`Client snapshot · ${label}`, { width, gap: 2, fill: null });
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

function clientSnapshot(parent: FrameNode, client: Client): FrameNode {
  const row = hstack('Client snapshot', {
    width: screen.contentWidth,
    height: 156,
    gap: 16,
    fill: null,
    align: 'CENTER'
  });
  parent.appendChild(row);

  const detailsCard = vstack('Company card', {
    width: 744,
    height: 156,
    padding: 20,
    gap: 12,
    fill: colors.surface,
    stroke: colors.border,
    radius: radii.md
  });
  row.appendChild(detailsCard);
  const labelRow = hstack('Company header', {
    width: 704,
    height: 18,
    fill: null,
    justify: 'SPACE_BETWEEN',
    align: 'CENTER'
  });
  detailsCard.appendChild(labelRow);
  text(labelRow, 'COMPANY & CONTACT', {
    token: 'eyebrow',
    color: colors.mutedLight,
    fill: false,
    hug: true
  });
  tag(labelRow, 'KYC verified', 'success', { icon: 'checkCircle', size: 'sm' });

  const grid = hstack('Company snapshot grid', {
    width: 704,
    height: 86,
    gap: 24,
    fill: null,
    align: 'MIN'
  });
  detailsCard.appendChild(grid);
  const columns = [
    [
      { label: 'Industry', value: client.industry },
      { label: 'Tax ID', value: client.taxId }
    ],
    [
      { label: 'Account email', value: client.email },
      { label: 'Primary phone', value: client.phone }
    ],
    [
      { label: 'Account manager', value: client.manager },
      { label: 'Joined', value: client.joined }
    ]
  ];
  const columnWidths = [232, 216, 208];
  columnWidths.forEach((width, index) => {
    const col = vstack('Company column', {
      width,
      gap: 10,
      fill: null
    });
    grid.appendChild(col);
    columnWidths[index] = width;
    columns[index]!.forEach((item) => snapshotField(col, item.label, item.value, width));
  });

  const payoutCard = vstack('Next client payout', {
    width: 368,
    height: 156,
    padding: 20,
    gap: 5,
    fill: colors.cobaltSoft,
    radius: radii.md
  });
  row.appendChild(payoutCard);
  const header = hstack('Payout header', { width: 328, height: 18, fill: null, align: 'CENTER' });
  payoutCard.appendChild(header);
  icon(header, 'calendar', colors.cobaltText, 15);
  text(header, 'NEXT PAYOUT', {
    token: 'eyebrow',
    color: colors.cobaltText,
    fill: false,
    hug: true
  });
  spacer(header, 1, true);
  tag(header, client.status === 'ACTIVE' ? 'Scheduled' : 'Needs setup', client.status === 'ACTIVE' ? 'brand' : 'warning', {
    size: 'sm'
  });
  text(payoutCard, dateLabel(client.nextPaymentDate), {
    size: 26,
    lineHeight: 32,
    weight: 'bold',
    color: colors.ink,
    width: 328,
    fill: false
  });
  text(payoutCard, money(client.revenue), {
    token: 'h3',
    weight: 'semibold',
    color: colors.cobaltText,
    width: 328,
    fill: false
  });
  const meta = hstack('Payout meta', { width: 328, height: 18, fill: null, justify: 'SPACE_BETWEEN', align: 'CENTER' });
  payoutCard.appendChild(meta);
  text(meta, `${formatNumber(client.employeeCount)} employees`, {
    token: 'caption',
    color: colors.muted,
    fill: false,
    hug: true
  });
  text(meta, `Funding ${money(client.fundingBalance)}`, {
    token: 'caption',
    color: colors.muted,
    fill: false,
    hug: true
  });
  text(payoutCard, `Commission ${client.commissionPct}% · ${client.bank} ${client.accountMasked}`, {
    token: 'caption',
    color: colors.muted,
    width: 328,
    fill: false
  });
  return row;
}

function clientTxCell(tx: Transaction): { text: string; sub?: string } {
  return {
    text: tx.type === 'WITHDRAW' ? 'Withdrawal' : 'Payroll funding',
    sub: `${tx.ref}${tx.operator ? ` · ${tx.operator} ${tx.destinationMasked ?? ''}` : ''}`
  };
}

function clientLedgerCard(client: Client): FrameNode {
  const card = vstack('Client ledger card', {
    width: screen.contentWidth,
    height: 517,
    fill: colors.surface,
    stroke: colors.border,
    radius: radii.md,
    clip: true
  });
  const all = clientTransactions(client.id);
  const rows = all.slice(0, 7);
  cardTitleBar(card, {
    width: screen.contentWidth,
    title: 'Transactions',
    subtitle: 'Funding and employee payouts',
    icon: 'transactions',
    action: 'Download CSV',
    actionIcon: 'download'
  });
  const toolbar = filterBar(card);
  segmented(toolbar, ['All', 'Withdrawals', 'Funding'], 0);
  spacer(toolbar, 1, true);
  filterButton(toolbar, 'Last 30 days', { icon: 'calendar' });
  filterButton(toolbar, 'All employees', { icon: 'users' });

  const columns: TableColumn[] = [
    { key: 'date', label: 'DATE', width: 140 },
    { key: 'transaction', label: 'TRANSACTION', width: 280 },
    { key: 'employee', label: 'EMPLOYEE', width: 200 },
    { key: 'amount', label: 'AMOUNT', width: 140, type: 'money', align: 'RIGHT' },
    { key: 'fee', label: 'FEE', width: 96, type: 'money', align: 'RIGHT' },
    { key: 'status', label: 'STATUS', width: 92, type: 'status', align: 'RIGHT' },
    { key: 'more', label: '', width: 124, type: 'action', align: 'RIGHT' }
  ];
  const tableRows: TableRow[] = rows.map((tx) => ({
    date: dateTimeLabel(tx.date),
    transaction: clientTxCell(tx),
    employee: { text: tx.actorName, sub: tx.employeeId ? 'Employee' : 'Employer treasury' },
    amount: { text: money(tx.amount), color: tx.type === 'DEPOSIT' ? colors.success : colors.ink },
    fee: { text: money(tx.fee), color: colors.muted },
    status: { text: statusLabel(tx.status), status: tx.status },
    more: { text: '' }
  }));
  dataTable(card, { width: screen.contentWidth, columns, rows: tableRows, rowHeight: 47 });
  tableFooter(card, {
    width: screen.contentWidth,
    shown: `Showing 1–${rows.length} of ${all.length} transactions`,
    current: 1,
    pages: Math.max(1, Math.ceil(all.length / 7))
  });
  return card;
}

function clientFormBody(body: FrameNode, client?: Client): void {
  const form = vstack('Client form', {
    width: 744,
    height: 740,
    padding: 24,
    gap: 13,
    fill: colors.surface,
    stroke: colors.border,
    radius: radii.md
  });
  body.appendChild(form);

  formSectionTitle(form, 'Company', 'Legal and commercial details', 696);
  fieldRow(
    form,
    {
      label: 'Client name',
      value: client?.name,
      placeholder: 'e.g. Penda Logistics',
      icon: 'clients',
      required: true
    },
    {
      label: 'Industry',
      value: client?.industry,
      placeholder: 'e.g. Freight & logistics',
      required: true
    }
  );
  fieldRow(
    form,
    {
      label: 'Tax ID',
      value: client?.taxId,
      placeholder: 'e.g. M0801224587',
      icon: 'file'
    },
    {
      label: 'Client commission',
      value: client ? `${client.commissionPct}%` : undefined,
      placeholder: 'e.g. 2.5%',
      required: true
    }
  );

  formSectionTitle(form, 'Primary contact & address', 'Used for billing and account recovery', 696);
  fieldRow(
    form,
    {
      label: 'Account email',
      value: client?.email,
      placeholder: 'finance@company.cm',
      icon: 'mail',
      required: true
    },
    {
      label: 'Primary phone',
      value: client?.phone,
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
    {
      label: 'Street',
      value: client?.street,
      placeholder: 'Street address',
      icon: 'mapPin'
    }
  );
  fieldRow(
    form,
    {
      label: 'City',
      value: client?.city,
      placeholder: 'City'
    },
    {
      label: 'Region',
      value: client?.region,
      placeholder: 'Select region',
      variant: 'select'
    }
  );

  formSectionTitle(form, 'Funding & access', 'The employer funds payouts before each run', 696);
  fieldRow(
    form,
    {
      label: 'Next payment date',
      value: client ? dateLabel(client.nextPaymentDate) : undefined,
      placeholder: 'DD/MM/YYYY',
      icon: 'calendar'
    },
    {
      label: 'Settlement bank',
      value: client?.bank,
      placeholder: 'Select bank account',
      variant: 'select',
      required: true
    }
  );
  fieldRow(
    form,
    {
      label: 'Bank account number',
      value: client?.accountMasked,
      placeholder: 'Account number',
      icon: 'bank',
      required: true
    },
    null
  );

  const footer = hstack('Form footer', { width: 696, height: 22, gap: 8, fill: null, align: 'CENTER' });
  form.appendChild(footer);
  icon(footer, 'mail', colors.cobaltText, 13);
  text(
    footer,
    client
      ? 'Access is unchanged. Use “Reset access” to send a new sign-in link.'
      : 'The primary contact receives a secure setup invitation by email.',
    {
      token: 'caption',
      color: colors.muted,
      fill: false,
      hug: true
    }
  );

  if (client) {
    const helper = vstack('Client helper', {
      width: 368,
      height: 740,
      padding: 24,
      gap: 14,
      fill: colors.surface,
      stroke: colors.border,
      radius: radii.md
    });
    body.appendChild(helper);
    const identity = hstack('Client helper identity', { width: 320, height: 44, gap: 10, fill: null, align: 'CENTER' });
    helper.appendChild(identity);
    clientTitlePrefix(client)(identity);
    const copy = vstack('Client helper copy', { gap: 1, fill: null, width: 270 });
    identity.appendChild(copy);
    text(copy, client.name, {
      token: 'bodyStrong',
      weight: 'semibold',
      color: colors.ink,
      width: 270,
      fill: false
    });
    text(copy, `${formatNumber(client.employeeCount)} employees · ${client.city}`, {
      token: 'caption',
      color: colors.muted,
      width: 270,
      fill: false
    });
    horizontalRule(helper, 320);
    sectionHeader(helper, 'Account health', { width: 320, icon: 'shieldCheck' });
    keyValueRow(helper, 'KYC & tax details', 'Verified', { width: 320 });
    keyValueRow(helper, 'Funding source', `${client.bank} ${client.accountMasked}`, { width: 320 });
    keyValueRow(helper, 'Next payout', dateLabel(client.nextPaymentDate), { width: 320 });
    horizontalRule(helper, 320);
    sectionHeader(helper, 'Access', { width: 320, icon: 'key' });
    button(helper, 'Reset client access', { width: 320, variant: 'secondary', icon: 'mail' });
    text(helper, 'A password is never displayed or created by an administrator.', {
      token: 'caption',
      color: colors.muted,
      width: 320,
      fill: false
    });
    horizontalRule(helper, 320);
    sectionHeader(helper, 'Danger zone', { width: 320, icon: 'alert' });
    infoBanner(helper, {
      title: 'Deactivation pauses all payouts',
      body: 'The workforce and billing history remain available.',
      tone: 'warning',
      width: 320
    });
    spacer(helper, 1, true);
    button(helper, 'Deactivate client', { width: 320, variant: 'danger', icon: 'pause' });
  } else {
    const helper = vstack('New client helper', {
      width: 368,
      height: 740,
      padding: 24,
      gap: 16,
      fill: colors.surface,
      stroke: colors.border,
      radius: radii.md
    });
    body.appendChild(helper);
    sectionHeader(helper, 'Onboarding path', { width: 320, icon: 'sparkle' });
    [
      { number: '1', title: 'Company details', body: 'Identity, tax ID and commission terms.' },
      { number: '2', title: 'Funding account', body: 'The employer funds payouts before the first run.' },
      { number: '3', title: 'Secure invitation', body: 'The primary contact sets a password and signs in.' }
    ].forEach((step) => {
      const row = hstack('Onboarding step', { width: 320, height: 64, gap: 10, fill: null, align: 'MIN' });
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
      const content = vstack('Step copy', { width: 284, gap: 2, fill: null });
      row.appendChild(content);
      text(content, step.title, {
        token: 'caption',
        weight: 'semibold',
        color: colors.ink,
        width: 284,
        fill: false
      });
      text(content, step.body, {
        token: 'caption',
        color: colors.muted,
        width: 284,
        fill: false
      });
    });
    horizontalRule(helper, 320);
    const invite = vstack('Invitation card', {
      width: 320,
      gap: 8,
      padding: 16,
      fill: colors.cobaltSoft,
      radius: radii.md
    });
    helper.appendChild(invite);
    const inviteHeader = hstack('Invitation header', { width: 288, height: 20, gap: 7, fill: null, align: 'CENTER' });
    invite.appendChild(inviteHeader);
    icon(inviteHeader, 'lock', colors.cobaltText, 15);
    text(inviteHeader, 'Replacing raw passwords', {
      token: 'caption',
      weight: 'semibold',
      color: colors.cobaltText,
      fill: false,
      hug: true
    });
    text(invite, 'This design uses an email invitation. Admin-created passwords are not shown and require a small backend change.', {
      token: 'caption',
      color: colors.inkSoft,
      width: 288,
      fill: false
    });
    button(invite, 'Send invitation on create', {
      width: 288,
      variant: 'primary',
      icon: 'mail',
      disabled: true
    });
    horizontalRule(helper, 320);
    sectionHeader(helper, 'Funding requirement', { width: 320, icon: 'bank' });
    keyValueRow(helper, 'First payout needs', 'Funded balance', { width: 320 });
    keyValueRow(helper, 'Minimum notice', '2 business days', { width: 320 });
    spacer(helper, 1, true);
    text(helper, 'Commission terms are locked after creation. Commercial changes require a super-admin override.', {
      token: 'caption',
      color: colors.muted,
      width: 320,
      fill: false
    });
  }
}

export function C01Clients(): FrameNode {
  return appScreen(
    {
      nav: 'clients',
      breadcrumbs: ['AirliPay', 'Operations', 'Clients'],
      title: 'Clients',
      subtitle: '18 live employers · XAF 46.6M covered this pay cycle · 4 payouts scheduled.',
      actions: (row) => {
        button(row, 'Export', { variant: 'secondary', icon: 'download', compact: true });
        button(row, 'Add client', { variant: 'primary', icon: 'plus', compact: true });
      }
    },
    (body) => {
      const stats = hstack('Client stats', {
        width: screen.contentWidth,
        height: 76,
        gap: 16,
        fill: null,
        align: 'CENTER'
      });
      body.appendChild(stats);
      miniStat(stats, {
        label: 'Active employers',
        value: '18',
        icon: 'clients',
        tone: 'brand',
        footnote: '+2 this quarter',
        width: 365
      });
      miniStat(stats, {
        label: 'Employees covered',
        value: '12,482',
        icon: 'users',
        tone: 'success',
        footnote: '+3.2%',
        width: 365
      });
      miniStat(stats, {
        label: 'Next scheduled payout',
        value: 'XAF 12.84M',
        icon: 'send',
        tone: 'info',
        footnote: '28 Oct',
        width: 365
      });

      const filters = filterBar(body);
      searchField(filters, { width: 300, placeholder: 'Search clients, contact or tax ID' });
      filterButton(filters, 'All industries', { icon: 'briefcase' });
      filterButton(filters, 'Status', { icon: 'filter' });
      spacer(filters, 1, true);
      filterButton(filters, 'Sort: Payout date', { icon: 'calendar' });

      const main = hstack('Client content', {
        width: screen.contentWidth,
        height: 584,
        gap: 16,
        fill: null,
        align: 'MIN'
      });
      body.appendChild(main);

      const tableCard = vstack('Client table card', {
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
        title: 'Employer portfolio',
        subtitle: '6 shown',
        icon: 'clients',
        action: 'Columns',
        actionIcon: 'sliders'
      });
      const columns: TableColumn[] = [
        { key: 'client', label: 'CLIENT', width: 280, type: 'identity' },
        { key: 'industry', label: 'INDUSTRY', width: 156 },
        { key: 'employees', label: 'EMPLOYEES', width: 96, type: 'money', align: 'RIGHT' },
        { key: 'payout', label: 'NEXT PAYOUT', width: 124 },
        { key: 'status', label: 'STATUS', width: 80, type: 'status', align: 'RIGHT' }
      ];
      const rows: TableRow[] = clients.map((client) => ({
        client: {
          text: client.name,
          sub: `${client.city} · ${client.manager}`,
          initials: client.monogram,
          avatarTone: client.status === 'BLOCKED' ? 'error' : client.status === 'PENDING' ? 'warning' : 'brand'
        },
        industry: { text: client.industry },
        employees: { text: formatNumber(client.employeeCount), color: colors.inkSoft },
        payout: { text: dateLabel(client.nextPaymentDate), sub: money(client.revenue) },
        status: { text: statusLabel(client.status), status: client.status }
      }));
      dataTable(tableCard, { width: 776, columns, rows, rowHeight: 64, selectedIndex: 0 });
      const portfolio = hstack('Portfolio note', {
        width: 776,
        height: 56,
        paddingX: 20,
        gap: 8,
        fill: colors.surfaceSunken,
        align: 'CENTER'
      });
      tableCard.appendChild(portfolio);
      icon(portfolio, 'invoices', colors.cobaltText, 15);
      const portfolioStats = invoiceStats();
      text(portfolio, `XAF ${(invoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0) / 1_000_000).toFixed(2)}M invoiced`, {
        token: 'caption',
        weight: 'semibold',
        color: colors.ink,
        fill: false,
        hug: true
      });
      spacer(portfolio, 1, true);
      text(portfolio, `${portfolioStats.outstandingCount} invoices outstanding`, {
        token: 'caption',
        color: colors.warning,
        fill: false,
        hug: true
      });
      tableFooter(tableCard, {
        width: 776,
        shown: '6 of 18 clients',
        current: 1,
        pages: 3
      });

      const inspector = vstack('Client inspector', {
        width: 336,
        height: 584,
        padding: 20,
        gap: 10,
        fill: colors.surface,
        stroke: colors.border,
        radius: radii.md
      });
      main.appendChild(inspector);
      const header = hstack('Client inspector header', { width: 296, height: 44, gap: 10, fill: null, align: 'CENTER' });
      inspector.appendChild(header);
      clientTitlePrefix(selectedClient)(header);
      const identity = vstack('Client inspector identity', { gap: 1, fill: null, width: 208 });
      header.appendChild(identity);
      text(identity, selectedClient.name, {
        token: 'bodyStrong',
        weight: 'semibold',
        color: colors.ink,
        width: 208,
        fill: false
      });
      text(identity, selectedClient.industry, {
        token: 'caption',
        color: colors.muted,
        width: 208,
        fill: false
      });
      statusPill(header, selectedClient.status, { size: 'sm' });

      horizontalRule(inspector, 296);
      const funding = vstack('Client funding', {
        width: 296,
        height: 88,
        padding: 12,
        gap: 3,
        fill: colors.cobaltSoft,
        radius: radii.sm
      });
      inspector.appendChild(funding);
      text(funding, 'AVAILABLE FUNDING', {
        token: 'eyebrow',
        color: colors.cobaltText,
        width: 272,
        fill: false
      });
      text(funding, money(selectedClient.fundingBalance), {
        token: 'h3',
        weight: 'bold',
        color: colors.ink,
        width: 272,
        fill: false
      });
      text(funding, `Covers ${formatNumber(selectedClient.employeeCount)} employees`, {
        token: 'caption',
        color: colors.muted,
        width: 272,
        fill: false
      });

      keyValueRow(inspector, 'Next payout', dateLabel(selectedClient.nextPaymentDate), { width: 296 });
      keyValueRow(inspector, 'Projected amount', money(selectedClient.revenue), { width: 296 });
      keyValueRow(inspector, 'Account manager', selectedClient.manager, { width: 296 });
      keyValueRow(inspector, 'Settlement account', `Afriland · ${selectedClient.accountMasked}`, {
        width: 296
      });
      horizontalRule(inspector, 296);
      const invoiceHeader = hstack('Invoice history header', {
        width: 296,
        height: 22,
        fill: null,
        justify: 'SPACE_BETWEEN',
        align: 'CENTER'
      });
      inspector.appendChild(invoiceHeader);
      text(invoiceHeader, 'Latest invoice', {
        token: 'bodySmall',
        weight: 'semibold',
        color: colors.ink,
        fill: false,
        hug: true
      });
      text(invoiceHeader, 'View all', {
        token: 'caption',
        weight: 'semibold',
        color: colors.cobaltText,
        fill: false,
        hug: true
      });
      const invoice = invoices.find((item) => item.clientId === selectedClient.id);
      if (invoice) {
        const row = hstack('Latest invoice row', { width: 296, height: 50, gap: 8, fill: null, align: 'CENTER' });
        inspector.appendChild(row);
        iconTile(row, 'invoices', { tone: 'brand', size: 28, iconSize: 14 });
        const copy = vstack('Invoice copy', { gap: 1, fill: null });
        row.appendChild(copy);
        setFillWidth(copy);
        text(copy, invoice.number, {
          token: 'caption',
          weight: 'semibold',
          color: colors.ink,
          fill: false
        });
        text(copy, `${money(invoice.totalAmount)} · ${dateLabel(invoice.issuedDate)}`, {
          token: 'caption',
          color: colors.muted,
          fill: false
        });
        statusPill(row, invoice.status, { size: 'sm' });
      }
      spacer(inspector, 1, true);
      button(inspector, 'Open client', { width: 296, variant: 'primary', trailingIcon: 'arrowRight' });
      button(inspector, 'View payouts', { width: 296, variant: 'secondary', icon: 'send' });
    }
  );
}

export function C02NewClient(): FrameNode {
  return appScreen(
    {
      nav: 'clients',
      breadcrumbs: ['Clients', 'New client'],
      title: 'New client',
      subtitle: 'Onboard an employer and connect the account that funds payroll.',
      actions: (row) => {
        button(row, 'Cancel', { variant: 'ghost' });
        button(row, 'Create client', { variant: 'primary', icon: 'plus' });
      }
    },
    (body) => {
      const layout = hstack('Client form layout', {
        width: screen.contentWidth,
        height: 740,
        gap: 16,
        fill: null,
        align: 'MIN'
      });
      body.appendChild(layout);
      clientFormBody(layout);
    }
  );
}

export function C03ClientProfile(): FrameNode {
  return appScreen(clientPageOptions(selectedClient, 'transactions'), (body) => {
    clientSnapshot(body, selectedClient);
    body.appendChild(clientLedgerCard(selectedClient));
  });
}

export function C04ClientRoster(): FrameNode {
  return appScreen(clientPageOptions(selectedClient, 'roster'), (body) => {
    const stats = hstack('Roster stats', {
      width: screen.contentWidth,
      height: 76,
      gap: 16,
      fill: null,
      align: 'CENTER'
    });
    body.appendChild(stats);
    miniStat(stats, {
      label: 'Workforce',
      value: formatNumber(selectedClient.employeeCount),
      icon: 'users',
      tone: 'brand',
      footnote: `${selectedClient.city}`,
      width: 365
    });
    miniStat(stats, {
      label: 'Active employees',
      value: '1,806',
      icon: 'checkCircle',
      tone: 'success',
      footnote: '98.0%',
      width: 365
    });
    miniStat(stats, {
      label: 'Payout account missing',
      value: '22',
      icon: 'alert',
      tone: 'warning',
      footnote: 'needs action',
      width: 365
    });

    const filters = filterBar(body);
    searchField(filters, { width: 300, placeholder: 'Search employee name or ID' });
    filterButton(filters, 'All statuses', { icon: 'filter' });
    filterButton(filters, 'Payout channel', { icon: 'phone' });
    spacer(filters, 1, true);
    button(filters, 'Import roster', { variant: 'secondary', icon: 'upload', compact: true });
    button(filters, 'Add employee', { variant: 'primary', icon: 'plus', compact: true });

    const card = vstack('Roster card', {
      width: screen.contentWidth,
      height: 537,
      fill: colors.surface,
      stroke: colors.border,
      radius: radii.md,
      clip: true
    });
    body.appendChild(card);
    cardTitleBar(card, {
      width: screen.contentWidth,
      title: 'Workforce roster',
      subtitle: '6 shown',
      icon: 'users',
      action: 'Download CSV',
      actionIcon: 'download'
    });
    const columns: TableColumn[] = [
      { key: 'employee', label: 'EMPLOYEE', width: 290, type: 'identity' },
      { key: 'employeeId', label: 'EMPLOYEE ID', width: 150 },
      { key: 'payout', label: 'PAYOUT DESTINATION', width: 220 },
      { key: 'salary', label: 'BASE SALARY', width: 140, type: 'money', align: 'RIGHT' },
      { key: 'wallet', label: 'WALLET', width: 160, type: 'money', align: 'RIGHT' },
      { key: 'status', label: 'STATUS', width: 128, type: 'status', align: 'RIGHT' }
    ];
    const roster = clientRoster(selectedClient.id);
    const rows: TableRow[] = roster.map((employee) => ({
      employee: {
        text: employee.name,
        sub: employee.email,
        initials: employee.initials,
        avatarTone: employee.status === 'PENDING' ? 'warning' : employee.status === 'DEACTIVATED' ? 'neutral' : 'brand'
      },
      employeeId: { text: employee.employeeId },
      payout: { text: `${employee.operator} ${employee.momoMasked}`, sub: employee.bank },
      salary: { text: money(employee.baseSalary) },
      wallet: { text: money(employee.balance) },
      status: { text: statusLabel(employee.status), status: employee.status }
    }));
    dataTable(card, { width: screen.contentWidth, columns, rows, rowHeight: 56 });
    const note = hstack('Roster note', {
      width: screen.contentWidth,
      height: 40,
      paddingX: 20,
      gap: 7,
      fill: colors.surfaceSunken,
      align: 'CENTER'
    });
    card.appendChild(note);
    icon(note, 'info', colors.muted, 14);
    text(note, 'Roster actions must write to the employee record, never the client record. The current implementation sends the wrong resource.', {
      token: 'caption',
      color: colors.warning,
      fill: false,
      hug: true
    });
    tableFooter(card, {
      width: screen.contentWidth,
      shown: `6 of ${formatNumber(selectedClient.employeeCount)} employees`,
      current: 1,
      pages: 307
    });
  });
}

export function C05ClientFunding(): FrameNode {
  return appScreen(clientPageOptions(selectedClient, 'funding'), (body) => {
    clientSnapshot(body, selectedClient);
    const card = vstack('Funding accounts card', {
      width: screen.contentWidth,
      height: 517,
      padding: 20,
      gap: 16,
      fill: colors.surface,
      stroke: colors.border,
      radius: radii.md
    });
    body.appendChild(card);
    const header = sectionHeader(card, 'Funding accounts', {
      width: 1088,
      subtitle: 'Employer money in, employee payouts out',
      icon: 'bank'
    });
    tag(header, 'Fixture surface', 'warning', { icon: 'alert', size: 'sm' });
    const accountRow = hstack('Funding account cards', {
      width: 1088,
      height: 150,
      gap: 16,
      fill: null,
      align: 'CENTER'
    });
    card.appendChild(accountRow);
    const banks = [
      { name: 'Afriland First Bank', masked: '•••• 4821', balance: selectedClient.fundingBalance, label: 'Primary funding' },
      { name: 'Ecobank Cameroon', masked: '•••• 7740', balance: 0, label: 'Backup funding' },
      { name: 'BICEC', masked: '•••• 1108', balance: 0, label: 'Verification pending' }
    ];
    banks.forEach((bank, index) => {
      const tile = vstack('Funding account', {
        width: 352,
        height: 150,
        padding: 16,
        gap: 5,
        fill: index === 0 ? colors.cobaltSoft : colors.surfaceSunken,
        stroke: index === 0 ? colors.cobalt : colors.border,
        radius: radii.md
      });
      accountRow.appendChild(tile);
      const top = hstack('Funding top', { width: 320, height: 28, fill: null, align: 'CENTER' });
      tile.appendChild(top);
      iconTile(top, 'bank', { tone: index === 0 ? 'brand' : 'neutral', size: 28, iconSize: 14 });
      const copy = vstack('Funding copy', { gap: 0, fill: null, width: 200 });
      top.appendChild(copy);
      text(copy, bank.name, {
        token: 'caption',
        weight: 'semibold',
        color: colors.ink,
        width: 200,
        fill: false
      });
      text(copy, bank.label, {
        token: 'caption',
        color: colors.muted,
        width: 200,
        fill: false
      });
      spacer(top, 1, true);
      statusPill(top, index === 2 ? 'PENDING' : 'VERIFIED', { size: 'sm' });
      text(tile, bank.masked, {
        size: 22,
        lineHeight: 28,
        weight: 'bold',
        color: colors.ink,
        width: 320,
        fill: false
      });
      text(tile, index === 0 ? money(bank.balance) : 'No balance yet', {
        token: 'caption',
        color: index === 0 ? colors.cobaltText : colors.muted,
        width: 320,
        fill: false
      });
      if (index === 0) {
        tag(tile, 'Primary', 'brand', { size: 'sm' });
      }
    });

    const lower = hstack('Funding lower', {
      width: 1088,
      height: 174,
      gap: 16,
      fill: null,
      align: 'MIN'
    });
    card.appendChild(lower);
    const schedule = vstack('Settlement schedule', {
      width: 536,
      height: 174,
      padding: 16,
      gap: 8,
      fill: colors.surfaceSunken,
      radius: radii.md
    });
    lower.appendChild(schedule);
    text(schedule, 'Settlement schedule', {
      token: 'bodyStrong',
      weight: 'semibold',
      color: colors.ink,
      width: 504,
      fill: false
    });
    keyValueRow(schedule, 'Next payout', dateLabel(selectedClient.nextPaymentDate), { width: 504 });
    keyValueRow(schedule, 'Projected amount', money(selectedClient.revenue), { width: 504 });
    keyValueRow(schedule, 'Funding close', '27 Oct 2026 · 16:00', { width: 504 });
    progressBar(schedule, 78, { width: 504, height: 6, color: colors.mint });

    const verification = vstack('Funding verification', {
      width: 536,
      height: 174,
      padding: 16,
      gap: 8,
      fill: colors.warningSoft,
      radius: radii.md
    });
    lower.appendChild(verification);
    const verificationHeader = hstack('Verification header', { width: 504, height: 20, gap: 7, fill: null, align: 'CENTER' });
    verification.appendChild(verificationHeader);
    icon(verificationHeader, 'alert', colors.warning, 15);
    text(verificationHeader, 'Fixture surface · needs API', {
      token: 'caption',
      weight: 'semibold',
      color: colors.warning,
      fill: false,
      hug: true
    });
    text(verification, 'Client bank accounts are randomly generated today. A dedicated client-bank model, verification state and funding webhook are required before this screen can ship.', {
      token: 'caption',
      color: colors.inkSoft,
      width: 504,
      fill: false
    });
    button(verification, 'Read data contract', { variant: 'ghost', compact: true, trailingIcon: 'external' });
    spacer(verification, 1, true);
    tag(verification, 'Read-only in v1', 'neutral', { size: 'sm' });

    const actionRow = hstack('Funding actions', {
      width: 1088,
      height: 38,
      gap: 8,
      fill: null,
      align: 'CENTER'
    });
    card.appendChild(actionRow);
    button(actionRow, 'Add funding account', { variant: 'secondary', icon: 'plus' });
    button(actionRow, 'Set primary account', { variant: 'ghost', icon: 'checkCircle' });
    spacer(actionRow, 1, true);
  });
}

export function C06PaymentHistory(): FrameNode {
  return appScreen(clientPageOptions(selectedClient, 'history'), (body) => {
    clientSnapshot(body, selectedClient);
    const card = vstack('Payment history card', {
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
      title: 'Payment history',
      subtitle: 'Invoices and billing periods',
      icon: 'invoices',
      action: 'Export history',
      actionIcon: 'download'
    });
    const toolbar = filterBar(card);
    segmented(toolbar, ['All invoices', 'Treated', 'Outstanding'], 0);
    spacer(toolbar, 1, true);
    filterButton(toolbar, '2026', { icon: 'calendar' });
    filterButton(toolbar, 'All statuses', { icon: 'filter' });

    const pendaInvoices = invoices.filter((invoice) => invoice.clientId === selectedClient.id);
    const columns: TableColumn[] = [
      { key: 'invoice', label: 'INVOICE', width: 240 },
      { key: 'period', label: 'PERIOD', width: 240 },
      { key: 'amount', label: 'AMOUNT', width: 160, type: 'money', align: 'RIGHT' },
      { key: 'status', label: 'STATUS', width: 160, type: 'status' },
      { key: 'due', label: 'DUE DATE', width: 140 },
      { key: 'action', label: '', width: 148, type: 'action', align: 'RIGHT' }
    ];
    const rows: TableRow[] = pendaInvoices.map((invoice) => ({
      invoice: { text: invoice.number, sub: invoice.reference, strong: true },
      period: { text: `${dateLabel(invoice.periodFrom)} – ${dateLabel(invoice.periodTo)}` },
      amount: { text: money(invoice.totalAmount) },
      status: { text: statusLabel(invoice.status), status: invoice.status },
      due: { text: dateLabel(invoice.dueDate) },
      action: { text: '' }
    }));
    dataTable(card, { width: screen.contentWidth, columns, rows, rowHeight: 69 });
    const summary = hstack('Payment summary strip', {
      width: screen.contentWidth,
      height: 56,
      paddingX: 20,
      gap: 8,
      fill: colors.surfaceSunken,
      align: 'CENTER'
    });
    card.appendChild(summary);
    icon(summary, 'invoices', colors.cobaltText, 15);
    const total = pendaInvoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0);
    text(summary, `Lifetime invoiced ${money(total)}`, {
      token: 'caption',
      weight: 'semibold',
      color: colors.ink,
      fill: false,
      hug: true
    });
    spacer(summary, 1, true);
    statusPill(summary, 'TREATED', { tone: 'success', label: `${pendaInvoices.filter((invoice) => invoice.status === 'TREATED').length} treated`, size: 'sm' });
    text(summary, 'Status writes must target the invoice resource', {
      token: 'caption',
      color: colors.warning,
      fill: false,
      hug: true
    });
    tableFooter(card, {
      width: screen.contentWidth,
      shown: `${pendaInvoices.length} invoices`,
      current: 1,
      pages: 1
    });
  });
}

export function C07ClientPayouts(): FrameNode {
  return appScreen(
    {
      nav: 'clients',
      breadcrumbs: ['Clients', 'Client payouts'],
      title: 'Client payouts',
      subtitle: 'Legacy payment schedule mapped to the redesigned employer payout view.',
      actions: (row) => {
        button(row, 'Export schedule', { variant: 'secondary', icon: 'download' });
        button(row, 'Review funding', { variant: 'primary', icon: 'send' });
      }
    },
    (body) => {
      fixtureNotice(body, 'LEGACY FIXTURE', screen.contentWidth);
      const stats = hstack('Payout stats', {
        width: screen.contentWidth,
        height: 76,
        gap: 16,
        fill: null,
        align: 'CENTER'
      });
      body.appendChild(stats);
      miniStat(stats, {
        label: 'Scheduled this week',
        value: 'XAF 12.84M',
        icon: 'send',
        tone: 'brand',
        footnote: '28 Oct',
        width: 365
      });
      miniStat(stats, {
        label: 'Funded employers',
        value: '4 of 6',
        icon: 'checkCircle',
        tone: 'success',
        footnote: 'ready to run',
        width: 365
      });
      miniStat(stats, {
        label: 'Funding gaps',
        value: 'XAF 3.28M',
        icon: 'alert',
        tone: 'warning',
        footnote: '2 employers',
        width: 365
      });
      const filters = filterBar(body);
      searchField(filters, { width: 300, placeholder: 'Search employer or payout' });
      filterButton(filters, 'All pay dates', { icon: 'calendar' });
      filterButton(filters, 'Funding status', { icon: 'filter' });
      spacer(filters, 1, true);
      segmented(filters, ['Week', 'Month'], 0);

      const card = vstack('Payout schedule card', {
        width: screen.contentWidth,
        height: 532,
        fill: colors.surface,
        stroke: colors.border,
        radius: radii.md,
        clip: true
      });
      body.appendChild(card);
      cardTitleBar(card, {
        width: screen.contentWidth,
        title: 'Payment schedule',
        subtitle: 'Next pay cycle · 28 Oct–02 Nov',
        icon: 'calendar',
        action: 'Open payments',
        actionIcon: 'chevronRight'
      });
      const columns: TableColumn[] = [
        { key: 'date', label: 'PAY DATE', width: 140 },
        { key: 'client', label: 'CLIENT', width: 250, type: 'identity' },
        { key: 'period', label: 'PERIOD ENDING', width: 140 },
        { key: 'employees', label: 'EMPLOYEES', width: 120, type: 'money', align: 'RIGHT' },
        { key: 'amount', label: 'AMOUNT', width: 160, type: 'money', align: 'RIGHT' },
        { key: 'funding', label: 'FUNDING', width: 150, type: 'status' },
        { key: 'action', label: '', width: 128, type: 'action', align: 'RIGHT' }
      ];
      const rows: TableRow[] = clients.map((client) => {
        const funded = client.fundingBalance >= client.revenue && client.revenue > 0;
        const fundingLabel = client.status === 'BLOCKED' ? 'At risk' : funded ? 'Funded' : 'Awaiting funding';
        const fundingTone = client.status === 'BLOCKED' ? 'error' : funded ? 'success' : 'warning';
        return {
          date: { text: dateLabel(client.nextPaymentDate) },
          client: {
            text: client.name,
            sub: client.industry,
            initials: client.monogram,
            avatarTone: fundableTone(client)
          },
          period: { text: '27 Oct 2026' },
          employees: { text: formatNumber(client.employeeCount) },
          amount: { text: money(client.revenue) },
          funding: {
            text: fundingLabel,
            status: funded ? 'FUNDED' : 'AWAITING',
            tone: fundingTone
          },
          action: { text: '' }
        };
      });
      dataTable(card, { width: screen.contentWidth, columns, rows, rowHeight: 64 });
      tableFooter(card, {
        width: screen.contentWidth,
        shown: '6 of 18 client payouts',
        current: 1,
        pages: 3
      });
    }
  );
}

function fundableTone(client: Client): 'error' | 'warning' | 'brand' {
  if (client.status === 'BLOCKED') {
    return 'error';
  }
  if (client.status === 'PENDING') {
    return 'warning';
  }
  return 'brand';
}

export function C08EditClient(): FrameNode {
  return appScreen(
    {
      nav: 'clients',
      breadcrumbs: ['Clients', selectedClient.name, 'Edit'],
      title: 'Edit client',
      subtitle: `Update ${selectedClient.name}'s company, contact and funding details.`,
      actions: (row) => {
        button(row, 'Cancel', { variant: 'ghost' });
        button(row, 'Save changes', { variant: 'primary', icon: 'check' });
      }
    },
    (body) => {
      const layout = hstack('Edit client layout', {
        width: screen.contentWidth,
        height: 740,
        gap: 16,
        fill: null,
        align: 'MIN'
      });
      body.appendChild(layout);
      clientFormBody(layout, selectedClient);
    }
  );
}
