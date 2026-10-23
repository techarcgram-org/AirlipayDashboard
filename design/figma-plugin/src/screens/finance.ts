import { colors, mix, radii, screen } from '../tokens';
import {
  avatar,
  divider,
  frame,
  hstack,
  icon,
  logoLockup,
  setFillWidth,
  spacer,
  text,
  vstack
} from '../primitives';
import {
  button,
  dataTable,
  horizontalRule,
  iconTile,
  infoBanner,
  keyValueRow,
  progressBar,
  searchField,
  segmented,
  statusPill,
  tableFooter,
  tag,
  type TableColumn,
  type TableRow
} from '../patterns';
import { appScreen } from '../patterns/shell';
import {
  clientName,
  clientRef,
  clientTransactions,
  compactMoney,
  dateLabel,
  dateTimeLabel,
  employeeRef,
  formatNumber,
  invoiceStats,
  invoices,
  money,
  payRuns,
  shortDate,
  statusLabel,
  transactions,
  type Invoice,
  type Transaction
} from '../data';
import {
  cardTitleBar,
  filterBar,
  filterButton,
  invoiceTabs,
  miniStat
} from './shared';

const selectedInvoice = invoices[0]!;

function txTypeLabel(tx: Transaction): string {
  return tx.type === 'WITHDRAW' ? 'Withdrawal' : 'Payroll funding';
}

function txTypeTone(tx: Transaction): 'brand' | 'success' {
  return tx.type === 'WITHDRAW' ? 'brand' : 'success';
}

export function E01Transactions(): FrameNode {
  const withdrawals = transactions.filter((tx) => tx.type === 'WITHDRAW');
  const deposits = transactions.filter((tx) => tx.type === 'DEPOSIT');
  const withdrawalsTotal = withdrawals.reduce((sum, tx) => sum + tx.amount, 0);
  const depositsTotal = deposits.reduce((sum, tx) => sum + tx.amount, 0);
  const failed = withdrawals.filter((tx) => tx.status === 'FAILED').length;

  return appScreen(
    {
      nav: 'transactions',
      breadcrumbs: ['AirliPay', 'Operations', 'Transactions'],
      title: 'Transactions ledger',
      subtitle: 'Every funding movement and employee payout in one auditable ledger.',
      actions: (row) => {
        button(row, 'Export CSV', { variant: 'secondary', icon: 'download' });
      }
    },
    (body) => {
      const stats = hstack('Ledger stats', {
        width: screen.contentWidth,
        height: 76,
        gap: 16,
        fill: null,
        align: 'CENTER'
      });
      body.appendChild(stats);
      miniStat(stats, {
        label: 'Employer funding',
        value: money(depositsTotal),
        icon: 'arrowDownLeft',
        tone: 'success',
        footnote: `${deposits.length} deposits`,
        width: 365
      });
      miniStat(stats, {
        label: 'Employee payouts',
        value: money(withdrawalsTotal),
        icon: 'arrowUpRight',
        tone: 'brand',
        footnote: `${withdrawals.length} withdrawals`,
        width: 365
      });
      miniStat(stats, {
        label: 'Failed withdrawals',
        value: String(failed),
        icon: 'alert',
        tone: failed > 0 ? 'error' : 'success',
        footnote: 'needs review',
        width: 365
      });

      const toolbar = filterBar(body);
      searchField(toolbar, { width: 300, placeholder: 'Search reference, employee or phone' });
      segmented(toolbar, ['All', 'Withdrawals', 'Funding'], 0);
      filterButton(toolbar, '23 Oct 2026', { icon: 'calendar' });
      filterButton(toolbar, 'All employers', { icon: 'clients' });
      filterButton(toolbar, 'Status', { icon: 'filter' });
      spacer(toolbar, 1, true);
      text(toolbar, 'Updated live', {
        token: 'caption',
        color: colors.mutedLight,
        fill: false,
        hug: true
      });

      const card = vstack('Transactions card', {
        width: screen.contentWidth,
        height: 588,
        fill: colors.surface,
        stroke: colors.border,
        radius: radii.md,
        clip: true
      });
      body.appendChild(card);
      cardTitleBar(card, {
        width: screen.contentWidth,
        title: 'All transactions',
        subtitle: `${transactions.length} in this sample`,
        icon: 'transactions',
        action: 'Download CSV',
        actionIcon: 'download'
      });
      const columns: TableColumn[] = [
        { key: 'date', label: 'DATE', width: 140 },
        { key: 'transaction', label: 'TRANSACTION', width: 260 },
        { key: 'employee', label: 'EMPLOYEE', width: 200 },
        { key: 'employer', label: 'EMPLOYER', width: 150 },
        { key: 'amount', label: 'AMOUNT', width: 140, type: 'money', align: 'RIGHT' },
        { key: 'status', label: 'STATUS', width: 100, type: 'status', align: 'RIGHT' },
        { key: 'more', label: '', width: 98, type: 'action', align: 'RIGHT' }
      ];
      const rows: TableRow[] = transactions.slice(0, 7).map((tx) => ({
        date: { text: dateTimeLabel(tx.date).split(' · ')[0]!, sub: tx.date.slice(11, 16) },
        transaction: {
          text: txTypeLabel(tx),
          sub: `${tx.ref}${tx.operator ? ` · ${tx.operator} ${tx.destinationMasked ?? ''}` : ''}`
        },
        employee: {
          text: tx.actorName,
          sub: tx.employeeId ? (employeeRef(tx.employeeId)?.employeeId ?? tx.employeeId) : 'Treasury account'
        },
        employer: { text: clientName(tx.clientId) },
        amount: { text: money(tx.amount), color: tx.type === 'DEPOSIT' ? colors.success : colors.ink },
        status: { text: statusLabel(tx.status), status: tx.status },
        more: { text: '' }
      }));
      dataTable(card, { width: screen.contentWidth, columns, rows, rowHeight: 60 });
      tableFooter(card, {
        width: screen.contentWidth,
        shown: `Showing 1–7 of ${transactions.length} transactions`,
        current: 1,
        pages: 3
      });
    }
  );
}

