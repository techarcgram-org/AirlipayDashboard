import {
  boardColors,
  colors,
  radii,
  space,
  typeScale,
  type TypeToken
} from '../tokens';
import {
  avatar,
  brandMark,
  frame,
  hstack,
  icon,
  spacer,
  text,
  vstack
} from '../primitives';
import {
  areaChart,
  button,
  checkbox,
  dataTable,
  field,
  iconButton,
  iconTile,
  keyValueRow,
  legendItem,
  metricCard,
  progressBar,
  searchField,
  segmented,
  sparkline,
  statusPill,
  tag,
  toggle,
  type TableColumn,
  type TableRow
} from '../patterns';
import { screen } from '../tokens';

export const FOUNDATIONS_PLATE_HEIGHT = 1900;
export const FOUNDATIONS_COLUMN_HEIGHT = 1620;

function boardText(
  parent: FrameNode,
  value: string,
  opts: {
    size?: number;
    lineHeight?: number;
    weight?: 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold';
    color?: string;
    width?: number;
    hug?: boolean;
    token?: TypeToken;
    align?: 'LEFT' | 'CENTER' | 'RIGHT';
    letterSpacing?: number;
  } = {}
): TextNode {
  return text(parent, value, {
    token: opts.token ?? 'bodySmall',
    size: opts.size,
    lineHeight: opts.lineHeight,
    weight: opts.weight,
    color: opts.color ?? boardColors.text,
    width: opts.width,
    hug: opts.hug,
    align: opts.align,
    letterSpacing: opts.letterSpacing,
    fill: false
  });
}

function boardTag(parent: FrameNode, label: string, color = boardColors.mint): FrameNode {
  const node = hstack('Board tag', {
    height: 22,
    paddingX: 8,
    gap: 5,
    fill: boardColors.panelAlt,
    stroke: boardColors.border,
    radius: 999,
    align: 'CENTER'
  });
  parent.appendChild(node);
  const dotMark = frame('Tag dot', { width: 5, height: 5, fill: color, radius: 999 });
  node.appendChild(dotMark);
  boardText(node, label, { size: 10, lineHeight: 12, weight: 'semibold', color: boardColors.muted, hug: true });
  return node;
}

function foundationCard(
  name: string,
  width: number,
  height: number,
  heading: string,
  description: string
): { card: FrameNode; content: FrameNode } {
  const card = vstack(name, {
    width,
    height,
    padding: 24,
    gap: 14,
    fill: boardColors.panelAlt,
    stroke: boardColors.border,
    radius: 18
  });
  const header = hstack('Foundations card header', {
    width: width - 48,
    height: 24,
    fill: null,
    justify: 'SPACE_BETWEEN',
    align: 'CENTER'
  });
  card.appendChild(header);
  boardText(header, heading, {
    size: 18,
    lineHeight: 24,
    weight: 'semibold',
    color: boardColors.text,
    hug: true
  });
  boardText(header, description, {
    size: 11,
    lineHeight: 14,
    weight: 'medium',
    color: boardColors.faint,
    hug: true
  });
  return { card, content: card };
}

function foundationHeader(plate: FrameNode, label: string): void {
  const header = hstack('Foundations header', {
    width: 4528,
    height: 120,
    fill: null,
    justify: 'SPACE_BETWEEN',
    align: 'CENTER'
  });
  plate.appendChild(header);
  const copy = vstack('Foundations title block', { width: 1200, gap: 4, fill: null });
  header.appendChild(copy);
  const eyebrow = hstack('Foundations eyebrow', { gap: 8, fill: null, align: 'CENTER' });
  copy.appendChild(eyebrow);
  boardTag(eyebrow, label, boardColors.mint);
  boardTag(eyebrow, 'DESKTOP SCALE', boardColors.cobalt);
  boardText(copy, 'The same language, at desk scale.', {
    size: 32,
    lineHeight: 40,
    weight: 'bold',
    color: boardColors.text,
    width: 1200,
    letterSpacing: -0.7
  });
  boardText(copy, 'AirliPay mobile colour roles, Inter typography and controls extended for dense operations work. Nothing here introduces a second visual language.', {
    size: 13,
    lineHeight: 20,
    color: boardColors.muted,
    width: 1000
  });
  const meta = vstack('Foundations meta', { gap: 4, fill: null, align: 'MAX' });
  header.appendChild(meta);
  boardText(meta, '27 screens · 5 domains · 1440 × 960', {
    size: 11,
    lineHeight: 16,
    weight: 'semibold',
    color: boardColors.faint,
    align: 'RIGHT',
    width: 420
  });
  boardText(meta, 'Source: AiliPayApp/src/theme/tokens.js', {
    size: 11,
    lineHeight: 16,
    color: boardColors.faint,
    align: 'RIGHT',
    width: 420
  });
}

