import { colors, mix, radii, screen } from '../tokens';
import { routeArtSvg } from '../icons';
import {
  avatar,
  brandMark,
  divider,
  frame,
  hstack,
  icon,
  setFillWidth,
  setGrow,
  spacer,
  svg,
  text,
  vstack
} from '../primitives';
import {
  areaChart,
  avatarButton,
  button,
  card,
  checkbox,
  detailField,
  field,
  horizontalRule,
  iconButton,
  iconTile,
  keyValueRow,
  legendItem,
  metricCard,
  progressBar,
  sectionHeader,
  segmented,
  statusPill,
  tag
} from '../patterns';
import { appScreen } from '../patterns/shell';
import {
  attentionItems,
  chartDeposits,
  chartPayouts,
  compactMoney,
  currentUser,
  dateLabel,
  formatNumber,
  invoiceStats,
  money,
  notifications,
  socialStats,
  statusLabel,
  transactions
} from '../data';
import { cardTitleBar, detailsGrid, employeeTitlePrefix, miniStat } from './shared';

function isDarkTheme(): boolean {
  return colors.canvas === '#061322';
}

export function A01SignIn(): FrameNode {
  const outer = frame('A01 · Sign in', {
    width: screen.width,
    height: screen.height,
    fill: colors.canvas,
    clip: true
  });

  const brandPanel = frame('Brand panel', {
    width: 800,
    height: screen.height,
    fill: colors.brandSurface,
    clip: true
  });
  outer.appendChild(brandPanel);
  const art = svg(brandPanel, routeArtSvg(640, 360, colors.mint), 'Air route artwork');
  art.x = 250;
  art.y = 560;
  art.opacity = 0.9;

  const content = vstack('Brand copy', {
    width: 672,
    height: 848,
    gap: 0,
    fill: null
  });
  brandPanel.appendChild(content);
  content.x = 64;
  content.y = 56;

  const lockup = hstack('Brand lockup', {
    width: 240,
    height: 34,
    gap: 10,
    fill: null,
    align: 'CENTER'
  });
  content.appendChild(lockup);
  brandMark(lockup, 30);
  text(lockup, 'AirliPay', {
    size: 23,
    lineHeight: 28,
    weight: 'extrabold',
    color: colors.onBrand,
    letterSpacing: -0.6,
    fill: false,
    hug: true
  });
  text(lockup, 'OPERATIONS', {
    token: 'micro',
    weight: 'semibold',
    color: colors.onBrandFaint,
    fill: false,
    hug: true
  });

  const topSpace = frame('Brand spacer', { width: 1, height: 138, fill: null });
  content.appendChild(topSpace);

  text(content, 'THE MONEY DESK', {
    token: 'eyebrow',
    color: colors.mint,
    fill: false,
    width: 520
  });
  text(content, 'Payroll, clearly.\nFrom funding to final payout.', {
    size: 46,
    lineHeight: 54,
    weight: 'extrabold',
    color: colors.onBrand,
    letterSpacing: -1.2,
    width: 620,
    fill: false
  });
  const intro = text(
    content,
    'One calm place to manage employers, move money and keep every payout accountable — built on the same design language as the AirliPay app.',
    {
      token: 'body',
      color: colors.onBrandMuted,
      width: 520,
      fill: false
    }
  );
  intro.y = intro.y;

  const stats = hstack('Brand metrics', { width: 672, height: 92, gap: 12, fill: null, align: 'CENTER' });
  content.appendChild(stats);
  const statData = [
    { value: '12,482', label: 'active employees' },
    { value: '99.2%', label: 'payout success' },
    { value: '18', label: 'live employers' }
  ];
  statData.forEach((stat) => {
    const tile = vstack('Brand metric', {
      width: 216,
      height: 88,
      padding: 14,
      gap: 2,
      fill: mix(colors.brandSurface, '#FFFFFF', 0.07),
      stroke: mix(colors.brandSurface, '#FFFFFF', 0.12),
      radius: radii.md,
      justify: 'CENTER'
    });
    stats.appendChild(tile);
    text(tile, stat.value, {
      size: 24,
      lineHeight: 30,
      weight: 'bold',
      color: colors.onBrand,
      width: 188,
      fill: false
    });
    text(tile, stat.label, {
      token: 'caption',
      color: colors.onBrandMuted,
      width: 188,
      fill: false
    });
  });

  const flex = frame('Brand spacer', { width: 1, height: 1, fill: null });
  content.appendChild(flex);
  setGrow(flex);

  const footer = hstack('Brand footer', {
    width: 672,
    height: 36,
    gap: 10,
    fill: null,
    align: 'CENTER'
  });
  content.appendChild(footer);
  icon(footer, 'shieldCheck', colors.onBrandFaint, 15);
  text(footer, 'Role-based access · audit trail · session timeout', {
    token: 'caption',
    color: colors.onBrandFaint,
    fill: false,
    hug: true
  });
  spacer(footer, 1, true);
  text(footer, 'Yaoundé · Douala', {
    token: 'caption',
    color: colors.onBrandFaint,
    fill: false,
    hug: true
  });

  const right = frame('Sign-in panel', {
    width: 640,
    height: screen.height,
    fill: colors.canvas,
    clip: true
  });
  outer.appendChild(right);
  right.x = 800;

  const themePill = hstack('Theme indicator', {
    height: 28,
    gap: 7,
    paddingX: 10,
    fill: colors.surface,
    stroke: colors.border,
    radius: 999,
    align: 'CENTER'
  });
  right.appendChild(themePill);
  icon(themePill, isDarkTheme() ? 'moon' : 'sun', colors.muted, 14);
  text(themePill, isDarkTheme() ? 'Dark theme' : 'Light theme', {
    token: 'micro',
    weight: 'semibold',
    color: colors.muted,
    fill: false,
    hug: true
  });
  themePill.x = 640 - 32 - themePill.width;
  themePill.y = 32;

  const form = vstack('Sign-in card', {
    width: 448,
    gap: 18,
    padding: 32,
    fill: colors.surface,
    stroke: colors.border,
    radius: radii.xl
  });
  right.appendChild(form);
  form.x = 96;
  form.y = 152;

  const lockupRow = hstack('Console lockup', { width: 384, height: 28, gap: 8, fill: null, align: 'CENTER' });
  form.appendChild(lockupRow);
  brandMark(lockupRow, 24);
  text(lockupRow, 'Operations console', {
    token: 'caption',
    weight: 'semibold',
    color: colors.muted,
    fill: false,
    hug: true
  });
  spacer(lockupRow, 1, true);
  tag(lockupRow, 'v2.0', 'neutral', { size: 'sm' });

  const heading = vstack('Sign-in heading', { width: 384, gap: 6, fill: null });
  form.appendChild(heading);
  text(heading, 'Sign in to operations', {
    token: 'pageTitle',
    color: colors.ink,
    width: 384,
    fill: false
  });
  text(heading, 'Use the username issued by your AirliPay administrator.', {
    token: 'bodySmall',
    color: colors.muted,
    width: 384,
    fill: false
  });

  field(form, {
    label: 'Username',
    placeholder: 'e.g. nadege.mballa',
    width: 384,
    icon: 'profile',
    required: true
  });
  field(form, {
    label: 'Password',
    placeholder: 'Enter your password',
    width: 384,
    icon: 'lock',
    trailingIcon: 'eye',
    required: true
  });

  const optionsRow = hstack('Sign-in options', {
    width: 384,
    height: 22,
    fill: null,
    justify: 'SPACE_BETWEEN',
    align: 'CENTER'
  });
  form.appendChild(optionsRow);
  checkbox(optionsRow, 'Remember this device', true);
  text(optionsRow, 'Need help?', {
    token: 'caption',
    weight: 'semibold',
    color: colors.cobaltText,
    fill: false,
    hug: true
  });

  button(form, 'Sign in', {
    width: 384,
    height: 44,
    trailingIcon: 'arrowRight'
  });

  const note = hstack('Sign-in note', {
    width: 384,
    gap: 8,
    padding: 12,
    fill: colors.surfaceSunken,
    radius: radii.sm,
    align: 'MIN'
  });
  form.appendChild(note);
  icon(note, 'lock', colors.muted, 15);
  const noteCopy = vstack('Note copy', { width: 334, gap: 2, fill: null });
  note.appendChild(noteCopy);
  text(noteCopy, 'Access is managed by your administrator', {
    token: 'caption',
    weight: 'semibold',
    color: colors.inkSoft,
    width: 334,
    fill: false
  });
  text(noteCopy, 'Contact support@airlipay.cm if you cannot sign in.', {
    token: 'caption',
    color: colors.muted,
    width: 334,
    fill: false
  });

  const rightFooter = hstack('Sign-in footer', {
    width: 576,
    height: 20,
    fill: null,
    justify: 'SPACE_BETWEEN',
    align: 'CENTER'
  });
  right.appendChild(rightFooter);
  rightFooter.x = 32;
  rightFooter.y = screen.height - 52;
  text(rightFooter, 'AirliPay Operations', {
    token: 'caption',
    color: colors.mutedLight,
    fill: false,
    hug: true
  });
  const footerRight = hstack('Locale', { gap: 6, fill: null, align: 'CENTER' });
  rightFooter.appendChild(footerRight);
  icon(footerRight, 'globe', colors.mutedLight, 13);
  text(footerRight, 'EN · Cameroun', {
    token: 'caption',
    color: colors.mutedLight,
    fill: false,
    hug: true
  });

  return outer;
}

