const fs = require('fs');
const path = require('path');
const SVGO = require('svgo');
const rimraf = require('rimraf');
const { iconsMap } = require('./utils/icons');
const symbol = require('./utils/symbol');
const { transformFile, transform } = require('./utils/babel');

console.log('generating icons...');

const cwd = process.cwd();
const DIST_FOLDER = 'dist';

const svgo = new SVGO({
  removeViewBox: false,
});

const icons = iconsMap();

// Готовим директорию
if (!fs.existsSync(path.join(cwd, DIST_FOLDER))) {
  fs.mkdirSync(path.join(cwd, DIST_FOLDER));
} else {
  rimraf.sync(`${path.join(cwd, DIST_FOLDER, '*')}`);
}

// Собираем файл с инстансом спрайта
transformFile({
  path: path.join(cwd, 'src/sprite.js'),
  outputPath: path.join(cwd, DIST_FOLDER, 'sprite.js'),
});

// Собираем компонент иконки
transformFile({
  path: path.join(cwd, 'src/SvgIcon.js'),
  outputPath: path.join(cwd, DIST_FOLDER, 'SvgIcon.js'),
});

// Собираем иконки
const promises = icons.map(({ id, size }) => {
  // Берем svg-файл
  const svg = fs.readFileSync(path.join(cwd, `src/svg/${size}/${id}_${size}.svg`), 'utf-8');
  return svgo.optimize(svg).then(({ data }) => { // Ужимаем содержимое
    return data;
  }).then((content) => {
    return symbol({ content, id: `${id}_${size}` }); // Превращаем svg-файл в js-файл в виде строки
  }).then((es6) => {
    return transform(es6); // Проходимся по файлу бабелем
  }).then((result) => {
    // Кладем полученную строку в файл в DIST_FOLTER
    const iconDir = path.join(cwd, DIST_FOLDER, size);
    if (!fs.existsSync(iconDir)) {
      fs.mkdirSync(iconDir);
    }
    fs.writeFileSync(path.join(iconDir, `${id}.js`), result);
    fs.copyFileSync(path.join(cwd, 'src/declaration.d.ts'), path.join(iconDir, `${id}.d.ts`));
  });
});

Promise.all(promises).then(() => {
  console.log(`icons successfully generated in ${DIST_FOLDER}!`);
});
