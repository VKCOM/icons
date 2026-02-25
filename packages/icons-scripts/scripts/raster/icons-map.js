import * as fs from 'node:fs';
import * as path from 'node:path';
import * as glob from 'glob';
import { imageSize } from 'image-size';
import { dashToCamel, sortArrayAlphabetically } from '../utils.js';

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
 * @param {string} src
 */
export function createIconsMap(src) {
  const files = sortArrayAlphabetically(glob.sync(path.posix.join(src, `./png/**/*.png`)));

  /**
   * @type {Map<string, IconEntity>}
   */
  const iconsMap = new Map();

  files.forEach((file) => {
    const [icon, dpiFormat] = file.split(path.sep).reverse();

    const match = icon.match(/(([\s\S]+?)(?:_(light|dark))?_([\d]+))(w|h)?\.(\w+)$/);

    if (!match) {
      return;
    }

    let [, name, id, appearance = 'light', size, _dimensions, format] = match;
    size = Number(size);
    name = name.replace(`_${appearance}`, '');

    const dpiType = dpiFormat.split('-').pop();

    // FIXME: async
    const buffer = fs.readFileSync(file);
    const dimensions = imageSize(buffer);

    const iconEntity = iconsMap.get(name) || {
      id,
      name,
      size,
      width: dimensions.width,
      height: dimensions.height,
      dirname: `${format}${path.sep}${size}`,
      componentName: getIconComponentName(name),
    };

    iconEntity[appearance] ||= {};
    iconEntity[appearance][dpiType] = file;

    iconsMap.set(name, iconEntity);
  });

  return iconsMap;
}

/**
 * @param {string} name
 * @return {string}
 */
function getIconComponentName(name) {
  return `RasterIcon${dashToCamel(name.replace(/([\s\S]+)_([\d]+)$/, '$2_$1'))}`;
}
