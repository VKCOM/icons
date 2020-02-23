const fs = require('fs');
const path = require('path');

/**
 * Переносит файл с тайпингами по указанному пути.
 * @param destinationPath
 */
function createTypes(destinationPath) {
  fs.copyFileSync(
    path.resolve(__dirname, 'types.d.ts'),
    path.resolve(destinationPath, 'types.d.ts'),
  );
}

/**
 * Генерирует index.d.ts и записывает в файл.
 * @param componentNames
 * @param destinationPath
 */
function createIndex(componentNames, destinationPath) {
  const content = componentNames
    .sort((a, b) => a.localeCompare(b))
    .reduce((acc, componentName) => {
    return acc + `export { default as ${componentName} } from './${componentName}';\n`;
  }, `export * from './types';\n`);

  fs.writeFileSync(path.resolve(destinationPath, 'index.d.ts'), content);
}

/**
 * Генерирует тайпинг для компонента и записывает в файл.
 * @param name
 * @param destinationPath
 * @param compatibility
 */
function createComponentType(name, destinationPath, compatibility) {
  const typesSource = compatibility ? '../types' : './types';
  const content = `import { TSvgIcon } from '${typesSource}';
declare const ${name}: TSvgIcon;
export default ${name};`;

  fs.writeFileSync(destinationPath, content);
}

exports.createTypes = createTypes;
exports.createIndex = createIndex;
exports.createComponentType = createComponentType;
