import {
  colors,
  radii,
  space,
  typeScale,
  type FontWeight
} from './tokens';
import { statusLabel } from './data';
import type { IconName } from './icons';
import {
  avatar,
  clampText,
  divider,
  frame,
  hstack,
  icon,
  paint,
  setFillWidth,
  spacer,
  text,
  vstack,
  type FrameOptions,
  type StackOptions
} from './primitives';

export type Tone = 'neutral' | 'success' | 'warning' | 'error' | 'info' | 'mint' | 'brand';

export interface ToneStyle {
  fg: string;
  bg: string;
  icon: IconName;
}

export function toneStyle(tone: Tone): ToneStyle {
  switch (tone) {
    case 'success':
      return { fg: colors.success, bg: colors.successSoft, icon: 'checkCircle' };
    case 'warning':
      return { fg: colors.warning, bg: colors.warningSoft, icon: 'clock' };
    case 'error':
      return { fg: colors.error, bg: colors.errorSoft, icon: 'alert' };
    case 'info':
      return { fg: colors.info, bg: colors.infoSoft, icon: 'info' };
    case 'mint':
      return { fg: colors.onMintSoft, bg: colors.mintSoft, icon: 'check' };
    case 'brand':
      return { fg: colors.cobaltText, bg: colors.cobaltSoft, icon: 'sparkle' };
    default:
      return { fg: colors.muted, bg: colors.surfaceSunken, icon: 'dot' };
  }
}

export function statusTone(status: string): Tone {
  const value = status.toUpperCase();
  if (['ACTIVE', 'SUCCESS', 'TREATED', 'SETTLED', 'VERIFIED'].includes(value)) {
    return 'success';
  }
  if (['PENDING', 'PENDING_CONFIRMATION', 'SCHEDULED', 'PROCESSING'].includes(value)) {
    return 'warning';
  }
  if (['FAILED', 'BLOCKED', 'BANNED', 'NOT_TREATED', 'NEEDS_ATTENTION'].includes(value)) {
    return 'error';
  }
  if (['DEACTIVATED'].includes(value)) {
    return 'neutral';
  }
  return 'neutral';
}

export interface ButtonOptions {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'inverse';
  icon?: IconName;
  trailingIcon?: IconName;
  width?: number;
  height?: number;
  disabled?: boolean;
  compact?: boolean;
}

export function button(parent: FrameNode, label: string, opts: ButtonOptions = {}): FrameNode {
  const height = opts.height ?? (opts.compact ? 32 : 38);
  const variant = opts.variant ?? 'primary';
  const styles: Record<NonNullable<ButtonOptions['variant']>, { bg: string | null; stroke?: string; fg: string }> = {
    primary: { bg: colors.mint, fg: colors.onMint },
    secondary: { bg: colors.surface, stroke: colors.border, fg: colors.ink },
    ghost: { bg: null, fg: colors.inkSoft },
    danger: { bg: colors.errorSoft, fg: colors.error },
    inverse: { bg: colors.onBrand, fg: colors.brandSurface }
  };
  const style = styles[variant];
  const node = hstack(`Button · ${label}`, {
    width: opts.width,
    height,
    gap: 7,
    paddingX: opts.compact ? 12 : 14,
    fill: style.bg,
    stroke: style.stroke,
    radius: radii.sm,
    justify: opts.width ? 'CENTER' : 'MIN',
    align: 'CENTER'
  });
  parent.appendChild(node);

  if (opts.icon) {
    icon(node, opts.icon, style.fg, opts.compact ? 15 : 16);
  }
  text(node, label, {
    token: 'button',
    color: style.fg,
    fill: false,
    hug: true
  });
  if (opts.trailingIcon) {
    icon(node, opts.trailingIcon, style.fg, 15);
  }
  if (opts.disabled) {
    node.opacity = 0.42;
  }
  return node;
}

export function iconButton(
  parent: FrameNode,
  name: IconName,
  opts: {
    size?: number;
    iconSize?: number;
    color?: string;
    background?: string;
    stroke?: string;
    radius?: number;
    label?: string;
  } = {}
): FrameNode {
  const size = opts.size ?? 34;
  const node = hstack(opts.label ? `Button · ${opts.label}` : `Icon button · ${name}`, {
    width: size,
    height: size,
    fill: opts.background ?? null,
    stroke: opts.stroke,
    radius: opts.radius ?? radii.sm,
    justify: 'CENTER',
    align: 'CENTER'
  });
  parent.appendChild(node);
  icon(node, name, opts.color ?? colors.inkSoft, opts.iconSize ?? 18);
  return node;
}

export function avatarButton(parent: FrameNode, initials: string, online = false): FrameNode {
  const holder = frame('Account menu', { width: 34, height: 34, fill: null });
  parent.appendChild(holder);
  avatar(holder, initials, { size: 32, bg: colors.mintSoft, color: colors.onMintSoft });
  if (online) {
    const dotMark = frame('Online', {
      width: 9,
      height: 9,
      fill: colors.success,
      stroke: colors.surface,
      strokeWeight: 2,
      radius: 999
    });
    holder.appendChild(dotMark);
    dotMark.x = 24;
    dotMark.y = 24;
  }
  return holder;
}

export interface StatusPillOptions {
  tone?: Tone;
  size?: 'sm' | 'md';
  dot?: boolean;
  label?: string;
}

