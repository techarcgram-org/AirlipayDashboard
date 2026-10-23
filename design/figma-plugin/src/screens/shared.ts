import { colors, radii, screen } from '../tokens';
import type { IconName } from '../icons';
import {
  avatar,
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
  card,
  tag,
  toneStyle,
  type TabItem,
  type Tone
} from '../patterns';
import type { Admin, Client, Employee } from '../data';

export function employeeTabs(active: 'transactions' | 'momo' | 'activity' | 'bank' | 'cards'): TabItem[] {
  return [
    { label: 'Transactions', active: active === 'transactions' },
    { label: 'Mobile money', active: active === 'momo' },
    { label: 'Activity', active: active === 'activity' },
    { label: 'Bank accounts', active: active === 'bank' },
    { label: 'Cards', active: active === 'cards' }
  ];
}

export function clientTabs(active: 'transactions' | 'roster' | 'funding' | 'history'): TabItem[] {
  return [
    { label: 'Transactions', active: active === 'transactions' },
    { label: 'Workforce', active: active === 'roster' },
    { label: 'Funding accounts', active: active === 'funding' },
    { label: 'Payment history', active: active === 'history' }
  ];
}

export function invoiceTabs(active: 'summary' | 'transactions' | 'activity'): TabItem[] {
  return [
    { label: 'Summary', active: active === 'summary' },
    { label: 'Transactions', active: active === 'transactions' },
    { label: 'Activity', active: active === 'activity' }
  ];
}

export function employeeTitlePrefix(employee: Employee): (parent: FrameNode) => void {
  return (parent: FrameNode) => {
    avatar(parent, employee.initials, {
      size: 36,
      bg: colors.cobaltSoft,
      color: colors.cobaltText
    });
  };
}

export function clientTitlePrefix(client: Client): (parent: FrameNode) => void {
  return (parent: FrameNode) => {
    const mark = frame(`Client mark · ${client.monogram}`, {
      width: 36,
      height: 36,
      fill: colors.mintSoft,
      radius: radii.sm
    });
    parent.appendChild(mark);
    const label = text(mark, client.monogram, {
      size: 13,
      lineHeight: 16,
      weight: 'extrabold',
      color: colors.onMintSoft,
      align: 'CENTER',
      width: 36,
      fill: false
    });
    label.y = 10;
  };
}

export function adminTitlePrefix(admin: Admin): (parent: FrameNode) => void {
  return (parent: FrameNode) => {
    avatar(parent, admin.initials, {
      size: 36,
      bg: colors.cobaltSoft,
      color: colors.cobaltText
    });
  };
}

export interface MiniStatOptions {
  label: string;
  value: string;
  icon?: IconName;
  tone?: Tone;
  width?: number;
  footnote?: string;
}

export function miniStat(parent: FrameNode, opts: MiniStatOptions): FrameNode {
  const style = toneStyle(opts.tone ?? 'brand');
  const node = vstack(`Mini stat · ${opts.label}`, {
    width: opts.width ?? 270,
    height: 76,
    gap: 4,
    padding: 14,
    fill: colors.surface,
    stroke: colors.border,
    radius: radii.md
  });
  parent.appendChild(node);
  const top = hstack('Mini stat header', {
    width: (opts.width ?? 270) - 28,
    height: 18,
    gap: 7,
    fill: null,
    align: 'CENTER'
  });
  node.appendChild(top);
  if (opts.icon) {
    icon(top, opts.icon, style.fg, 14);
  }
  text(top, opts.label, {
    token: 'label',
    color: colors.muted,
    fill: false,
    hug: true
  });
  spacer(top, 1, true);
  if (opts.footnote) {
    text(top, opts.footnote, {
      token: 'caption',
      color: colors.mutedLight,
      fill: false,
      hug: true
    });
  }
  text(node, opts.value, {
    token: 'h3',
    weight: 'semibold',
    color: colors.ink,
    width: (opts.width ?? 270) - 28,
    fill: false
  });
  return node;
}

export function filterButton(
  parent: FrameNode,
  label: string,
  opts: { icon?: IconName; active?: boolean; width?: number } = {}
): FrameNode {
  const node = hstack(`Filter · ${label}`, {
    height: 36,
    gap: 7,
    paddingX: 11,
    fill: opts.active ? colors.cobaltSoft : colors.surface,
    stroke: opts.active ? colors.cobalt : colors.border,
    radius: radii.sm,
    align: 'CENTER'
  });
  parent.appendChild(node);
  if (opts.icon) {
    icon(node, opts.icon, opts.active ? colors.cobaltText : colors.muted, 15);
  }
  text(node, label, {
    token: 'bodySmall',
    weight: opts.active ? 'semibold' : 'medium',
    color: opts.active ? colors.cobaltText : colors.inkSoft,
    fill: false,
    hug: true
  });
  icon(node, 'chevronDown', colors.muted, 13);
  return node;
}

export function filterBar(parent: FrameNode, width = screen.contentWidth): FrameNode {
  const row = hstack('Filter bar', {
    width,
    height: 44,
    gap: 10,
    fill: null,
    align: 'CENTER'
  });
  parent.appendChild(row);
  return row;
}

export function actionBar(parent: FrameNode, width = screen.contentWidth): FrameNode {
  const row = hstack('List actions', {
    width,
    height: 44,
    gap: 8,
    fill: null,
    justify: 'SPACE_BETWEEN',
    align: 'CENTER'
  });
  parent.appendChild(row);
  return row;
}