function colourCard(): FrameNode {
  const { card } = foundationCard('Colour roles', 1250, 640, 'Colour roles', 'Semantic, not decorative');
  card.name = 'Foundations · colour';
  const body = vstack('Colour swatches', { width: 1202, gap: 8, fill: null });
  card.appendChild(body);
  const roles: Array<{ name: string; value: string }> = [
    { name: 'Canvas', value: colors.canvas },
    { name: 'Surface', value: colors.surface },
    { name: 'Ink', value: colors.ink },
    { name: 'Muted', value: colors.muted },
    { name: 'Border', value: colors.border },
    { name: 'Sidebar', value: colors.sidebarBg },
    { name: 'Mint action', value: colors.mint },
    { name: 'Cobalt link', value: colors.cobalt },
    { name: 'Success', value: colors.success },
    { name: 'Warning', value: colors.warning },
    { name: 'Error', value: colors.error },
    { name: 'Info', value: colors.info }
  ];
  for (let index = 0; index < roles.length; index += 2) {
    const row = hstack('Swatch row', { width: 1202, height: 40, gap: 16, fill: null, align: 'CENTER' });
    body.appendChild(row);
    roles.slice(index, index + 2).forEach((role) => {
      const item = hstack('Swatch', { width: 593, height: 40, gap: 10, fill: null, align: 'CENTER' });
      row.appendChild(item);
      const chip = frame(`Swatch · ${role.name}`, {
        width: 26,
        height: 26,
        fill: role.value,
        stroke: boardColors.borderStrong,
        radius: 7
      });
      item.appendChild(chip);
      boardText(item, role.name, { size: 12, lineHeight: 16, weight: 'medium', color: boardColors.text, hug: true });
      spacer(item, 1, true);
      boardText(item, role.value.toUpperCase(), {
        size: 10,
        lineHeight: 12,
        weight: 'medium',
        color: boardColors.faint,
        hug: true
      });
    });
  }
  const rule = frame('Panel rule', { width: 1202, height: 1, fill: boardColors.border });
  card.appendChild(rule);
  const notes = vstack('Foundations colour notes', { width: 1202, gap: 6, fill: null });
  card.appendChild(notes);
  boardText(notes, 'DESKTOP-SPECIFIC ROLES', {
    size: 10,
    lineHeight: 12,
    weight: 'semibold',
    color: boardColors.mint,
    width: 1202
  });
  const support = hstack('Support roles', { width: 1202, gap: 8, fill: null, align: 'CENTER' });
  notes.appendChild(support);
  [
    { label: 'Nav active', value: colors.navActiveBg },
    { label: 'Table head', value: colors.tableHead },
    { label: 'Row selected', value: colors.rowSelected },
    { label: 'Focus ring', value: colors.focusRing }
  ].forEach((role) => {
    const item = hstack('Support role', { gap: 6, fill: null, align: 'CENTER' });
    support.appendChild(item);
    const chip = frame('Support swatch', {
      width: 14,
      height: 14,
      fill: role.value,
      stroke: boardColors.borderStrong,
      radius: 4
    });
    item.appendChild(chip);
    boardText(item, `${role.label}  ${role.value}`, {
      size: 10,
      lineHeight: 12,
      color: boardColors.muted,
      hug: true
    });
  });
  return card;
}

