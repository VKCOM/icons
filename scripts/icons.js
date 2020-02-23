const fs = require('fs');
const path = require('path');
const SVGO = require('svgo');
const rimraf = require('rimraf');
const {
  iconsMap, toReactComponentName, createIndex: createJSIndex
} = require('./utils/icons');
const {symbol, reactify} = require('./utils/symbol');
const {transformFile, transform} = require('./utils/babel');
const {
  createTypes, createIndex: createTSIndex, createComponentType
} = require('./utils/ts/tools');

console.log('generating icons...');

const cwd = process.cwd();
const DIST_FOLDER = 'dist';
const DIST_PATH = path.join(cwd, DIST_FOLDER);
const SRC_PATH = path.join(cwd, 'src');

const svgo = new SVGO({
  removeViewBox: false
});

const icons = iconsMap();

// Готовим директорию
if (!fs.existsSync(DIST_PATH)) {
  fs.mkdirSync(DIST_PATH);
} else {
  rimraf.sync(`${path.join(DIST_PATH, '*')}`);
}

// Собираем файл с инстансом спрайта
transformFile({
  path: path.join(SRC_PATH, 'sprite.js'),
  outputPath: path.join(DIST_PATH, 'sprite.js')
});

// Собираем компонент иконки
transformFile({
  path: path.join(SRC_PATH, 'SvgIcon.js'),
  outputPath: path.join(DIST_PATH, 'SvgIcon.js')
});

// Переносим файл с тайпингами иконок.
createTypes(DIST_PATH);

// Создаем index файлы.
const componentNames = icons.map(({id, size}) => toReactComponentName(`${id}_${size}`));
createTSIndex(componentNames, DIST_PATH);
createJSIndex(componentNames, DIST_PATH);

// Собираем иконки
const promises = icons.map(({id, size}) => {
  const iconName = `${id}_${size}`;
  const componentName = toReactComponentName(iconName);
  const iconsDir = path.join(DIST_PATH, size);
  const svg = fs.readFileSync(path.join(SRC_PATH, `svg/${size}/${iconName}.svg`), 'utf-8');

  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir);
  }

  return svgo
  // Оптимизируем SVG.
    .optimize(svg)
    // Достаем оптимизированные данные.
    .then(({data}) => data)
    // Создаем символ из SVG.
    .then(content => symbol({content, id: `${id}_${size}`}))
    // Превращаем в React-компонент.
    .then(symbol => reactify(componentName, symbol))
    // Транспилируем в ES5.
    .then(transform)
    // Записываем JS в файл.
    .then(js => {
      // Создаем обратную совместимость c предыдущей версией.
      // FIXME: Fire.js = fire.js
      fs.writeFileSync(path.join(iconsDir, `${id}.js`), js);

      // Создаем файл прямо в дистрибутиве чтобы получать доступ по пути:
      // @vkontakte/icons/Fire12 или @vkontakte/icons/Fire56
      fs.writeFileSync(path.join(DIST_PATH, `${componentName}.js`), js);
    })
    // Создаем тайпинги для компонента.
    .then(() => {
      createComponentType(componentName, path.join(iconsDir, `${id}.d.ts`), true);
      createComponentType(componentName, path.join(DIST_PATH, `${componentName}.d.ts`));
    });
});

Promise.all(promises)
  .then(() => console.log(`icons successfully generated in ${DIST_FOLDER}!`));
