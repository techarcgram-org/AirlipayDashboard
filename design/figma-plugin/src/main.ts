import { preloadFonts } from './primitives';
import {
  BOARD_PAGE_NAME,
  COVER_HEIGHT,
  EXPECTED_ROUTE_ROWS,
  EXPECTED_SCREENS_PER_THEME,
  MARKERS,
  WORKING_PAGE_NAME,
  buildBoard,
  type BoardResult
} from './layout/board';
import type { ThemeName } from './tokens';

type ThemeScope = 'both' | 'light' | 'dark';

interface UIMessage {
  type?: string;
  replace?: boolean;
  scope?: ThemeScope;
}

let generating = false;
let cancelled = false;

function post(message: Record<string, unknown>): void {
  figma.ui.postMessage(message);
}

function progress(message: string, pct: number, log = false): void {
  post({ type: 'progress', message, pct, log });
}

function uniquePageName(base: string, pages: readonly PageNode[]): string {
  const names = new Set(pages.map((page) => page.name));
  if (!names.has(base)) {
    return base;
  }
  let suffix = 2;
  while (names.has(`${base} · ${suffix}`)) {
    suffix += 1;
  }
  return `${base} · ${suffix}`;
}

function errorDetail(error: unknown): string {
  if (error instanceof Error) {
    return error.stack || error.message;
  }
  return String(error);
}

function themesFor(scope: ThemeScope): ThemeName[] {
  if (scope === 'light') {
    return ['light'];
  }
  if (scope === 'dark') {
    return ['dark'];
  }
  return ['light', 'dark'];
}

function collectMarked(page: PageNode, key: string): SceneNode[] {
  const matches: SceneNode[] = [];
  const visit = (node: PageNode | FrameNode): void => {
    node.children.forEach((child) => {
      if (child.getPluginData(key)) {
        matches.push(child);
      }
      if ('children' in child) {
        visit(child as FrameNode);
      }
    });
  };
  visit(page);
  return matches;
}

function runToken(): string {
  return `run-${Date.now().toString(36)}`;
}

function expectedSummary(themes: ThemeName[]): {
  sections: number;
  screens: number;
  plates: number;
  routes: number;
} {
  return {
    sections: 3 + themes.length,
    screens: EXPECTED_SCREENS_PER_THEME * themes.length,
    plates: themes.length,
    routes: EXPECTED_ROUTE_ROWS
  };
}

function assertBoardStructure(page: PageNode, themes: ThemeName[]): void {
  const expected = expectedSummary(themes);
  const sections = page.children.filter(
    (child) => child.getPluginData(MARKERS.section) === 'true'
  );
  const screens = collectMarked(page, MARKERS.screen);
  const plates = collectMarked(page, MARKERS.plate);
  const routeRows = collectMarked(page, MARKERS.route);
  const lightScreens = screens.filter((screen) => screen.getPluginData(MARKERS.theme) === 'light');
  const darkScreens = screens.filter((screen) => screen.getPluginData(MARKERS.theme) === 'dark');

  if (sections.length !== expected.sections) {
    throw new Error(`Expected ${expected.sections} sections, found ${sections.length}.`);
  }
  if (screens.length !== expected.screens) {
    throw new Error(`Expected ${expected.screens} screens, found ${screens.length}.`);
  }
  if (plates.length !== expected.plates) {
    throw new Error(`Expected ${expected.plates} foundation plates, found ${plates.length}.`);
  }
  if (routeRows.length !== expected.routes) {
    throw new Error(`Expected ${expected.routes} route rows, found ${routeRows.length}.`);
  }
  if (themes.includes('light') && lightScreens.length !== EXPECTED_SCREENS_PER_THEME) {
    throw new Error(`Expected ${EXPECTED_SCREENS_PER_THEME} light screens, found ${lightScreens.length}.`);
  }
  if (themes.includes('dark') && darkScreens.length !== EXPECTED_SCREENS_PER_THEME) {
    throw new Error(`Expected ${EXPECTED_SCREENS_PER_THEME} dark screens, found ${darkScreens.length}.`);
  }
  screens.forEach((screen) => {
    if (screen.width !== 1440 || screen.height !== 960) {
      throw new Error(`Screen ${screen.name} is ${screen.width}×${screen.height}, expected 1440×960.`);
    }
  });
}

