/**
 * Design tokens for the AirliPay back-office redesign.
 *
 * The colour roles mirror the mobile theme at AiliPayApp/src/theme/tokens.js.
 * Desktop-specific roles (sidebar, tables, board chrome) are derived from the
 * same palette so the two products read as one family.
 */

export type ThemeName = 'light' | 'dark';
export type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold';

export interface ThemeColors {
  navy: string;
  navyDeep: string;
  brandSurface: string;
  onBrand: string;
  onBrandMuted: string;
  onBrandFaint: string;
  brandText: string;
  cobalt: string;
  cobaltPressed: string;
  cobaltSoft: string;
  cobaltText: string;
  onPrimary: string;
  mint: string;
  mintSoft: string;
  onMint: string;
  onMintSoft: string;
  canvas: string;
  surface: string;
  surfaceRaised: string;
  surfaceSunken: string;
  ink: string;
  inkSoft: string;
  muted: string;
  mutedLight: string;
  border: string;
  borderStrong: string;
  success: string;
  successSoft: string;
  warning: string;
  warningSoft: string;
  error: string;
  errorSoft: string;
  info: string;
  infoSoft: string;
  knob: string;
  illustrationInk: string;
  overlay: string;
  // Desktop chrome
  sidebarBg: string;
  sidebarDeep: string;
  sidebarCard: string;
  sidebarBorder: string;
  sidebarText: string;
  sidebarMuted: string;
  sidebarFaint: string;
  navActiveBg: string;
  navActiveText: string;
  topbarBg: string;
  tableHead: string;
  rowHover: string;
  rowSelected: string;
  fieldBg: string;
  chartDeposit: string;
  chartPayout: string;
  chartGrid: string;
  chartAxis: string;
  focusRing: string;
}

export function hexToRgb(hex: string): RGB {
  const clean = hex.replace('#', '').trim();
  if (clean.length !== 6) {
    throw new Error(`Unsupported colour value: ${hex}`);
  }
  return {
    r: parseInt(clean.slice(0, 2), 16) / 255,
    g: parseInt(clean.slice(2, 4), 16) / 255,
    b: parseInt(clean.slice(4, 6), 16) / 255
  };
}

function toHex(value: number): string {
  return Math.max(0, Math.min(255, Math.round(value))).toString(16).padStart(2, '0');
}

/** Blend `b` into `a`; 0 returns a, 1 returns b. */
export function mix(a: string, b: string, amount: number): string {
  const left = hexToRgb(a);
  const right = hexToRgb(b);
  const t = Math.max(0, Math.min(1, amount));
  const channel = (x: number, y: number) => toHex((x * (1 - t) + y * t) * 255);
  return `#${channel(left.r, right.r)}${channel(left.g, right.g)}${channel(left.b, right.b)}`.toUpperCase();
}

export function relativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const convert = (value: number) =>
    value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  return 0.2126 * convert(r) + 0.7152 * convert(g) + 0.0722 * convert(b);
}

export function contrastRatio(a: string, b: string): number {
  const first = relativeLuminance(a);
  const second = relativeLuminance(b);
  const light = Math.max(first, second);
  const dark = Math.min(first, second);
  return (light + 0.05) / (dark + 0.05);
}

const lightBase = {
  navy: '#0A2540',
  navyDeep: '#061A2F',
  brandSurface: '#0A2540',
  onBrand: '#FFFFFF',
  onBrandMuted: '#C9D8E8',
  onBrandFaint: '#8EA5BC',
  brandText: '#0A2540',
  cobalt: '#245BFF',
  cobaltPressed: '#1B46C9',
  cobaltSoft: '#EEF2FF',
  cobaltText: '#245BFF',
  onPrimary: '#FFFFFF',
  mint: '#6FE7C8',
  mintSoft: '#E4FAF3',
  onMint: '#0A2540',
  onMintSoft: '#0A2540',
  canvas: '#F5F7FA',
  surface: '#FFFFFF',
  surfaceRaised: '#F8FAFC',
  surfaceSunken: '#F1F5F9',
  ink: '#0B1220',
  inkSoft: '#16283D',
  muted: '#5B6B7F',
  mutedLight: '#8A98A8',
  border: '#D7E0EA',
  borderStrong: '#B8C6D6',
  success: '#0E7A5F',
  successSoft: '#E6F6F0',
  warning: '#9A5B00',
  warningSoft: '#FFF4DB',
  error: '#B42318',
  errorSoft: '#FDECEA',
  info: '#1D4ED8',
  infoSoft: '#E8EFFF',
  knob: '#FFFFFF',
  illustrationInk: '#0A2540',
  overlay: 'rgba(6, 26, 47, 0.48)'
} as const;

