const glob = require('glob');
const path = require('path');
const { dashToCamel, sortArrayAlphabetically } = require('../utils');

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
function createIconsMap(src) {
  const files = sortArrayAlphabetically(glob.sync(path.posix.join(src, `./png/**/*.png`)));

  /**
   * @type {Map<string, IconEntity>}
   */
  const iconsMap = new Map();

  files.forEach((file) => {
    const [icon, dpiFormat] = file.split(path.sep).reverse();

    const match = icon.match(/(([^]+?)(?:_(light|dark))?_([\d]+))\.(\w+)$/);

    if (!match) {
      return;
    }

    let [, name, id, appearance = 'light', size, format] = match;
    size = Number(size);
    name = name.replace(`_${appearance}`, '');

    const dpiType = dpiFormat.split('-').pop();

    const iconEntity = iconsMap.get(name) || {
      id,
      name,
      size,
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
  return `RasterIcon${dashToCamel(name.replace(/([^]+)_([\d]+)$/, '$2_$1'))}`;
}

module.exports = {
  createIconsMap,
};