async function generate(scope: ThemeScope, replace: boolean): Promise<void> {
  if (generating) {
    post({ type: 'error', message: 'Generation is already running.' });
    return;
  }
  generating = true;
  cancelled = false;
  const themes = themesFor(scope);
  const previousPage = figma.currentPage;
  let staging: PageNode | null = null;
  let finalPage: PageNode | null = null;
  let movedSections: FrameNode[] = [];

  try {
    progress('Checking Inter fonts…', 2);
    const fontResult = await preloadFonts();
    fontResult.warnings.forEach((warning) => progress(warning, 3, true));

    await figma.loadAllPagesAsync();
    const pages = figma.root.children;
    const existingGenerated = pages.find(
      (page) => page.getPluginData(MARKERS.board) === 'v1'
    );

    if (existingGenerated && !replace) {
      post({
        type: 'error',
        message: 'An AirliPay back-office board already exists.',
        detail: 'Enable “Replace previous generated board” to update it safely, or delete the marked board page first.'
      });
      return;
    }

    const finalName = existingGenerated
      ? existingGenerated.name
      : uniquePageName(BOARD_PAGE_NAME, pages);
    const stagingName = uniquePageName(WORKING_PAGE_NAME, pages);

    staging = figma.createPage();
    staging.name = stagingName;
    staging.setPluginData(MARKERS.run, runToken());
    await figma.setCurrentPageAsync(staging);
    const token = runToken();

    const result: BoardResult = await buildBoard(staging, {
      themes,
      runToken: token,
      report: (message, pct, log) => progress(message, Math.round(5 + pct * 0.9), log),
      isCancelled: () => cancelled
    });

    if (cancelled) {
      throw new Error('cancelled');
    }

    progress('Checking generated structure…', 97);
    assertBoardStructure(staging, themes);

    if (existingGenerated) {
      const oldSections = existingGenerated.children.filter(
        (child) => child.getPluginData(MARKERS.section) === 'true'
      );
      const newSections = staging.children.filter(
        (child) => child.getPluginData(MARKERS.section) === 'true'
      );
      try {
        newSections.forEach((section) => {
          existingGenerated.appendChild(section);
          movedSections.push(section as FrameNode);
        });
      } catch (error) {
        movedSections.forEach((section) => section.remove());
        movedSections = [];
        throw error;
      }
      oldSections.forEach((section) => section.remove());
      existingGenerated.setPluginData(MARKERS.board, 'v1');
      await figma.setCurrentPageAsync(existingGenerated);
      staging.remove();
      staging = null;
      finalPage = existingGenerated;
    } else {
      staging.name = finalName;
      staging.setPluginData(MARKERS.board, 'v1');
      await figma.setCurrentPageAsync(staging);
      finalPage = staging;
      staging = null;
    }

    progress('Board committed.', 100);
    if (result.cover) {
      figma.viewport.scrollAndZoomIntoView([result.cover]);
    } else {
      const firstSection = finalPage.children.find(
        (child) => child.getPluginData(MARKERS.section) === 'true'
      );
      if (firstSection) {
        figma.viewport.scrollAndZoomIntoView([firstSection]);
      }
    }

    figma.notify('AirliPay back-office board generated');
    post({
      type: 'done',
      message: 'Back-office design board generated.',
      summary:
        `${result.summary} · ${existingGenerated ? 'replaced generated sections on the existing board' : 'new board page created'}.`
    });
  } catch (error) {
    if (staging) {
      try {
        staging.remove();
      } catch {
        // The staging page may already be committed or removed by Figma.
      }
    }
    movedSections.forEach((section) => {
      try {
        section.remove();
      } catch {
        // The section may already be gone.
      }
    });
    try {
      await figma.setCurrentPageAsync(previousPage);
    } catch {
      // The previous page may have been deleted during generation.
    }
    if (error instanceof Error && error.message === 'cancelled') {
      post({ type: 'cancelled', message: 'Generation cancelled. The existing board is unchanged.' });
      return;
    }
    const summary = error instanceof Error ? error.message : 'Unknown error';
    console.error(error);
    figma.notify(`Back-office generation failed: ${summary}`, { error: true, timeout: 10000 });
    post({
      type: 'error',
      message: 'Generation failed. See the log for details.',
      detail: errorDetail(error)
    });
  } finally {
    generating = false;
  }
}

figma.showUI(__html__, {
  width: 404,
  height: 652,
  themeColors: true
});

figma.ui.onmessage = (message: UIMessage) => {
  if (!message || typeof message.type !== 'string') {
    return;
  }
  if (message.type === 'generate') {
    const scope: ThemeScope =
      message.scope === 'light' || message.scope === 'dark' ? message.scope : 'both';
    void generate(scope, Boolean(message.replace));
    return;
  }
  if (message.type === 'cancel') {
    if (generating) {
      cancelled = true;
      progress('Cancelling after the current screen…', 0);
    }
    return;
  }
  if (message.type === 'close') {
    figma.closePlugin();
  }
};

// Referenced so the type checker keeps the constant available in the bundle.
void COVER_HEIGHT;
