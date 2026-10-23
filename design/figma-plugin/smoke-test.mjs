/* eslint-disable */
import fs from 'node:fs';
import vm from 'node:vm';

let id = 0;
let createdNodes = 0;

class MockNode {
  constructor(type, name = '') {
    createdNodes += 1;
    this.type = type;
    this.name = name;
    this.id = String(++id);
    this.x = 0;
    this.y = 0;
    this.width = 100;
    this.height = 10;
    this.children = [];
    this.parent = null;
    this._data = {};
    this.layoutMode = 'NONE';
    this.itemSpacing = 0;
    this.paddingTop = 0;
    this.paddingBottom = 0;
    this.paddingLeft = 0;
    this.paddingRight = 0;
    this.primaryAxisSizingMode = 'AUTO';
    this.counterAxisSizingMode = 'AUTO';
    this.counterAxisAlignItems = 'MIN';
    this.primaryAxisAlignItems = 'MIN';
    this.layoutSizingHorizontal = 'FIXED';
    this.layoutSizingVertical = 'FIXED';
    this.layoutGrow = 0;
    this.layoutPositioning = 'AUTO';
    this.fills = [];
    this.strokes = [];
    this.strokeWeight = 1;
    this.strokeAlign = 'INSIDE';
    this.cornerRadius = 0;
    this.clipsContent = false;
    this.opacity = 1;
    this.rotation = 0;
  }

  appendChild(child) {
    if (child.parent) {
      child.parent.children = child.parent.children.filter((entry) => entry !== child);
    }
    child.parent = this;
    this.children.push(child);
    return child;
  }

  resize(width, height) {
    this.width = width;
    this.height = height;
  }

  setPluginData(key, value) {
    this._data[key] = value;
  }

  getPluginData(key) {
    return this._data[key] || '';
  }

  remove() {
    if (this.parent) {
      this.parent.children = this.parent.children.filter((entry) => entry !== this);
      this.parent = null;
    }
  }
}

class MockText extends MockNode {
  constructor() {
    super('TEXT');
    this.fontName = { family: 'Inter', style: 'Regular' };
    this.characters = '';
    this.fontSize = 16;
    this.lineHeight = { unit: 'PIXELS', value: 24 };
    this.letterSpacing = { unit: 'PIXELS', value: 0 };
    this.textAutoResize = 'NONE';
    this.textAlignHorizontal = 'LEFT';
  }
}

class MockPage extends MockNode {
  constructor(name) {
    super('PAGE', name);
  }
}

class MockRoot extends MockNode {
  constructor() {
    super('ROOT', 'Document');
  }
}

const root = new MockRoot();
const scratch = new MockPage('Scratch');
const scratchFrame = new MockNode('FRAME', 'User note');
scratch.appendChild(scratchFrame);
root.appendChild(scratch);
let currentPage = scratch;

// Seed a same-name, unmarked page to exercise collision-safe naming.
const collision = new MockPage('AirliPay · Back Office Redesign (v1)');
collision.appendChild(new MockNode('FRAME', 'Existing user content'));
root.appendChild(collision);

const messages = [];
let terminalWaiter = null;
let cancelOnProgress = false;
let cancelSent = false;