function typeCard(): FrameNode {
  const { card } = foundationCard('Type & rhythm', 1250, 956, 'Type & rhythm', 'Inter · mobile ramp extended');
  const rows: Array<{ token: TypeToken; label: string; sample: string }> = [
    { token: 'display', label: 'Display', sample: 'Payroll, clearly.' },
    { token: 'metric', label: 'Metric', sample: 'XAF 248.65M' },
    { token: 'pageTitle', label: 'Page title', sample: 'Operations overview' },
    { token: 'h2', label: 'Heading 2', sample: 'Next payout run' },
    { token: 'h3', label: 'Heading 3', sample: 'Cash movement' },
    { token: 'body', label: 'Body', sample: 'One calm place to move money.' },
    { token: 'bodySmall', label: 'Body small', sample: 'Employee roster and payout context.' },
    { token: 'label', label: 'Label', sample: 'Payout destination' },
    { token: 'table', label: 'Table', sample: 'EMP-10482 · Awa Fongang' },
    { token: 'eyebrow', label: 'Eyebrow', sample: 'EMPLOYMENT & CONTACT' },
    { token: 'caption', label: 'Caption', sample: 'Updated 2m ago · all times WAT' }
  ];
  const body = vstack('Type rows', { width: 1202, gap: 0, fill: null });
  card.appendChild(body);
  rows.forEach((row, index) => {
    const style = typeScale[row.token];
    const line = hstack('Type row', { width: 1202, height: 68, gap: 12, fill: null, align: 'CENTER' });
    body.appendChild(line);
    boardText(line, row.label.toUpperCase(), {
      size: 10,
      lineHeight: 12,
      weight: 'semibold',
      color: boardColors.faint,
      width: 150
    });
    const sample = text(line, row.sample, {
      token: row.token,
      color: boardColors.text,
      width: 820,
      fill: false
    });
    sample.name = `Sample · ${row.label}`;
    spacer(line, 1, true);
    boardText(line, `${style.size}/${style.lineHeight} · ${style.weight}`, {
      size: 10,
      lineHeight: 12,
      weight: 'medium',
      color: boardColors.faint,
      align: 'RIGHT',
      width: 180
    });
    if (index < rows.length - 1) {
      const rule = frame('Type rule', { width: 1202, height: 1, fill: boardColors.border });
      body.appendChild(rule);
    }
  });
  return card;
}

function spacingCard(): FrameNode {
  const { card } = foundationCard('Space & radii', 1250, 380, 'Space & radii', '4–48 spacing · 4–pill radii');
  const body = vstack('Spacing body', { width: 1202, gap: 14, fill: null });
  card.appendChild(body);
  const spacingRow = hstack('Spacing scale', { width: 1202, height: 88, gap: 12, fill: null, align: 'MAX' });
  body.appendChild(spacingRow);
  const steps = [
    { label: '4', value: 4 },
    { label: '8', value: 8 },
    { label: '12', value: 12 },
    { label: '16', value: 16 },
    { label: '24', value: 24 },
    { label: '32', value: 32 },
    { label: '40', value: 40 },
    { label: '48', value: 48 }
  ];
  steps.forEach((step) => {
    const item = vstack('Spacing step', { width: 64, gap: 5, fill: null, align: 'MIN' });
    spacingRow.appendChild(item);
    const bar = frame('Spacing bar', {
      width: Math.max(8, step.value),
      height: 8,
      fill: colors.mint,
      radius: 2
    });
    item.appendChild(bar);
    boardText(item, step.label, { size: 10, lineHeight: 12, color: boardColors.muted, hug: true });
  });
  spacer(spacingRow, 1, true);
  const rule = frame('Spacing rule', { width: 1202, height: 1, fill: boardColors.border });
  body.appendChild(rule);
  const radiusRow = hstack('Radius scale', { width: 1202, height: 92, gap: 18, fill: null, align: 'CENTER' });
  body.appendChild(radiusRow);
  [
    { label: '4', value: 4 },
    { label: '8', value: 8 },
    { label: '12', value: 12 },
    { label: '16', value: 16 },
    { label: '24', value: 24 },
    { label: 'Pill', value: 999 }
  ].forEach((radius) => {
    const item = vstack('Radius item', { gap: 4, fill: null, align: 'CENTER' });
    radiusRow.appendChild(item);
    const box = frame('Radius sample', {
      width: 54,
      height: 54,
      fill: boardColors.panel,
      stroke: boardColors.borderStrong,
      radius: radius.value
    });
    item.appendChild(box);
    boardText(item, `${radius.label}px`, { size: 10, lineHeight: 12, color: boardColors.faint, hug: true });
  });
  boardText(body, 'Cards use 12–16px; dialogs 20px; avatars and status chips are fully rounded. Type and spacing follow the mobile scale so the same rhythm carries across surfaces.', {
    size: 10,
    lineHeight: 15,
    color: boardColors.faint,
    width: 1202
  });
  return card;
}

