import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import sharp from 'sharp';
import { generateIcons } from '../scripts/icons.js';
import { createRasterIconsMap, createRasterIconsMapAsync } from '../scripts/raster/icons-map.js';

test('raster icons preserve pixels and ship generated assets with valid imports', async (t) => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'raster-icons-'));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const src = path.join(root, 'src');
  const dist = path.join(root, 'dist');
  const sources = new Map();

  for (const appearance of ['light', 'dark']) {
    for (const [density, scale] of [
      ['mdpi', 1],
      ['xhdpi', 2],
      ['xxhdpi', 3],
    ]) {
      const directory = path.join(src, 'png/24', `drawable-${density}`);
      await fs.mkdir(directory, { recursive: true });
      const file = path.join(directory, `sample_${appearance}_24.png`);
      const png = await sharp({
        create: {
          width: 24 * scale,
          height: 24 * scale,
          channels: 4,
          background: { r: appearance === 'light' ? 255 : 0, g: 120, b: 60, alpha: 0.5 },
        },
      })
        .png()
        .toBuffer();
      await fs.writeFile(file, png);
      sources.set(`${appearance}-${density}`, { file, png });
    }
  }

  // Hidden RGB values beneath zero alpha must also survive the round trip.
  const hiddenFile = path.join(src, 'png/24/drawable-mdpi/hidden_24.png');
  const hidden = await sharp(Buffer.from([123, 45, 67, 0]), {
    raw: { width: 1, height: 1, channels: 4 },
  })
    .png()
    .toBuffer();
  await fs.writeFile(hiddenFile, hidden);

  const highDepthFile = path.join(src, 'png/24/drawable-mdpi/high_depth_24.png');
  const highDepth = await sharp(hidden).toColourspace('rgb16').png().toBuffer();
  await fs.writeFile(highDepthFile, highDepth);

  const map = await createRasterIconsMapAsync(src, undefined, { convertToWebp: true });
  assert.equal(map.size, 3);
  assert.equal((await sharp(highDepth).metadata()).depth, 'ushort');
  assert.deepEqual(await fs.readFile(map.get('high_depth_24').light.mdpi), highDepth);
  assert.equal(map.get('sample_24').componentName, 'RasterIcon24Sample');
  for (const [key, { file, png }] of sources) {
    const [appearance, density] = key.split('-');
    const optimizedPath = map.get('sample_24')[appearance][density];
    const optimized = await fs.readFile(optimizedPath);
    assert.equal(path.extname(optimizedPath), '.webp');
    await assert.rejects(fs.access(optimizedPath.replace(/\.webp$/, '.png')), { code: 'ENOENT' });
    assert.ok(optimized.length < png.length);
    assert.deepEqual(
      await sharp(optimized).ensureAlpha().raw().toBuffer(),
      await sharp(png).ensureAlpha().raw().toBuffer(),
    );
    assert.deepEqual(await fs.readFile(file), png);
  }
  assert.deepEqual(
    await sharp(map.get('hidden_24').light.mdpi).ensureAlpha().raw().toBuffer(),
    await sharp(hidden).ensureAlpha().raw().toBuffer(),
  );

  await generateIcons({ srcDirectory: src, distDirectory: dist, convertToWebp: true });
  const component = await fs.readFile(path.join(dist, 'png/24/sample_24.js'), 'utf8');
  const imports = [...component.matchAll(/from ['"]([^'"]+\.(?:png|webp))['"]/g)];
  assert.equal(imports.length, 6);
  assert.ok(imports.every(([, importPath]) => importPath.endsWith('.webp')));
  for (const [, importPath] of imports) {
    await fs.access(path.resolve(dist, 'png/24', importPath));
  }
  assert.match(await fs.readFile(path.join(dist, 'index.js'), 'utf8'), /RasterIcon24Sample/);
  const declarations = await fs.readFile(path.join(dist, 'declaration.d.ts'), 'utf8');
  for (const extension of ['png', 'webp']) {
    assert.ok(declarations.includes(`'*.${extension}'`));
  }
  const assets = await fs.readdir(path.join(dist, 'raster'), {
    recursive: true,
    withFileTypes: true,
  });
  assert.equal(assets.filter((asset) => asset.isFile()).length, sources.size + 2);
});

