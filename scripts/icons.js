const fs = require('fs');
const path = require('path');
const SVGO = require('svgo');
const rimraf = require('rimraf');
const { iconsMap, sortArrayAlphabetically } = require('./utils/icons');
const symbol = require('./utils/symbol');

console.log('generating icons...');

const cwd = process.cwd();

const DIST_FOLDER = 'dist';
const TMP_FOLDER = 'tmp';

const svgo = new SVGO({
  removeViewBox: false,
});

const icons = iconsMap();

// Готовим директории
[DIST_FOLDER, TMP_FOLDER].forEach((dir) => {
  if (!fs.existsSync(path.join(cwd, dir))) {
    fs.mkdirSync(path.join(cwd, dir));
  } else {
    rimraf.sync(path.join(cwd, dir, '*'));
  }
});

// Копируем файл с инстансом спрайта
fs.copyFileSync(path.resolve(cwd, 'src/sprite.ts'), path.join(TMP_FOLDER, 'sprite.ts'));

// Копируем компонент иконки
fs.copyFileSync(path.resolve(cwd, 'src/SvgIcon.tsx'), path.join(TMP_FOLDER, 'SvgIcon.tsx'));

// Копируем контекст настроек
fs.copyFileSync(path.resolve(cwd, 'src/IconSettings.tsx'), path.join(TMP_FOLDER, 'IconSettings.tsx'));

const indexExportsMap = {};

// Собираем иконки
const promises = icons.map(({ id, dirname, filename, componentName }) => {
  // Берем svg-файл
  const svg = fs.readFileSync(path.join(cwd, `src/svg/${dirname}/${filename}.svg`), 'utf-8');
  return svgo.optimize(svg).then(({ data }) => { // Ужимаем содержимое
    return data;
  }).then((content) => {
    return symbol({ content, id: filename, componentName }); // Превращаем svg-файл в ts-файл в виде строки
  }).then((result) => {
    // Кладем полученную строку в файл в DIST_FOLTER
    const iconDir = path.join(cwd, TMP_FOLDER, dirname);
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
  fs.writeFileSync(path.resolve(TMP_FOLDER, 'index.ts'), code);
}

Promise.all(promises).then(() => {
  createIndexExports();

  console.log(`icons successfully generated in ${DIST_FOLDER}!`);
});