function anatomyCard(): FrameNode {
  const { card } = foundationCard('Shell anatomy', 1250, 1216, 'Shell anatomy', 'Rail, command bar, canvas, inspector');
  const anatomy = frame('Desktop shell diagram', {
    width: 1202,
    height: 660,
    fill: colors.canvas,
    stroke: boardColors.borderStrong,
    radius: 12,
    clip: true
  });
  card.appendChild(anatomy);
  const sidebar = frame('Rail', {
    width: 200,
    height: 660,
    fill: colors.sidebarBg
  });
  anatomy.appendChild(sidebar);
  brandMark(sidebar, 20).x = 16;
  sidebar.children[sidebar.children.length - 1]!.y = 16;
  boardText(sidebar, 'AirliPay', {
    size: 13,
    lineHeight: 16,
    weight: 'bold',
    color: colors.sidebarText,
    width: 120,
    hug: true
  }).x = 44;
  (sidebar.children[sidebar.children.length - 1] as TextNode).y = 17;
  for (let index = 0; index < 7; index += 1) {
    const item = frame('Rail item', {
      width: 168,
      height: 22,
      fill: index === 0 ? colors.navActiveBg : undefined,
      radius: 6
    });
    sidebar.appendChild(item);
    item.x = 16;
    item.y = 90 + index * 32;
    if (index === 0) {
      const dotMark = frame('Rail dot', { width: 5, height: 5, fill: colors.navActiveText, radius: 999 });
      item.appendChild(dotMark);
      dotMark.x = 10;
      dotMark.y = 8;
    }
  }
  boardText(anatomy, '248 px rail', {
    size: 9,
    lineHeight: 11,
    weight: 'semibold',
    color: boardColors.faint,
    width: 190,
    align: 'CENTER'
  }).x = 5;
  (anatomy.children[anatomy.children.length - 1] as TextNode).y = 632;

  const topbar = frame('Command bar', {
    width: 1002,
    height: 64,
    fill: colors.topbarBg,
    stroke: colors.border,
    radius: 0
  });
  anatomy.appendChild(topbar);
  topbar.x = 200;
  topbar.y = 0;
  const search = frame('Command search', {
    width: 280,
    height: 28,
    fill: colors.fieldBg,
    stroke: colors.border,
    radius: 6
  });
  topbar.appendChild(search);
  search.x = 24;
  search.y = 13;
  boardText(search, 'Search operations…', {
    size: 9,
    lineHeight: 11,
    color: colors.mutedLight,
    hug: true
  }).x = 10;
  (search.children[search.children.length - 1] as TextNode).y = 9;
  boardText(topbar, '64 px command bar', {
    size: 9,
    lineHeight: 11,
    weight: 'semibold',
    color: boardColors.faint,
    width: 180,
    align: 'RIGHT'
  }).x = 798;
  (topbar.children[topbar.children.length - 1] as TextNode).y = 22;

  const content = frame('Canvas', {
    width: 752,
    height: 596,
    fill: colors.canvas
  });
  anatomy.appendChild(content);
  content.x = 200;
  content.y = 64;
  const pageTitle = boardText(content, 'Operations overview', {
    size: 18,
    lineHeight: 22,
    weight: 'bold',
    color: colors.ink,
    width: 400
  });
  pageTitle.x = 24;
  pageTitle.y = 18;
  const pageMeta = boardText(content, 'Thursday, 23 October 2026 · all times WAT', {
    size: 9,
    lineHeight: 12,
    color: colors.muted,
    width: 400
  });
  pageMeta.x = 24;
  pageMeta.y = 44;
  const cardOne = frame('Content card', {
    width: 220,
    height: 110,
    fill: colors.surface,
    stroke: colors.border,
    radius: 8
  });
  content.appendChild(cardOne);
  cardOne.x = 24;
  cardOne.y = 82;
  const cardTwo = frame('Content card', {
    width: 220,
    height: 110,
    fill: colors.surface,
    stroke: colors.border,
    radius: 8
  });
  content.appendChild(cardTwo);
  cardTwo.x = 260;
  cardTwo.y = 82;
  const cardThree = frame('Content card', {
    width: 468,
    height: 330,
    fill: colors.surface,
    stroke: colors.border,
    radius: 8
  });
  content.appendChild(cardThree);
  cardThree.x = 24;
  cardThree.y = 208;
  const chartLine = frame('Chart hint', {
    width: 428,
    height: 4,
    fill: colors.chartDeposit,
    radius: 2
  });
  cardThree.appendChild(chartLine);
  chartLine.x = 20;
  chartLine.y = 180;

  const inspector = frame('Inspector', {
    width: 250,
    height: 596,
    fill: colors.surface,
    stroke: colors.border,
    radius: 0
  });
  anatomy.appendChild(inspector);
  inspector.x = 952;
  inspector.y = 64;
  const inspectorTitle = boardText(inspector, 'Employee snapshot', {
    size: 11,
    lineHeight: 14,
    weight: 'semibold',
    color: colors.ink,
    width: 210
  });
  inspectorTitle.x = 20;
  inspectorTitle.y = 20;
  for (let index = 0; index < 5; index += 1) {
    const line = frame('Inspector line', {
      width: 190 - index * 10,
      height: 4,
      fill: colors.border,
      radius: 2
    });
    inspector.appendChild(line);
    line.x = 20;
    line.y = 58 + index * 24;
  }
  const balanceTile = frame('Inspector balance', {
    width: 210,
    height: 70,
    fill: colors.mintSoft,
    radius: 8
  });
  inspector.appendChild(balanceTile);
  balanceTile.x = 20;
  balanceTile.y = 190;

  const dimRow = hstack('Dimension labels', { width: 1202, height: 54, gap: 10, fill: null, align: 'CENTER' });
  card.appendChild(dimRow);
  [
    { label: 'RAIL', value: '248 px' },
    { label: 'COMMAND BAR', value: '64 px' },
    { label: 'CONTENT', value: '1128 px' },
    { label: 'INSPECTOR', value: '336 px' },
    { label: 'GUTTER', value: '32 px' }
  ].forEach((item) => {
    const box = hstack('Dimension', {
      height: 44,
      paddingX: 10,
      gap: 6,
      fill: boardColors.panel,
      stroke: boardColors.border,
      radius: 8,
      align: 'CENTER'
    });
    dimRow.appendChild(box);
    boardText(box, item.label, {
      size: 9,
      lineHeight: 11,
      weight: 'semibold',
      color: boardColors.faint,
      hug: true
    });
    boardText(box, item.value, {
      size: 11,
      lineHeight: 13,
      weight: 'semibold',
      color: boardColors.mint,
      hug: true
    });
  });

  const navStrip = vstack('Rail specimen', {
    width: 1202,
    height: 300,
    padding: 20,
    gap: 10,
    fill: colors.sidebarBg,
    radius: 12,
    clip: true
  });
  card.appendChild(navStrip);
  const navTitle = hstack('Nav specimen header', { width: 1162, height: 24, fill: null, justify: 'SPACE_BETWEEN', align: 'CENTER' });
  navStrip.appendChild(navTitle);
  boardText(navTitle, 'Navigation specimen', {
    size: 12,
    lineHeight: 16,
    weight: 'semibold',
    color: colors.sidebarText,
    hug: true
  });
  boardText(navTitle, 'One active destination at a time', {
    size: 10,
    lineHeight: 12,
    color: colors.sidebarFaint,
    hug: true
  });
  const navCols = hstack('Nav columns', { width: 1162, height: 210, gap: 18, fill: null, align: 'MIN' });
  navStrip.appendChild(navCols);
  ['Workspace', 'Money', 'Account'].forEach((group, groupIndex) => {
    const col = vstack('Nav group', { width: 375, gap: 6, fill: null });
    navCols.appendChild(col);
    boardText(col, group.toUpperCase(), {
      size: 9,
      lineHeight: 11,
      weight: 'semibold',
      color: colors.sidebarFaint,
      width: 375
    });
    const items = [
      ['overview', 'Overview'],
      ['users', 'Employees'],
      ['clients', 'Clients'],
      ['team', 'Team & access'],
      ['transactions', 'Transactions'],
      ['invoices', 'Invoices'],
      ['payments', 'Payments'],
      ['profile', 'My profile']
    ] as const;
    const selected = [
      [items[0], items[1], items[3]],
      [items[4], items[5], items[6]],
      [items[7]]
    ][groupIndex]!;
    selected.forEach((item, index) => {
      const active = groupIndex === 0 && index === 0;
      const row = hstack('Nav specimen item', {
        width: 375,
        height: 30,
        gap: 8,
        paddingX: 9,
        fill: active ? colors.navActiveBg : null,
        radius: 6,
        align: 'CENTER'
      });
      col.appendChild(row);
      icon(row, item[0] as never, active ? colors.navActiveText : colors.sidebarMuted, 14);
      boardText(row, item[1], {
        size: 11,
        lineHeight: 14,
        weight: active ? 'semibold' : 'medium',
        color: active ? colors.sidebarText : colors.sidebarMuted,
        hug: true
      });
    });
  });
  return card;
}