export function E02Invoices(): FrameNode {
  const stats = invoiceStats();
  return appScreen(
    {
      nav: 'invoices',
      breadcrumbs: ['AirliPay', 'Operations', 'Invoices'],
      title: 'Invoices',
      subtitle: 'Reimbursement invoices generated from employee early-wage activity.',
      actions: (row) => {
        button(row, 'Export', { variant: 'secondary', icon: 'download' });
      }
    },
    (body) => {
      const statRow = hstack('Invoice stats', {
        width: screen.contentWidth,
        height: 76,
        gap: 16,
        fill: null,
        align: 'CENTER'
      });
      body.appendChild(statRow);
      miniStat(statRow, {
        label: 'Outstanding',
        value: compactMoney(stats.outstandingAmount),
        icon: 'invoices',
        tone: 'warning',
        footnote: `${stats.outstandingCount} invoices`,
        width: 365
      });
      miniStat(statRow, {
        label: 'Treated this period',
        value: compactMoney(stats.treatedAmount),
        icon: 'checkCircle',
        tone: 'success',
        footnote: `${stats.treatedCount} invoices`,
        width: 365
      });
      miniStat(statRow, {
        label: 'Awaiting client confirmation',
        value: String(stats.awaitingConfirmation),
        icon: 'clock',
        tone: 'brand',
        footnote: '1 employer',
        width: 365
      });

      const toolbar = filterBar(body);
      searchField(toolbar, { width: 300, placeholder: 'Search invoice number or client' });
      segmented(toolbar, ['All', 'Treated', 'Outstanding'], 0);
      filterButton(toolbar, 'All clients', { icon: 'clients' });
      filterButton(toolbar, '2026', { icon: 'calendar' });
      spacer(toolbar, 1, true);
      text(toolbar, 'Status writes stay on the invoice resource', {
        token: 'caption',
        color: colors.mutedLight,
        fill: false,
        hug: true
      });

      const card = vstack('Invoice table card', {
        width: screen.contentWidth,
        height: 584,
        fill: colors.surface,
        stroke: colors.border,
        radius: radii.md,
        clip: true
      });
      body.appendChild(card);
      cardTitleBar(card, {
        width: screen.contentWidth,
        title: 'Invoices',
        subtitle: `${invoices.length} in this year`,
        icon: 'invoices',
        action: 'Download all',
        actionIcon: 'download'
      });
      const columns: TableColumn[] = [
        { key: 'invoice', label: 'INVOICE', width: 220 },
        { key: 'client', label: 'CLIENT', width: 230 },
        { key: 'period', label: 'PERIOD', width: 210 },
        { key: 'amount', label: 'TOTAL AMOUNT', width: 160, type: 'money', align: 'RIGHT' },
        { key: 'status', label: 'STATUS', width: 140, type: 'status' },
        { key: 'due', label: 'DUE DATE', width: 128 }
      ];
      const rows: TableRow[] = invoices.slice(0, 7).map((invoice) => ({
        invoice: {
          text: invoice.number,
          sub: invoice.reference,
          strong: true
        },
        client: {
          text: clientName(invoice.clientId),
          sub: invoice.employeeCount + ' employees'
        },
        period: { text: `${shortDate(invoice.periodFrom)} – ${shortDate(invoice.periodTo)} 2026` },
        amount: { text: money(invoice.totalAmount) },
        status: {
          text:
            invoice.status === 'PENDING_CONFIRMATION'
              ? 'Pending'
              : invoice.status === 'NOT_TREATED'
                ? 'Not treated'
                : 'Treated',
          status: invoice.status
        },
        due: { text: dateLabel(invoice.dueDate) }
      }));
      dataTable(card, { width: screen.contentWidth, columns, rows, rowHeight: 57, selectedIndex: 0 });
      const summary = hstack('Invoice summary', {
        width: screen.contentWidth,
        height: 44,
        paddingX: 20,
        gap: 8,
        fill: colors.surfaceSunken,
        align: 'CENTER'
      });
      card.appendChild(summary);
      icon(summary, 'info', colors.cobaltText, 14);
      text(summary, `${stats.outstandingCount} invoices await action · ${stats.notTreated} not treated, ${stats.awaitingConfirmation} pending confirmation`, {
        token: 'caption',
        color: colors.inkSoft,
        fill: false,
        hug: true
      });
      spacer(summary, 1, true);
      text(summary, 'Overview “paid / unpaid” are metrics, not invoice statuses', {
        token: 'caption',
        color: colors.mutedLight,
        fill: false,
        hug: true
      });
      tableFooter(card, {
        width: screen.contentWidth,
        shown: `Showing 1–7 of ${invoices.length} invoices`,
        current: 1,
        pages: 2
      });
    }
  );
}

