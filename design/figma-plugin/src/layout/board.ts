import {
  board,
  boardColors,
  colors,
  darkColors,
  lightColors,
  setTheme,
  type ThemeName
} from '../tokens';
import {
  brandMark,
  frame,
  hstack,
  icon,
  logoLockup,
  paint,
  setGrow,
  spacer,
  svg,
  text,
  vstack
} from '../primitives';
import {
  BUILDERS,
  buildFoundationsPlate,
  FOUNDATIONS_PLATE_HEIGHT
} from '../screens';
import {
  SCREENS,
  SCREEN_GROUPS,
  groupFor,
  primaryRouteFor,
  tagLabel,
  type ScreenSpec
} from '../spec/screens';
import { ROUTES, type DataStatus, type RouteSpec } from '../spec/routes';
import { routeArtSvg } from '../icons';

export const BOARD_PAGE_NAME = 'AirliPay · Back Office Redesign (v1)';
export const WORKING_PAGE_NAME = 'AirliPay · Back Office Redesign (working)';

export const MARKERS = {
  board: 'airlipayBackofficeBoard',
  section: 'airlipayBackofficeSection',
  sectionKind: 'airlipayBackofficeSectionKind',
  theme: 'airlipayBackofficeTheme',
  screen: 'airlipayBackofficeScreen',
  plate: 'airlipayBackofficePlate',
  route: 'airlipayBackofficeRoute',
  run: 'airlipayBackofficeRun'
} as const;

export const EXPECTED_ROUTE_ROWS = ROUTES.length;
export const EXPECTED_SCREENS_PER_THEME = SCREENS.length;
export const THEME_SECTION_HEIGHT = 10_100;
export const COVER_HEIGHT = 1_100;
export const FOUNDATIONS_GAP = 160;
export const COVERAGE_HEIGHT = 1_800;

export interface ProgressReporter {
  (message: string, pct: number, log?: boolean): void;
}

export interface BoardOptions {
  themes: ThemeName[];
  runToken: string;
  report: ProgressReporter;
  isCancelled: () => boolean;
}

export interface BoardResult {
  sections: FrameNode[];
  screenCount: number;
  plateCount: number;
  routeRowCount: number;
  cover: FrameNode | null;
  summary: string;
}

interface CaptionOptions {
  x: number;
  y: number;
  spec: ScreenSpec;
  theme: ThemeName;
}

const dataStatusColor: Record<DataStatus, string> = {
  live: boardColors.mint,
  fixture: boardColors.warning,
  concept: boardColors.faint,
  'ui-gap': boardColors.danger,
  proposed: boardColors.cobalt
};

const representationLabel: Record<RouteSpec['representation'], string> = {
  direct: 'Direct',
  'default-tab': 'Default tab',
  excluded: 'Excluded'
};

const dataStatusLabel: Record<DataStatus, string> = {
  live: 'Live',
  fixture: 'Fixture',
  concept: 'Concept',
  'ui-gap': 'UI gap',
  proposed: 'Proposed'
};

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
    align?: 'LEFT' | 'CENTER' | 'RIGHT';
    letterSpacing?: number;
  } = {}
): TextNode {
  return text(parent, value, {
    token: 'bodySmall',
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
    height: 24,
    paddingX: 9,
    gap: 6,
    fill: boardColors.panelAlt,
    stroke: boardColors.border,
    radius: 999,
    align: 'CENTER'
  });
  parent.appendChild(node);
  const dotMark = frame('Tag dot', { width: 5, height: 5, fill: color, radius: 999 });
  node.appendChild(dotMark);
  boardText(node, label, {
    size: 10,
    lineHeight: 12,
    weight: 'semibold',
    color: boardColors.muted,
    hug: true
  });
  return node;
}

function dataBadge(parent: FrameNode, status: DataStatus): FrameNode {
  const node = hstack('Data status', { gap: 5, height: 18, fill: null, align: 'CENTER' });
  parent.appendChild(node);
  const dotMark = frame('Status dot', {
    width: 5,
    height: 5,
    fill: dataStatusColor[status],
    radius: 999
  });
  node.appendChild(dotMark);
  boardText(node, dataStatusLabel[status], {
    size: 10,
    lineHeight: 12,
    weight: 'medium',
    color: dataStatusColor[status],
    hug: true
  });
  return node;
}

function sectionFrame(
  name: string,
  height: number,
  kind: string,
  runToken: string,
  theme?: ThemeName
): FrameNode {
  const node = frame(name, {
    width: board.width,
    height,
    fill: boardColors.bg,
    stroke: boardColors.border,
    radius: 28,
    clip: true
  });
  node.setPluginData(MARKERS.section, 'true');
  node.setPluginData(MARKERS.sectionKind, kind);
  node.setPluginData(MARKERS.run, runToken);
  if (theme) {
    node.setPluginData(MARKERS.theme, theme);
  }
  return node;
}