function actionsSpecimen(parent: FrameNode, width: number): TextNode {
  const label = boardText(parent, 'Actions', {
    size: 10,
    lineHeight: 12,
    weight: 'semibold',
    color: boardColors.faint,
    width
  });
  const strip = hstack('Actions specimen', {
    width,
    height: 76,
    padding: 16,
    gap: 10,
    fill: colors.surface,
    stroke: colors.border,
    radius: 12,
    align: 'CENTER'
  });
  parent.appendChild(strip);
  button(strip, 'New pay run', { variant: 'primary', icon: 'plus' });
  button(strip, 'Export', { variant: 'secondary', icon: 'download' });
  button(strip, 'Cancel', { variant: 'ghost' });
  button(strip, 'Deactivate', { variant: 'danger', icon: 'pause' });
  spacer(strip, 1, true);
  iconButton(strip, 'bell', { size: 36, stroke: colors.border, background: colors.surface });
  iconButton(strip, 'more', { size: 36, background: colors.surfaceSunken });
  return label;
}

function inputsSpecimen(parent: FrameNode, width: number): TextNode {
  const label = boardText(parent, 'Inputs & controls', {
    size: 10,
    lineHeight: 12,
    weight: 'semibold',
    color: boardColors.faint,
    width
  });
  const strip = hstack('Inputs specimen', {
    width,
    height: 152,
    padding: 16,
    gap: 18,
    fill: colors.surface,
    stroke: colors.border,
    radius: 12,
    align: 'MIN'
  });
  parent.appendChild(strip);
  field(strip, {
    label: 'Search',
    placeholder: 'Search employees…',
    width: 320,
    icon: 'search'
  });
  field(strip, {
    label: 'Employer',
    value: 'Penda Logistics',
    variant: 'select',
    width: 280
  });
  field(strip, {
    label: 'Base salary',
    value: 'XAF 240,000',
    width: 260,
    required: true
  });
  const controls = vstack('Controls', { width: 260, gap: 10, fill: null });
  strip.appendChild(controls);
  checkbox(controls, 'Remember this device', true);
  const toggleRow = hstack('Toggle sample', { gap: 8, height: 26, fill: null, align: 'CENTER' });
  controls.appendChild(toggleRow);
  toggle(toggleRow, true);
  boardText(toggleRow, 'Notifications', {
    size: 11,
    lineHeight: 14,
    color: colors.inkSoft,
    hug: true
  });
  return label;
}

