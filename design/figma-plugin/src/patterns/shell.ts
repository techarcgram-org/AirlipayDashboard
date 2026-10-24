import { colors, radii, screen } from '../tokens';
import type { IconName } from '../icons';
import {
  avatar,
  brandMark,
  frame,
  hstack,
  icon,
  logoLockup,
  setGrow,
  spacer,
  text,
  vstack
} from '../primitives';
import {
  avatarButton,
  breadcrumb,
  countPill,
  iconButton,
  kbd,
  searchField,
  tabs,
  type TabItem
} from '../patterns';
import { currentUser } from '../data';

export type NavKey =
  | 'overview'
  | 'employees'
  | 'clients'
  | 'team'
  | 'transactions'
  | 'invoices'
  | 'payments'
  | 'profile';

interface NavSpec {
  key: NavKey;
  label: string;
  icon: IconName;
  badge?: string;
}

const WORKSPACE_NAV: NavSpec[] = [
  { key: 'overview', label: 'Overview', icon: 'overview' },
  { key: 'employees', label: 'Employees', icon: 'users' },
  { key: 'clients', label: 'Clients', icon: 'clients' },
  { key: 'team', label: 'Team & access', icon: 'team' }
];

const MONEY_NAV: NavSpec[] = [
  { key: 'transactions', label: 'Transactions', icon: 'transactions' },
  { key: 'invoices', label: 'Invoices', icon: 'invoices' },
  { key: 'payments', label: 'Payments', icon: 'payments', badge: '3' }
];

const ACCOUNT_NAV: NavSpec[] = [{ key: 'profile', label: 'My profile', icon: 'profile' }];

function sidebarGroupLabel(parent: FrameNode, label: string): FrameNode {
  const row = hstack(`Nav group · ${label}`, {
    width: 216,
    height: 16,
    paddingX: 10,
    fill: null,
    align: 'CENTER'
  });
  parent.appendChild(row);
  text(row, label.toUpperCase(), {
    token: 'eyebrow',
    color: colors.sidebarFaint,
    fill: false,
    hug: true
  });
  return row;
}

function navItem(parent: FrameNode, item: NavSpec, active: boolean): FrameNode {
  const node = hstack(`Nav · ${item.label}`, {
    width: 216,
    height: 36,
    gap: 10,
    paddingX: 10,
    fill: active ? colors.navActiveBg : null,
    radius: radii.sm,
    align: 'CENTER'
  });
  parent.appendChild(node);
  icon(node, item.icon, active ? colors.navActiveText : colors.sidebarMuted, 18);
  text(node, item.label, {
    token: 'label',
    weight: active ? 'semibold' : 'medium',
    color: active ? colors.sidebarText : colors.sidebarMuted,
    fill: false,
    hug: true
  });
  spacer(node, 1, true);
  if (item.badge) {
    const badge = hstack('Nav badge', {
      width: 18,
      height: 18,
      fill: colors.warningSoft,
      radius: 999,
      justify: 'CENTER',
      align: 'CENTER'
    });
    node.appendChild(badge);
    const badgeLabel = text(badge, item.badge, {
      token: 'micro',
      weight: 'semibold',
      color: colors.warning,
      align: 'CENTER',
      width: 18,
      fill: false
    });
    badgeLabel.y = 2;
  }
  return node;
}