function buildCover(): FrameNode {
  const section = sectionFrame('01 · Cover and reading guide', COVER_HEIGHT, 'cover', 'cover');
  const art = svg(section, routeArtSvg(1500, 520, boardColors.mint), 'Cover route artwork');
  art.x = 300;
  art.y = 540;
  art.opacity = 0.42;
  const left = vstack('Cover copy', {
    width: 2600,
    height: 924,
    gap: 22,
    fill: null
  });
  section.appendChild(left);
  left.x = 96;
  left.y = 88;

  logoLockup(left, {
    width: 220,
    size: 30,
    markSize: 27,
    color: boardColors.text
  });
  const tags = hstack('Cover tags', { width: 2600, height: 26, gap: 8, fill: null, align: 'CENTER' });
  left.appendChild(tags);
  boardTag(tags, 'EAS-INSPIRED OPERATIONS SHELL', boardColors.cobalt);
  boardTag(tags, 'MOBILE LIGHT + DARK THEMES', boardColors.mint);
  boardTag(tags, 'FULL ROUTE MAP', boardColors.warning);

  boardText(left, 'A back office that moves\nas fast as payroll.', {
    size: 66,
    lineHeight: 72,
    weight: 'extrabold',
    color: boardColors.text,
    width: 2300,
    letterSpacing: -1.8
  });
  boardText(
    left,
    'A dense, accountable operations workspace built for AirliPay staff. The shell borrows Expo EAS clarity; the colour, type and money states come directly from the mobile app.',
    {
      size: 17,
      lineHeight: 27,
      color: boardColors.muted,
      width: 1800
    }
  );

  const metrics = hstack('Cover metrics', { width: 2600, height: 112, gap: 18, fill: null, align: 'CENTER' });
  left.appendChild(metrics);
  [
    { value: '27', label: 'screens per theme', meta: '5 operations domains' },
    { value: '54', label: 'desktop app frames', meta: '1440 × 960 each' },
    { value: '29', label: 'live routes mapped', meta: '1 root redirect excluded' }
  ].forEach((metric) => {
    const tile = vstack('Cover metric', {
      width: 854,
      height: 112,
      gap: 2,
      padding: 16,
      fill: boardColors.panelAlt,
      stroke: boardColors.border,
      radius: 14,
      justify: 'CENTER'
    });
    metrics.appendChild(tile);
    boardText(tile, metric.value, {
      size: 34,
      lineHeight: 38,
      weight: 'bold',
      color: boardColors.mint,
      width: 822
    });
    boardText(tile, metric.label, {
      size: 12,
      lineHeight: 16,
      weight: 'semibold',
      color: boardColors.text,
      width: 822
    });
    boardText(tile, metric.meta, {
      size: 10,
      lineHeight: 13,
      color: boardColors.faint,
      width: 822
    });
  });

  const domains = hstack('Cover domains', {
    width: 2600,
    height: 28,
    gap: 8,
    fill: null,
    align: 'CENTER'
  });
  left.appendChild(domains);
  ['Access 3', 'Employees 8', 'Clients 8', 'Team 4', 'Finance 4'].forEach((label) => {
    boardTag(domains, label, boardColors.faint);
  });

  const flex = frame('Cover spacer', { width: 1, height: 1, fill: null });
  left.appendChild(flex);
  setGrow(flex);

  const footer = hstack('Cover footer', { width: 2600, height: 24, fill: null, align: 'CENTER' });
  left.appendChild(footer);
  icon(footer, 'shieldCheck', boardColors.faint, 15);
  boardText(footer, 'Static review artifact · No prototype links · October 2026', {
    size: 10,
    lineHeight: 13,
    color: boardColors.faint,
    hug: true
  });
  spacer(footer, 1, true);
  boardText(footer, 'Built from the AirlipayDashboard route map', {
    size: 10,
    lineHeight: 13,
    color: boardColors.faint,
    hug: true
  });

  const guide = vstack('Cover guide', {
    width: 1760,
    height: 924,
    padding: 32,
    gap: 18,
    fill: boardColors.panelAlt,
    stroke: boardColors.border,
    radius: 24
  });
  section.appendChild(guide);
  guide.x = 2796;
  guide.y = 88;

  boardText(guide, 'READING GUIDE', {
    size: 10,
    lineHeight: 13,
    weight: 'semibold',
    color: boardColors.mint,
    width: 1696
  });
  boardText(guide, 'One route map. Two complete themes.', {
    size: 28,
    lineHeight: 34,
    weight: 'bold',
    color: boardColors.text,
    width: 1696
  });
  boardText(
    guide,
    'Every live dashboard route is represented. Foundations come first; the same 27 screens follow in light and dark; coverage and implementation notes close the review.',
    {
      size: 12,
      lineHeight: 19,
      color: boardColors.muted,
      width: 1500
    }
  );

  const sectionsList = vstack('Guide sections', { width: 1696, gap: 0, fill: null });
  guide.appendChild(sectionsList);
  [
    { number: '01', title: 'Cover and reading guide', meta: 'What this artifact covers' },
    { number: '02', title: 'Foundations', meta: 'Tokens, shell, controls, data display' },
    { number: '03', title: 'Light theme', meta: '27 screens · 3-column gallery' },
    { number: '04', title: 'Dark theme', meta: 'The same 27 screens' },
    { number: '05', title: 'Route coverage and handoff', meta: '29 live routes · 1 excluded redirect' }
  ].forEach((row, index) => {
    const item = hstack('Guide row', {
      width: 1696,
      height: 44,
      gap: 12,
      paddingX: 2,
      fill: null,
      align: 'CENTER'
    });
    sectionsList.appendChild(item);
    boardText(item, row.number, {
      size: 11,
      lineHeight: 14,
      weight: 'semibold',
      color: boardColors.cobalt,
      width: 34,
      hug: true
    });
    boardText(item, row.title, {
      size: 13,
      lineHeight: 17,
      weight: 'medium',
      color: boardColors.text,
      width: 700,
      hug: true
    });
    spacer(item, 1, true);
    boardText(item, row.meta, {
      size: 10,
      lineHeight: 13,
      color: boardColors.faint,
      align: 'RIGHT',
      width: 680
    });
    if (index < 4) {
      const rule = frame('Guide rule', { width: 1696, height: 1, fill: boardColors.border });
      sectionsList.appendChild(rule);
    }
  });

  const themeTitle = hstack('Theme title', { width: 1696, height: 20, fill: null, justify: 'SPACE_BETWEEN', align: 'CENTER' });
  guide.appendChild(themeTitle);
  boardText(themeTitle, 'BOTH THEMES ARE COMPLETE', {
    size: 10,
    lineHeight: 13,
    weight: 'semibold',
    color: boardColors.faint,
    hug: true
  });
  boardText(themeTitle, 'Mobile token source of truth', {
    size: 10,
    lineHeight: 13,
    color: boardColors.faint,
    hug: true
  });

  const themeRow = hstack('Theme previews', { width: 1696, height: 216, gap: 18, fill: null, align: 'MIN' });
  guide.appendChild(themeRow);
  buildThemePreview(themeRow, 'light', 830, 216);
  buildThemePreview(themeRow, 'dark', 848, 216);

  const guideNote = hstack('Guide note', {
    width: 1696,
    height: 40,
    paddingX: 12,
    gap: 8,
    fill: boardColors.panel,
    stroke: boardColors.border,
    radius: 10,
    align: 'CENTER'
  });
  guide.appendChild(guideNote);
  icon(guideNote, 'info', boardColors.faint, 14);
  boardText(guideNote, 'Fixture and concept surfaces are labelled in captions and in the coverage matrix. The design does not pretend they are shipped.', {
    size: 10,
    lineHeight: 14,
    color: boardColors.muted,
    width: 1600
  });

  return section;
}