function statusSpecimen(parent: FrameNode, width: number): TextNode {
  const label = boardText(parent, 'Status language', {
    size: 10,
    lineHeight: 12,
    weight: 'semibold',
    color: boardColors.faint,
    width
  });
  const strip = hstack('Status specimen', {
    width,
    height: 82,
    padding: 16,
    gap: 8,
    fill: colors.surface,
    stroke: colors.border,
    radius: 12,
    align: 'CENTER'
  });
  parent.appendChild(strip);
  statusPill(strip, 'ACTIVE');
  statusPill(strip, 'PENDING');
  statusPill(strip, 'SUCCESS');
  statusPill(strip, 'FAILED');
  statusPill(strip, 'PENDING_CONFIRMATION');
  statusPill(strip, 'TREATED');
  spacer(strip, 1, true);
  tag(strip, 'MERGED', 'brand');
  tag(strip, 'FIXTURE', 'warning');
  tag(strip, 'PROPOSED', 'neutral');
  return label;
}

function tableSpecimen(parent: FrameNode, width: number): TextNode {
  const label = boardText(parent, 'Table anatomy', {
    size: 10,
    lineHeight: 12,
    weight: 'semibold',
    color: boardColors.faint,
    width
  });
  const strip = vstack('Table specimen', {
    width,
    height: 238,
    padding: 16,
    gap: 8,
    fill: colors.surface,
    stroke: colors.border,
    radius: 12
  });
  parent.appendChild(strip);
  const columns: TableColumn[] = [
    { key: 'employee', label: 'EMPLOYEE', width: 580, type: 'identity' },
    { key: 'employer', label: 'EMPLOYER', width: 540 },
    { key: 'amount', label: 'WALLET', width: 360, type: 'money', align: 'RIGHT' },
    { key: 'status', label: 'STATUS', width: 320, type: 'status', align: 'RIGHT' }
  ];
  const rows: TableRow[] = [
    {
      employee: { text: 'Awa Fongang', sub: 'EMP-10482 · awa.fongang@penda.cm', initials: 'AF' },
      employer: { text: 'Penda Logistics' },
      amount: { text: 'XAF 184,500' },
      status: { text: 'Active', status: 'ACTIVE' }
    },
    {
      employee: { text: 'Brice Tchoumi', sub: 'EMP-09117 · brice.tchoumi@kribimarine.cm', initials: 'BT' },
      employer: { text: 'Kribi Marine' },
      amount: { text: 'XAF 96,000' },
      status: { text: 'Active', status: 'ACTIVE' }
    }
  ];
  dataTable(strip, { width: width - 32, columns, rows, rowHeight: 52, selectedIndex: 0 });
  return label;
}