const darkBase = {
  navy: '#0A2540',
  navyDeep: '#061A2F',
  brandSurface: '#102A44',
  onBrand: '#F5F7FA',
  onBrandMuted: '#C9D8E8',
  onBrandFaint: '#8EA5BC',
  brandText: '#E8F0F8',
  cobalt: '#245BFF',
  cobaltPressed: '#1B46C9',
  cobaltSoft: '#152C4D',
  cobaltText: '#93ADFF',
  onPrimary: '#FFFFFF',
  mint: '#6FE7C8',
  mintSoft: '#103B38',
  onMint: '#061A2F',
  onMintSoft: '#C9F7EA',
  canvas: '#061322',
  surface: '#0B1E32',
  surfaceRaised: '#10263D',
  surfaceSunken: '#08182A',
  ink: '#F2F6FB',
  inkSoft: '#D8E4F0',
  muted: '#A9BACB',
  mutedLight: '#7C90A6',
  border: '#223A52',
  borderStrong: '#35516E',
  success: '#5CD6A0',
  successSoft: '#12382C',
  warning: '#F1B45A',
  warningSoft: '#3A2A12',
  error: '#FF8F86',
  errorSoft: '#3B1C20',
  info: '#8FB0FF',
  infoSoft: '#172C52',
  knob: '#F5F7FA',
  illustrationInk: '#E8F0F8',
  overlay: 'rgba(0, 0, 0, 0.64)'
} as const;

export const lightColors: ThemeColors = {
  ...lightBase,
  sidebarBg: lightBase.navy,
  sidebarDeep: lightBase.navyDeep,
  sidebarCard: mix(lightBase.navy, '#FFFFFF', 0.06),
  sidebarBorder: mix(lightBase.navy, '#FFFFFF', 0.12),
  sidebarText: '#F5F7FA',
  sidebarMuted: '#C9D8E8',
  sidebarFaint: '#8EA5BC',
  navActiveBg: mix(lightBase.navy, lightBase.mint, 0.15),
  navActiveText: lightBase.mint,
  topbarBg: lightBase.surface,
  tableHead: '#F7F9FC',
  rowHover: mix(lightBase.surface, lightBase.cobalt, 0.035),
  rowSelected: lightBase.cobaltSoft,
  fieldBg: '#FFFFFF',
  chartDeposit: lightBase.cobalt,
  chartPayout: '#1FA987',
  chartGrid: lightBase.border,
  chartAxis: lightBase.mutedLight,
  focusRing: lightBase.cobalt
};

export const darkColors: ThemeColors = {
  ...darkBase,
  sidebarBg: darkBase.navyDeep,
  sidebarDeep: '#04101D',
  sidebarCard: mix(darkBase.navyDeep, '#FFFFFF', 0.05),
  sidebarBorder: mix(darkBase.navyDeep, '#FFFFFF', 0.1),
  sidebarText: '#F2F6FB',
  sidebarMuted: '#C9D8E8',
  sidebarFaint: '#8EA5BC',
  navActiveBg: mix(darkBase.navyDeep, darkBase.mint, 0.14),
  navActiveText: darkBase.mint,
  topbarBg: darkBase.surface,
  tableHead: '#091A2C',
  rowHover: mix(darkBase.surface, darkBase.cobalt, 0.09),
  rowSelected: darkBase.cobaltSoft,
  fieldBg: '#08182A',
  chartDeposit: '#6D91FF',
  chartPayout: darkBase.mint,
  chartGrid: darkBase.border,
  chartAxis: darkBase.mutedLight,
  focusRing: darkBase.cobaltText
};

/** The active palette. Screens read these roles at build time. */
export const colors: ThemeColors = { ...lightColors };

export function setTheme(theme: ThemeName): void {
  Object.assign(colors, theme === 'dark' ? darkColors : lightColors);
}