function buildThemePreview(
  parent: FrameNode,
  theme: ThemeName,
  width: number,
  height: number
): void {
  const palette = theme === 'light' ? lightColors : darkColors;
  const preview = vstack('Theme preview', { width, height, gap: 8, fill: null });
  parent.appendChild(preview);
  const canvas = frame('Preview canvas', {
    width,
    height: height - 36,
    fill: palette.canvas,
    stroke: boardColors.borderStrong,
    radius: 12,
    clip: true
  });
  preview.appendChild(canvas);
  const rail = frame('Preview rail', {
    width: 54,
    height: height - 36,
    fill: palette.sidebarBg
  });
  canvas.appendChild(rail);
  brandMark(rail, 18).x = 10;
  rail.children[rail.children.length - 1]!.y = 12;
  const card = frame('Preview card', {
    width: width - 142,
    height: 82,
    fill: palette.surface,
    stroke: palette.border,
    radius: 8
  });
  canvas.appendChild(card);
  card.x = 72;
  card.y = 20;
  const accent = frame('Preview accent', {
    width: 128,
    height: 7,
    fill: palette.mint,
    radius: 4
  });
  card.appendChild(accent);
  accent.x = 14;
  accent.y = 18;
  boardText(card, theme === 'light' ? 'Awa Fongang' : 'Awa Fongang', {
    size: 14,
    lineHeight: 18,
    weight: 'semibold',
    color: palette.ink,
    width: width - 174
  }).x = 14;
  (card.children[card.children.length - 1] as TextNode).y = 34;
  boardText(card, 'XAF 184,500', {
    size: 20,
    lineHeight: 24,
    weight: 'bold',
    color: palette.ink,
    width: width - 174
  }).x = 14;
  (card.children[card.children.length - 1] as TextNode).y = 52;

  const topbar = frame('Preview topbar', {
    width: width - 54,
    height: 22,
    fill: palette.topbarBg,
    stroke: palette.border
  });
  canvas.appendChild(topbar);
  topbar.x = 54;
  topbar.y = 0;
  const search = frame('Preview search', {
    width: 190,
    height: 12,
    fill: palette.surfaceSunken,
    stroke: palette.border,
    radius: 4
  });
  topbar.appendChild(search);
  search.x = (width - 54) - 220;
  search.y = 5;
  const chip = hstack('Preview chip', {
    height: 20,
    paddingX: 8,
    fill: palette.mintSoft,
    radius: 999,
    align: 'CENTER'
  });
  canvas.appendChild(chip);
  chip.x = 72;
  chip.y = 118;
  boardText(chip, 'Payout ready', {
    size: 9,
    lineHeight: 11,
    weight: 'semibold',
    color: palette.onMintSoft,
    hug: true
  });
  const swatches = hstack('Preview swatches', { width: width - 54 - 36, height: 24, gap: 6, fill: null, align: 'CENTER' });
  canvas.appendChild(swatches);
  swatches.x = 72;
  swatches.y = height - 36 - 32;
  [palette.navy, palette.cobalt, palette.mint, palette.surface, palette.border].forEach((color) => {
    const swatch = frame('Swatch', {
      width: 18,
      height: 18,
      fill: color,
      stroke: boardColors.borderStrong,
      radius: 999
    });
    swatches.appendChild(swatch);
  });
  spacer(swatches, 1, true);
  boardText(swatches, theme === 'light' ? 'LIGHT' : 'DARK', {
    size: 10,
    lineHeight: 12,
    weight: 'semibold',
    color: theme === 'light' ? '#5B6B7F' : '#A9BACB',
    hug: true
  });
  const label = hstack('Theme label', { width, height: 28, gap: 8, fill: null, align: 'CENTER' });
  preview.appendChild(label);
  const dotMark = frame('Theme dot', {
    width: 7,
    height: 7,
    fill: theme === 'light' ? boardColors.mint : boardColors.cobalt,
    radius: 999
  });
  label.appendChild(dotMark);
  boardText(label, theme === 'light' ? 'Light theme · canvas #F5F7FA' : 'Dark theme · canvas #061322', {
    size: 10,
    lineHeight: 13,
    weight: 'medium',
    color: boardColors.muted,
    hug: true
  });
}