function identitySpecimen(parent: FrameNode, width: number): TextNode {
  const label = boardText(parent, 'Identity & cards', {
    size: 10,
    lineHeight: 12,
    weight: 'semibold',
    color: boardColors.faint,
    width
  });
  const strip = hstack('Identity specimen', {
    width,
    height: 164,
    padding: 16,
    gap: 18,
    fill: colors.surface,
    stroke: colors.border,
    radius: 12,
    align: 'CENTER'
  });
  parent.appendChild(strip);
  const avatars = vstack('Avatar samples', { gap: 6, fill: null });
  strip.appendChild(avatars);
  const row = hstack('Avatar row', { gap: 8, fill: null, align: 'CENTER' });
  avatars.appendChild(row);
  avatar(row, 'NM', { size: 44, bg: colors.cobaltSoft, color: colors.cobaltText });
  avatar(row, 'AF', { size: 36, bg: colors.mintSoft, color: colors.onMintSoft });
  avatar(row, 'PL', { size: 30, bg: colors.cobaltSoft, color: colors.cobaltText });
  const metrics = hstack('Metric sample', { gap: 12, fill: null, align: 'CENTER' });
  strip.appendChild(metrics);
  metricCard(metrics, {
    label: 'Payroll volume',
    value: 'XAF 248.7M',
    change: '+12.4%',
    icon: 'trendUp',
    width: 300,
    series: [42, 48, 45, 61, 58, 74, 69, 82, 78, 91, 88, 103]
  });
  const detail = vstack('Detail header sample', {
    width: 440,
    gap: 4,
    padding: 14,
    fill: colors.surfaceSunken,
    radius: 10
  });
  strip.appendChild(detail);
  boardText(detail, 'Employee snapshot', {
    size: 13,
    lineHeight: 16,
    weight: 'semibold',
    color: colors.ink,
    width: 412
  });
  boardText(detail, 'Awa Fongang · EMP-10482 · Penda Logistics', {
    size: 10,
    lineHeight: 13,
    color: colors.muted,
    width: 412
  });
  const detailRow = hstack('Detail row', { width: 412, height: 26, fill: null, align: 'CENTER' });
  detail.appendChild(detailRow);
  statusPill(detailRow, 'ACTIVE', { size: 'sm' });
  spacer(detailRow, 1, true);
  progressBar(detailRow, 78, { width: 200, height: 5, color: colors.mint });
  return label;
}

function componentsCard(): FrameNode {
  const { card } = foundationCard('Components', 1960, 1010, 'Components', 'Built from the same primitives');
  const body = vstack('Components body', { width: 1912, gap: 10, fill: null });
  card.appendChild(body);
  actionsSpecimen(body, 1912);
  inputsSpecimen(body, 1912);
  statusSpecimen(body, 1912);
  tableSpecimen(body, 1912);
  identitySpecimen(body, 1912);
  return card;
}