function invoiceLineRow(
  parent: FrameNode,
  label: string,
  amount: string,
  opts: { header?: boolean; strong?: boolean; width?: number } = {}
): void {
  const width = opts.width ?? 688;
  const row = hstack('Invoice line', {
    width,
    height: opts.header ? 22 : 28,
    fill: null,
    justify: 'SPACE_BETWEEN',
    align: 'CENTER'
  });
  parent.appendChild(row);
  text(row, label, {
    token: opts.header ? 'micro' : 'caption',
    weight: opts.header || opts.strong ? 'semibold' : 'regular',
    color: opts.header ? colors.mutedLight : colors.ink,
    fill: false,
    hug: true
  });
  text(row, amount, {
    token: opts.header ? 'micro' : 'caption',
    weight: opts.header || opts.strong ? 'semibold' : 'regular',
    color: opts.header ? colors.mutedLight : colors.ink,
    fill: false,
    hug: true
  });
}

function invoiceStatusCard(parent: FrameNode, invoice: Invoice): void {
  const card = vstack('Invoice status card', {
    width: 368,
    height: 258,
    padding: 20,
    gap: 10,
    fill: colors.surface,
    stroke: colors.border,
    radius: radii.md
  });
  parent.appendChild(card);
  const header = hstack('Status header', { width: 328, height: 22, fill: null, justify: 'SPACE_BETWEEN', align: 'CENTER' });
  card.appendChild(header);
  text(header, 'Invoice status', {
    token: 'bodyStrong',
    weight: 'semibold',
    color: colors.ink,
    fill: false,
    hug: true
  });
  statusPill(header, invoice.status, { size: 'sm' });
  const stamp = hstack('Status stamp', {
    width: 328,
    height: 44,
    paddingX: 12,
    gap: 9,
    fill: colors.successSoft,
    radius: radii.sm,
    align: 'CENTER'
  });
  card.appendChild(stamp);
  icon(stamp, 'checkCircle', colors.success, 17);
  const stampCopy = vstack('Stamp copy', { gap: 1, fill: null });
  stamp.appendChild(stampCopy);
  setFillWidth(stampCopy);
  text(stampCopy, 'Reimbursement paid', {
    token: 'caption',
    weight: 'semibold',
    color: colors.success,
    fill: false
  });
  text(stampCopy, `Treated ${dateLabel(invoice.paidAt ?? invoice.dueDate)}`, {
    token: 'caption',
    color: colors.muted,
    fill: false
  });
  const timeline = vstack('Invoice timeline', { width: 328, gap: 4, fill: null });
  card.appendChild(timeline);
  [
    { label: 'Issued', date: dateLabel(invoice.issuedDate), done: true },
    { label: 'Sent to client', date: dateLabel(invoice.issuedDate), done: true },
    { label: 'Client confirmed', date: '21 Oct 2026', done: true },
    { label: 'Treated', date: dateLabel(invoice.paidAt ?? invoice.dueDate), done: true }
  ].forEach((step) => {
    const row = hstack('Timeline step', { width: 328, height: 22, gap: 8, fill: null, align: 'CENTER' });
    timeline.appendChild(row);
    const mark = frame('Step dot', {
      width: 8,
      height: 8,
      fill: step.done ? colors.success : colors.borderStrong,
      radius: 999
    });
    row.appendChild(mark);
    text(row, step.label, {
      token: 'caption',
      weight: 'medium',
      color: colors.ink,
      fill: false,
      hug: true
    });
    spacer(row, 1, true);
    text(row, step.date, {
      token: 'caption',
      color: colors.muted,
      fill: false,
      hug: true
    });
  });
  const footer = hstack('Invoice status footer', { width: 328, height: 18, gap: 6, fill: null, align: 'CENTER' });
  card.appendChild(footer);
  icon(footer, 'info', colors.mutedLight, 13);
  text(footer, 'Treated by Jude Ekema · 22 Oct 2026', {
    token: 'caption',
    color: colors.mutedLight,
    fill: false,
    hug: true
  });
}