function buildSectionHeader(section: FrameNode, theme: ThemeName, title: string, subtitle: string): void {
  const header = hstack('Band header', {
    width: 4464,
    height: 124,
    fill: null,
    justify: 'SPACE_BETWEEN',
    align: 'CENTER'
  });
  section.appendChild(header);
  header.x = 96;
  header.y = 32;
  const copy = vstack('Band title block', { width: 1900, gap: 3, fill: null });
  header.appendChild(copy);
  const eyebrow = hstack('Band eyebrow', { gap: 8, fill: null, align: 'CENTER' });
  copy.appendChild(eyebrow);
  boardTag(eyebrow, `${theme.toUpperCase()} THEME`, theme === 'light' ? boardColors.mint : boardColors.cobalt);
  boardTag(eyebrow, '27 SCREENS · 5 DOMAINS', boardColors.faint);
  boardText(copy, title, {
    size: 32,
    lineHeight: 38,
    weight: 'bold',
    color: boardColors.text,
    width: 1900,
    letterSpacing: -0.8
  });
  boardText(copy, subtitle, {
    size: 12,
    lineHeight: 18,
    color: boardColors.muted,
    width: 1700
  });

  const meta = vstack('Band meta', { gap: 8, fill: null, align: 'MAX' });
  header.appendChild(meta);
  boardText(meta, 'STATIC REVIEW ARTIFACT · 1440 × 960 FRAMES', {
    size: 10,
    lineHeight: 13,
    weight: 'semibold',
    color: boardColors.faint,
    align: 'RIGHT',
    width: 900
  });
  const groups = hstack('Group legend', { gap: 6, fill: null, align: 'CENTER' });
  meta.appendChild(groups);
  SCREEN_GROUPS.forEach((group) => {
    const count = SCREENS.filter((screen) => screen.group === group.key).length;
    boardTag(groups, `${group.label} ${count}`, group.key === 'access' ? boardColors.mint : boardColors.faint);
  });
}