test('generateIcons keeps optimized PNG assets unless WebP conversion is enabled', async (t) => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'raster-default-png-'));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const src = path.join(root, 'src');
  const relativeAsset = '24/drawable-mdpi/sample_24.png';
  const file = path.join(src, 'png', relativeAsset);
  await fs.mkdir(path.dirname(file), { recursive: true });
  const input = await sharp({
    create: { width: 24, height: 24, channels: 4, background: { r: 255, g: 40, b: 80, alpha: 1 } },
  })
    .png({ compressionLevel: 0 })
    .toBuffer();
  await fs.writeFile(file, input);

  for (const [name, options] of [
    ['default', {}],
    ['disabled', { convertToWebp: false }],
  ]) {
    const dist = path.join(root, name);
    await generateIcons({ srcDirectory: src, distDirectory: dist, ...options });
    const generated = await fs.readFile(path.join(dist, 'raster', relativeAsset));
    assert.equal((await sharp(generated).metadata()).format, 'png');
    assert.ok(generated.length < input.length);
    assert.deepEqual(
      await sharp(generated).ensureAlpha().raw().toBuffer(),
      await sharp(input).ensureAlpha().raw().toBuffer(),
    );
    const component = await fs.readFile(path.join(dist, 'png/24/sample_24.js'), 'utf8');
    const imports = [...component.matchAll(/from ['"]([^'"]+\.(?:png|webp))['"]/g)];
    assert.equal(imports.length, 1);
    assert.ok(imports[0][1].endsWith('.png'));
    await assert.rejects(
      fs.access(path.join(dist, 'raster', relativeAsset.replace(/\.png$/, '.webp'))),
      { code: 'ENOENT' },
    );
  }
  assert.deepEqual(await fs.readFile(file), input);
});

test('an empty source returns an empty map without creating assets', async (t) => {
  const src = await fs.mkdtemp(path.join(os.tmpdir(), 'raster-empty-'));
  t.after(() => fs.rm(src, { recursive: true, force: true }));
  assert.equal(createRasterIconsMap(src).size, 0);
  assert.deepEqual(await fs.readdir(src), []);
});

test('APNG keeps every frame by copying the original bytes', async (t) => {
  const src = await fs.mkdtemp(path.join(os.tmpdir(), 'raster-apng-'));
  t.after(() => fs.rm(src, { recursive: true, force: true }));
  const directory = path.join(src, 'png/24/drawable-mdpi');
  await fs.mkdir(directory, { recursive: true });

  // A valid 24x24 APNG alternating between red and blue frames.
  const animated = Buffer.from(
    [
      'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACGFjVEwAAAACAAAAAPONk3AAAAAaZmNU',
      'TAAAAAAAAAAYAAAAGAAAAAAAAAAAAAEAAgAAq31PnwAAACVJREFUeJxj+M/A8J+WmGHUglELRi0YtWDU',
      'glELRi0YtWBoWAAAxNZ7vb1sT4sAAAAaZmNUTAAAAAEAAAAYAAAAGAAAAAAAAAAAAAEAAgAAMA6lSwAA',
      'AChmZEFUAAAAAnicY2Bg+P+ftnjUglELRi0YtWDUglELRi0YtWBIWAAASRp7vR/bb2kAAAAASUVORK5C',
      'YII=',
    ].join(''),
    'base64',
  );
  const original = path.join(directory, 'animated_24.png');
  await fs.writeFile(original, animated);

  // Sharp reports no pages for APNG and can produce a smaller, static first frame.
  assert.ok((await sharp(animated).webp({ lossless: true }).toBuffer()).length < animated.length);

  const map = await createRasterIconsMapAsync(src, undefined, { convertToWebp: true });
  const icon = map.get('animated_24');
  assert.equal(path.extname(icon.light.mdpi), '.png');
  assert.deepEqual(await fs.readFile(icon.light.mdpi), animated);
  assert.deepEqual(await fs.readFile(original), animated);
});
