const { createIconsMap } = require('./icons-map');

/**
 *
 * @param {string[]} icons
 * @param {string} src
 */
function generateRasterIcons(icons, src) {
  const iconsMap = createIconsMap(icons, src);

  console.log(iconsMap);
}

module.exports = {
  generateRasterIcons,
};
