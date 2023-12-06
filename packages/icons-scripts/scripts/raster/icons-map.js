const glob = require('glob');
const path = require('path');

/**
 * @typedef {Map<string, unknown>} IconsEntities
 */

/**
 * @typedef {Object} IconEntity
 * @property {string} name
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
  const files = glob.sync(path.join(src, `./png/**/*.png`));

  /**
   * @type {Map<number, IconsEntities>}
   */
  const iconsMap = new Map();

  files.forEach((file) => {
    const [icon, dpiFormat] = file.split(path.sep).reverse();

    if (!icons?.some((allowedIconPrefix) => icon.startsWith(allowedIconPrefix))) {
      return;
    }

    const [iconName, iconFormat] = icon.split('.');
    let [iconSize, iconTheme] = iconName.split('_').reverse();
    const dpiType = dpiFormat.split('-').pop();

    iconSize = Number(iconSize);

    if (!iconSize) {
      return;
    }

    let iconsBySize = iconsMap.get(iconSize);

    if (!iconsBySize) {
      iconsBySize = new Map();

      iconsMap.set(iconSize, iconsBySize);
    }

    const iconEntity = iconsBySize.get(iconName) || {
      name: iconName,
      size: iconSize,
      dirname: `${iconFormat}${path.sep}${iconSize}`,
    };

    iconEntity[dpiType] = file;

    iconsBySize.set(iconName, iconEntity);

    return [icon, iconName, iconSize];
  });

  return iconsMap;
}

module.exports = {
  createIconsMap,
};