const figma = {
  root,
  get currentPage() {
    return currentPage;
  },
  set currentPage(page) {
    currentPage = page;
  },
  createPage() {
    const page = new MockPage('Untitled');
    root.appendChild(page);
    return page;
  },
  createFrame() {
    return new MockNode('FRAME');
  },
  createText() {
    return new MockText();
  },
  createNodeFromSvg(svg) {
    const node = new MockNode('FRAME', 'SVG');
    node._svg = svg;
    const width = /width="([\d.]+)"/.exec(svg);
    const height = /height="([\d.]+)"/.exec(svg);
    node.width = width ? Number(width[1]) : 24;
    node.height = height ? Number(height[1]) : 24;
    return node;
  },
  async loadAllPagesAsync() {},
  async setCurrentPageAsync(page) {
    currentPage = page;
    return page;
  },
  async listAvailableFontsAsync() {
    return ['Regular', 'Medium', 'Semi Bold', 'Bold', 'Extra Bold'].map((style) => ({
      fontName: { family: 'Inter', style }
    }));
  },
  async loadFontAsync() {},
  showUI() {},
  notify() {},
  closePlugin() {},
  viewport: {
    scrollAndZoomIntoView() {}
  },
  ui: {
    onmessage: null,
    postMessage(message) {
      messages.push(message);
      if (
        cancelOnProgress &&
        !cancelSent &&
        message.type === 'progress' &&
        typeof message.pct === 'number' &&
        message.pct >= 20
      ) {
        cancelSent = true;
        setTimeout(() => {
          if (figma.ui.onmessage) {
            figma.ui.onmessage({ type: 'cancel' });
          }
        }, 0);
      }
      if (['done', 'error', 'cancelled'].includes(message.type) && terminalWaiter) {
        const resolve = terminalWaiter;
        terminalWaiter = null;
        resolve(message);
      }
    }
  }
};

globalThis.figma = figma;
globalThis.__html__ = '';
globalThis.console = console;
vm.runInThisContext(fs.readFileSync('plugin.js', 'utf8'), { filename: 'plugin.js' });

if (typeof figma.ui.onmessage !== 'function') {
  throw new Error('plugin did not register figma.ui.onmessage');
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function pagesNamed(fragment) {
  return root.children.filter((page) => page.name.includes(fragment));
}

function marked(page, key) {
  const found = [];
  const visit = (node) => {
    if (node.getPluginData && node.getPluginData(key)) {
      found.push(node);
    }
    if (node.children) {
      node.children.forEach(visit);
    }
  };
  visit(page);
  return found;
}

function boardPages() {
  return root.children.filter((page) => page.getPluginData('airlipayBackofficeBoard') === 'v1');
}

function findBoard() {
  const boards = boardPages();
  assert(boards.length === 1, `expected exactly one marked board page, found ${boards.length}`);
  return boards[0];
}

function inspectBoard(label) {
  const board = findBoard();
  const sections = board.children.filter(
    (child) => child.getPluginData('airlipayBackofficeSection') === 'true'
  );
  const screens = marked(board, 'airlipayBackofficeScreen');
  const plates = marked(board, 'airlipayBackofficePlate');
  const routes = marked(board, 'airlipayBackofficeRoute');
  const lightScreens = screens.filter((screen) => screen.getPluginData('airlipayBackofficeTheme') === 'light');
  const darkScreens = screens.filter((screen) => screen.getPluginData('airlipayBackofficeTheme') === 'dark');
  const staging = pagesNamed('Back Office Redesign (working)');
  const sizeFailures = screens.filter((screen) => screen.width !== 1440 || screen.height !== 960);

  assert(sections.length === 5, `${label}: expected 5 sections, found ${sections.length}`);
  assert(screens.length === 54, `${label}: expected 54 screens, found ${screens.length}`);
  assert(lightScreens.length === 27, `${label}: expected 27 light screens, found ${lightScreens.length}`);
  assert(darkScreens.length === 27, `${label}: expected 27 dark screens, found ${darkScreens.length}`);
  assert(plates.length === 2, `${label}: expected 2 foundation plates, found ${plates.length}`);
  assert(routes.length === 30, `${label}: expected 30 route rows, found ${routes.length}`);
  assert(staging.length === 0, `${label}: staging page was not cleaned up`);
  assert(sizeFailures.length === 0, `${label}: ${sizeFailures.length} screens have the wrong size`);
  assert(sections.some((section) => section.name.includes('Cover')), `${label}: cover missing`);

  console.log(
    `${label}: board="${board.name}" sections=${sections.length} screens=${screens.length} plates=${plates.length} routes=${routes.length}`
  );
  return board;
}

function waitForTerminal(timeoutMs, label) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      terminalWaiter = null;
      reject(new Error(`${label} timed out after ${timeoutMs}ms`));
    }, timeoutMs);
    terminalWaiter = (message) => {
      clearTimeout(timer);
      resolve(message);
    };
  });
}

