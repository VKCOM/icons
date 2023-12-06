const glob = require('glob');
const path = require('path');
const { dashToCamel, sortArrayAlphabetically } = require('../utils');

/**
 * @param {string} name
 * @return {string}
 */
function getIconComponentName(name) {
  return `RasterIcon${dashToCamel(name.replace(/([^]+)_([\d]+)$/, '$2_$1'))}`;
}

/**
 * @typedef {Object} IconEntity
 * @property {string} name
 * @property {string} componentName
 * @property {number} size
 * @property {string} dirname
 * @property {string} [mdpi]
 * @property {string} [hdpi]
 * @property {string} [xhdpi]
 * @property {string} [xxhdpi]
 * @property {string} [xxxhdpi]
 */

/**
 *
 * @param {string[]} icons
 * @param {string} src
 */
function createIconsMap(icons, src) {
  const files = sortArrayAlphabetically(glob.sync(path.join(src, `./png/**/*.png`)));

  /**
   * @type {Map<string, IconEntity>}
   */
  const iconsMap = new Map();

  files.forEach((file) => {
    const [icon, dpiFormat] = file.split(path.sep).reverse();

    if (!icons?.some((allowedIconPrefix) => icon.startsWith(allowedIconPrefix))) {
      return;
    }

    const match = icon.match(/(([^]+?)(?:_(light|dark))?_([\d]+))\.([^]+)$/);

    if (!match) {
      return;
    }

    let [, name, id, theme, size, format] = match;
    size = Number(size);

    const dpiType = dpiFormat.split('-').pop();

    const iconEntity = iconsMap.get(name) || {
      id,
      name,
      size,
      dirname: `${format}${path.sep}${size}`,
      componentName: getIconComponentName(name),
    };

    iconEntity[dpiType] = file;

    iconsMap.set(name, iconEntity);
  });

  return iconsMap;
}

module.exports = {
  createIconsMap,
};