function overviewTransactions(parent: FrameNode, width: number): void {
  const shell = vstack('Overview transactions', {
    width,
    height: 218,
    fill: colors.surface,
    stroke: colors.border,
    radius: radii.md,
    clip: true
  });
  parent.appendChild(shell);
  cardTitleBar(shell, {
    width,
    title: 'Recent transactions',
    subtitle: 'Live across all employers',
    action: 'View ledger',
    icon: 'transactions'
  });

  const header = hstack('Mini table header', {
    width,
    height: 30,
    paddingX: 20,
    fill: colors.tableHead,
    align: 'CENTER'
  });
  shell.appendChild(header);
  const widths = [254, 200, 126, 104];
  ['TRANSACTION', 'EMPLOYEE', 'AMOUNT', 'STATUS'].forEach((label, index) => {
    const holder = hstack('Header cell', {
      width: widths[index],
      height: 30,
      fill: null,
      justify: index >= 2 ? 'MAX' : 'MIN',
      align: 'CENTER'
    });
    header.appendChild(holder);
    text(holder, label, {
      token: 'micro',
      weight: 'semibold',
      color: colors.muted,
      align: index >= 2 ? 'RIGHT' : 'LEFT',
      fill: false,
      hug: true
    });
  });
  if (widths.reduce((sum, value) => sum + value, 0) < width - 40) {
    spacer(header, 1, true);
  }

  transactions.slice(0, 3).forEach((tx) => {
    const row = hstack('Mini table row', {
      width,
      height: 44,
      paddingX: 20,
      fill: colors.surface,
      align: 'CENTER'
    });
    shell.appendChild(row);
    const txCell = hstack('Transaction cell', { width: 254, gap: 8, fill: null, align: 'CENTER' });
    row.appendChild(txCell);
    iconTile(txCell, tx.type === 'DEPOSIT' ? 'arrowDownLeft' : 'arrowUpRight', {
      tone: tx.type === 'DEPOSIT' ? 'success' : 'brand',
      size: 24,
      iconSize: 13
    });
    const txCopy = vstack('Transaction copy', { width: 216, gap: 1, fill: null });
    txCell.appendChild(txCopy);
    text(txCopy, tx.type === 'DEPOSIT' ? 'Payroll funding' : 'Early withdrawal', {
      token: 'caption',
      weight: 'semibold',
      color: colors.ink,
      width: 216,
      fill: false
    });
    text(txCopy, `${tx.ref} · ${tx.type === 'WITHDRAW' ? tx.operator : 'Bank transfer'}`, {
      token: 'caption',
      color: colors.muted,
      width: 216,
      fill: false
    });

    const employee = hstack('Employee cell', { width: 200, fill: null, align: 'CENTER' });
    row.appendChild(employee);
    text(employee, tx.actorName, {
      token: 'caption',
      color: colors.inkSoft,
      width: 200,
      fill: false
    });
    const amount = hstack('Amount cell', { width: 126, fill: null, justify: 'MAX', align: 'CENTER' });
    row.appendChild(amount);
    text(amount, money(tx.amount), {
      token: 'caption',
      weight: 'semibold',
      color: colors.ink,
      align: 'RIGHT',
      fill: false,
      hug: true
    });
    const status = hstack('Status cell', { width: 104, fill: null, justify: 'MAX', align: 'CENTER' });
    row.appendChild(status);
    statusPill(status, tx.status, { size: 'sm' });
    const rule = frame('Row rule', { width, height: 1, fill: colors.border });
    shell.appendChild(rule);
  });
}