function invoicePaymentCard(parent: FrameNode, invoice: Invoice): void {
  const card = vstack('Invoice payment card', {
    width: 368,
    height: 156,
    padding: 20,
    gap: 6,
    fill: colors.surface,
    stroke: colors.border,
    radius: radii.md
  });
  parent.appendChild(card);
  const header = hstack('Payment header', { width: 328, height: 22, fill: null, justify: 'SPACE_BETWEEN', align: 'CENTER' });
  card.appendChild(header);
  text(header, 'Payment', {
    token: 'bodyStrong',
    weight: 'semibold',
    color: colors.ink,
    fill: false,
    hug: true
  });
  tag(header, 'Settled', 'success', { size: 'sm' });
  keyValueRow(card, 'Amount', money(invoice.totalAmount), { width: 328, strong: true });
  keyValueRow(card, 'Method', 'Bank transfer · Afriland', { width: 328 });
  keyValueRow(card, 'Reference', invoice.reference, { width: 328 });
}

function invoiceTransactionsCard(parent: FrameNode, invoice: Invoice): void {
  const client = clientRef(invoice.clientId);
  const sample = client ? clientTransactions(client.id).filter((tx) => tx.type === 'WITHDRAW').slice(0, 2) : [];
  const card = vstack('Invoice transactions card', {
    width: 368,
    height: 243,
    padding: 20,
    gap: 8,
    fill: colors.surface,
    stroke: colors.border,
    radius: radii.md
  });
  parent.appendChild(card);
  const header = hstack('Included transactions header', { width: 328, height: 22, fill: null, justify: 'SPACE_BETWEEN', align: 'CENTER' });
  card.appendChild(header);
  text(header, 'Included transactions', {
    token: 'bodyStrong',
    weight: 'semibold',
    color: colors.ink,
    fill: false,
    hug: true
  });
  tag(header, `${invoice.transactionCount} total`, 'brand', { size: 'sm' });
  text(card, `${invoice.employeeCount} employees · ${dateLabel(invoice.periodFrom)}–${dateLabel(invoice.periodTo)}`, {
    token: 'caption',
    color: colors.muted,
    width: 328,
    fill: false
  });
  sample.forEach((tx) => {
    const row = hstack('Invoice transaction sample', {
      width: 328,
      height: 34,
      gap: 8,
      fill: null,
      align: 'CENTER'
    });
    card.appendChild(row);
    iconTile(row, 'arrowUpRight', { tone: 'brand', size: 26, iconSize: 12 });
    const copy = vstack('Invoice transaction copy', { gap: 0, fill: null, width: 204 });
    row.appendChild(copy);
    text(copy, tx.actorName, {
      token: 'caption',
      weight: 'medium',
      color: colors.ink,
      fill: false
    });
    text(copy, `${shortDate(tx.date)} · ${tx.operator} ${tx.destinationMasked}`, {
      token: 'caption',
      color: colors.muted,
      fill: false
    });
    text(row, money(tx.amount), {
      token: 'caption',
      weight: 'semibold',
      color: colors.ink,
      fill: false,
      hug: true
    });
  });
  button(card, `Review all ${invoice.transactionCount}`, {
    width: 328,
    height: 34,
    variant: 'secondary',
    trailingIcon: 'arrowRight'
  });
  text(card, 'Samples shown. The invoice total is derived from the full period.', {
    token: 'caption',
    color: colors.mutedLight,
    width: 328,
    fill: false
  });
}

