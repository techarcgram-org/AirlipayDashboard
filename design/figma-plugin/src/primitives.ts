import {
  colors,
  fontFamily,
  fonts,
  hexToRgb,
  typeScale,
  type FontWeight,
  type TypeToken
} from './tokens';
import { brandMarkSvg, iconSvg, type IconName } from './icons';

export type FontMap = Record<FontWeight, FontName>;

let fontMap: FontMap | null = null;

export function setFontMap(map: FontMap): void {
  fontMap = map;
}

export function getFont(weight: FontWeight): FontName {
  if (!fontMap) {
    throw new Error('Fonts have not been preloaded');
  }
  return fontMap[weight];
}

export async function preloadFonts(): Promise<{ map: FontMap; warnings: string[] }> {
  const available = await figma.listAvailableFontsAsync();
  const inter = available.filter((font) => font.fontName.family === fontFamily);
  if (!inter.length) {
    throw new Error(
      'Inter is not available in this Figma environment. Install Inter or use a Figma build that ships with it.'
    );
  }
  const fallback =
    inter.find((font) => font.fontName.style === 'Regular')?.fontName ?? inter[0].fontName;
  const warnings: string[] = [];
  const map = {} as FontMap;

  for (const weight of Object.keys(fonts) as FontWeight[]) {
    const desired = fonts[weight].style;
    const exact = inter.find((font) => font.fontName.style === desired)?.fontName;
    const selected = exact ?? fallback;
    if (!exact) {
      warnings.push(`Inter ${desired} missing; ${selected.style} is used for ${weight}.`);
    }
    await figma.loadFontAsync(selected);
    map[weight] = selected;
  }

  setFontMap(map);
  return { map, warnings };
}

export function rgb(hex: string): RGB {
  return hexToRgb(hex);
}

export function paint(hex: string, opacity = 1): SolidPaint {
  return {
    type: 'SOLID',
    color: hexToRgb(hex),
    opacity
  };
}

export interface FrameOptions {
  width?: number;
  height?: number;
  fill?: string | null;
  stroke?: string;
  strokeWeight?: number;
  radius?: number;
  clip?: boolean;
  opacity?: number;
  name?: string;
}

export interface StackOptions extends FrameOptions {
  gap?: number;
  padding?: number;
  paddingX?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  align?: 'MIN' | 'CENTER' | 'MAX' | 'BASELINE';
  justify?: 'MIN' | 'CENTER' | 'MAX' | 'SPACE_BETWEEN';
}

export function frame(name: string, opts: FrameOptions = {}): FrameNode {
  const node = figma.createFrame();
  node.name = name;
  node.resize(Math.max(1, opts.width ?? 100), Math.max(1, opts.height ?? 10));
  node.fills = opts.fill ? [paint(opts.fill)] : [];
  if (opts.stroke) {
    node.strokes = [paint(opts.stroke)];
    node.strokeWeight = opts.strokeWeight ?? 1;
    node.strokeAlign = 'INSIDE';
  }
  if (opts.radius !== undefined) {
    node.cornerRadius = opts.radius;
  }
  node.clipsContent = opts.clip ?? false;
  if (opts.opacity !== undefined) {
    node.opacity = opts.opacity;
  }
  return node;
}

export function vstack(name: string, opts: StackOptions = {}): FrameNode {
  const node = frame(name, opts);
  node.layoutMode = 'VERTICAL';
  node.itemSpacing = opts.gap ?? 0;
  node.paddingTop = opts.paddingTop ?? opts.padding ?? 0;
  node.paddingBottom = opts.paddingBottom ?? opts.padding ?? 0;
  node.paddingLeft = opts.paddingLeft ?? opts.paddingX ?? opts.padding ?? 0;
  node.paddingRight = opts.paddingRight ?? opts.paddingX ?? opts.padding ?? 0;
  node.counterAxisAlignItems = opts.align ?? 'MIN';
  node.primaryAxisAlignItems = opts.justify ?? 'MIN';
  if (opts.width !== undefined) {
    node.resize(opts.width, opts.height ?? Math.max(1, node.height));
  }
  node.primaryAxisSizingMode = opts.height !== undefined ? 'FIXED' : 'AUTO';
  node.counterAxisSizingMode = opts.width !== undefined ? 'FIXED' : 'AUTO';
  return node;
}