function attentionCard(parent: FrameNode, width: number): void {
  const shell = vstack('Needs attention', {
    width,
    height: 218,
    fill: colors.surface,
    stroke: colors.border,
    radius: radii.md,
    clip: true
  });
  parent.appendChild(shell);
  cardTitleBar(shell, {
    width,
    title: 'Needs attention',
    subtitle: '3 items',
    action: 'Review',
    icon: 'alert'
  });
  attentionItems.slice(0, 3).forEach((item, index) => {
    const row = hstack('Attention row', {
      width,
      height: 52,
      gap: 10,
      paddingX: 20,
      fill: null,
      align: 'CENTER'
    });
    shell.appendChild(row);
    const style = item.tone === 'error' ? 'error' : item.tone === 'warning' ? 'warning' : 'info';
    iconTile(row, style === 'error' ? 'alert' : style === 'warning' ? 'clock' : 'info', {
      tone: style,
      size: 28,
      iconSize: 14
    });
    const copy = vstack('Attention copy', { gap: 1, fill: null, width: 224 });
    row.appendChild(copy);
    text(copy, item.title, {
      token: 'caption',
      weight: 'semibold',
      color: colors.ink,
      width: 224,
      fill: false
    });
    text(copy, item.detail, {
      token: 'caption',
      color: colors.muted,
      width: 224,
      fill: false
    });
    spacer(row, 1, true);
    icon(row, 'chevronRight', colors.mutedLight, 14);
    if (index < 2) {
      const rule = frame('Row rule', { width, height: 1, fill: colors.border });
      shell.appendChild(rule);
    }
  });
}

