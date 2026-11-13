import * as fs from 'node:fs/promises';
import optimizePng, { init as initOxipng } from '@jsquash/oxipng/optimise.js';
import sharp from 'sharp';

let oxipngReady;

const protectedPngChunks = new Set(['acTL', 'iCCP', 'cHRM', 'cICP', 'mDCV', 'cLLI']);

/**
 * @param {Buffer} input
 * @param {{convertToWebp?: boolean}} [options]
 * @returns {Promise<{buffer: Buffer, extension: string}>}
 */
export async function optimizeRasterIcon(input, { convertToWebp = false } = {}) {
  const image = sharp(input);
  const metadata = await image.metadata();
  // libvips reads only the first APNG frame and does not expose its page count.
  // RGBA equality alone cannot verify colour metadata or EXIF orientation.
  if (
    metadata.depth !== 'uchar' ||
    (metadata.pages ?? 1) !== 1 ||
    metadata.hasProfile ||
    metadata.orientation ||
    hasProtectedPngChunks(input, convertToWebp)
  ) {
    return { buffer: input, extension: '.png' };
  }

  if (convertToWebp) {
    const webp = await image
      .clone()
      .webp({ lossless: true, effort: 6, quality: 100, exact: true })
      .toBuffer();
    return { buffer: webp, extension: '.webp' };
  }

  const original = await image.clone().ensureAlpha().raw().toBuffer();
  const pngOptions = { compressionLevel: 9, adaptiveFiltering: true };
  let png = input;
  const compressed = await image.clone().png(pngOptions).toBuffer();
  if (compressed.length < png.length && (await preservesPixels(compressed, original))) {
    png = compressed;
  }
  if (fitsPalette(original)) {
    const palette = await image
      .clone()
      .png({ ...pngOptions, palette: true, quality: 100, effort: 10, dither: 0 })
      .toBuffer();
    // Palette quantisation can change samples even at quality 100.
    if (palette.length < png.length && (await preservesPixels(palette, original))) {
      png = palette;
    }
  }

  const optimized = await optimizePngLosslessly(png);
  if (optimized.length < png.length && (await preservesPixels(optimized, original))) {
    png = optimized;
  }
  return { buffer: png, extension: '.png' };
}

/** @param {Buffer} input */
async function optimizePngLosslessly(input) {
  // Read WASM from the installed package; Node's fetch does not support file: URLs.
  oxipngReady ||= fs
    .readFile(new URL(import.meta.resolve('@jsquash/oxipng/codec/pkg/squoosh_oxipng_bg.wasm')))
    .then(initOxipng);
  await oxipngReady;
  return Buffer.from(
    await optimizePng(input, { level: 4, interlace: false, optimiseAlpha: false }),
  );
}

/** @param {Buffer} rgba */
function fitsPalette(rgba) {
  const colors = new Set();
  for (let offset = 0; offset < rgba.length; offset += 4) {
    colors.add(rgba.readUInt32LE(offset));
    if (colors.size > 256) {
      return false;
    }
  }
  return true;
}

/**
 * @param {Buffer} input
 * @param {Buffer} original
 */
async function preservesPixels(input, original) {
  const decoded = await sharp(input).ensureAlpha().raw().toBuffer();
  return decoded.equals(original);
}

/**
 * @param {Buffer} input
 * @param {boolean} allowStandardSrgb
 */
function hasProtectedPngChunks(input, allowStandardSrgb) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  if (!input.subarray(0, signature.length).equals(signature)) {
    return false;
  }

  let hasSrgb = false;
  let hasGamma = false;
  // Inspect chunk headers rather than matching pixel or metadata bytes.
  for (let offset = signature.length; offset + 12 <= input.length; ) {
    const length = input.readUInt32BE(offset);
    const type = input.toString('ascii', offset + 4, offset + 8);
    if (length > input.length - offset - 12) {
      return true;
    }
    // Unprofiled WebP uses sRGB. Only discard an explicit standard sRGB
    // declaration with perceptual intent and its optional fallback gamma.
    if (type === 'sRGB') {
      if (!allowStandardSrgb || hasSrgb || length !== 1 || input[offset + 8] !== 0) {
        return true;
      }
      hasSrgb = true;
    }
    if (type === 'gAMA') {
      if (
        !allowStandardSrgb ||
        hasGamma ||
        length !== 4 ||
        input.readUInt32BE(offset + 8) !== 45455
      ) {
        return true;
      }
      hasGamma = true;
    }
    if (protectedPngChunks.has(type)) {
      return true;
    }
    if (type === 'IEND') {
      break;
    }
    offset += length + 12;
  }
  // A gamma value alone does not specify the sRGB primaries or transfer curve.
  return hasGamma && !hasSrgb;
}