export function statusPill(
  parent: FrameNode,
  status: string,
  opts: StatusPillOptions = {}
): FrameNode {
  const tone = opts.tone ?? statusTone(status);
  const style = toneStyle(tone);
  const height = opts.size === 'sm' ? 20 : 24;
  const node = hstack(`Status · ${opts.label ?? status}`, {
    height,
    gap: 6,
    paddingX: 8,
    fill: style.bg,
    radius: 999,
    align: 'CENTER'
  });
  parent.appendChild(node);
  if (opts.dot !== false) {
    const mark = frame('Status dot', {
      width: 5,
      height: 5,
      fill: style.fg,
      radius: 999
    });
    node.appendChild(mark);
  }
  text(node, opts.label ?? statusLabel(status), {
    token: 'micro',
    weight: 'semibold',
    color: style.fg,
    fill: false,
    hug: true
  });
  return node;
}

export function tag(
  parent: FrameNode,
  label: string,
  tone: Tone = 'brand',
  opts: { icon?: IconName; size?: 'sm' | 'md' } = {}
): FrameNode {
  const style = toneStyle(tone);
  const node = hstack(`Tag · ${label}`, {
    height: opts.size === 'sm' ? 20 : 24,
    gap: 5,
    paddingX: 8,
    fill: style.bg,
    radius: radii.xs,
    align: 'CENTER'
  });
  parent.appendChild(node);
  if (opts.icon) {
    icon(node, opts.icon, style.fg, 12);
  }
  text(node, label, {
    token: 'micro',
    weight: 'semibold',
    color: style.fg,
    fill: false,
    hug: true
  });
  return node;
}

export function countPill(parent: FrameNode, count: string, tone: Tone = 'neutral'): FrameNode {
  const style = toneStyle(tone);
  const node = hstack('Count', {
    height: 20,
    paddingX: 7,
    fill: style.bg,
    radius: radii.pill,
    justify: 'CENTER',
    align: 'CENTER'
  });
  parent.appendChild(node);
  text(node, count, {
    token: 'micro',
    weight: 'semibold',
    color: style.fg,
    fill: false,
    hug: true
  });
  return node;
}

export function kbd(parent: FrameNode, label: string): FrameNode {
  const node = hstack(`Shortcut ${label}`, {
    height: 20,
    paddingX: 6,
    fill: colors.surfaceSunken,
    stroke: colors.border,
    radius: 5,
    justify: 'CENTER',
    align: 'CENTER'
  });
  parent.appendChild(node);
  text(node, label, {
    token: 'micro',
    weight: 'medium',
    color: colors.muted,
    fill: false,
    hug: true
  });
  return node;
}

export function card(
  name: string,
  opts: StackOptions & { radius?: number; padding?: number; gap?: number } = {}
): FrameNode {
  return vstack(name, {
    fill: colors.surface,
    stroke: colors.border,
    strokeWeight: 1,
    radius: opts.radius ?? radii.lg,
    ...opts
  });
}

export function iconTile(
  parent: FrameNode,
  name: IconName,
  opts: { tone?: Tone; size?: number; iconSize?: number } = {}
): FrameNode {
  const style = toneStyle(opts.tone ?? 'brand');
  const size = opts.size ?? 34;
  const node = hstack(`Icon tile · ${name}`, {
    width: size,
    height: size,
    fill: style.bg,
    radius: radii.sm,
    justify: 'CENTER',
    align: 'CENTER'
  });
  parent.appendChild(node);
  icon(node, name, style.fg, opts.iconSize ?? 17);
  return node;
}

export interface SearchFieldOptions {
  width?: number;
  placeholder?: string;
  shortcut?: string;
  value?: string;
}

export function searchField(parent: FrameNode, opts: SearchFieldOptions = {}): FrameNode {
  const node = hstack('Global search', {
    width: opts.width ?? 320,
    height: 38,
    gap: 9,
    paddingX: 12,
    fill: colors.fieldBg,
    stroke: colors.border,
    radius: radii.sm,
    align: 'CENTER'
  });
  parent.appendChild(node);
  icon(node, 'search', colors.mutedLight, 17);
  const isValue = Boolean(opts.value);
  text(node, opts.value ?? opts.placeholder ?? 'Search employees, clients, invoices…', {
    token: 'bodySmall',
    color: isValue ? colors.ink : colors.mutedLight,
    fill: false,
    hug: true
  });
  spacer(node, 1, true);
  if (opts.shortcut) {
    kbd(node, opts.shortcut);
  }
  return node;
}

export interface FieldOptions {
  label?: string;
  value?: string;
  placeholder?: string;
  width?: number;
  icon?: IconName;
  trailingIcon?: IconName;
  helper?: string;
  error?: string;
  required?: boolean;
  variant?: 'input' | 'select' | 'textarea';
  height?: number;
  disabled?: boolean;
}

