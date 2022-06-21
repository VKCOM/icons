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
 * @param {string} src
 * @param {string} pattern
 * @param {string} [prefix]
 * @return {Icon[]}
 */
function dirMap(src, pattern, prefix = '') {
  const files = glob.sync(path.join(src, `./svg/${pattern}/*.svg`));

  return sortArrayAlphabetically(files).map((iconPath) => {
    const { name, dir } = path.parse(iconPath);

    const dirname = dir.split(path.sep).pop();

    const sizeMatches = name.match(/_(\d+)$/);
    const size = sizeMatches ? sizeMatches[1] : '';

    const idMatches = name.match(/(\w+?)(_\d+)?$/);
    const id = idMatches ? idMatches[1] : name;

    return {
      id,
      dirname,
      filename: name,
      componentName: getIconComponentName(id, prefix + size),
    };
  });
}

/**
 *
 * @param {string} src
 * @param {string[]} extraCategories
 * @return {Icon[]}
 */
function createIconsMap(src, extraCategories = []) {
  return [
    ...dirMap(src, '[0-9][0-9]'),
    ...extraCategories.map((category) => dirMap(src, category)).flat(),
  ];
}

module.exports = {
  getIconComponentName,
  createIconsMap,
};