export function sidebar(parent: FrameNode, active: NavKey): FrameNode {
  const bar = vstack('Sidebar', {
    width: screen.sidebarWidth,
    height: screen.height,
    paddingX: 16,
    paddingTop: 18,
    paddingBottom: 16,
    gap: 12,
    fill: colors.sidebarBg
  });
  parent.appendChild(bar);

  const brand = hstack('Brand row', { width: 216, height: 40, gap: 8, fill: null, align: 'CENTER' });
  bar.appendChild(brand);
  brandMark(brand, 27);
  text(brand, 'AirliPay', {
    size: 20,
    lineHeight: 24,
    weight: 'extrabold',
    color: colors.sidebarText,
    letterSpacing: -0.6,
    fill: false,
    hug: true
  });
  text(brand, 'OPS', {
    token: 'micro',
    weight: 'semibold',
    color: colors.sidebarFaint,
    fill: false,
    hug: true
  }).name = 'Ops label';
  spacer(brand, 1, true);
  iconButton(brand, 'menu', {
    size: 28,
    iconSize: 17,
    color: colors.sidebarMuted
  });

  const switcher = hstack('Workspace switcher', {
    width: 216,
    height: 54,
    gap: 9,
    paddingX: 10,
    fill: colors.sidebarCard,
    stroke: colors.sidebarBorder,
    radius: radii.sm,
    align: 'CENTER'
  });
  bar.appendChild(switcher);
  const org = frame('Workspace mark', {
    width: 28,
    height: 28,
    fill: colors.mint,
    radius: radii.xs
  });
  switcher.appendChild(org);
  const orgLetter = text(org, 'A', {
    size: 15,
    weight: 'extrabold',
    lineHeight: 18,
    color: colors.onMint,
    align: 'CENTER',
    width: 28,
    fill: false
  });
  orgLetter.y = 5;
  const switcherCopy = vstack('Workspace copy', { gap: 1, fill: null, width: 140 });
  switcher.appendChild(switcherCopy);
  text(switcherCopy, 'AirliPay HQ', {
    token: 'label',
    weight: 'semibold',
    color: colors.sidebarText,
    width: 140,
    fill: false
  });
  text(switcherCopy, 'Operations workspace', {
    token: 'caption',
    color: colors.sidebarFaint,
    width: 140,
    fill: false
  });
  spacer(switcher, 1, true);
  icon(switcher, 'chevronDown', colors.sidebarFaint, 14);

  sidebarGroupLabel(bar, 'Workspace');
  WORKSPACE_NAV.forEach((item) => navItem(bar, item, item.key === active));

  sidebarGroupLabel(bar, 'Money');
  MONEY_NAV.forEach((item) => navItem(bar, item, item.key === active));

  sidebarGroupLabel(bar, 'Account');
  ACCOUNT_NAV.forEach((item) => navItem(bar, item, item.key === active));

  const flexible = frame('Sidebar spacer', { width: 1, height: 1, fill: null });
  bar.appendChild(flexible);
  setGrow(flexible);

  const command = hstack('Command shortcut', {
    width: 216,
    height: 38,
    gap: 8,
    paddingX: 10,
    fill: null,
    stroke: colors.sidebarBorder,
    radius: radii.sm,
    align: 'CENTER'
  });
  bar.appendChild(command);
  icon(command, 'command', colors.sidebarMuted, 16);
  text(command, 'Quick command', {
    token: 'caption',
    color: colors.sidebarMuted,
    fill: false,
    hug: true
  });
  spacer(command, 1, true);
  kbd(command, '⌘ K');

  const status = hstack('System status', {
    width: 216,
    height: 26,
    paddingX: 10,
    gap: 7,
    fill: null,
    align: 'CENTER'
  });
  bar.appendChild(status);
  const dotMark = frame('Operational dot', { width: 6, height: 6, fill: colors.success, radius: 999 });
  status.appendChild(dotMark);
  text(status, 'All systems operational', {
    token: 'caption',
    color: colors.sidebarMuted,
    fill: false,
    hug: true
  });
  spacer(status, 1, true);
  icon(status, 'external', colors.sidebarFaint, 13);

  const userCard = hstack('Sidebar account', {
    width: 216,
    height: 50,
    gap: 9,
    paddingX: 10,
    fill: colors.sidebarCard,
    radius: radii.sm,
    align: 'CENTER'
  });
  bar.appendChild(userCard);
  avatar(userCard, currentUser.initials, {
    size: 30,
    bg: colors.mintSoft,
    color: colors.onMintSoft
  });
  const userCopy = vstack('User copy', { gap: 1, width: 132, fill: null });
  userCard.appendChild(userCopy);
  text(userCopy, currentUser.name, {
    token: 'caption',
    weight: 'semibold',
    color: colors.sidebarText,
    width: 132,
    fill: false
  });
  text(userCopy, currentUser.role, {
    token: 'caption',
    color: colors.sidebarFaint,
    width: 132,
    fill: false
  });
  spacer(userCard, 1, true);
  icon(userCard, 'more', colors.sidebarMuted, 16);

  return bar;
}

