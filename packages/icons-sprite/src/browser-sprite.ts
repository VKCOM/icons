import { BrowserSymbol } from './browser-symbol';

const namespaceURI = 'http://www.w3.org/2000/svg';

export interface SpriteConfig {
  attrs?: Record<string, string>;
}

export class BrowserSprite {
  private symbols: Map<string, BrowserSymbol> = new Map();
  private config: SpriteConfig = {
    attrs: {
      'xmlns': namespaceURI,
      'xmlns:xlink': 'http://www.w3.org/1999/xlink',
      'style': 'position:absolute;width:0;height:0',
      'aria-hidden': 'true',
    },
  };

  node: Element | null = null;

  constructor(config: SpriteConfig = {}) {
    Object.assign(this.config.attrs!, config.attrs);
  }

  private push(symbol: BrowserSymbol) {
    const { symbols } = this;
    const existing = symbols.has(symbol.id);

    symbols.set(symbol.id, symbol);

    return !existing;
  }

  add(symbol: BrowserSymbol) {
    const isNewSymbol = this.push(symbol);

    if (!!this.node && isNewSymbol) {
      symbol.mount(this.node);
    }

    return isNewSymbol;
  }

  attach(target: Element) {
    if (!!this.node) {
      return;
    }

    this.node = target;

    // Already added symbols needs to be mounted
    this.symbols.forEach((symbol) => {
      symbol.mount(target);
    });

    // Create symbols from existing DOM nodes, add and mount them
    target.querySelectorAll('symbol').forEach((symbolNode: Element) => {
      const symbol = BrowserSymbol.createFromExistingNode(symbolNode);
      this.add(symbol);
    });
  }

  mount(target: Node, prepend = false) {
    if (!!this.node) {
      return this.node;
    }

    this.node = this.render();

    if (prepend && target.childNodes[0]) {
      target.insertBefore(this.node, target.firstChild);
    } else {
      target.appendChild(this.node);
    }

    return this.node;
  }

  private render() {
    const el = document.createElementNS(namespaceURI, 'svg');

    Object.entries(this.config.attrs!).forEach((entry) => el.setAttribute(entry[0], entry[1]));
    this.symbols.forEach((symbol) => el.appendChild(symbol.node));

    return el;
  }

  unmount() {
    this.node && this.node.parentNode && this.node.parentNode.removeChild(this.node);
  }
}