function nextRunCard(parent: FrameNode, width: number): void {
  const node = vstack('Next payout run', {
    width,
    height: 336,
    padding: 20,
    gap: 10,
    fill: colors.surface,
    stroke: colors.border,
    radius: radii.md
  });
  parent.appendChild(node);

  const top = hstack('Next run header', {
    width: width - 40,
    height: 22,
    fill: null,
    justify: 'SPACE_BETWEEN',
    align: 'CENTER'
  });
  node.appendChild(top);
  const topCopy = hstack('Next run label', { gap: 7, fill: null, align: 'CENTER' });
  top.appendChild(topCopy);
  icon(topCopy, 'calendar', colors.muted, 15);
  text(topCopy, 'Next payout run', {
    token: 'label',
    weight: 'semibold',
    color: colors.ink,
    fill: false,
    hug: true
  });
  statusPill(top, socialStats.nextRun.status, { size: 'sm' });

  const amountBlock = vstack('Next run amount', { width: width - 40, gap: 1, fill: null });
  node.appendChild(amountBlock);
  text(amountBlock, '28 October 2026 · 09:00', {
    token: 'bodySmall',
    color: colors.muted,
    width: width - 40,
    fill: false
  });
  text(amountBlock, compactMoney(socialStats.nextRun.amount), {
    token: 'metric',
    color: colors.ink,
    width: width - 40,
    fill: false
  });

  text(node, `${formatNumber(socialStats.nextRun.employeeCount)} employees · ${socialStats.nextRun.clientCount} clients`, {
    token: 'caption',
    color: colors.muted,
    width: width - 40,
    fill: false
  });

  horizontalRule(node, width - 40);

  const funding = hstack('Funding header', {
    width: width - 40,
    height: 18,
    fill: null,
    justify: 'SPACE_BETWEEN',
    align: 'CENTER'
  });
  node.appendChild(funding);
  text(funding, 'Funded', {
    token: 'caption',
    color: colors.muted,
    fill: false,
    hug: true
  });
  text(funding, `${socialStats.nextRun.fundedPct}%`, {
    token: 'caption',
    weight: 'semibold',
    color: colors.ink,
    fill: false,
    hug: true
  });
  progressBar(node, socialStats.nextRun.fundedPct, {
    width: width - 40,
    height: 6,
    color: colors.mint
  });

  const steps = hstack('Run steps', {
    width: width - 40,
    height: 22,
    gap: 6,
    fill: null,
    align: 'CENTER'
  });
  node.appendChild(steps);
  tag(steps, 'Funding', 'success', { size: 'sm' });
  icon(steps, 'chevronRight', colors.mutedLight, 12);
  tag(steps, 'Validation', 'neutral', { size: 'sm' });
  icon(steps, 'chevronRight', colors.mutedLight, 12);
  tag(steps, 'Settled', 'neutral', { size: 'sm' });

  const note = hstack('Funding note', { width: width - 40, height: 16, gap: 6, fill: null, align: 'CENTER' });
  node.appendChild(note);
  icon(note, 'clock', colors.warning, 13);
  text(note, 'Funding closes 27 Oct at 16:00', {
    token: 'caption',
    color: colors.muted,
    fill: false,
    hug: true
  });

  button(node, 'Review payout run', {
    width: width - 40,
    height: 36,
    variant: 'secondary',
    trailingIcon: 'arrowRight'
  });
}