export function hstack(name: string, opts: StackOptions = {}): FrameNode {
  const node = frame(name, opts);
  node.layoutMode = 'HORIZONTAL';
  node.itemSpacing = opts.gap ?? 0;
  node.paddingTop = opts.paddingTop ?? opts.padding ?? 0;
  node.paddingBottom = opts.paddingBottom ?? opts.padding ?? 0;
  node.paddingLeft = opts.paddingLeft ?? opts.paddingX ?? opts.padding ?? 0;
  node.paddingRight = opts.paddingRight ?? opts.paddingX ?? opts.padding ?? 0;
  node.counterAxisAlignItems = opts.align ?? 'CENTER';
  node.primaryAxisAlignItems = opts.justify ?? 'MIN';
  if (opts.width !== undefined) {
    node.resize(opts.width, opts.height ?? Math.max(1, node.height));
  }
  node.primaryAxisSizingMode = opts.width !== undefined ? 'FIXED' : 'AUTO';
  node.counterAxisSizingMode = opts.height !== undefined ? 'FIXED' : 'AUTO';
  return node;
}

export function setFillWidth(node: SceneNode): void {
  try {
    (node as unknown as { layoutSizingHorizontal: 'FILL' }).layoutSizingHorizontal = 'FILL';
  } catch {
    // Node is not an auto-layout child.
  }
}

export function setFillHeight(node: SceneNode): void {
  try {
    (node as unknown as { layoutSizingVertical: 'FILL' }).layoutSizingVertical = 'FILL';
  } catch {
    // Node is not an auto-layout child.
  }
}

export function setGrow(node: SceneNode): void {
  try {
    (node as unknown as { layoutGrow: number }).layoutGrow = 1;
  } catch {
    // Node is not an auto-layout child.
  }
}

export interface TextOptions {
  token?: TypeToken;
  weight?: FontWeight;
  size?: number;
  lineHeight?: number;
  color?: string;
  width?: number;
  align?: 'LEFT' | 'CENTER' | 'RIGHT';
  fill?: boolean;
  hug?: boolean;
  grow?: boolean;
  letterSpacing?: number;
  name?: string;
  opacity?: number;
}

export function text(parent: FrameNode, value: string, opts: TextOptions = {}): TextNode {
  const token = typeScale[opts.token ?? 'body'];
  const node = figma.createText();
  node.name = opts.name ?? value.slice(0, 48);
  node.fontName = getFont(opts.weight ?? token.weight);
  node.fontSize = opts.size ?? token.size;
  node.lineHeight = {
    unit: 'PIXELS',
    value: opts.lineHeight ?? token.lineHeight
  };
  node.letterSpacing = {
    unit: 'PIXELS',
    value: opts.letterSpacing ?? token.letterSpacing
  };
  node.textAlignHorizontal = opts.align ?? 'LEFT';
  node.characters = value;
  node.fills = [paint(opts.color ?? colors.ink)];
  if (opts.opacity !== undefined) {
    node.opacity = opts.opacity;
  }

  if (opts.hug) {
    node.textAutoResize = 'WIDTH_AND_HEIGHT';
  } else {
    const columnWidth = parent.layoutMode === 'VERTICAL' ? parent.width - parent.paddingLeft - parent.paddingRight : 200;
    const availableWidth = opts.width ?? Math.max(24, columnWidth);
    node.resize(availableWidth, 10);
    node.textAutoResize = 'HEIGHT';
  }

  parent.appendChild(node);

  if (opts.grow) {
    setGrow(node);
  } else if (opts.fill !== false && !opts.hug && opts.width === undefined && parent.layoutMode === 'VERTICAL') {
    setFillWidth(node);
  }
  return node;
}

