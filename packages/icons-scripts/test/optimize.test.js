import assert from 'node:assert/strict';
import { test } from 'node:test';
import sharp from 'sharp';
import { optimizeRasterIcon } from '../scripts/raster/optimize.js';

async function rgba(input) {
  return sharp(input).ensureAlpha().raw().toBuffer();
}

async function noisyPng() {
  const pixels = Buffer.alloc(16 * 16 * 4);
  let state = 123456789;
  for (let offset = 0; offset < pixels.length; offset++) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    pixels[offset] = state >>> 24;
  }
  return sharp(pixels, { raw: { width: 16, height: 16, channels: 4 } })
    .png({ compressionLevel: 0, progressive: true })
    .toBuffer();
}

function pngChunk(type, data) {
  const chunk = Buffer.alloc(data.length + 12);
  chunk.writeUInt32BE(data.length);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  let crc = 0xffffffff;
  for (const byte of chunk.subarray(4, -4)) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
  }
  chunk.writeUInt32BE((crc ^ 0xffffffff) >>> 0, chunk.length - 4);
  return chunk;
}

test('exact WebP compresses RGB beneath fully transparent pixels without discarding it', async () => {
  const pixels = Buffer.alloc(48 * 48 * 4);
  for (let offset = 0; offset < pixels.length; offset += 4) {
    pixels[offset] = 123;
    pixels[offset + 1] = 45;
    pixels[offset + 2] = 67;
  }
  const input = await sharp(pixels, { raw: { width: 48, height: 48, channels: 4 } })
    .png()
    .toBuffer();
  const optimized = await optimizeRasterIcon(input, { convertToWebp: true });
  assert.equal(optimized.extension, '.webp');
  assert.ok(optimized.buffer.length < input.length);
  assert.deepEqual(await rgba(optimized.buffer), pixels);
});

test('PNG optimization is enabled by default', async () => {
  const input = await noisyPng();
  const optimized = await optimizeRasterIcon(input);
  assert.equal(optimized.extension, '.png');
  assert.ok(optimized.buffer.length < input.length);
  assert.equal((await sharp(optimized.buffer).metadata()).format, 'png');
  assert.deepEqual(await rgba(optimized.buffer), await rgba(input));
});

test('explicit WebP conversion is used even when larger than PNG', async () => {
  const input = await sharp(await noisyPng())
    .png({ compressionLevel: 9 })
    .toBuffer();
  const optimized = await optimizeRasterIcon(input, { convertToWebp: true });
  assert.equal(optimized.extension, '.webp');
  assert.equal((await sharp(optimized.buffer).metadata()).format, 'webp');
  assert.ok(optimized.buffer.length > input.length);
  assert.deepEqual(await rgba(optimized.buffer), await rgba(input));
});

test('PNG is retained when WebP is disabled, even if WebP would be smaller', async () => {
  const input = await sharp({
    create: { width: 48, height: 48, channels: 4, background: { r: 255, g: 40, b: 80, alpha: 1 } },
  })
    .png()
    .toBuffer();
  const webp = await optimizeRasterIcon(input, { convertToWebp: true });
  for (const convertToWebp of [undefined, false]) {
    const optimized = await optimizeRasterIcon(input, { convertToWebp });
    assert.equal(optimized.extension, '.png');
    assert.ok(webp.buffer.length < optimized.buffer.length);
    assert.deepEqual(await rgba(optimized.buffer), await rgba(input));
  }
});

test('re-optimising a selected PNG cannot increase its size', async () => {
  const input = await noisyPng();
  const first = await optimizeRasterIcon(input);
  assert.equal(first.extension, '.png');
  const second = await optimizeRasterIcon(first.buffer);
  assert.ok(second.buffer.length <= first.buffer.length);
  assert.deepEqual(await rgba(second.buffer), await rgba(input));
});

test('optimizing a compact PNG without DPI metadata cannot increase its size', async () => {
  // An optimized 24x24 grayscale PNG containing only IHDR, IDAT and IEND.
  const input = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAAAAADFHGIkAAAAE0lEQVR42mNowAEYRiVGJciXAACWFyAQt1gSMQAAAABJRU5ErkJggg==',
    'base64',
  );
  assert.equal(input.length, 76);
  const optimized = await optimizeRasterIcon(input);
  assert.equal(optimized.extension, '.png');
  assert.ok(optimized.buffer.length <= input.length);
  assert.deepEqual(await rgba(optimized.buffer), await rgba(input));
});

