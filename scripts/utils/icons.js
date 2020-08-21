const glob = require('glob');
const path = require('path');

function sortArrayAlphabetically(array) {
  return array.sort((a, b) => a.localeCompare(b));
}

/**
 * @param {string} dash
 * @return {string}
 */
function dashToCamel(dash) {
  const dashSplited = dash.split('_');
  return dashSplited.reduce((res, piece) => {
    piece = piece.charAt(0).toUpperCase() + piece.slice(1);
    return res + piece;
  }, '');
}

/**
 *
 * @param {string} id
 * @param {string|number} size
 */
function getIconComponentName(name, size) {
  return `Icon${size}${dashToCamel(name)}`;
}

/**
 * @return {Array<{id: string; size: string, componentName: string}>}
 */
function iconsMap() {
  return glob.sync(path.join(process.cwd(), 'src/svg/**/*.svg')).map((iconPath) => {
    const match = iconPath.match(/\/(\d\d)\/(.+)_(\d\d)\.svg/);
    const size = match[1];
    const id = match[2];
    return { id, size, componentName: getIconComponentName(id, size) };
  });
}

module.exports = {
  sortArrayAlphabetically,
  dashToCamel,
  iconsMap,
};