function buildCaption(parent: FrameNode, opts: CaptionOptions): void {
  const caption = frame('Frame caption', {
    width: 1440,
    height: 44,
    fill: null
  });
  parent.appendChild(caption);
  caption.x = opts.x;
  caption.y = opts.y;
  const idBadge = hstack('Screen id', {
    height: 20,
    paddingX: 7,
    fill: boardColors.panelAlt,
    stroke: boardColors.border,
    radius: 5,
    align: 'CENTER'
  });
  caption.appendChild(idBadge);
  boardText(idBadge, opts.spec.id, {
    size: 10,
    lineHeight: 12,
    weight: 'semibold',
    color: boardColors.mint,
    hug: true
  });
  const meta = hstack('Caption meta', { gap: 9, fill: null, align: 'CENTER' });
  caption.appendChild(meta);
  meta.x = 46;
  meta.y = 0;
  boardText(meta, opts.spec.title, {
    size: 14,
    lineHeight: 17,
    weight: 'semibold',
    color: boardColors.text,
    hug: true
  });
  const group = groupFor(opts.spec.group);
  boardText(meta, `${group.label} · ${primaryRouteFor(opts.spec)}`, {
    size: 10,
    lineHeight: 13,
    color: boardColors.faint,
    hug: true
  });
  const tags = hstack('Caption tags', { gap: 5, fill: null, align: 'CENTER' });
  caption.appendChild(tags);
  let right = 1440;
  tags.x = 1440 - 20;
  tags.y = 5;
  opts.spec.tags.forEach((tagValue) => {
    const color =
      tagValue === 'fixture'
        ? boardColors.warning
        : tagValue === 'concept'
          ? boardColors.faint
          : tagValue === 'ui-gap'
            ? boardColors.danger
            : tagValue === 'proposed'
              ? boardColors.cobalt
              : boardColors.mint;
    const badge = boardTag(tags, tagLabel(tagValue), color);
    right -= badge.width;
  });
  tags.x = right;
  boardText(caption, opts.spec.caption, {
    size: 9,
    lineHeight: 12,
    color: boardColors.faint,
    width: 1440,
    hug: false
  }).y = 25;
}

function buildFoundationsSection(
  themes: ThemeName[],
  y: number,
  runToken: string
): { section: FrameNode; plateCount: number } {
  const plateCount = themes.length;
  const height = 220 + plateCount * FOUNDATIONS_PLATE_HEIGHT + (plateCount - 1) * 40 + 80;
  const section = sectionFrame('02 · Foundations', height, 'foundations', runToken);
  section.y = y;

  const header = hstack('Foundations title', {
    width: 4464,
    height: 124,
    fill: null,
    justify: 'SPACE_BETWEEN',
    align: 'CENTER'
  });
  section.appendChild(header);
  header.x = 96;
  header.y = 32;
  const copy = vstack('Foundations copy', { width: 1900, gap: 3, fill: null });
  header.appendChild(copy);
  const eyebrow = hstack('Foundations eyebrow', { gap: 8, fill: null, align: 'CENTER' });
  copy.appendChild(eyebrow);
  boardTag(eyebrow, 'FOUNDATIONS', boardColors.mint);
  boardTag(eyebrow, 'MOBILE TOKENS → DESKTOP', boardColors.cobalt);
  boardText(copy, 'The system behind the screens', {
    size: 32,
    lineHeight: 38,
    weight: 'bold',
    color: boardColors.text,
    width: 1900,
    letterSpacing: -0.8
  });
  boardText(copy, 'One light-and-dark token set, a single Inter ramp, and a repeatable set of shell, table, form and feedback patterns.', {
    size: 12,
    lineHeight: 18,
    color: boardColors.muted,
    width: 1700
  });
  const meta = vstack('Foundations meta', { gap: 4, fill: null, align: 'MAX' });
  header.appendChild(meta);
  boardText(meta, `${plateCount} FULL-WIDTH PLATES`, {
    size: 10,
    lineHeight: 13,
    weight: 'semibold',
    color: boardColors.faint,
    align: 'RIGHT',
    width: 900
  });
  boardText(meta, '4656 px board · 2 themes · 1 language', {
    size: 10,
    lineHeight: 13,
    color: boardColors.faint,
    align: 'RIGHT',
    width: 900
  });

  themes.forEach((theme, index) => {
    setTheme(theme);
    const plate = buildFoundationsPlate(theme.toUpperCase() as 'LIGHT' | 'DARK');
    plate.setPluginData(MARKERS.plate, theme);
    plate.setPluginData(MARKERS.run, runToken);
    section.appendChild(plate);
    plate.x = 0;
    plate.y = 220 + index * (FOUNDATIONS_PLATE_HEIGHT + 40);
  });
  return { section, plateCount };
}

