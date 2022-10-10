const glob = require('glob');
const path = require('path');
const { dashToCamel, sortArrayAlphabetically } = require('./utils');

/**
 * @typedef {Object} Icon
 * @property {string} id
 * @property {string} dirname
 * @property {string} filename
 * @property {string} componentName
 */

/**
 * @param {string} name
 * @param {string|number} prefix
 * @return {string}
 */
function getIconComponentName(name, prefix = '') {
  return `Icon${dashToCamel(prefix)}${dashToCamel(name)}`;
}

/**
 * @param {string} name
 * @return {[id: string, size: string]}
 */
function getIconIdAndSize(name) {
  const idMatches = name.match(/(\w+?)(_\d+)?$/);
  const id = idMatches ? idMatches[1] : name;

  const sizeMatches = name.match(/_(\d+)$/);
  const size = sizeMatches ? sizeMatches[1] : '';

  return [id, size];
}

/**
 * @param {string | null} [name]
 * @return {string}
 */
function getReplacementIconComponentName(name) {
  if (!name) {
    return undefined;
  }

  const [id, size] = getIconIdAndSize(name);
  return getIconComponentName(id, size);
}

/**
 * @typedef {import('./options').DeprecatedIcons} DeprecatedIcons
 * @param {string} src
 * @param {string} pattern
 * @param {string} [prefix]
 * @param {DeprecatedIcons} [deprecatedIcons]
 * @return {Icon[]}
 */
function dirMap(src, pattern, prefix = '', deprecatedIcons) {
  const files = glob.sync(path.join(src, `./svg/${pattern}/*.svg`));

  return sortArrayAlphabetically(files).map((iconPath) => {
    const { name, dir } = path.parse(iconPath);

    const dirname = dir.split(path.sep).pop();

    const [id, size] = getIconIdAndSize(name);

    const deprecated = deprecatedIcons.hasOwnProperty(name);

    return {
      id,
      dirname,
      filename: name,
      componentName: getIconComponentName(id, prefix + size),
      deprecated,
      replacement: deprecated ? getReplacementIconComponentName(deprecatedIcons[name]) : undefined,
    }
  });
}

/**
 *
 * @typedef {import('./options').DeprecatedIcons} DeprecatedIcons
 * @param {string} src
 * @param {string[]} extraCategories
 * @param {string} [prefix]
 * @param {DeprecatedIcons} [deprecatedIcons]
 * @return {Icon[]}
 */
function createIconsMap(src, extraCategories = [], prefix = '', deprecatedIcons = {}) {
  return [
    ...dirMap(src, '[0-9][0-9]', prefix, deprecatedIcons),
    ...extraCategories.map((category) => dirMap(src, category, prefix, deprecatedIcons)).flat(),
  ];
}

module.exports = {
  getIconComponentName,
  createIconsMap,
};