export function E03InvoiceDetail(): FrameNode {
  const invoice = selectedInvoice;
  const client = clientRef(invoice.clientId);
  return appScreen(
    {
      nav: 'invoices',
      breadcrumbs: ['Invoices', invoice.number],
      title: invoice.number,
      titleAddon: (row) => statusPill(row, invoice.status, { size: 'sm' }),
      subtitle: `${client?.name ?? 'Client'} · ${dateLabel(invoice.periodFrom)} – ${dateLabel(invoice.periodTo)} · Due ${dateLabel(invoice.dueDate)}`,
      actions: (row) => {
        button(row, 'Download PDF', { variant: 'secondary', icon: 'download' });
        button(row, 'More actions', { variant: 'ghost', trailingIcon: 'chevronDown' });
      },
      tabs: invoiceTabs('summary')
    },
    (body) => {
      const layout = hstack('Invoice detail layout', {
        width: screen.contentWidth,
        height: 689,
        gap: 16,
        fill: null,
        align: 'MIN'
      });
      body.appendChild(layout);

      const document = vstack('Invoice document', {
        width: 744,
        height: 689,
        padding: 28,
        gap: 14,
        fill: colors.surface,
        stroke: colors.border,
        radius: radii.md
      });
      layout.appendChild(document);

      const header = hstack('Invoice header', { width: 688, height: 34, fill: null, justify: 'SPACE_BETWEEN', align: 'CENTER' });
      document.appendChild(header);
      logoLockup(header, { width: 160, size: 26, markSize: 22, color: colors.ink });
      const headerMeta = vstack('Invoice header meta', { gap: 1, fill: null, align: 'MAX' });
      header.appendChild(headerMeta);
      text(headerMeta, 'INVOICE', {
        token: 'eyebrow',
        color: colors.mutedLight,
        align: 'RIGHT',
        width: 160,
        fill: false
      });
      text(headerMeta, invoice.number, {
        token: 'label',
        weight: 'semibold',
        color: colors.ink,
        align: 'RIGHT',
        width: 160,
        fill: false
      });

      const titleBlock = vstack('Invoice title block', { width: 688, gap: 3, fill: null });
      document.appendChild(titleBlock);
      text(titleBlock, 'Earned Wage Access Reimbursement Invoice', {
        token: 'h2',
        color: colors.ink,
        width: 688,
        fill: false
      });
      text(titleBlock, `Issued ${dateLabel(invoice.issuedDate)} · Payment terms ${dateLabel(invoice.dueDate)}`, {
        token: 'caption',
        color: colors.muted,
        width: 688,
        fill: false
      });

      horizontalRule(document, 688);

      const parties = hstack('Invoice parties', { width: 688, height: 82, gap: 40, fill: null, align: 'MIN' });
      document.appendChild(parties);
      const to = vstack('Invoice to', { width: 324, gap: 3, fill: null });
      parties.appendChild(to);
      text(to, 'TO', {
        token: 'eyebrow',
        color: colors.mutedLight,
        width: 324,
        fill: false
      });
      text(to, client?.name ?? 'Client', {
        token: 'bodyStrong',
        weight: 'semibold',
        color: colors.ink,
        width: 324,
        fill: false
      });
      text(to, `${client?.street ?? ''}\n${client?.city ?? ''}, ${client?.region ?? ''}\nTax ID ${client?.taxId ?? '—'}`, {
        token: 'caption',
        color: colors.muted,
        width: 324,
        fill: false
      });
      const from = vstack('Invoice from', { width: 324, gap: 3, fill: null });
      parties.appendChild(from);
      text(from, 'FROM', {
        token: 'eyebrow',
        color: colors.mutedLight,
        width: 324,
        fill: false
      });
      text(from, 'Techarcgram Company Limited', {
        token: 'bodyStrong',
        weight: 'semibold',
        color: colors.ink,
        width: 324,
        fill: false
      });
      text(from, 'Bakweri town, Buea\nSouthwest, Cameroon\nfinance@airlipay.cm', {
        token: 'caption',
        color: colors.muted,
        width: 324,
        fill: false
      });

      const summaryHeader = hstack('Summary header', { width: 688, height: 22, fill: null, justify: 'SPACE_BETWEEN', align: 'CENTER' });
      document.appendChild(summaryHeader);
      text(summaryHeader, 'SUMMARY OF SERVICES', {
        token: 'eyebrow',
        color: colors.mutedLight,
        fill: false,
        hug: true
      });
      text(summaryHeader, `${invoice.employeeCount} employees covered`, {
        token: 'caption',
        color: colors.muted,
        fill: false,
        hug: true
      });
      const box = vstack('Invoice line items', {
        width: 688,
        gap: 0,
        paddingX: 16,
        paddingTop: 10,
        paddingBottom: 10,
        fill: colors.surfaceSunken,
        radius: radii.sm
      });
      document.appendChild(box);
      invoiceLineRow(box, 'Description', 'Amount', { header: true, width: 656 });
      invoice.lineItems.forEach((item) => {
        invoiceLineRow(box, item.description, money(item.amount), { width: 656 });
      });
      invoiceLineRow(box, 'Total amount due', money(invoice.totalAmount), { strong: true, width: 656 });
      const totals = hstack('Invoice totals', { width: 688, height: 44, fill: null, justify: 'SPACE_BETWEEN', align: 'CENTER' });
      document.appendChild(totals);
      const totalCopy = vstack('Invoice total copy', { gap: 1, fill: null });
      totals.appendChild(totalCopy);
      text(totalCopy, 'PAYMENT DUE', {
        token: 'eyebrow',
        color: colors.mutedLight,
        fill: false
      });
      text(totalCopy, dateLabel(invoice.dueDate), {
        token: 'bodySmall',
        weight: 'semibold',
        color: colors.ink,
        fill: false
      });
      text(totals, money(invoice.totalAmount), {
        size: 24,
        lineHeight: 30,
        weight: 'bold',
        color: colors.ink,
        fill: false,
        hug: true
      });

      const terms = hstack('Invoice terms', { width: 688, height: 90, gap: 24, fill: null, align: 'MIN' });
      document.appendChild(terms);
      const payment = vstack('Payment details', { width: 324, gap: 3, fill: null });
      terms.appendChild(payment);
      text(payment, 'PAYMENT DETAILS', {
        token: 'eyebrow',
        color: colors.mutedLight,
        width: 324,
        fill: false
      });
      text(payment, 'Afriland First Bank · Douala\nAccount •••• 4821 · AirliPay SARL\nReference: ' + invoice.reference, {
        token: 'caption',
        color: colors.muted,
        width: 324,
        fill: false
      });
      const note = vstack('Invoice note', { width: 324, gap: 3, fill: null });
      terms.appendChild(note);
      text(note, 'NOTE', {
        token: 'eyebrow',
        color: colors.mutedLight,
        width: 324,
        fill: false
      });
      text(note, 'This invoice reflects early wage access advanced on behalf of the employer. Amounts include service fees and VAT. Quote the reference on payment.', {
        token: 'caption',
        color: colors.muted,
        width: 324,
        fill: false
      });

      const footer = hstack('Invoice footer', { width: 688, height: 28, fill: null, justify: 'SPACE_BETWEEN', align: 'CENTER' });
      document.appendChild(footer);
      text(footer, 'Techarcgram Company Limited · RCCM/NIU registered', {
        token: 'caption',
        color: colors.mutedLight,
        fill: false,
        hug: true
      });
      text(footer, 'Thank you.', {
        token: 'caption',
        weight: 'semibold',
        color: colors.muted,
        fill: false,
        hug: true
      });

      const rail = vstack('Invoice rail', {
        width: 368,
        height: 689,
        gap: 16,
        fill: null
      });
      layout.appendChild(rail);
      invoiceStatusCard(rail, invoice);
      invoicePaymentCard(rail, invoice);
      invoiceTransactionsCard(rail, invoice);
    }
  );
}