function buildCoverageRow(parent: FrameNode, route: RouteSpec): FrameNode {
  const row = hstack('Coverage row', {
    width: 4416,
    height: 31,
    paddingX: 16,
    gap: 0,
    fill: null,
    align: 'CENTER'
  });
  parent.appendChild(row);
  row.setPluginData(MARKERS.route, route.path);
  const widths = [110, 390, 320, 160, 150, 100, 0];
  const cells = [
    route.group,
    route.path,
    route.screenId ?? '—',
    representationLabel[route.representation],
    dataStatusLabel[route.dataStatus],
    route.representation === 'excluded' ? '—' : 'Both'
  ];
  cells.forEach((value, index) => {
    const cell = hstack('Coverage cell', {
      width: widths[index],
      height: 31,
      fill: null,
      align: 'CENTER'
    });
    row.appendChild(cell);
    if (index === 4) {
      dataBadge(cell, route.dataStatus);
    } else {
      boardText(cell, value, {
        size: 11,
        lineHeight: 14,
        weight: index === 1 || index === 2 ? 'medium' : 'regular',
        color:
          index === 1
            ? boardColors.text
            : index === 2
              ? boardColors.cobalt
              : index === 3 && route.representation !== 'direct'
                ? boardColors.warning
                : boardColors.muted,
        width: widths[index],
        hug: index === 3
      });
    }
  });
  const note = hstack('Coverage note', { width: 3154, height: 31, fill: null, align: 'CENTER' });
  row.appendChild(note);
  boardText(note, route.note, {
    size: 11,
    lineHeight: 14,
    color: boardColors.faint,
    width: 3140,
    hug: false
  });
  return row;
}

function buildCoverageSection(y: number, runToken: string): { section: FrameNode; routeRowCount: number } {
  const section = sectionFrame('05 · Route coverage and handoff', COVERAGE_HEIGHT, 'coverage', runToken);
  section.y = y;
  const header = hstack('Coverage header', {
    width: 4464,
    height: 124,
    fill: null,
    justify: 'SPACE_BETWEEN',
    align: 'CENTER'
  });
  section.appendChild(header);
  header.x = 96;
  header.y = 32;
  const copy = vstack('Coverage copy', { width: 1900, gap: 3, fill: null });
  header.appendChild(copy);
  const eyebrow = hstack('Coverage eyebrow', { gap: 8, fill: null, align: 'CENTER' });
  copy.appendChild(eyebrow);
  boardTag(eyebrow, 'ROUTE COVERAGE', boardColors.mint);
  boardTag(eyebrow, 'HANDOFF', boardColors.cobalt);
  boardText(copy, 'Every current route, accounted for.', {
    size: 32,
    lineHeight: 38,
    weight: 'bold',
    color: boardColors.text,
    width: 1900,
    letterSpacing: -0.8
  });
  boardText(copy, 'The matrix is generated from the same catalog the screens use. Live, fixture, concept and proposed surfaces stay honest.', {
    size: 12,
    lineHeight: 18,
    color: boardColors.muted,
    width: 1700
  });
  const meta = vstack('Coverage meta', { gap: 4, fill: null, align: 'MAX' });
  header.appendChild(meta);
  boardText(meta, '29 LIVE ROUTES + 1 ROOT REDIRECT', {
    size: 10,
    lineHeight: 13,
    weight: 'semibold',
    color: boardColors.faint,
    align: 'RIGHT',
    width: 900
  });
  boardText(meta, '27 screens · 2 default-tab merges · 0 unmapped', {
    size: 10,
    lineHeight: 13,
    color: boardColors.faint,
    align: 'RIGHT',
    width: 900
  });

  const card = vstack('Coverage matrix', {
    width: 4464,
    height: 1100,
    padding: 24,
    gap: 0,
    fill: boardColors.panelAlt,
    stroke: boardColors.border,
    radius: 18
  });
  section.appendChild(card);
  card.x = 96;
  card.y = 220;

  const title = hstack('Matrix title', {
    width: 4416,
    height: 52,
    fill: null,
    justify: 'SPACE_BETWEEN',
    align: 'CENTER'
  });
  card.appendChild(title);
  const titleCopy = hstack('Matrix title copy', { gap: 10, fill: null, align: 'CENTER' });
  title.appendChild(titleCopy);
  boardText(titleCopy, 'Route matrix', {
    size: 16,
    lineHeight: 20,
    weight: 'semibold',
    color: boardColors.text,
    hug: true
  });
  boardTag(titleCopy, '30 ROWS', boardColors.mint);
  spacer(title, 1, true);
  boardText(title, 'Theme coverage: both', {
    size: 10,
    lineHeight: 13,
    color: boardColors.faint,
    hug: true
  });

  const headerRow = hstack('Matrix header', {
    width: 4416,
    height: 34,
    paddingX: 16,
    fill: boardColors.panel,
    align: 'CENTER'
  });
  card.appendChild(headerRow);
  ['GROUP', 'ROUTE', 'SCREEN', 'REPRESENTATION', 'DATA', 'THEME', 'HANDOFF NOTE'].forEach((label, index) => {
    const widths = [110, 390, 320, 160, 150, 100];
    const cell = hstack('Matrix header cell', {
      width: index === 6 ? 3154 : widths[index],
      height: 34,
      fill: null,
      align: 'CENTER'
    });
    headerRow.appendChild(cell);
    boardText(cell, label, {
      size: 9,
      lineHeight: 11,
      weight: 'semibold',
      color: boardColors.faint,
      width: index === 6 ? 3140 : undefined,
      hug: true
    });
  });

  ROUTES.forEach((route, index) => {
    const row = buildCoverageRow(card, route);
    if (index % 2 === 1) {
      row.fills = [paint(boardColors.panel)];
    }
    const rule = frame('Matrix rule', { width: 4416, height: 1, fill: boardColors.border });
    card.appendChild(rule);
  });

  const decisionsRow = hstack('Handoff cards', {
    width: 4464,
    height: 360,
    gap: 24,
    fill: null,
    align: 'MIN'
  });
  section.appendChild(decisionsRow);
  decisionsRow.x = 96;
  decisionsRow.y = 1360;

  buildDecisionCard(decisionsRow, 'What the redesign changes', [
    'A dark rail and a command bar replace the scattered navbar and sidebar behaviour; page context and tabs are URL-driven.',
    'Search and filters become working controls. Detail screens use a right inspector instead of duplicating a full table underneath.',
    'Invoice status writes stay on the invoice; roster status writes stay on the employee. The current pages send the wrong resource.',
    'Team roles, two-factor state and payout-run orchestration are clearly marked proposals, not shipped capability.'
  ]);
  buildDecisionCard(decisionsRow, 'Data truth rules', [
    'Account statuses: ACTIVE, PENDING, DEACTIVATED, BLOCKED, BANNED.',
    'Transactions: SUCCESS, PENDING, FAILED; operators come from the Prisma enum.',
    'Invoices: TREATED, NOT_TREATED, PENDING_CONFIRMATION. Overview paid/unpaid are metrics, never invoice states.',
    'Amounts are XAF; dates read 23 Oct 2026. Every mock invoice line total is validated against its totalAmount.'
  ]);
  buildDecisionCard(decisionsRow, 'Before implementation', [
    'Add route-level role guards and fix the shared list/detail Redux race.',
    'Add client-bank, audit-feed, payout-run and 2FA APIs. Replace admin-created passwords with invitations.',
    'Decide the debit-card product and the granular admin role model; both are concepts here.',
    'Review in Figma first, then port to Next.js. This plugin never edits the dashboard source.'
  ]);

  return { section, routeRowCount: ROUTES.length };
}