export function A02Overview(): FrameNode {
  return appScreen(
    {
      nav: 'overview',
      breadcrumbs: ['AirliPay', 'Operations', 'Overview'],
      title: 'Operations overview',
      subtitle: 'Thursday, 23 October 2026 · All times WAT',
      actions: (row) => {
        button(row, 'Export', { variant: 'secondary', icon: 'download' });
        button(row, 'New pay run', { variant: 'primary', icon: 'plus' });
      }
    },
    (body) => {
      const invoice = invoiceStats();
      const kpis = hstack('KPI row', {
        width: screen.contentWidth,
        height: 128,
        gap: 16,
        fill: null,
        align: 'CENTER'
      });
      body.appendChild(kpis);
      metricCard(kpis, {
        label: 'Payroll volume',
        value: compactMoney(socialStats.payrollVolume),
        change: socialStats.payrollChange,
        changeTone: 'up',
        icon: 'trendUp',
        series: chartDeposits,
        seriesColor: colors.chartDeposit,
        width: 270
      });
      metricCard(kpis, {
        label: 'Active employees',
        value: formatNumber(socialStats.activeEmployees),
        change: socialStats.activeEmployeesChange,
        changeTone: 'up',
        icon: 'users',
        series: chartPayouts,
        seriesColor: colors.chartPayout,
        width: 270
      });
      metricCard(kpis, {
        label: 'Payout success',
        value: `${socialStats.payoutSuccess}%`,
        change: '-0.3pp',
        changeTone: 'down',
        icon: 'checkCircle',
        series: [96, 97, 96, 98, 99, 99, 98, 99, 99, 100, 99, 99],
        seriesColor: colors.chartPayout,
        width: 270
      });
      metricCard(kpis, {
        label: 'Outstanding invoices',
        value: compactMoney(invoice.outstandingAmount),
        change: `${invoice.outstandingCount} open`,
        changeTone: 'neutral',
        footnote: 'awaiting action',
        icon: 'invoices',
        series: [42, 38, 45, 40, 31, 36, 29, 33, 27, 31, 24, 26],
        seriesColor: colors.warning,
        width: 270
      });

      const middle = hstack('Overview middle', {
        width: screen.contentWidth,
        height: 336,
        gap: 16,
        fill: null,
        align: 'MIN'
      });
      body.appendChild(middle);

      const chartCard = vstack('Cash movement card', {
        width: 744,
        height: 336,
        padding: 20,
        gap: 8,
        fill: colors.surface,
        stroke: colors.border,
        radius: radii.md
      });
      middle.appendChild(chartCard);
      const chartHeader = hstack('Chart header', {
        width: 704,
        height: 32,
        fill: null,
        justify: 'SPACE_BETWEEN',
        align: 'CENTER'
      });
      chartCard.appendChild(chartHeader);
      const chartTitle = vstack('Chart title', { gap: 1, fill: null, width: 400 });
      chartHeader.appendChild(chartTitle);
      text(chartTitle, 'Cash movement', {
        token: 'h3',
        color: colors.ink,
        width: 400,
        fill: false
      });
      text(chartTitle, 'Deposits and employee withdrawals · last 30 days', {
        token: 'caption',
        color: colors.muted,
        width: 400,
        fill: false
      });
      segmented(chartHeader, ['7D', '30D', '90D'], 1);
      const legend = hstack('Chart legend', { width: 704, height: 18, gap: 16, fill: null, align: 'CENTER' });
      chartCard.appendChild(legend);
      legendItem(legend, 'Employer funding', colors.chartDeposit);
      legendItem(legend, 'Employee payouts', colors.chartPayout);
      spacer(legend, 1, true);
      text(legend, 'Updated 2m ago', {
        token: 'caption',
        color: colors.mutedLight,
        fill: false,
        hug: true
      });
      areaChart(chartCard, {
        width: 704,
        height: 228,
        seriesA: chartDeposits,
        seriesB: chartPayouts
      });

      nextRunCard(middle, 368);

      const bottom = hstack('Overview bottom', {
        width: screen.contentWidth,
        height: 218,
        gap: 16,
        fill: null,
        align: 'MIN'
      });
      body.appendChild(bottom);
      overviewTransactions(bottom, 744);
      attentionCard(bottom, 368);
    }
  );
}

