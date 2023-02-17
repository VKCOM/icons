import { describe, expect, test, afterEach } from '@jest/globals';
import { BrowserSprite } from './browser-sprite';
import { BrowserSymbol } from './browser-symbol';

afterEach(() => {
  document.body.innerHTML = '';
});

describe(BrowserSprite, () => {
  test('mount && unmount', () => {
    document.body.innerHTML = '<div id="block"></div>';
    const sprite = new BrowserSprite({
      attrs: {
        id: 'sprite',
      },
    });

    sprite.add(new BrowserSymbol({ content: `<symbol id="symbol1"></symbol>` }));
    const node = sprite.mount(document.body);
    sprite.add(new BrowserSymbol({ content: `<symbol id="symbol2"></symbol>` }));

    expect(document.getElementById('sprite')).not.toBeNull();
    expect(document.getElementById('symbol1')).not.toBeNull();
    expect(document.getElementById('symbol2')).not.toBeNull();
    expect(document.getElementById('block')).not.toBeNull();
    expect(document.body.firstElementChild!.id).toBe('block');
    expect(document.body).toMatchSnapshot('mount');
    expect(sprite.mount(document.body)).toBe(node);

    sprite.unmount();

    expect(document.getElementById('sprite')).toBeNull();
    expect(document.getElementById('symbol1')).toBeNull();
    expect(document.getElementById('symbol2')).toBeNull();
    expect(document.getElementById('block')).not.toBeNull();
    expect(document.body).toMatchSnapshot('unmount');
  });

  test('mount && unmount prepend', () => {
    document.body.innerHTML = '<div id="block"></div>';

    const sprite = new BrowserSprite({
      attrs: {
        id: 'sprite',
      },
    });

    sprite.mount(document.body, true);
    sprite.add(new BrowserSymbol({ content: `<symbol id="symbol"></symbol>` }));

    expect(document.getElementById('sprite')).not.toBeNull();
    expect(document.getElementById('symbol')).not.toBeNull();
    expect(document.getElementById('block')).not.toBeNull();
    expect(document.body.firstElementChild!.id).toBe('sprite');
    expect(document.body).toMatchSnapshot('mount');

    sprite.unmount();

    expect(document.getElementById('sprite')).toBeNull();
    expect(document.getElementById('symbol')).toBeNull();
    expect(document.getElementById('block')).not.toBeNull();
    expect(document.body).toMatchSnapshot('unmount');
  });

  test('attach', () => {
    const sprite = new BrowserSprite({
      attrs: {
        id: 'sprite',
      },
    });
    const node = sprite.mount(document.body);
    sprite.add(new BrowserSymbol({ content: `<symbol id="symbol1"></symbol>` }));

    const sprite2 = new BrowserSprite();
    sprite2.add(new BrowserSymbol({ content: `<symbol id="symbol2"></symbol>` }));
    sprite2.attach(node);

    expect(document.getElementById('sprite')).not.toBeNull();
    expect(document.getElementById('symbol1')).not.toBeNull();
    expect(document.getElementById('symbol2')).not.toBeNull();
    expect(document.body).toMatchSnapshot();

    sprite2.attach(node);
  });
});