function topbar(parent: FrameNode): FrameNode {
  const bar = hstack('Top bar', {
    width: screen.width - screen.sidebarWidth,
    height: 63,
    paddingX: 28,
    gap: 16,
    fill: colors.topbarBg,
    align: 'CENTER'
  });
  parent.appendChild(bar);

  const environment = hstack('Environment', {
    height: 26,
    gap: 7,
    paddingX: 9,
    fill: colors.surfaceSunken,
    stroke: colors.border,
    radius: 999,
    align: 'CENTER'
  });
  bar.appendChild(environment);
  const dotMark = frame('Live dot', { width: 6, height: 6, fill: colors.success, radius: 999 });
  environment.appendChild(dotMark);
  text(environment, 'Production', {
    token: 'micro',
    weight: 'semibold',
    color: colors.inkSoft,
    fill: false,
    hug: true
  });

  text(bar, 'Operations', {
    token: 'caption',
    color: colors.muted,
    fill: false,
    hug: true
  });

  spacer(bar, 1, true);

  searchField(bar, {
    width: 312,
    placeholder: 'Search operations…',
    shortcut: '⌘ K'
  });

  spacer(bar, 1, true);

  const actions = hstack('Top bar actions', { gap: 4, fill: null, align: 'CENTER' });
  bar.appendChild(actions);
  const bell = iconButton(actions, 'bell', { size: 32, iconSize: 18, color: colors.inkSoft });
  const notificationDot = frame('Unread', {
    width: 7,
    height: 7,
    fill: colors.error,
    stroke: colors.surface,
    strokeWeight: 1.5,
    radius: 999
  });
  bell.appendChild(notificationDot);
  notificationDot.x = 19;
  notificationDot.y = 5;
  iconButton(actions, 'help', { size: 32, iconSize: 18, color: colors.inkSoft });
  const rule = frame('Top bar rule', { width: 1, height: 22, fill: colors.border });
  actions.appendChild(rule);
  avatarButton(actions, currentUser.initials, true);
  const userCopy = vstack('Top bar user', { gap: 0, fill: null, width: 92 });
  actions.appendChild(userCopy);
  text(userCopy, currentUser.name.split(' ')[0] ?? currentUser.name, {
    token: 'caption',
    weight: 'semibold',
    color: colors.ink,
    width: 92,
    fill: false
  });
  text(userCopy, currentUser.role, {
    token: 'micro',
    color: colors.muted,
    width: 92,
    fill: false
  });
  icon(actions, 'chevronDown', colors.muted, 14);
  return bar;
}

export interface PageOptions {
  nav: NavKey;
  breadcrumbs: string[];
  title: string;
  subtitle?: string;
  actions?: (parent: FrameNode) => void;
  tabs?: TabItem[];
  titlePrefix?: (parent: FrameNode) => void;
  titleAddon?: (parent: FrameNode) => void;
}

export interface ScreenOptions extends PageOptions {
  name?: string;
}

function pageHeader(parent: FrameNode, opts: PageOptions): FrameNode {
  const header = vstack('Page header', {
    width: screen.contentWidth,
    gap: 4,
    fill: null
  });
  parent.appendChild(header);
  breadcrumb(header, opts.breadcrumbs);

  const titleRow = hstack('Title row', {
    width: screen.contentWidth,
    height: 44,
    gap: 12,
    fill: null,
    justify: 'SPACE_BETWEEN',
    align: 'CENTER'
  });
  header.appendChild(titleRow);
  const left = hstack('Page title group', { gap: 10, fill: null, align: 'CENTER' });
  titleRow.appendChild(left);
  if (opts.titlePrefix) {
    opts.titlePrefix(left);
  }
  text(left, opts.title, {
    token: 'pageTitle',
    color: colors.ink,
    fill: false,
    hug: true
  });
  if (opts.titleAddon) {
    opts.titleAddon(left);
  }
  const actions = hstack('Page actions', { gap: 8, fill: null, align: 'CENTER' });
  titleRow.appendChild(actions);
  opts.actions?.(actions);

  if (opts.subtitle) {
    text(header, opts.subtitle, {
      token: 'bodySmall',
      color: colors.muted,
      width: screen.contentWidth,
      fill: false
    });
  }

  if (opts.tabs) {
    const tabRow = tabs(header, opts.tabs);
    tabRow.y = tabRow.y;
    const rule = frame('Tabs rule', {
      width: screen.contentWidth,
      height: 1,
      fill: colors.border
    });
    header.appendChild(rule);
  }
  return header;
}

/**
 * Creates a 1440x960 desktop app frame with the shared EAS-inspired shell.
 * The builder receives the body region (1128px wide) below the page header.
 */
export function appScreen(
  spec: ScreenOptions,
  build: (body: FrameNode) => void
): FrameNode {
  const outer = frame(spec.name ?? spec.title, {
    width: screen.width,
    height: screen.height,
    fill: colors.canvas,
    clip: true
  });
  sidebar(outer, spec.nav);

  const main = vstack('Main column', {
    width: screen.width - screen.sidebarWidth,
    height: screen.height,
    fill: colors.canvas,
    gap: 0
  });
  outer.appendChild(main);
  main.x = screen.sidebarWidth;
  main.y = 0;

  topbar(main);
  const topRule = frame('Top bar border', {
    width: screen.width - screen.sidebarWidth,
    height: 1,
    fill: colors.border
  });
  main.appendChild(topRule);

  const content = vstack('Page content', {
    width: screen.width - screen.sidebarWidth,
    height: screen.height - screen.topbarHeight,
    paddingX: 32,
    paddingTop: 24,
    paddingBottom: 24,
    gap: 16,
    fill: colors.canvas,
    clip: true
  });
  main.appendChild(content);

  pageHeader(content, spec);

  const body = vstack('Page body', {
    width: screen.contentWidth,
    gap: 16,
    fill: null
  });
  content.appendChild(body);
  build(body);

  return outer;
}

export function roleLabel(role: string): string {
  return role;
}
