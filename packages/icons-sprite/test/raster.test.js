import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { IconAppearanceProvider, makeRasterIcon } from '../dist/index.js';

test('WebP URLs render directly in the image density set', () => {
  const Icon = makeRasterIcon('Sample', 'sample', 24, {
    lightmdpi: 'one.webp',
    lightxhdpi: 'two.webp',
    lightxxhdpi: 'three.webp',
  });
  const html = renderToStaticMarkup(createElement(Icon, { className: 'custom' }));
  assert.ok(html.startsWith('<img '));
  assert.match(html, /src="one.webp" srcSet="one.webp 1x, two.webp 1.5x, three.webp 3x"/);
  assert.match(html, /class="[^"]*custom"/);
  assert.doesNotMatch(html, /picture|source|\.png|lightmdpi|lightxhdpi|lightxxhdpi/);
});

test('each density can use its selected PNG or WebP URL', () => {
  const Icon = makeRasterIcon('Sample', 'sample', 24, {
    lightmdpi: 'one.webp',
    lightxhdpi: 'two.png',
    lightxxhdpi: 'three.webp',
  });
  const html = renderToStaticMarkup(createElement(Icon));
  assert.ok(html.startsWith('<img '));
  assert.match(html, /src="one.webp" srcSet="one.webp 1x, two.png 1.5x, three.webp 3x"/);
});

test('a single high-density source also supplies img src', () => {
  const Icon = makeRasterIcon('Sample', 'sample', 24, {
    lightxxhdpi: 'three.webp',
  });
  const html = renderToStaticMarkup(createElement(Icon));
  assert.match(html, /<img[^>]*src="three.webp" srcSet="three.webp 3x"/);
});

test('the image remains the root layout element', () => {
  const Icon = makeRasterIcon('Sample', 'sample', 24, {
    lightmdpi: 'one.webp',
  });
  const html = renderToStaticMarkup(
    createElement(Icon, {
      className: 'custom',
      style: { alignSelf: 'center', order: 2, marginLeft: 'auto' },
    }),
  );
  assert.ok(html.startsWith('<img '));
  assert.match(html, /<img[^>]*class="[^"]*custom"/);
  assert.match(html, /<img[^>]*style="align-self:center;order:2;margin-left:auto"/);
});

test('appearance selects the matching image URLs', () => {
  const Icon = makeRasterIcon('Sample', 'sample', 24, {
    lightmdpi: 'light.webp',
    darkmdpi: 'dark.webp',
  });
  const html = renderToStaticMarkup(
    createElement(IconAppearanceProvider, { value: 'dark' }, createElement(Icon)),
  );
  assert.match(html, /src="dark.webp" srcSet="dark.webp 1x"/);
  assert.doesNotMatch(html, /light.webp/);
});

test('icons supplied only in dark appearance remain available in light appearance', () => {
  const Icon = makeRasterIcon('Sample', 'sample', 24, {
    darkmdpi: 'one.webp',
    darkxxhdpi: 'three.png',
  });
  const html = renderToStaticMarkup(createElement(Icon));
  assert.match(html, /src="one.webp" srcSet="one.webp 1x, three.png 3x"/);
  assert.doesNotMatch(html, /darkmdpi|darkxxhdpi/);
});

test('existing string sources and explicit image props remain supported', () => {
  const LegacyIcon = makeRasterIcon('Sample', 'sample', 24, { lightmdpi: 'one.png' });
  const legacy = renderToStaticMarkup(createElement(LegacyIcon));
  assert.ok(legacy.startsWith('<img'));
  assert.match(legacy, /src="one.png"/);
  const Icon = makeRasterIcon('Sample', 'sample', 24, {
    lightmdpi: 'one.webp',
  });
  const custom = renderToStaticMarkup(
    createElement(Icon, { src: 'custom.png', srcSet: 'custom.png 1x' }),
  );
  assert.ok(custom.startsWith('<img'));
  assert.match(custom, /src="custom.png" srcSet="custom.png 1x"/);
});