function buildDecisionCard(parent: FrameNode, title: string, items: string[]): FrameNode {
  const card = vstack(`Handoff · ${title}`, {
    width: 1472,
    height: 360,
    padding: 24,
    gap: 12,
    fill: boardColors.panelAlt,
    stroke: boardColors.border,
    radius: 18
  });
  parent.appendChild(card);
  const header = hstack('Decision header', { width: 1424, height: 26, gap: 8, fill: null, align: 'CENTER' });
  card.appendChild(header);
  const dotMark = frame('Section dot', { width: 7, height: 7, fill: boardColors.mint, radius: 999 });
  header.appendChild(dotMark);
  boardText(header, title, {
    size: 18,
    lineHeight: 22,
    weight: 'semibold',
    color: boardColors.text,
    hug: true
  });
  items.forEach((item, index) => {
    const row = hstack('Decision item', { width: 1424, gap: 10, fill: null, align: 'MIN' });
    card.appendChild(row);
    boardText(row, String(index + 1).padStart(2, '0'), {
      size: 10,
      lineHeight: 17,
      weight: 'semibold',
      color: boardColors.cobalt,
      width: 26
    });
    boardText(row, item, {
      size: 12,
      lineHeight: 19,
      color: boardColors.muted,
      width: 1388
    });
  });
  return card;
}