function chartsCard(): FrameNode {
  const { card } = foundationCard('Data display', 1960, 586, 'Data display', 'Quiet charts, legible numbers');
  const body = hstack('Charts body', { width: 1912, height: 480, gap: 20, fill: null, align: 'MIN' });
  card.appendChild(body);
  const chartSurface = vstack('Chart specimen', {
    width: 1330,
    height: 480,
    padding: 20,
    gap: 8,
    fill: colors.surface,
    stroke: colors.border,
    radius: 12
  });
  body.appendChild(chartSurface);
  const chartHeader = hstack('Chart header', { width: 1290, height: 30, fill: null, justify: 'SPACE_BETWEEN', align: 'CENTER' });
  chartSurface.appendChild(chartHeader);
  boardText(chartHeader, 'Cash movement', {
    size: 15,
    lineHeight: 19,
    weight: 'semibold',
    color: colors.ink,
    hug: true
  });
  segmented(chartHeader, ['7D', '30D', '90D'], 1);
  const legend = hstack('Chart legend', { width: 1290, height: 18, gap: 16, fill: null, align: 'CENTER' });
  chartSurface.appendChild(legend);
  legendItem(legend, 'Employer funding', colors.chartDeposit);
  legendItem(legend, 'Employee payouts', colors.chartPayout);
  spacer(legend, 1, true);
  boardText(legend, 'Updated 2m ago', {
    size: 10,
    lineHeight: 12,
    color: colors.mutedLight,
    hug: true
  });
  areaChart(chartSurface, {
    width: 1290,
    height: 370,
    seriesA: [42, 48, 45, 61, 58, 74, 69, 82, 78, 91, 88, 103],
    seriesB: [30, 36, 33, 42, 51, 47, 61, 58, 66, 63, 74, 71]
  });
  const tiles = vstack('Chart side tiles', { width: 562, gap: 16, fill: null });
  body.appendChild(tiles);
  metricCard(tiles, {
    label: 'Payout volume',
    value: 'XAF 248.65M',
    change: '+12.4%',
    icon: 'trendUp',
    width: 562,
    series: [42, 48, 45, 61, 58, 74, 69, 82, 78, 91, 88, 103],
    seriesColor: colors.chartDeposit
  });
  const side = vstack('Sparkline card', {
    width: 562,
    height: 250,
    padding: 18,
    gap: 8,
    fill: colors.surface,
    stroke: colors.border,
    radius: 12
  });
  tiles.appendChild(side);
  boardText(side, 'SPARKLINES', {
    size: 9,
    lineHeight: 11,
    weight: 'semibold',
    color: colors.mutedLight,
    width: 526
  });
  const sparkRow = hstack('Sparkline row', { width: 526, height: 48, gap: 16, fill: null, align: 'CENTER' });
  side.appendChild(sparkRow);
  sparkline(sparkRow, [12, 18, 15, 22, 20, 28, 25, 32], { width: 120, height: 40 });
  sparkline(sparkRow, [30, 26, 31, 28, 35, 32, 38, 36], { width: 120, height: 40, color: colors.chartPayout });
  sparkline(sparkRow, [18, 20, 19, 22, 21, 25, 24, 28], { width: 120, height: 40, color: colors.warning });
  const factRow = hstack('Fact row', { width: 526, height: 26, fill: null, align: 'CENTER' });
  side.appendChild(factRow);
  keyValueRow(factRow, 'Payout success', '99.2%', { width: 526 });
  button(side, 'Open insights', { width: 526, variant: 'secondary', trailingIcon: 'arrowRight' });
  return card;
}

export function buildFoundationsPlate(themeLabel: 'LIGHT' | 'DARK'): FrameNode {
  const plate = vstack(`Foundations · ${themeLabel}`, {
    width: 4656,
    height: FOUNDATIONS_PLATE_HEIGHT,
    padding: 64,
    gap: 32,
    fill: boardColors.panel,
    stroke: boardColors.border,
    radius: 24
  });
  foundationHeader(plate, `${themeLabel} FOUNDATIONS`);
  const columns = hstack('Foundations columns', {
    width: 4528,
    height: FOUNDATIONS_COLUMN_HEIGHT,
    gap: 32,
    fill: null,
    align: 'MIN'
  });
  plate.appendChild(columns);

  const col1 = vstack('Foundations column · tokens', {
    width: 1250,
    height: FOUNDATIONS_COLUMN_HEIGHT,
    gap: 24,
    fill: null
  });
  columns.appendChild(col1);
  col1.appendChild(colourCard());
  col1.appendChild(typeCard());

  const col2 = vstack('Foundations column · rhythm', {
    width: 1250,
    height: FOUNDATIONS_COLUMN_HEIGHT,
    gap: 24,
    fill: null
  });
  columns.appendChild(col2);
  col2.appendChild(spacingCard());
  col2.appendChild(anatomyCard());

  const col3 = vstack('Foundations column · components', {
    width: 1960,
    height: FOUNDATIONS_COLUMN_HEIGHT,
    gap: 24,
    fill: null
  });
  columns.appendChild(col3);
  col3.appendChild(componentsCard());
  col3.appendChild(chartsCard());

  return plate;
}