export function tableShell(
  parent: FrameNode,
  opts: { width: number; height?: number; name?: string }
): FrameNode {
  const node = vstack(opts.name ?? 'Table card', {
    width: opts.width,
    height: opts.height,
    fill: colors.surface,
    stroke: colors.border,
    radius: radii.md,
    clip: true
  });
  parent.appendChild(node);
  return node;
}

export function cardTitleBar(
  parent: FrameNode,
  opts: {
    width: number;
    title: string;
    subtitle?: string;
    icon?: IconName;
    action?: string;
    actionIcon?: IconName;
    paddingX?: number;
  }
): FrameNode {
  const paddingX = opts.paddingX ?? 20;
  const row = hstack(`Card title · ${opts.title}`, {
    width: opts.width,
    height: 52,
    gap: 8,
    paddingX,
    fill: null,
    justify: 'SPACE_BETWEEN',
    align: 'CENTER'
  });
  parent.appendChild(row);
  const copy = hstack('Card title copy', { gap: 8, fill: null, align: 'CENTER' });
  row.appendChild(copy);
  if (opts.icon) {
    icon(copy, opts.icon, colors.muted, 16);
  }
  text(copy, opts.title, {
    token: 'bodyStrong',
    weight: 'semibold',
    color: colors.ink,
    fill: false,
    hug: true
  });
  if (opts.subtitle) {
    text(copy, opts.subtitle, {
      token: 'caption',
      color: colors.muted,
      fill: false,
      hug: true
    });
  }
  if (opts.action) {
    button(row, opts.action, {
      variant: 'ghost',
      compact: true,
      trailingIcon: opts.actionIcon ?? 'chevronRight'
    });
  }
  return row;
}

export function fixtureNotice(parent: FrameNode, label: string, width = screen.contentWidth): FrameNode {
  const node = hstack(`Review note · ${label}`, {
    width,
    height: 36,
    gap: 8,
    paddingX: 12,
    fill: colors.warningSoft,
    stroke: colors.warning,
    strokeWeight: 1,
    radius: radii.sm,
    align: 'CENTER'
  });
  parent.appendChild(node);
  icon(node, 'alert', colors.warning, 15);
  tag(node, label, 'warning', { size: 'sm' });
  text(node, 'This surface is clearly marked so it is not mistaken for a shipped capability.', {
    token: 'caption',
    color: colors.inkSoft,
    fill: false,
    hug: true
  });
  return node;
}

export function detailsGrid(
  parent: FrameNode,
  items: Array<{ label: string; value: string; width?: number }>,
  opts: { width: number; gap?: number } = { width: 640 }
): FrameNode {
  const gap = opts.gap ?? 20;
  const columns = items.length > 3 ? 3 : 2;
  const colWidth = Math.floor((opts.width - gap * (columns - 1)) / columns);
  const rows = Math.ceil(items.length / columns);
  const grid = vstack('Details grid', { width: opts.width, gap: 16, fill: null });
  parent.appendChild(grid);
  for (let row = 0; row < rows; row += 1) {
    const rowNode = hstack('Details row', {
      width: opts.width,
      gap,
      fill: null,
      align: 'MIN'
    });
    grid.appendChild(rowNode);
    items.slice(row * columns, row * columns + columns).forEach((item) => {
      const cell = vstack(`Detail · ${item.label}`, {
        width: item.width ?? colWidth,
        gap: 3,
        fill: null
      });
      rowNode.appendChild(cell);
      text(cell, item.label.toUpperCase(), {
        token: 'micro',
        weight: 'semibold',
        color: colors.mutedLight,
        width: item.width ?? colWidth,
        fill: false
      });
      text(cell, item.value, {
        token: 'bodySmall',
        weight: 'medium',
        color: colors.ink,
        width: item.width ?? colWidth,
        fill: false
      });
    });
  }
  return grid;
}

export function badgeRow(parent: FrameNode, items: Array<{ label: string; tone?: Tone; icon?: IconName }>): FrameNode {
  const row = hstack('Badge row', { gap: 6, fill: null, align: 'CENTER' });
  parent.appendChild(row);
  items.forEach((item) => tag(row, item.label, item.tone ?? 'neutral', { icon: item.icon, size: 'sm' }));
  return row;
}

export function cardActionRow(
  parent: FrameNode,
  actions: Array<{ label: string; variant?: 'primary' | 'secondary' | 'ghost' | 'danger'; icon?: IconName }>,
  width?: number
): FrameNode {
  const row = hstack('Card actions', {
    width,
    gap: 8,
    fill: null,
    align: 'CENTER'
  });
  parent.appendChild(row);
  actions.forEach((action) =>
    button(row, action.label, { variant: action.variant ?? 'secondary', icon: action.icon })
  );
  return row;
}

export function helperText(parent: FrameNode, textValue: string, width?: number): TextNode {
  return text(parent, textValue, {
    token: 'caption',
    color: colors.muted,
    width,
    fill: false
  });
}

export function fullWidthDivider(parent: FrameNode, color = colors.border): FrameNode {
  const rule = frame('Rule', { width: Math.max(1, parent.width), height: 1, fill: color });
  parent.appendChild(rule);
  setFillWidth(rule);
  return rule;
}

export function cardHeaderHint(parent: FrameNode, hint: string, width: number): FrameNode {
  const row = hstack('Header hint', { width, height: 20, fill: null, align: 'CENTER' });
  parent.appendChild(row);
  icon(row, 'info', colors.mutedLight, 13);
  text(row, hint, {
    token: 'caption',
    color: colors.muted,
    fill: false,
    hug: true
  });
  return row;
}

export function emptyCellSpacer(parent: FrameNode, width: number, height: number): FrameNode {
  const node = frame('Spacer cell', { width, height, fill: null });
  parent.appendChild(node);
  return node;
}
