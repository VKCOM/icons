const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const { iconsMap, sortArrayAlphabetically } = require('./utils/icons');
const symbol = require('./utils/symbol');
const { optimize } = require('./optimize');

console.time('Generating icons');

const cwd = process.cwd();

const DIST_FOLDER = 'dist';
const DIST_TS = 'ts';

console.time('Creating icons map');
const icons = iconsMap();
console.timeEnd('Creating icons map');

// Готовим директории
[DIST_FOLDER, DIST_TS].forEach((dir) => {
  if (!fs.existsSync(path.join(cwd, dir))) {
    fs.mkdirSync(path.join(cwd, dir));
  } else {
    rimraf.sync(path.join(cwd, dir, '*'));
  }
});

// Копируем исходные файлы
[
  'src/sprite.ts',
  'src/SvgIcon.tsx',
  'src/IconSettings.tsx',
].forEach((srcFile) => {
  fs.copyFileSync(path.resolve(cwd, srcFile), path.join(DIST_TS, path.basename(srcFile)));
});

const indexExportsMap = {};

// Собираем иконки
const promises = icons.map(({ id, dirname, filename, componentName }) => {
  // Берем svg-файл
  const svg = fs.readFileSync(path.join(cwd, `src/svg/${dirname}/${filename}.svg`), 'utf-8');

  // Превращаем svg-файл в ts-файл в виде строки
  return symbol({
    content: optimize(svg),
    id: filename,
    componentName,
  }).then((result) => {
    // Кладем полученную строку в файл в DIST_FOLTER
    const iconDir = path.join(cwd, DIST_TS, dirname);
    if (!fs.existsSync(iconDir)) {
      fs.mkdirSync(iconDir);
    }
    fs.writeFileSync(path.join(iconDir, `${id}.ts`), result);

    indexExportsMap[componentName] = `./${dirname}/${id}`;
  });
});

function createIndexExports() {
  const exports = [
    `export { IconSettingsProvider } from './IconSettings';`
  ];

  sortArrayAlphabetically(Object.keys(indexExportsMap)).forEach((componentName) => {
    const path = indexExportsMap[componentName];
    exports.push(`export { default as ${componentName} } from '${path}';`);
  });

  const code = exports.join('\n');
  fs.writeFileSync(path.resolve(DIST_TS, 'index.ts'), code);
}

Promise.all(promises).then(() => {
  console.time('Creating index exports');
  createIndexExports();
  console.timeEnd('Creating index exports');

  console.timeEnd('Generating icons');
  console.log(`Icons successfully generated in ${DIST_FOLDER}!`);
});