export async function buildBoard(page: PageNode, options: BoardOptions): Promise<BoardResult> {
  const themes = options.themes.length ? options.themes : (['light', 'dark'] as ThemeName[]);
  const sections: FrameNode[] = [];
  let screenCount = 0;
  let plateCount = 0;
  let routeRowCount = 0;
  let cover: FrameNode | null = null;
  let y = 0;
  const totalScreens = themes.length * SCREENS.length;
  let builtScreens = 0;

  const guard = async (message: string, pct: number, log = false): Promise<void> => {
    if (options.isCancelled()) {
      throw new Error('cancelled');
    }
    options.report(message, pct, log);
    await new Promise<void>((resolve) => setTimeout(resolve, 0));
    if (options.isCancelled()) {
      throw new Error('cancelled');
    }
  };

  page.setPluginData(MARKERS.board, 'v1');

  await guard('Building cover', 2, true);
  cover = buildCover();
  page.appendChild(cover);
  cover.x = 0;
  cover.y = 0;
  sections.push(cover);
  y = COVER_HEIGHT + FOUNDATIONS_GAP;

  await guard('Building foundations', 5, true);
  const foundations = buildFoundationsSection(themes, y, options.runToken);
  page.appendChild(foundations.section);
  sections.push(foundations.section);
  plateCount = foundations.plateCount;
  y += foundations.section.height + FOUNDATIONS_GAP;

  for (let themeIndex = 0; themeIndex < themes.length; themeIndex += 1) {
    const theme = themes[themeIndex]!;
    setTheme(theme);
    const number = themes.length === 1 ? '03' : themeIndex === 0 ? '03' : '04';
    const title =
      theme === 'light'
        ? 'Operations workspace, in daylight'
        : 'Operations workspace, after hours';
    const subtitle =
      theme === 'light'
        ? 'Navy rail, cool canvas and white work surfaces. The mobile light theme carried into a desktop shell.'
        : 'Deep navy canvas, raised cards and quiet light type. The same system, tuned for long operations shifts.';
    const section = sectionFrame(
      `${number} · ${theme === 'light' ? 'Light' : 'Dark'} theme — ${SCREENS.length} screens`,
      THEME_SECTION_HEIGHT,
      theme,
      options.runToken,
      theme
    );
    page.appendChild(section);
    section.x = 0;
    section.y = y;
    sections.push(section);
    buildSectionHeader(section, theme, title, subtitle);

    const firstTop = 256;
    for (let index = 0; index < SCREENS.length; index += 1) {
      const spec = SCREENS[index]!;
      builtScreens += 1;
      await guard(
        `Building ${theme.toUpperCase()} · ${spec.id} · ${spec.title}`,
        8 + Math.round((builtScreens / totalScreens) * 82),
        index === 0
      );
      const builder = BUILDERS[spec.builder];
      if (!builder) {
        throw new Error(`Missing builder: ${spec.builder} (${spec.id})`);
      }
      const row = Math.floor(index / 3);
      const column = index % 3;
      const x = board.columns[column]!;
      const screenY = firstTop + row * board.rowPitch;
      setTheme(theme);
      const screen = builder();
      if (screen.width !== board.screenWidth || screen.height !== board.screenHeight) {
        throw new Error(
          `${spec.id} has the wrong frame size: ${screen.width}×${screen.height} (expected ${board.screenWidth}×${board.screenHeight})`
        );
      }
      screen.name = `${spec.id} · ${spec.title}`;
      screen.setPluginData(MARKERS.screen, spec.id);
      screen.setPluginData(MARKERS.theme, theme);
      screen.setPluginData(MARKERS.run, options.runToken);
      screen.strokes = [paint(boardColors.borderStrong)];
      screen.strokeWeight = 1;
      screen.strokeAlign = 'INSIDE';
      section.appendChild(screen);
      screen.x = x;
      screen.y = screenY;
      buildCaption(section, { x, y: screenY - 56, spec, theme });
      screenCount += 1;
    }
    y += THEME_SECTION_HEIGHT + FOUNDATIONS_GAP;
  }

  await guard('Building route coverage', 93, true);
  const coverage = buildCoverageSection(y, options.runToken);
  page.appendChild(coverage.section);
  sections.push(coverage.section);
  routeRowCount = coverage.routeRowCount;
  y += coverage.section.height;

  if (!screenCount) {
    throw new Error('No screens were generated');
  }

  return {
    sections,
    screenCount,
    plateCount,
    routeRowCount,
    cover,
    summary: `${screenCount} screens · ${plateCount} foundation plates · ${routeRowCount} route rows · ${themes.length === 2 ? 'light + dark' : themes[0]} theme${themes.length === 1 ? '' : 's'}`
  };
}

export function boardHeightFor(themes: ThemeName[]): number {
  const themeCount = Math.max(1, themes.length);
  const plates = themeCount;
  const foundations = 220 + plates * FOUNDATIONS_PLATE_HEIGHT + (plates - 1) * 40 + 80;
  const totalSections = 2 + themeCount + 1;
  return (
    COVER_HEIGHT +
    foundations +
    themeCount * THEME_SECTION_HEIGHT +
    COVERAGE_HEIGHT +
    FOUNDATIONS_GAP * totalSections
  );
}

export function sectionNumberFor(theme: ThemeName, themes: ThemeName[]): string {
  if (themes.length === 1) {
    return '03';
  }
  return themes.indexOf(theme) === 0 ? '03' : '04';
}

// Kept for consumers that need to enumerate the expected marker values.
export const SCREEN_MARKER_IDS = SCREENS.map((screen) => screen.id);