test('PNG colour profiles and orientation are preserved without conversion', async () => {
  const input = await sharp({
    create: { width: 8, height: 8, channels: 4, background: { r: 255, g: 40, b: 80, alpha: 1 } },
  })
    .withMetadata({ orientation: 6 })
    .withIccProfile('p3')
    .png()
    .toBuffer();
  const metadata = await sharp(input).metadata();
  assert.equal(metadata.hasProfile, true);
  assert.equal(metadata.orientation, 6);
  for (const convertToWebp of [false, true]) {
    const optimized = await optimizeRasterIcon(input, { convertToWebp });
    assert.equal(optimized.extension, '.png');
    assert.deepEqual(optimized.buffer, input);
  }
});

test('PNG colour chunks without an ICC profile are preserved in both output modes', async (t) => {
  const base = await sharp({
    create: {
      width: 24,
      height: 24,
      channels: 4,
      background: { r: 128, g: 128, b: 128, alpha: 1 },
    },
  })
    .png()
    .toBuffer();
  const gamma = Buffer.alloc(4);
  gamma.writeUInt32BE(100000);
  const chromaticities = Buffer.alloc(32);
  [31270, 32900, 64000, 33000, 30000, 60000, 15000, 6000].forEach((value, index) => {
    chromaticities.writeUInt32BE(value, index * 4);
  });

  for (const [type, data] of [
    ['gAMA', gamma],
    ['cHRM', chromaticities],
    ['sRGB', Buffer.from([1])],
  ]) {
    await t.test(type, async () => {
      const input = Buffer.concat([base.subarray(0, 33), pngChunk(type, data), base.subarray(33)]);
      assert.equal((await sharp(input).metadata()).hasProfile, false);
      for (const convertToWebp of [false, true]) {
        const optimized = await optimizeRasterIcon(input, { convertToWebp });
        assert.equal(optimized.extension, '.png');
        assert.deepEqual(optimized.buffer, input);
      }
    });
  }
});

test('standard sRGB PNGs convert to exact WebP while PNG mode preserves colour chunks', async (t) => {
  const base = await noisyPng();
  const gamma = Buffer.alloc(4);
  gamma.writeUInt32BE(45455);
  const srgbChunk = pngChunk('sRGB', Buffer.from([0]));
  const gammaChunk = pngChunk('gAMA', gamma);
  for (const [name, chunks] of [
    ['sRGB only', [srgbChunk]],
    ['sRGB followed by gamma', [srgbChunk, gammaChunk]],
    ['gamma followed by sRGB', [gammaChunk, srgbChunk]],
  ]) {
    await t.test(name, async () => {
      const input = Buffer.concat([base.subarray(0, 33), ...chunks, base.subarray(33)]);
      const webp = await optimizeRasterIcon(input, { convertToWebp: true });
      assert.equal(webp.extension, '.webp');
      assert.equal((await sharp(webp.buffer).metadata()).format, 'webp');
      assert.deepEqual(await rgba(webp.buffer), await rgba(input));
      const png = await optimizeRasterIcon(input, { convertToWebp: false });
      assert.equal(png.extension, '.png');
      assert.deepEqual(png.buffer, input);
    });
  }
});

test('sRGB exceptions do not bypass protection for other colour metadata', async (t) => {
  const base = await noisyPng();
  const gamma = Buffer.alloc(4);
  gamma.writeUInt32BE(45455);
  const nonstandardGamma = Buffer.alloc(4);
  nonstandardGamma.writeUInt32BE(100000);
  const chromaticities = Buffer.alloc(32);
  [31270, 32900, 64000, 33000, 30000, 60000, 15000, 6000].forEach((value, index) => {
    chromaticities.writeUInt32BE(value, index * 4);
  });
  const srgbChunk = pngChunk('sRGB', Buffer.from([0]));
  for (const [name, chunks] of [
    ['standard gamma without sRGB', [pngChunk('gAMA', gamma)]],
    ['nonstandard gamma with sRGB', [pngChunk('gAMA', nonstandardGamma), srgbChunk]],
    ['chromaticities with sRGB', [srgbChunk, pngChunk('cHRM', chromaticities)]],
    ['relative colorimetric intent', [pngChunk('sRGB', Buffer.from([1]))]],
    ['saturation intent', [pngChunk('sRGB', Buffer.from([2]))]],
    ['absolute colorimetric intent', [pngChunk('sRGB', Buffer.from([3]))]],
  ]) {
    await t.test(name, async () => {
      const input = Buffer.concat([base.subarray(0, 33), ...chunks, base.subarray(33)]);
      for (const convertToWebp of [false, true]) {
        const optimized = await optimizeRasterIcon(input, { convertToWebp });
        assert.equal(optimized.extension, '.png');
        assert.deepEqual(optimized.buffer, input);
      }
    });
  }
});