function preferenceRow(
  parent: FrameNode,
  label: string,
  detail: string,
  opts: { on?: boolean; action?: string; width: number }
): FrameNode {
  const row = hstack(`Preference · ${label}`, {
    width: opts.width,
    height: 50,
    fill: null,
    align: 'CENTER'
  });
  parent.appendChild(row);
  const copy = vstack('Preference copy', { gap: 1, fill: null, width: opts.width - 120 });
  row.appendChild(copy);
  text(copy, label, {
    token: 'bodySmall',
    weight: 'medium',
    color: colors.ink,
    width: opts.width - 120,
    fill: false
  });
  text(copy, detail, {
    token: 'caption',
    color: colors.muted,
    width: opts.width - 120,
    fill: false
  });
  spacer(row, 1, true);
  if (opts.on !== undefined) {
    const on = opts.on;
    const toggleMark = frame(on ? 'Enabled' : 'Disabled', {
      width: 36,
      height: 20,
      fill: on ? colors.cobalt : colors.borderStrong,
      radius: 999
    });
    row.appendChild(toggleMark);
    const knob = frame('Knob', { width: 14, height: 14, fill: '#FFFFFF', radius: 999 });
    toggleMark.appendChild(knob);
    knob.x = on ? 19 : 3;
    knob.y = 3;
  } else if (opts.action) {
    text(row, opts.action, {
      token: 'caption',
      weight: 'semibold',
      color: colors.cobaltText,
      fill: false,
      hug: true
    });
  }
  return row;
}