export const fontFamily = 'Inter';

export const fonts: Record<FontWeight, { family: string; style: string }> = {
  regular: { family: fontFamily, style: 'Regular' },
  medium: { family: fontFamily, style: 'Medium' },
  semibold: { family: fontFamily, style: 'Semi Bold' },
  bold: { family: fontFamily, style: 'Bold' },
  extrabold: { family: fontFamily, style: 'Extra Bold' }
};

export type TypeToken =
  | 'display'
  | 'pageTitle'
  | 'metric'
  | 'balance'
  | 'h2'
  | 'h3'
  | 'body'
  | 'bodyStrong'
  | 'bodySmall'
  | 'label'
  | 'table'
  | 'tableStrong'
  | 'micro'
  | 'eyebrow'
  | 'button'
  | 'amount'
  | 'caption';

export interface TypeStyle {
  size: number;
  lineHeight: number;
  weight: FontWeight;
  letterSpacing: number;
}

export const typeScale: Record<TypeToken, TypeStyle> = {
  display: { size: 44, lineHeight: 52, weight: 'extrabold', letterSpacing: -1.2 },
  pageTitle: { size: 28, lineHeight: 34, weight: 'bold', letterSpacing: -0.5 },
  metric: { size: 30, lineHeight: 36, weight: 'bold', letterSpacing: -0.6 },
  balance: { size: 40, lineHeight: 46, weight: 'extrabold', letterSpacing: -1.1 },
  h2: { size: 22, lineHeight: 28, weight: 'semibold', letterSpacing: -0.2 },
  h3: { size: 18, lineHeight: 24, weight: 'semibold', letterSpacing: -0.1 },
  body: { size: 16, lineHeight: 24, weight: 'regular', letterSpacing: 0 },
  bodyStrong: { size: 16, lineHeight: 24, weight: 'medium', letterSpacing: 0 },
  bodySmall: { size: 14, lineHeight: 20, weight: 'regular', letterSpacing: 0 },
  label: { size: 13, lineHeight: 18, weight: 'medium', letterSpacing: 0 },
  table: { size: 13, lineHeight: 19, weight: 'regular', letterSpacing: 0 },
  tableStrong: { size: 13, lineHeight: 19, weight: 'semibold', letterSpacing: 0 },
  micro: { size: 11, lineHeight: 14, weight: 'medium', letterSpacing: 0 },
  eyebrow: { size: 11, lineHeight: 14, weight: 'semibold', letterSpacing: 0.6 },
  button: { size: 14, lineHeight: 20, weight: 'semibold', letterSpacing: 0 },
  amount: { size: 18, lineHeight: 24, weight: 'semibold', letterSpacing: -0.2 },
  caption: { size: 12, lineHeight: 16, weight: 'regular', letterSpacing: 0 }
};

export const space = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
  giant: 48
};

export const radii = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  pill: 999
};

export const screen = {
  width: 1440,
  height: 960,
  sidebarWidth: 248,
  topbarHeight: 64,
  gutter: 32,
  contentWidth: 1128,
  bodyWidth: 1128
};

export const board = {
  width: 4656,
  columns: [96, 1608, 3120],
  screenWidth: 1440,
  screenHeight: 960,
  captionHeight: 44,
  captionGap: 12,
  rowPitch: 1100,
  gutter: 72,
  side: 96,
  coverHeight: 1080,
  bandHeaderHeight: 188,
  rowGapAfter: 32
};

/** Colours used only by the review canvas, never inside the app frames. */
export const boardColors = {
  bg: '#06111E',
  panel: '#091B2C',
  panelAlt: '#0C2237',
  border: '#1C344B',
  borderStrong: '#2A4762',
  text: '#F2F6FB',
  muted: '#A9BACB',
  faint: '#7C90A6',
  mint: '#6FE7C8',
  cobalt: '#6D91FF',
  warning: '#F1B45A',
  danger: '#FF8F86'
};

export const requiredFontStyles: FontWeight[] = ['regular', 'medium', 'semibold', 'bold', 'extrabold'];

export const chartSeries = {
  deposits: [42, 48, 45, 61, 58, 74, 69, 82, 78, 91, 88, 103],
  payouts: [30, 36, 33, 42, 51, 47, 61, 58, 66, 63, 74, 71]
};
