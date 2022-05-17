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
 * @param {string} name
 * @param {string|number} prefix
 */
function getIconComponentName(name, prefix) {
  return `Icon${prefix}${dashToCamel(name)}`;
}


/**
 *
 * @param {string} dirName
 * @param {boolean} needPrefix
 * @return {Array<{id: string; dirname: string, filename: string, symbolID: string, componentName: string}>}
 */
function iconsDirMap(dirName, needPrefix=false) {
  return glob.sync(path.join(process.cwd(), `src/svg/${dirName}/*.svg`)).map((iconPath) => {
    const { name } = path.parse(iconPath);

    const sizeMatches = name.match(/_(\d+)$/);
    const size = sizeMatches ? sizeMatches[1] : '';

    const idMatches = name.match(/(\w+?)(_\d+)?$/);
    const id = idMatches ? idMatches[1] : name;

    const prefix = (needPrefix ? dirName : '') + size

    return {
      id: name,
      dirname: dirName,
      filename: name,
      symbolID: (needPrefix ? dirName + '/' : '') + name,
      componentName: getIconComponentName(id, prefix),
    };
  })
}

/**
 * @return {Array<{id: string; dirname: string, filename: string, symbolID: string, componentName: string}>}
 */
function iconsMap() {
  const numberSizedIcons = glob.sync(path.join(process.cwd(), 'src/svg/[0-9][0-9]/*.svg')).map((iconPath) => {
    const match = iconPath.match(/[/|\\](\d\d)[/|\\](.+)_(\d\d)\.svg/);
    if (!match) {
      throw new Error(`Icon path is incorrect: ${iconPath}`);
    }
    const size = match[1];
    const id = match[2];

    return {
      id,
      dirname: size.toString(),
      filename: `${id}_${size}`,
      symbolID: `${id}_${size}`,
      componentName: getIconComponentName(id, size),
    };
  });

  return [
    ...numberSizedIcons,
    ...iconsDirMap('Unsorted'),
    ...iconsDirMap('Paradigm', true)
  ];
}

module.exports = {
  sortArrayAlphabetically,
  dashToCamel,
  iconsMap,
};
