import * as fs from 'node:fs';
import * as path from 'node:path';
import * as glob from 'glob';
import { dashToCamel, sortArrayAlphabetically } from '../utils.js';
import { optimizeRasterIcon } from './optimize.js';

/**
 * @typedef {Object} IconEntity
 * @property {string} id
 * @property {string} name
 * @property {string} componentName
 * @property {number} size
 * @property {string} dirname
 * @property {DensityBucketSet} [light]
 * @property {DensityBucketSet} [dark]
 */

/**
 * Create a raster icon map using the original PNG paths.
 * Kept synchronous for compatibility with existing consumers.
 * @param {string} src
 * @returns {Map<string, IconEntity>}
 */
export function createRasterIconsMap(src) {
  const iconsMap = new Map();
  for (const file of getRasterFiles(src)) {
    const entry = getRasterEntry(file);
    if (!entry) continue;
    const { name, id, size, appearance, dpiType, format } = entry;
    const iconEntity = iconsMap.get(name) || createIconEntity(name, id, size, format);
    iconEntity[appearance] ||= {};
    iconEntity[appearance][dpiType] = file;
    iconsMap.set(name, iconEntity);
  }
  return iconsMap;
}

/**
 * Create a raster icon map and write optimized raster assets.
 * @param {string} src
 * @param {string} [outputDirectory] Directory for optimized raster assets.
 * @param {{convertToWebp?: boolean}} [options]
 * @returns {Promise<Map<string, IconEntity>>}
 */
export async function createRasterIconsMapAsync(
  src,
  outputDirectory = path.join(src, '.cache/raster'),
  options = {},
) {
  const iconsMap = new Map();
  for (const file of getRasterFiles(src)) {
    const entry = getRasterEntry(file);
    if (!entry) continue;
    const { name, id, size, appearance, dpiType, format } = entry;
    const iconEntity = iconsMap.get(name) || createIconEntity(name, id, size, format);
    iconEntity[appearance] ||= {};
    iconEntity[appearance][dpiType] = await writeRasterIcon(file, src, outputDirectory, options);
    iconsMap.set(name, iconEntity);
  }
  return iconsMap;
}

function getRasterFiles(src) {
  return sortArrayAlphabetically(glob.sync(path.posix.join(src, './png/**/*.png')));
}

function getRasterEntry(file) {
  const [icon, dpiFormat] = file.split(path.sep).reverse();
  const match = icon.match(/(([\s\S]+?)(?:_(light|dark))?_([\d]+))(w|h)?\.(\w+)$/);
  if (!match) return null;
  let name = match[1];
  const id = match[2];
  const appearance = match[3] || 'light';
  const size = Number(match[4]);
  const format = match[6];
  name = name.replace(`_${appearance}`, '');
  return { name, id, size, appearance, format, dpiType: dpiFormat.split('-').pop() };
}

function createIconEntity(name, id, size, format) {
  return {
    id,
    name,
    size,
    width: size,
    height: size,
    dirname: `${format}${path.sep}${size}`,
    componentName: getIconComponentName(name),
  };
}

/**
 * Write one optimized image in the requested format, preserving decoded RGBA samples.
 * @param {string} file
 * @param {string} src
 * @param {string} outputDirectory
 * @param {{convertToWebp?: boolean}} options
 * @returns {Promise<string>}
 */
async function writeRasterIcon(file, src, outputDirectory, options) {
  const input = await fs.promises.readFile(file);
  const { buffer, extension } = await optimizeRasterIcon(input, options);
  const relativePath = path.relative(path.join(src, 'png'), file);
  const outputPath = path.join(outputDirectory, relativePath.replace(/\.png$/, extension));
  await fs.promises.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.promises.writeFile(outputPath, buffer);
  return outputPath;
}

/** @param {string} name */
function getIconComponentName(name) {
  return `RasterIcon${dashToCamel(name.replace(/([\s\S]+)_([\d]+)$/, '$2_$1'))}`;
}