export function field(parent: FrameNode, opts: FieldOptions): FrameNode {
  const width = opts.width ?? 320;
  const wrapper = vstack(`Field · ${opts.label ?? opts.placeholder ?? 'value'}`, {
    width,
    gap: 6,
    fill: null
  });
  parent.appendChild(wrapper);

  if (opts.label) {
    const labelRow = hstack('Field label', {
      width,
      height: 18,
      gap: 3,
      fill: null,
      align: 'CENTER'
    });
    wrapper.appendChild(labelRow);
    text(labelRow, opts.label, {
      token: 'label',
      weight: 'medium',
      color: colors.inkSoft,
      fill: false,
      hug: true
    });
    if (opts.required) {
      text(labelRow, '*', {
        token: 'label',
        weight: 'medium',
        color: colors.error,
        fill: false,
        hug: true
      });
    }
  }

  const height = opts.height ?? (opts.variant === 'textarea' ? 84 : 40);
  const input = hstack('Input', {
    width,
    height,
    gap: 8,
    paddingX: 12,
    fill: opts.disabled ? colors.surfaceSunken : colors.fieldBg,
    stroke: opts.error ? colors.error : colors.border,
    strokeWeight: opts.error ? 1.5 : 1,
    radius: radii.sm,
    align: opts.variant === 'textarea' ? 'MIN' : 'CENTER'
  });
  wrapper.appendChild(input);

  if (opts.icon) {
    icon(input, opts.icon, opts.disabled ? colors.mutedLight : colors.muted, 16);
  }
  const shownValue = opts.value ?? opts.placeholder ?? '';
  text(input, shownValue || ' ', {
    token: 'bodySmall',
    color: opts.value ? colors.ink : colors.mutedLight,
    fill: false,
    hug: true
  });
  spacer(input, 1, true);
  if (opts.variant === 'select') {
    icon(input, 'chevronDown', colors.muted, 15);
  } else if (opts.trailingIcon) {
    icon(input, opts.trailingIcon, colors.muted, 16);
  }

  if (opts.error || opts.helper) {
    text(wrapper, opts.error ?? opts.helper ?? '', {
      token: 'caption',
      color: opts.error ? colors.error : colors.muted,
      width,
      fill: false
    });
  }
  return wrapper;
}

export function checkbox(
  parent: FrameNode,
  label: string,
  checked: boolean,
  opts: { width?: number } = {}
): FrameNode {
  const row = hstack('Checkbox', {
    width: opts.width,
    height: 22,
    gap: 8,
    fill: null,
    align: 'CENTER'
  });
  parent.appendChild(row);
  const box = frame(checked ? 'Checked box' : 'Checkbox', {
    width: 16,
    height: 16,
    fill: checked ? colors.cobalt : colors.fieldBg,
    stroke: checked ? colors.cobalt : colors.borderStrong,
    radius: 4
  });
  row.appendChild(box);
  if (checked) {
    icon(box, 'check', colors.onPrimary, 11).x = 2.5;
    box.children[0]!.y = 2.5;
  }
  text(row, label, {
    token: 'bodySmall',
    color: colors.inkSoft,
    fill: false,
    hug: true
  });
  return row;
}

export function toggle(parent: FrameNode, on: boolean, opts: { width?: number } = {}): FrameNode {
  const width = opts.width ?? 36;
  const node = frame(on ? 'Toggle on' : 'Toggle off', {
    width,
    height: 20,
    fill: on ? colors.cobalt : colors.borderStrong,
    radius: 999
  });
  parent.appendChild(node);
  const knob = frame('Toggle knob', {
    width: 14,
    height: 14,
    fill: '#FFFFFF',
    radius: 999
  });
  node.appendChild(knob);
  knob.x = on ? width - 17 : 3;
  knob.y = 3;
  return node;
}

export interface TabItem {
  label: string;
  count?: string;
  active?: boolean;
}

export function tabs(parent: FrameNode, items: TabItem[], width?: number): FrameNode {
  const row = hstack('Section tabs', {
    width,
    height: 42,
    gap: 26,
    fill: null,
    align: 'CENTER'
  });
  parent.appendChild(row);
  items.forEach((item) => {
    const tab = vstack(`Tab · ${item.label}`, {
      gap: 10,
      fill: null,
      height: 42
    });
    row.appendChild(tab);
    const labelRow = hstack('Tab label', {
      gap: 7,
      fill: null,
      align: 'CENTER'
    });
    tab.appendChild(labelRow);
    text(labelRow, item.label, {
      token: 'bodySmall',
      weight: item.active ? 'semibold' : 'medium',
      color: item.active ? colors.ink : colors.muted,
      fill: false,
      hug: true
    });
    if (item.count) {
      countPill(labelRow, item.count, item.active ? 'mint' : 'neutral');
    }
    const underline = frame('Tab underline', {
      width: Math.max(12, item.label.length * 7),
      height: 2,
      fill: item.active ? colors.mint : null,
      radius: 999
    });
    tab.appendChild(underline);
  });
  return row;
}

export function segmented(
  parent: FrameNode,
  items: string[],
  activeIndex: number,
  opts: { width?: number; height?: number } = {}
): FrameNode {
  const height = opts.height ?? 34;
  const control = hstack('Segmented control', {
    width: opts.width,
    height,
    gap: 2,
    padding: 3,
    fill: colors.surfaceSunken,
    stroke: colors.border,
    radius: radii.sm,
    align: 'CENTER'
  });
  parent.appendChild(control);
  items.forEach((item, index) => {
    const active = index === activeIndex;
    const segment = hstack(`Segment · ${item}`, {
      height: height - 6,
      paddingX: 12,
      fill: active ? colors.surface : null,
      stroke: active ? colors.border : undefined,
      radius: 6,
      justify: 'CENTER',
      align: 'CENTER'
    });
    control.appendChild(segment);
    text(segment, item, {
      token: 'micro',
      weight: active ? 'semibold' : 'medium',
      color: active ? colors.ink : colors.muted,
      fill: false,
      hug: true
    });
  });
  return control;
}

