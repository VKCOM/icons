import { parse } from './utils/parse';

interface SpriteSymbolOption {
  content: string;
}

export class BrowserSymbol {
  protected isMounted: boolean = false;
  node: Element;

  constructor({ content }: SpriteSymbolOption) {
    this.node = parse(content);
  }

  get id(): string {
    return this.node.id;
  }

  static createFromExistingNode(node: Element): BrowserSymbol {
    const symbol = new BrowserSymbol({
      content: '',
    });
    symbol.node = node;

    return symbol;
  }

  mount(target: Node) {
    if (this.isMounted) {
      return this.node;
    }

    this.isMounted = true;

    target.appendChild(this.node);

    return this.node;
  }

  unmount() {
    if (this.node && this.node.parentNode) {
      this.node.parentNode.removeChild(this.node);
      this.isMounted = false;
    }
  }
}