async function generate(label, { replace = true, scope = 'both', cancel = false } = {}) {
  cancelOnProgress = cancel;
  cancelSent = false;
  const wait = waitForTerminal(120000, label);
  figma.ui.onmessage({ type: 'generate', replace, scope });
  const result = await wait;
  cancelOnProgress = false;
  return result;
}

const initialRootPages = root.children.length;
const initialScratchFrame = scratch.children.length;
const initialCollisionFrame = collision.children.length;

const first = await generate('first run', { replace: false, scope: 'both' });
assert(first.type === 'done', `first run failed: ${JSON.stringify(first)}`);
const firstBoard = inspectBoard('first run');
const firstRunNodes = createdNodes;
const nodeBudget = 45000;
assert(
  firstBoard.name.includes('· 2'),
  `name collision was not resolved safely; board is "${firstBoard.name}"`
);
assert(
  firstRunNodes <= nodeBudget,
  `node budget exceeded on a complete board: ${firstRunNodes} nodes created (ceiling ${nodeBudget})`
);
assert(root.children.length === initialRootPages + 1, 'first run should add exactly one page');
assert(scratch.children.length === initialScratchFrame, 'unrelated Scratch page was modified');
assert(collision.children.length === initialCollisionFrame, 'same-name unmarked page was modified');
assert(pagesNamed('Back Office Redesign (working)').length === 0, 'staging page left behind after first run');
console.log(`first run nodes created: ${firstRunNodes}`);

const replacement = await generate('replacement run', { replace: true, scope: 'both' });
assert(replacement.type === 'done', `replacement failed: ${JSON.stringify(replacement)}`);
inspectBoard('replacement run');
assert(root.children.length === initialRootPages + 1, 'replacement should not create another page');
assert(findBoard().name.includes('· 2'), 'replacement renamed the existing board page');
assert(scratch.children.length === initialScratchFrame, 'replacement modified an unrelated page');
assert(collision.children.length === initialCollisionFrame, 'replacement modified the unmarked page');
assert(pagesNamed('Back Office Redesign (working)').length === 0, 'staging page left behind after replacement');
console.log(`replacement nodes created total: ${createdNodes - firstRunNodes}`);

const cancelled = await generate('cancelled run', { replace: true, scope: 'both', cancel: true });
assert(cancelled.type === 'cancelled', `cancel run did not cancel: ${JSON.stringify(cancelled)}`);
inspectBoard('after cancellation');
assert(root.children.length === initialRootPages + 1, 'cancellation changed the page count');
assert(pagesNamed('Back Office Redesign (working)').length === 0, 'cancellation left a staging page');
assert(scratch.children.length === initialScratchFrame, 'cancellation modified an unrelated page');
assert(collision.children.length === initialCollisionFrame, 'cancellation modified the unmarked page');
assert(root.children.length === initialRootPages + 1, 'cancellation added a page');

const stages = await generate('light-only run', { replace: true, scope: 'light' });
assert(stages.type === 'done', `light-only run failed: ${JSON.stringify(stages)}`);
const lightOnlyBoard = findBoard();
const lightOnlyScreens = marked(lightOnlyBoard, 'airlipayBackofficeScreen');
const lightOnlyPlates = marked(lightOnlyBoard, 'airlipayBackofficePlate');
const lightOnlySections = lightOnlyBoard.children.filter(
  (child) => child.getPluginData('airlipayBackofficeSection') === 'true'
);
assert(lightOnlySections.length === 4, `light-only expected 4 sections, found ${lightOnlySections.length}`);
assert(lightOnlyScreens.length === 27, `light-only expected 27 screens, found ${lightOnlyScreens.length}`);
assert(lightOnlyPlates.length === 1, `light-only expected 1 plate, found ${lightOnlyPlates.length}`);
assert(marked(lightOnlyBoard, 'airlipayBackofficeRoute').length === 30, 'light-only lost route rows');
assert(pagesNamed('Back Office Redesign (working)').length === 0, 'light-only left a staging page');
console.log('light-only run: 4 sections / 27 screens / 1 plate / 30 route rows');

console.log(`Smoke test passed. ${createdNodes} nodes created; ${messages.filter((m) => m.type === 'progress').length} progress messages.`);