export function breadcrumb(parent: FrameNode, items: string[], width?: number): FrameNode {
  const row = hstack('Breadcrumb', {
    width,
    height: 20,
    gap: 6,
    fill: null,
    align: 'CENTER'
  });
  parent.appendChild(row);
  items.forEach((item, index) => {
    const active = index === items.length - 1;
    text(row, item, {
      token: 'caption',
      weight: active ? 'medium' : 'regular',
      color: active ? colors.inkSoft : colors.mutedLight,
      fill: false,
      hug: true
    });
    if (!active) {
      icon(row, 'chevronRight', colors.mutedLight, 12);
    }
  });
  return row;
}

export function progressBar(
  parent: FrameNode,
  pct: number,
  opts: { width?: number; height?: number; color?: string; track?: string } = {}
): FrameNode {
  const width = opts.width ?? 240;
  const height = opts.height ?? 6;
  const trackNode = frame('Progress track', {
    width,
    height,
    fill: opts.track ?? colors.surfaceSunken,
    radius: 999
  });
  parent.appendChild(trackNode);
  const clamped = Math.max(0, Math.min(100, pct));
  if (clamped > 0) {
    const fillNode = frame('Progress fill', {
      width: Math.round((width * clamped) / 100),
      height,
      fill: opts.color ?? colors.mint,
      radius: 999
    });
    trackNode.appendChild(fillNode);
    fillNode.x = 0;
    fillNode.y = 0;
  }
  return trackNode;
}

export function sparkline(
  parent: FrameNode,
  series: number[],
  opts: { width?: number; height?: number; color?: string; fill?: boolean } = {}
): FrameNode {
  const width = opts.width ?? 76;
  const height = opts.height ?? 28;
  const min = Math.min(...series);
  const max = Math.max(...series);
  const range = max - min || 1;
  const points = series.map((value, index) => {
    const x = (index / (series.length - 1)) * width;
    const y = height - 2 - ((value - min) / range) * (height - 6);
    return [x, y] as const;
  });
  const line = points
    .map(([x, y], index) => `${index === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(' ');
  const area = `${line} L${width} ${height} L0 ${height} Z`;
  const color = opts.color ?? colors.chartDeposit;
  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">`,
    opts.fill === false
      ? ''
      : `<path d="${area}" fill="${color}" opacity="0.10"/>`,
    `<path d="${line}" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`,
    `<circle cx="${points[points.length - 1]![0].toFixed(1)}" cy="${points[points.length - 1]![1].toFixed(1)}" r="2.2" fill="${color}"/>`,
    '</svg>'
  ].join('');
  const node = figma.createNodeFromSvg(svg);
  node.name = 'Sparkline';
  parent.appendChild(node);
  return node;
}

export interface AreaChartOptions {
  width: number;
  height: number;
  seriesA: number[];
  seriesB: number[];
  colorA?: string;
  colorB?: string;
}