export function A03Profile(): FrameNode {
  return appScreen(
    {
      nav: 'profile',
      breadcrumbs: ['AirliPay', 'Operations', 'My profile'],
      title: 'My profile',
      subtitle: 'Your AirliPay identity, access and recent account activity.',
      actions: (row) => {
        button(row, 'Sign out', { variant: 'secondary', icon: 'logout' });
      }
    },
    (body) => {
      const top = hstack('Profile identity', {
        width: screen.contentWidth,
        height: 156,
        gap: 20,
        padding: 24,
        fill: colors.surface,
        stroke: colors.border,
        radius: radii.md,
        align: 'CENTER'
      });
      body.appendChild(top);
      avatar(top, currentUser.initials, {
        size: 64,
        bg: colors.cobaltSoft,
        color: colors.cobaltText
      });
      const identity = vstack('Profile identity copy', { gap: 4, fill: null, width: 410 });
      top.appendChild(identity);
      text(identity, currentUser.name, {
        token: 'h2',
        color: colors.ink,
        width: 410,
        fill: false
      });
      text(identity, `${currentUser.role} · ${currentUser.focus}`, {
        token: 'bodySmall',
        color: colors.muted,
        width: 410,
        fill: false
      });
      const chips = hstack('Profile tags', { gap: 6, fill: null, align: 'CENTER' });
      identity.appendChild(chips);
      statusPill(chips, currentUser.status, { size: 'sm' });
      tag(chips, currentUser.twoFactor ? '2FA enabled' : '2FA off', currentUser.twoFactor ? 'success' : 'warning', {
        icon: 'shieldCheck',
        size: 'sm'
      });
      tag(chips, 'Super admin', 'brand', { icon: 'key', size: 'sm' });

      spacer(top, 1, true);
      const meta = hstack('Profile meta', { gap: 28, fill: null, align: 'CENTER' });
      top.appendChild(meta);
      detailField(meta, 'Email', currentUser.email, { width: 190 });
      detailField(meta, 'Phone', currentUser.phone, { width: 150 });
      detailField(meta, 'Member since', currentUser.joined, { width: 110 });

      const lower = hstack('Profile lower', {
        width: screen.contentWidth,
        height: 568,
        gap: 16,
        fill: null,
        align: 'MIN'
      });
      body.appendChild(lower);

      const details = vstack('Account details card', {
        width: 744,
        height: 568,
        padding: 24,
        gap: 16,
        fill: colors.surface,
        stroke: colors.border,
        radius: radii.md
      });
      lower.appendChild(details);
      sectionHeader(details, 'Account details', {
        width: 696,
        subtitle: 'Shared with your organisation',
        icon: 'profile'
      });
      detailsGrid(
        details,
        [
          { label: 'Full name', value: currentUser.name },
          { label: 'Username', value: 'nadege.mballa' },
          { label: 'Email address', value: currentUser.email },
          { label: 'Primary phone', value: currentUser.phone },
          { label: 'City', value: currentUser.city },
          { label: 'Region', value: currentUser.region },
          { label: 'Street address', value: currentUser.street },
          { label: 'Activated', value: currentUser.activated },
          { label: 'Role', value: currentUser.role }
        ],
        { width: 696, gap: 18 }
      );

      horizontalRule(details, 696);
      sectionHeader(details, 'Preferences', {
        width: 696,
        subtitle: 'Stored with your admin account',
        icon: 'settings'
      });
      const preferenceWidth = 696;
      preferenceRow(details, 'Product notifications', 'Payout runs, failed transfers and invoices', {
        on: true,
        width: preferenceWidth
      });
      horizontalRule(details, 696);
      preferenceRow(details, 'Default language', 'English', {
        action: 'Change',
        width: preferenceWidth
      });
      horizontalRule(details, 696);
      preferenceRow(details, 'Timezone', 'West Africa Time · GMT+1', {
        action: 'Change',
        width: preferenceWidth
      });

      const security = vstack('Security card', {
        width: 368,
        height: 568,
        padding: 24,
        gap: 14,
        fill: colors.surface,
        stroke: colors.border,
        radius: radii.md
      });
      lower.appendChild(security);
      sectionHeader(security, 'Security', {
        width: 320,
        subtitle: 'Review your access',
        icon: 'shieldCheck'
      });
      const shieldRow = hstack('Security state', {
        width: 320,
        height: 64,
        padding: 12,
        gap: 10,
        fill: colors.successSoft,
        radius: radii.sm,
        align: 'CENTER'
      });
      security.appendChild(shieldRow);
      icon(shieldRow, 'shieldCheck', colors.success, 19);
      const shieldCopy = vstack('Security state copy', { gap: 1, fill: null, width: 270 });
      shieldRow.appendChild(shieldCopy);
      setFillWidth(shieldCopy);
      text(shieldCopy, 'Protected account', {
        token: 'caption',
        weight: 'semibold',
        color: colors.success,
        fill: false
      });
      text(shieldCopy, '2FA and audit trail are active.', {
        token: 'caption',
        color: colors.muted,
        fill: false
      });

      keyValueRow(security, 'Two-factor authentication', 'Enabled', { width: 320 });
      horizontalRule(security, 320);
      keyValueRow(security, 'Last sign in', currentUser.lastActive, { width: 320 });
      horizontalRule(security, 320);
      keyValueRow(security, 'Password', 'Reset via email', { width: 320 });
      horizontalRule(security, 320);

      const sessionsTitle = hstack('Sessions title', { width: 320, height: 24, fill: null, align: 'CENTER' });
      security.appendChild(sessionsTitle);
      text(sessionsTitle, 'Recent sessions', {
        token: 'bodySmall',
        weight: 'semibold',
        color: colors.ink,
        fill: false,
        hug: true
      });
      [
        { device: 'MacBook Pro · Chrome', place: 'Douala, CM', time: 'Current session' },
        { device: 'iPhone 15 · AirliPay app', place: 'Douala, CM', time: '2h ago' }
      ].forEach((session) => {
        const row = hstack('Session row', {
          width: 320,
          height: 46,
          fill: null,
          align: 'CENTER'
        });
        security.appendChild(row);
        iconTile(row, 'globe', { tone: 'neutral', size: 26, iconSize: 14 });
        const copy = vstack('Session copy', { width: 250, gap: 1, fill: null });
        row.appendChild(copy);
        text(copy, session.device, {
          token: 'caption',
          weight: 'medium',
          color: colors.ink,
          width: 250,
          fill: false
        });
        text(copy, `${session.place} · ${session.time}`, {
          token: 'caption',
          color: colors.muted,
          width: 250,
          fill: false
        });
      });

      const contact = hstack('Security contact', {
        width: 320,
        height: 46,
        paddingX: 12,
        gap: 8,
        fill: colors.surfaceSunken,
        radius: radii.sm,
        align: 'CENTER'
      });
      security.appendChild(contact);
      icon(contact, 'help', colors.brandSurface, 16);
      text(contact, 'Security changes go through CIOps.', {
        token: 'caption',
        color: colors.muted,
        fill: false
      });

      const notificationsRow = hstack('Unread notifications', {
        width: 320,
        height: 20,
        fill: null,
        align: 'CENTER'
      });
      security.appendChild(notificationsRow);
      text(notificationsRow, `${notifications.length} unread operations alerts`, {
        token: 'caption',
        color: colors.mutedLight,
        fill: false,
        hug: true
      });
      spacer(notificationsRow, 1, true);
      text(notificationsRow, 'Open inbox', {
        token: 'caption',
        weight: 'semibold',
        color: colors.cobaltText,
        fill: false,
        hug: true
      });
    }
  );
}