function featuredRunCard(parent: FrameNode): void {
  const run = payRuns[0]!;
  const card = hstack('Featured payout run', {
    width: screen.contentWidth,
    height: 168,
    padding: 20,
    gap: 28,
    fill: colors.brandSurface,
    radius: radii.lg,
    align: 'CENTER'
  });
  parent.appendChild(card);

  const left = vstack('Featured run details', { width: 350, gap: 3, fill: null });
  card.appendChild(left);
  const eyebrow = hstack('Featured run eyebrow', { width: 350, height: 18, gap: 7, fill: null, align: 'CENTER' });
  left.appendChild(eyebrow);
  icon(eyebrow, 'calendar', colors.onBrandFaint, 14);
  text(eyebrow, 'NEXT PAYOUT RUN', {
    token: 'eyebrow',
    color: colors.mint,
    fill: false,
    hug: true
  });
  statusPill(eyebrow, run.status, { size: 'sm' });
  text(left, '28 October 2026 · 09:00', {
    token: 'bodySmall',
    color: colors.onBrandMuted,
    width: 350,
    fill: false
  });
  text(left, compactMoney(run.amount), {
    size: 32,
    lineHeight: 38,
    weight: 'bold',
    color: colors.onBrand,
    letterSpacing: -0.6,
    width: 350,
    fill: false
  });
  text(left, `${formatNumber(run.employeeCount)} employees · ${run.clientCount} clients`, {
    token: 'caption',
    color: colors.onBrandFaint,
    width: 350,
    fill: false
  });

  const middle = vstack('Featured run progress', { width: 380, gap: 8, fill: null });
  card.appendChild(middle);
  const progressLabel = hstack('Run funding label', { width: 380, height: 18, fill: null, align: 'CENTER' });
  middle.appendChild(progressLabel);
  text(progressLabel, 'Funding progress', {
    token: 'caption',
    color: colors.onBrandMuted,
    fill: false,
    hug: true
  });
  spacer(progressLabel, 1, true);
  text(progressLabel, `${run.fundedPct}%`, {
    token: 'caption',
    weight: 'semibold',
    color: colors.onBrand,
    fill: false,
    hug: true
  });
  progressBar(middle, run.fundedPct, {
    width: 380,
    height: 8,
    color: colors.mint,
    track: mix(colors.brandSurface, colors.onBrand, 0.14)
  });
  text(middle, run.note, {
    token: 'caption',
    color: colors.onBrandFaint,
    width: 380,
    fill: false
  });
  const steps = hstack('Run stage chips', { width: 380, height: 22, gap: 6, fill: null, align: 'CENTER' });
  middle.appendChild(steps);
  tag(steps, 'Funding', 'mint', { size: 'sm' });
  icon(steps, 'chevronRight', colors.onBrandFaint, 12);
  tag(steps, 'Validation', 'neutral', { size: 'sm' });
  icon(steps, 'chevronRight', colors.onBrandFaint, 12);
  tag(steps, 'Settlement', 'neutral', { size: 'sm' });

  const right = vstack('Featured run actions', { width: 274, gap: 8, fill: null });
  card.appendChild(right);
  button(right, 'Review payout run', {
    width: 274,
    variant: 'primary',
    trailingIcon: 'arrowRight'
  });
  button(right, 'View run workspace', {
    width: 274,
    variant: 'inverse',
    icon: 'database'
  });
  text(right, 'Proposed orchestration surface', {
    token: 'caption',
    color: colors.onBrandFaint,
    width: 274,
    fill: false
  });
}