export function areaChart(parent: FrameNode, opts: AreaChartOptions): FrameNode {
  const { width, height } = opts;
  const left = 42;
  const right = 12;
  const top = 12;
  const bottom = 26;
  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom;
  const all = [...opts.seriesA, ...opts.seriesB];
  const max = Math.max(...all) * 1.1;
  const min = Math.min(...all) * 0.7;
  const range = max - min || 1;
  const colorA = opts.colorA ?? colors.chartDeposit;
  const colorB = opts.colorB ?? colors.chartPayout;

  const pointSet = (series: number[]) =>
    series.map((value, index) => {
      const x = left + (index / (series.length - 1)) * plotWidth;
      const y = top + plotHeight - ((value - min) / range) * plotHeight;
      return { x, y };
    });
  const pointsA = pointSet(opts.seriesA);
  const pointsB = pointSet(opts.seriesB);
  const line = (points: { x: number; y: number }[]) =>
    points.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(' ');
  const area = (points: { x: number; y: number }[]) =>
    `${line(points)} L${points[points.length - 1]!.x.toFixed(1)} ${(top + plotHeight).toFixed(1)} L${points[0]!.x.toFixed(1)} ${(top + plotHeight).toFixed(1)} Z`;

  const grid = [0, 1, 2, 3, 4]
    .map((index) => {
      const y = top + (plotHeight * index) / 4;
      return `<path d="M${left} ${y.toFixed(1)}H${width - right}" stroke="${colors.chartGrid}" stroke-width="1" ${index === 4 ? '' : 'stroke-dasharray="3 5"'}/>`;
    })
    .join('');
  const highlightIndex = opts.seriesA.length - 4;
  const highlight = pointsA[highlightIndex] ?? pointsA[pointsA.length - 1]!;

  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">`,
    grid,
    `<path d="${area(pointsB)}" fill="${colorB}" opacity="0.10"/>`,
    `<path d="${area(pointsA)}" fill="${colorA}" opacity="0.12"/>`,
    `<path d="${line(pointsB)}" stroke="${colorB}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`,
    `<path d="${line(pointsA)}" stroke="${colorA}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`,
    `<path d="M${highlight.x.toFixed(1)} ${(top + plotHeight).toFixed(1)}V${(highlight.y + 4).toFixed(1)}" stroke="${colors.chartAxis}" stroke-width="1" stroke-dasharray="3 4" opacity="0.65"/>`,
    `<circle cx="${highlight.x.toFixed(1)}" cy="${highlight.y.toFixed(1)}" r="4.5" fill="${colors.surface}" stroke="${colorA}" stroke-width="2.2"/>`,
    '</svg>'
  ].join('');

  const node = frame('Cash movement chart', { width, height, fill: null });
  parent.appendChild(node);
  const art = figma.createNodeFromSvg(svg);
  art.name = 'Chart plot';
  node.appendChild(art);

  const labels = ['0', '25M', '50M', '75M', '100M'];
  labels.forEach((label, index) => {
    const nodeText = text(node, label, {
      token: 'caption',
      color: colors.mutedLight,
      width: 32,
      align: 'RIGHT',
      fill: false
    });
    nodeText.x = 2;
    nodeText.y = top + plotHeight - (plotHeight * index) / 4 - 8;
  });

  const xLabels = ['24 Sep', '30 Sep', '07 Oct', '14 Oct', '21 Oct'];
  xLabels.forEach((label, index) => {
    const nodeText = text(node, label, {
      token: 'caption',
      color: colors.mutedLight,
      width: 60,
      align: index === 0 ? 'LEFT' : index === xLabels.length - 1 ? 'RIGHT' : 'CENTER',
      fill: false
    });
    const x = left + (plotWidth * index) / (xLabels.length - 1);
    nodeText.x = x - (index === 0 ? 0 : index === xLabels.length - 1 ? 60 : 30);
    nodeText.y = top + plotHeight + 8;
  });

  const tooltip = hstack('Chart tooltip', {
    height: 26,
    gap: 6,
    paddingX: 8,
    fill: colors.brandSurface,
    radius: 6
  });
  node.appendChild(tooltip);
  const dotMark = frame('Tooltip dot', {
    width: 5,
    height: 5,
    fill: colorA,
    radius: 999
  });
  tooltip.appendChild(dotMark);
  text(tooltip, '23 Oct · XAF 23.8M', {
    token: 'micro',
    weight: 'semibold',
    color: colors.onBrand,
    fill: false,
    hug: true
  });
  tooltip.x = Math.min(width - 172, highlight.x - 24);
  tooltip.y = Math.max(0, highlight.y - 36);
  return node;
}

export function legendItem(parent: FrameNode, label: string, color: string): FrameNode {
  const node = hstack(`Legend · ${label}`, { gap: 6, height: 18, fill: null, align: 'CENTER' });
  parent.appendChild(node);
  const dotMark = frame('Legend dot', { width: 7, height: 7, fill: color, radius: 999 });
  node.appendChild(dotMark);
  text(node, label, {
    token: 'caption',
    color: colors.muted,
    fill: false,
    hug: true
  });
  return node;
}

export type ColumnType = 'text' | 'identity' | 'status' | 'money' | 'meta' | 'action';

export interface TableColumn {
  key: string;
  label: string;
  width: number;
  type?: ColumnType;
  align?: 'LEFT' | 'RIGHT';
}

export interface TableCell {
  text: string;
  sub?: string;
  status?: string;
  tone?: Tone;
  initials?: string;
  avatarTone?: Tone;
  strong?: boolean;
  icon?: IconName;
  color?: string;
}

export type TableRow = Record<string, TableCell | string>;

export interface DataTableOptions {
  width: number;
  columns: TableColumn[];
  rows: TableRow[];
  rowHeight?: number;
  selectedIndex?: number;
  zebra?: boolean;
  firstColumnPadding?: number;
}

const TABLE_GUTTER = 16;

export function dataTable(parent: FrameNode, opts: DataTableOptions): FrameNode {
  const rowHeight = opts.rowHeight ?? 52;
  const table = vstack('Data table', {
    width: opts.width,
    fill: null,
    gap: 0,
    clip: true
  });
  parent.appendChild(table);

  const header = hstack('Table header', {
    width: opts.width,
    height: 38,
    gap: 0,
    paddingX: 20,
    fill: colors.tableHead,
    align: 'CENTER'
  });
  table.appendChild(header);
  opts.columns.forEach((column, index) => {
    const isLast = index === opts.columns.length - 1;
    const width = column.width - (isLast ? 0 : TABLE_GUTTER);
    const holder = hstack(`Header · ${column.label}`, {
      width,
      height: 38,
      fill: null,
      justify: column.align === 'RIGHT' ? 'MAX' : 'MIN',
      align: 'CENTER'
    });
    header.appendChild(holder);
    if (!isLast) {
      const gap = frame('Column gap', { width: TABLE_GUTTER, height: 1, fill: null });
      header.appendChild(gap);
    }
    text(holder, column.label, {
      token: 'micro',
      weight: 'semibold',
      color: colors.muted,
      align: column.align ?? 'LEFT',
      fill: false,
      hug: true
    });
  });

  opts.rows.forEach((row, index) => {
    const selected = opts.selectedIndex === index;
    const rowNode = hstack(`Row · ${String(row[opts.columns[0]!.key])}`, {
      width: opts.width,
      height: rowHeight,
      gap: 0,
      paddingX: 20,
      fill: selected ? colors.rowSelected : opts.zebra && index % 2 === 1 ? colors.surfaceRaised : colors.surface,
      align: 'CENTER'
    });
    table.appendChild(rowNode);
    opts.columns.forEach((column, columnIndex) => {
      const value = row[column.key];
      const isLast = columnIndex === opts.columns.length - 1;
      const adjusted = { ...column, width: column.width - (isLast ? 0 : TABLE_GUTTER) };
      renderCell(rowNode, value, adjusted, rowHeight, isLast);
      if (!isLast) {
        const gap = frame('Column gap', { width: TABLE_GUTTER, height: 1, fill: null });
        rowNode.appendChild(gap);
      }
    });
    const rule = frame('Row rule', { width: opts.width, height: 1, fill: colors.border });
    table.appendChild(rule);
  });

  return table;
}

