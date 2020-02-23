const glob = require('glob');
const fs = require('fs');
const path = require('path');

/**
 * @return {*}
 */
function iconsMap() {
  return glob.sync(path.join(process.cwd(), 'src/svg/**/*.svg')).map((iconPath) => {
    const match = iconPath.match(/\/(\d\d)\/(.+)_(\d\d)\.svg/);
    const size = match[1];
    const id = match[2];
    return {id, size};
  });
}

/**
 * Возвращает текст с первой большой буквой.
 * @param value
 */
function capitalize(value) {
  return value[0].toUpperCase() + value.slice(1);
}

/**
 * Конвертирует название иконки в имя комопнента на React.
 * @param svgName
 */
function toReactComponentName(svgName) {
  return svgName.split('_').map(capitalize).join('');
}

/**
 * Генерирует index.js и записывает в файл.
 * @param componentNames
 * @param destinationPath
 */
function createIndex(componentNames, destinationPath) {
  const content = componentNames
    .sort((a, b) => a.localeCompare(b))
    .reduce((acc, componentName) => {
      return acc + `export { default as ${componentName} } from './${componentName}';\n`;
    }, '');

  fs.writeFileSync(path.resolve(destinationPath, 'index.js'), content);
}

exports.createIndex = createIndex;
exports.toReactComponentName = toReactComponentName;
exports.iconsMap = iconsMap;
