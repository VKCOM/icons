const glob = require('glob');
const path = require('path');
const fs = require('fs');
const Compiler = require('svg-baker');
const { dashToCamel, sortArrayAlphabetically, longestCommonPrefix } = require('./utils');

/**
 * @typedef {Object} Icon
 * @property {string} id
 * @property {string} size
 * @property {string} prefix
 * @property {string} dirname
 * @property {string} filename
 * @property {string} filepath
 * @property {string} componentName
 * @property {string} content
 * @property {Icon[]} subcomponents
 * @property {boolean} [isSubcomponent]
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
  const files = sortArrayAlphabetically(glob.sync(path.posix.join(src, `./svg/${pattern}/*.svg`)));

  const { common, parts } = files
    .map((filepath) => {
      const { name, dir } = path.parse(filepath);
      const content = fs.readFileSync(filepath, 'utf-8');

      const dirname = dir.split(path.sep).pop();

      const [id, size] = getIconIdAndSize(name);

      const deprecated = deprecatedIcons.hasOwnProperty(name);

      return {
        id,
        size,
        content,
        dirname,
        filepath,
        deprecated,
        filename: name,
        componentName: getIconComponentName(id, prefix + size),
        replacement: deprecated
          ? getReplacementIconComponentName(deprecatedIcons[name])
          : undefined,
      };
    })
    .reduce(
      (icons, icon) => {
        if (icon.filename.includes('_part_')) {
          icons.parts.push(icon);
        } else {
          icons.common.push(icon);
        }

        return icons;
      },
      {
        common: [],
        parts: [],
      },
    );

  return common.concat(sortIconsByLongestCommonPrefix(parts));
}

/**
 * Функция для сортировки иконок относительно их сабкомпонентов, логика описана в Readme.md.
 *
 * @param {Icon[]} icons
 */
function sortIconsByLongestCommonPrefix(icons) {
  const prefixes = icons.map(({ filename }, index) => {
    let longestPrefix = filename;

    for (let i = 0; i < icons.length; i++) {
      if (index === i) {
        continue;
      }

      // Отбрасываем часть строки, если у нее нет _ в конце
      const commonPrefix = longestCommonPrefix(filename, icons[i].filename).replace(
        /([^]+_)[^_]+$/,
        '$1',
      );

      if (commonPrefix.length > 0 && commonPrefix.length < longestPrefix.length) {
        longestPrefix = commonPrefix;
      }
    }

    return longestPrefix;
  });

  const prefixGroups = {};

  icons.forEach((icon, index) => {
    const prefix = prefixes[index];
    const sizePrefix = `${icon.size}${prefixes[index]}`;

    icon.prefix = prefix;

    prefixGroups[sizePrefix] ??= [];
    prefixGroups[sizePrefix].push(icon);
  });

  return Object.values(prefixGroups)
    .map((group) =>
      group.sort(({ filename: a }, { filename: b }) => a.length - b.length || a.localeCompare(b)),
    )
    .map((icons) => {
      icons[0].subcomponents = icons.slice(1).map((icon) => {
        icon.isSubcomponent = true;

        return icon;
      });

      return icons[0];
    });
}

/**
 *
 * @typedef {import('./options').DeprecatedIcons} DeprecatedIcons
 * @param {string} src
 * @param {string[]} extraCategories
 * @param {string} [prefix]
 * @param {DeprecatedIcons} [deprecatedIcons]
 * @param {(content: string) => string} [optimizeFn]
 * @return {Icon[]}
 */
async function createIconsMap(
  src,
  extraCategories = [],
  prefix = '',
  deprecatedIcons = {},
  optimizeFn = (content) => content,
) {
  const icons = [
    ...dirMap(src, '[0-9][0-9]', prefix, deprecatedIcons),
    ...extraCategories.map((category) => dirMap(src, category, prefix, deprecatedIcons)).flat(),
  ];

  const compiler = new Compiler();

  const promises = icons.map((icon) => prepareIconMapEntity(compiler, icon, optimizeFn));

  return await Promise.all(promises);
}

/**
 * @param {Compiler} compiler
 * @param {Icon} icon
 * @param {(content: string) => string} [optimizeFn]
 */
async function prepareIconMapEntity(compiler, icon, optimizeFn) {
  const subcomponentsPromises = icon.subcomponents?.map((icon) =>
    prepareIconMapEntity(compiler, icon, optimizeFn),
  );
  const subcomponents = subcomponentsPromises
    ? await Promise.all(subcomponentsPromises)
    : undefined;

  const content = optimizeFn(icon.content);

  const symbol = await compiler.addSymbol({ content, id: icon.filename, path: '' });

  const viewBox = symbol.viewBox;
  const width = viewBox.split(' ')[2];
  const height = viewBox.split(' ')[3];

  return {
    ...icon,
    width,
    height,
    content,
    viewBox,
    subcomponents,
    symbolId: symbol.id,
    symbol: symbol.render(),
  };
}

module.exports = {
  createIconsMap,
};