function renderCell(
  row: FrameNode,
  value: TableCell | string | undefined,
  column: TableColumn,
  rowHeight: number,
  isLast: boolean
): void {
  const cell = typeof value === 'string' ? { text: value } : value ?? { text: '—' };
  const holder = hstack(`Cell · ${column.label}`, {
    width: column.width,
    height: rowHeight,
    gap: 8,
    fill: null,
    justify: column.align === 'RIGHT' ? 'MAX' : 'MIN',
    align: 'CENTER'
  });
  row.appendChild(holder);

  if (column.type === 'identity') {
    const style = toneStyle(cell.avatarTone ?? 'brand');
    avatar(holder, cell.initials ?? initialsFor(cell.text), {
      size: 30,
      bg: style.bg,
      color: style.fg
    });
    const copy = vstack('Identity copy', { fill: null, gap: 1, width: column.width - 42 });
    holder.appendChild(copy);
    text(copy, clampText(cell.text, 34), {
      token: 'table',
      weight: 'semibold',
      color: cell.color ?? colors.ink,
      width: column.width - 42,
      fill: false
    });
    if (cell.sub) {
      text(copy, clampText(cell.sub, 40), {
        token: 'caption',
        color: colors.muted,
        width: column.width - 42,
        fill: false
      });
    }
    return;
  }

  if (column.type === 'status') {
    statusPill(holder, cell.status ?? cell.text, {
      tone: cell.tone,
      label: cell.text
    });
    return;
  }

  if (column.type === 'money') {
    const copy = vstack('Money cell', { fill: null, gap: 1, width: column.width });
    holder.appendChild(copy);
    setFillWidth(copy);
    text(copy, cell.text, {
      token: 'tableStrong',
      weight: cell.strong === false ? 'medium' : 'semibold',
      color: cell.color ?? colors.ink,
      align: 'RIGHT',
      width: column.width,
      fill: false
    });
    if (cell.sub) {
      text(copy, cell.sub, {
        token: 'caption',
        color: colors.muted,
        align: 'RIGHT',
        width: column.width,
        fill: false
      });
    }
    return;
  }

  if (column.type === 'meta' || column.type === 'action') {
    if (cell.icon) {
      icon(holder, cell.icon, colors.muted, 17);
      return;
    }
    if (column.type === 'action') {
      icon(holder, 'more', colors.muted, 17);
      return;
    }
  }

  const copy = vstack('Text cell', { fill: null, gap: 1, width: column.width });
  holder.appendChild(copy);
  text(copy, clampText(cell.text, 44), {
    token: 'table',
    weight: cell.strong ? 'semibold' : 'regular',
    color: cell.color ?? (cell.strong ? colors.ink : colors.inkSoft),
    align: column.align ?? 'LEFT',
    width: column.width,
    fill: false
  });
  if (cell.sub) {
    text(copy, clampText(cell.sub, 46), {
      token: 'caption',
      color: colors.muted,
      align: column.align ?? 'LEFT',
      width: column.width,
      fill: false
    });
  }
  if (isLast && cell.icon) {
    icon(holder, cell.icon, colors.muted, 16);
  }
}