export function E04PayoutRuns(): FrameNode {
  return appScreen(
    {
      nav: 'payments',
      breadcrumbs: ['AirliPay', 'Operations', 'Payments'],
      title: 'Payout runs',
      titleAddon: (row) => tag(row, 'PROPOSED', 'warning', { icon: 'sparkle', size: 'sm' }),
      subtitle: 'Orchestrate employer funding, validation and employee settlement in one run.',
      actions: (row) => {
        button(row, 'Export', { variant: 'secondary', icon: 'download' });
        button(row, 'New payout run', { variant: 'primary', icon: 'plus' });
      }
    },
    (body) => {
      featuredRunCard(body);
      const lower = hstack('Payout runs lower', {
        width: screen.contentWidth,
        height: 556,
        gap: 16,
        fill: null,
        align: 'MIN'
      });
      body.appendChild(lower);

      const tableCard = vstack('Run history card', {
        width: 776,
        height: 556,
        fill: colors.surface,
        stroke: colors.border,
        radius: radii.md,
        clip: true
      });
      lower.appendChild(tableCard);
      cardTitleBar(tableCard, {
        width: 776,
        title: 'Run history',
        subtitle: 'Last 5 runs',
        icon: 'send',
        action: 'View all',
        actionIcon: 'chevronRight'
      });
      const columns: TableColumn[] = [
        { key: 'run', label: 'RUN', width: 200 },
        { key: 'date', label: 'DATE', width: 110 },
        { key: 'employees', label: 'EMPLOYEES', width: 90, type: 'money', align: 'RIGHT' },
        { key: 'amount', label: 'AMOUNT', width: 140, type: 'money', align: 'RIGHT' },
        { key: 'status', label: 'STATUS', width: 120, type: 'status', align: 'RIGHT' },
        { key: 'more', label: '', width: 76, type: 'action', align: 'RIGHT' }
      ];
      const rows: TableRow[] = payRuns.map((run) => ({
        run: { text: run.reference, sub: run.note, strong: true },
        date: { text: dateLabel(run.date) },
        employees: { text: formatNumber(run.employeeCount) },
        amount: { text: money(run.amount) },
        status: { text: run.status === 'NEEDS_ATTENTION' ? 'Attention' : statusLabel(run.status), status: run.status },
        more: { text: '' }
      }));
      dataTable(tableCard, { width: 776, columns, rows, rowHeight: 64 });
      const note = hstack('Run history note', {
        width: 776,
        height: 56,
        paddingX: 20,
        gap: 8,
        fill: colors.surfaceSunken,
        align: 'CENTER'
      });
      tableCard.appendChild(note);
      icon(note, 'alert', colors.warning, 15);
      text(note, '6 transfers failed in the 07 Oct run. Retry requires a new payout-run object.', {
        token: 'caption',
        color: colors.muted,
        fill: false,
        hug: true
      });
      spacer(note, 1, true);
      button(note, 'Open failure report', { variant: 'ghost', compact: true, trailingIcon: 'external' });
      tableFooter(tableCard, {
        width: 776,
        shown: '5 runs',
        current: 1,
        pages: 1
      });

      const checklist = vstack('Run checklist', {
        width: 336,
        height: 556,
        padding: 20,
        gap: 10,
        fill: colors.surface,
        stroke: colors.border,
        radius: radii.md
      });
      lower.appendChild(checklist);
      const title = hstack('Checklist title', { width: 296, height: 24, fill: null, justify: 'SPACE_BETWEEN', align: 'CENTER' });
      checklist.appendChild(title);
      text(title, 'Run checklist', {
        token: 'bodyStrong',
        weight: 'semibold',
        color: colors.ink,
        fill: false,
        hug: true
      });
      tag(title, '28 Oct', 'brand', { size: 'sm' });
      const funding = vstack('Checklist funding', {
        width: 296,
        gap: 6,
        padding: 12,
        fill: colors.mintSoft,
        radius: radii.sm
      });
      checklist.appendChild(funding);
      const fundingRow = hstack('Funding label', { width: 272, height: 18, fill: null, align: 'CENTER' });
      funding.appendChild(fundingRow);
      text(fundingRow, 'Funded', {
        token: 'caption',
        color: colors.muted,
        fill: false,
        hug: true
      });
      spacer(fundingRow, 1, true);
      text(fundingRow, '78%', {
        token: 'caption',
        weight: 'semibold',
        color: colors.onMintSoft,
        fill: false,
        hug: true
      });
      progressBar(funding, 78, { width: 272, height: 6, color: colors.onMintSoft, track: mix(colors.mintSoft, colors.onMintSoft, 0.14) });
      text(funding, 'XAF 2.8M still required from 2 employers', {
        token: 'caption',
        color: colors.muted,
        width: 272,
        fill: false
      });

      [
        { label: 'Funding complete', detail: 'Due 27 Oct · 16:00' },
        { label: 'Validate destinations', detail: '14 accounts missing' },
        { label: 'Super-admin approval', detail: 'Nadège Mballa' },
        { label: 'Settlement', detail: '28 Oct · 09:00' }
      ].forEach((step) => {
        const row = hstack('Checklist step', { width: 296, height: 34, gap: 8, fill: null, align: 'CENTER' });
        checklist.appendChild(row);
        iconTile(row, 'clock', { tone: 'neutral', size: 24, iconSize: 12 });
        const copy = vstack('Checklist copy', { gap: 0, fill: null, width: 250 });
        row.appendChild(copy);
        text(copy, step.label, {
          token: 'caption',
          weight: 'medium',
          color: colors.ink,
          width: 250,
          fill: false
        });
        text(copy, step.detail, {
          token: 'caption',
          color: colors.muted,
          width: 250,
          fill: false
        });
      });
      horizontalRule(checklist, 296);
      infoBanner(checklist, {
        title: 'New API required',
        body: 'The current payments page is a duplicate invoice list.',
        tone: 'warning',
        width: 296
      });
      spacer(checklist, 1, true);
      button(checklist, 'Open run workspace', { width: 296, variant: 'secondary', icon: 'database' });
      text(checklist, 'Static review only · no run can be created from this design.', {
        token: 'caption',
        color: colors.mutedLight,
        width: 296,
        fill: false
      });
    }
  );
}