export function icon(
  parent: FrameNode,
  name: IconName,
  color: string = colors.ink,
  size = 20,
  nodeName?: string
): FrameNode {
  const node = figma.createNodeFromSvg(iconSvg(name, color, size));
  node.name = nodeName ?? `Icon/${name}`;
  parent.appendChild(node);
  return node;
}

export function svg(parent: FrameNode, markup: string, name: string): FrameNode {
  const node = figma.createNodeFromSvg(markup);
  node.name = name;
  parent.appendChild(node);
  return node;
}

export function brandMark(parent: FrameNode, size = 28): FrameNode {
  const mark = svg(parent, brandMarkSvg(size), 'Brand mark');
  return mark;
}

export function spacer(parent: FrameNode, height = 1, growX = false, width = 1): FrameNode {
  const node = frame('Spacer', { width, height, fill: null });
  parent.appendChild(node);
  if (growX) {
    setGrow(node);
  }
  return node;
}

export function divider(parent: FrameNode, color = colors.border): FrameNode {
  const node = frame('Divider', {
    width: Math.max(1, parent.width),
    height: 1,
    fill: color
  });
  parent.appendChild(node);
  if (parent.layoutMode === 'VERTICAL') {
    setFillWidth(node);
  }
  return node;
}

export function verticalDivider(parent: FrameNode, height: number, color = colors.border): FrameNode {
  const node = frame('Vertical divider', { width: 1, height, fill: color });
  parent.appendChild(node);
  return node;
}

export function avatar(
  parent: FrameNode,
  initials: string,
  opts: {
    size?: number;
    bg?: string;
    color?: string;
    radius?: number;
    name?: string;
  } = {}
): FrameNode {
  const size = opts.size ?? 36;
  const node = frame(opts.name ?? `Avatar ${initials}`, {
    width: size,
    height: size,
    fill: opts.bg ?? colors.cobaltSoft,
    radius: opts.radius ?? 999
  });
  parent.appendChild(node);
  const label = text(node, initials, {
    size: Math.round(size * 0.34),
    lineHeight: Math.round(size * 0.44),
    weight: 'semibold',
    color: opts.color ?? colors.cobaltText,
    align: 'CENTER',
    width: size,
    fill: false
  });
  label.x = 0;
  label.y = (size - label.height) / 2;
  return node;
}

export function logoLockup(
  parent: FrameNode,
  opts: { width?: number; color?: string; size?: number; label?: string; markSize?: number } = {}
): FrameNode {
  const lockup = hstack('AirliPay logo', {
    width: opts.width ?? 180,
    height: opts.size ?? 32,
    gap: 9,
    fill: null
  });
  parent.appendChild(lockup);
  brandMark(lockup, opts.markSize ?? 28);
  text(lockup, opts.label ?? 'AirliPay', {
    size: opts.size ? Math.round(opts.size * 0.72) : 21,
    lineHeight: opts.size ? opts.size : 26,
    weight: 'extrabold',
    color: opts.color ?? colors.brandText,
    letterSpacing: -0.6,
    fill: false
  });
  return lockup;
}

export function absolute(node: SceneNode, x: number, y: number): void {
  node.x = x;
  node.y = y;
}

export function absoluteInside(node: SceneNode, x: number, y: number): void {
  try {
    (node as unknown as { layoutPositioning: 'ABSOLUTE' }).layoutPositioning = 'ABSOLUTE';
  } catch {
    // Not an auto-layout child.
  }
  node.x = x;
  node.y = y;
}

export function dot(parent: FrameNode, color: string, size = 7, name = 'Status dot'): FrameNode {
  const node = frame(name, { width: size, height: size, fill: color, radius: 999 });
  parent.appendChild(node);
  return node;
}

export function clampText(value: string, max: number): string {
  return value.length > max ? `${value.slice(0, Math.max(0, max - 1))}…` : value;
}