export function initialsFor(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function tableFooter(
  parent: FrameNode,
  opts: { width: number; shown: string; current?: number; pages?: number }
): FrameNode {
  const row = hstack('Table pagination', {
    width: opts.width,
    height: 46,
    paddingX: 20,
    fill: colors.surface,
    justify: 'SPACE_BETWEEN',
    align: 'CENTER'
  });
  parent.appendChild(row);
  text(row, opts.shown, {
    token: 'caption',
    color: colors.muted,
    fill: false,
    hug: true
  });
  const controls = hstack('Pagination controls', {
    gap: 6,
    fill: null,
    align: 'CENTER'
  });
  row.appendChild(controls);
  button(controls, 'Previous', { variant: 'secondary', compact: true, icon: 'chevronLeft', disabled: (opts.current ?? 1) <= 1 });
  text(controls, `${opts.current ?? 1} / ${opts.pages ?? 1}`, {
    token: 'caption',
    weight: 'medium',
    color: colors.inkSoft,
    fill: false,
    hug: true
  }).name = 'Page count';
  button(controls, 'Next', { variant: 'secondary', compact: true, trailingIcon: 'chevronRight' });
  return row;
}

export interface MetricCardOptions {
  label: string;
  value: string;
  change?: string;
  changeTone?: 'up' | 'down' | 'neutral';
  icon: IconName;
  width?: number;
  series?: number[];
  seriesColor?: string;
  footnote?: string;
}

export function metricCard(parent: FrameNode, opts: MetricCardOptions): FrameNode {
  const node = vstack(`Metric · ${opts.label}`, {
    width: opts.width ?? 270,
    height: 128,
    gap: 10,
    padding: 16,
    fill: colors.surface,
    stroke: colors.border,
    radius: radii.md
  });
  parent.appendChild(node);
  const header = hstack('Metric header', {
    width: (opts.width ?? 270) - 32,
    height: 20,
    fill: null
  });
  node.appendChild(header);
  const labelRow = hstack('Metric label', { gap: 7, fill: null, align: 'CENTER' });
  header.appendChild(labelRow);
  icon(labelRow, opts.icon, colors.muted, 15);
  text(labelRow, opts.label, {
    token: 'label',
    color: colors.muted,
    fill: false,
    hug: true
  });
  spacer(header, 1, true);

  const valueRow = hstack('Metric value row', {
    width: (opts.width ?? 270) - 32,
    height: 40,
    fill: null,
    justify: 'SPACE_BETWEEN',
    align: 'CENTER'
  });
  node.appendChild(valueRow);
  text(valueRow, opts.value, {
    token: 'metric',
    size: 26,
    lineHeight: 32,
    weight: 'bold',
    color: colors.ink,
    fill: false,
    hug: true
  });
  if (opts.series) {
    sparkline(valueRow, opts.series, {
      width: 56,
      height: 28,
      color: opts.seriesColor ?? colors.chartDeposit
    });
  }

  const footer = hstack('Metric footer', { gap: 6, fill: null, align: 'CENTER' });
  node.appendChild(footer);
  if (opts.change) {
    const tone =
      opts.changeTone === 'down' ? 'error' : opts.changeTone === 'neutral' ? 'neutral' : 'success';
    tag(footer, opts.change, tone, {
      icon: opts.changeTone === 'down' ? 'trendDown' : opts.changeTone === 'neutral' ? 'dot' : 'trendUp',
      size: 'sm'
    });
  }
  text(footer, opts.footnote ?? 'vs last month', {
    token: 'caption',
    color: colors.mutedLight,
    fill: false,
    hug: true
  });
  return node;
}

export function infoBanner(
  parent: FrameNode,
  opts: {
    title: string;
    body?: string;
    tone?: Tone;
    icon?: IconName;
    width?: number;
    action?: string;
  }
): FrameNode {
  const style = toneStyle(opts.tone ?? 'info');
  const node = hstack(`Banner · ${opts.title}`, {
    width: opts.width,
    height: opts.body ? undefined : 40,
    gap: 10,
    paddingX: 14,
    paddingTop: opts.body ? 10 : 0,
    paddingBottom: opts.body ? 10 : 0,
    fill: style.bg,
    radius: radii.sm,
    align: 'CENTER'
  });
  parent.appendChild(node);
  icon(node, opts.icon ?? style.icon, style.fg, 17);
  const copy = vstack('Banner copy', { fill: null, gap: 1 });
  node.appendChild(copy);
  setFillWidth(copy);
  text(copy, opts.title, {
    token: 'label',
    weight: 'semibold',
    color: style.fg,
    fill: false
  });
  if (opts.body) {
    text(copy, opts.body, {
      token: 'caption',
      color: style.fg,
      fill: false
    });
  }
  if (opts.action) {
    spacer(node, 1, true);
    button(node, opts.action, { variant: 'ghost', compact: true });
  }
  return node;
}

export function sectionHeader(
  parent: FrameNode,
  title: string,
  opts: { subtitle?: string; action?: string; width?: number; icon?: IconName } = {}
): FrameNode {
  const node = hstack(`Section · ${title}`, {
    width: opts.width,
    height: 32,
    fill: null,
    justify: 'SPACE_BETWEEN',
    align: 'CENTER'
  });
  parent.appendChild(node);
  const copy = hstack('Section copy', { gap: 8, fill: null, align: 'CENTER' });
  node.appendChild(copy);
  if (opts.icon) {
    icon(copy, opts.icon, colors.muted, 16);
  }
  text(copy, title, {
    token: 'h3',
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
    button(node, opts.action, { variant: 'ghost', trailingIcon: 'chevronRight', compact: true });
  }
  return node;
}

export function emptyState(
  parent: FrameNode,
  opts: {
    title: string;
    body: string;
    icon?: IconName;
    action?: string;
    width?: number;
    height?: number;
  }
): FrameNode {
  const node = vstack(`Empty state · ${opts.title}`, {
    width: opts.width,
    height: opts.height ?? 300,
    gap: 10,
    padding: 32,
    fill: colors.surface,
    stroke: colors.border,
    radius: radii.lg,
    justify: 'CENTER',
    align: 'CENTER'
  });
  parent.appendChild(node);
  iconTile(node, opts.icon ?? 'search', { tone: 'brand', size: 44, iconSize: 20 });
  text(node, opts.title, {
    token: 'h3',
    color: colors.ink,
    align: 'CENTER',
    fill: false,
    hug: true
  });
  text(node, opts.body, {
    token: 'bodySmall',
    color: colors.muted,
    align: 'CENTER',
    width: Math.min(opts.width ?? 400, 360),
    fill: false
  });
  if (opts.action) {
    button(node, opts.action, { variant: 'secondary' });
  }
  return node;
}

export function activityRow(
  parent: FrameNode,
  opts: {
    title: string;
    detail: string;
    date: string;
    actor: string;
    meta: string;
    tone: Tone;
    width?: number;
  }
): FrameNode {
  const tone = toneStyle(opts.tone);
  const width = opts.width ?? 1128;
  const copyWidth = Math.max(200, width - 308);
  const row = hstack(`Activity · ${opts.title}`, {
    width,
    height: 62,
    gap: 12,
    paddingX: 16,
    fill: null,
    align: 'CENTER'
  });
  parent.appendChild(row);
  const tile = hstack('Activity icon', {
    width: 30,
    height: 30,
    fill: tone.bg,
    radius: 999,
    justify: 'CENTER',
    align: 'CENTER'
  });
  row.appendChild(tile);
  icon(tile, tone.icon, tone.fg, 14);
  const copy = vstack('Activity copy', { gap: 1, fill: null, width: copyWidth });
  row.appendChild(copy);
  text(copy, opts.title, {
    token: 'table',
    weight: 'semibold',
    color: colors.ink,
    width: copyWidth,
    fill: false
  });
  text(copy, `${opts.actor} · ${opts.detail}`, {
    token: 'caption',
    color: colors.muted,
    width: copyWidth,
    fill: false
  });
  const right = vstack('Activity meta', { gap: 2, fill: null, align: 'MAX', width: 208 });
  row.appendChild(right);
  text(right, opts.meta, {
    token: 'table',
    weight: 'semibold',
    color: colors.ink,
    align: 'RIGHT',
    width: 208,
    fill: false
  });
  text(right, opts.date, {
    token: 'caption',
    color: colors.mutedLight,
    align: 'RIGHT',
    width: 208,
    fill: false
  });
  return row;
}

export function detailField(
  parent: FrameNode,
  label: string,
  value: string,
  opts: { width?: number; valueColor?: string } = {}
): FrameNode {
  const node = vstack(`Detail · ${label}`, {
    width: opts.width,
    gap: 3,
    fill: null
  });
  parent.appendChild(node);
  text(node, label.toUpperCase(), {
    token: 'micro',
    weight: 'semibold',
    color: colors.mutedLight,
    width: opts.width,
    fill: false
  });
  text(node, value, {
    token: 'bodySmall',
    weight: 'medium',
    color: opts.valueColor ?? colors.ink,
    width: opts.width,
    fill: false
  });
  return node;
}

export function keyValueRow(
  parent: FrameNode,
  label: string,
  value: string,
  opts: { width?: number; strong?: boolean; valueColor?: string } = {}
): FrameNode {
  const row = hstack(`Key value · ${label}`, {
    width: opts.width,
    height: 24,
    gap: 12,
    fill: null,
    justify: 'SPACE_BETWEEN',
    align: 'CENTER'
  });
  parent.appendChild(row);
  text(row, label, {
    token: 'bodySmall',
    color: colors.muted,
    fill: false,
    hug: true
  });
  text(row, value, {
    token: 'bodySmall',
    weight: opts.strong ? 'semibold' : 'medium',
    color: opts.valueColor ?? colors.ink,
    fill: false,
    hug: true
  });
  return row;
}

export function horizontalRule(parent: FrameNode, width?: number, color = colors.border): FrameNode {
  const node = frame('Rule', { width: width ?? Math.max(1, parent.width), height: 1, fill: color });
  parent.appendChild(node);
  if (parent.layoutMode === 'VERTICAL' && width === undefined) {
    setFillWidth(node);
  }
  return node;
}

export function verticalRule(parent: FrameNode, height: number, color = colors.border): FrameNode {
  const node = frame('Vertical rule', { width: 1, height, fill: color });
  parent.appendChild(node);
  return node;
}

export function stackedBar(
  parent: FrameNode,
  segments: Array<{ pct: number; color: string }>,
  opts: { width?: number; height?: number } = {}
): FrameNode {
  const width = opts.width ?? 240;
  const height = opts.height ?? 8;
  const node = hstack('Stacked bar', {
    width,
    height,
    fill: colors.surfaceSunken,
    radius: 999,
    clip: true
  });
  parent.appendChild(node);
  segments.forEach((segment) => {
    const piece = frame('Bar segment', {
      width: Math.round((width * segment.pct) / 100),
      height,
      fill: segment.color
    });
    node.appendChild(piece);
  });
  return node;
}

export function dataRow(
  parent: FrameNode,
  width: number,
  height = 42
): FrameNode {
  const row = hstack('List row', { width, height, fill: null });
  parent.appendChild(row);
  return row;
}

export function ghostLabel(
  parent: FrameNode,
  label: string,
  color = colors.mutedLight
): TextNode {
  return text(parent, label.toUpperCase(), {
    token: 'eyebrow',
    color,
    fill: false,
    hug: true
  });
}

export function nodeFrameFill(node: FrameNode, color: string | null): void {
  node.fills = color ? [paint(color)] : [];
}

export function setWeightHug(node: TextNode, weight: FontWeight): void {
  node.fontName = node.fontName;
  node.fontSize = typeScale.body.size;
  node.name = `${node.name} · ${weight}`;
}

export function stackOptions(options: Partial<StackOptions>): StackOptions {
  return options as StackOptions;
}

export function frameOptions(options: Partial<FrameOptions>): FrameOptions {
  return options as FrameOptions;
}

export function useStyles(): { textGap: number } {
  return { textGap: space.sm };
}
