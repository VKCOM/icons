import { describe, expect, test, afterEach } from '@jest/globals';
import { BrowserSprite } from './browser-sprite';
import { BrowserSymbol } from './browser-symbol';

afterEach(() => {
  document.body.innerHTML = '';
});

describe(BrowserSymbol, () => {
  test('mount', () => {
    const sprite = new BrowserSymbol({ content: `<symbol id="symbol1"></symbol>` });
    const node = sprite.mount(document.body);

    expect(document.getElementById('symbol1')).not.toBeNull();
    expect(sprite.mount(document.body)).toBe(node);

    sprite.unmount();
    expect(document.getElementById('symbol1')).toBeNull();
  });
});
