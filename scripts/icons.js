const fs = require('fs');
const path  = require('path');
const { iconsMap } = require('./utils/icons');
const symbol = require('./utils/symbol');
const SVGO = require('svgo');
const babel = require('@babel/core');
const rimraf = require('rimraf');

console.log('generating icons...');

const cwd = process.cwd();
const DIST_FOLDER = 'dist';

const svgo = new SVGO({
  removeViewBox: false
});

const icons = iconsMap();

// Готовим директорию
if (!fs.existsSync(path.join(cwd, DIST_FOLDER))) {
  fs.mkdirSync(path.join(cwd, DIST_FOLDER))
} else {
  rimraf.sync(`${path.join(cwd, DIST_FOLDER, '*')}`);
}

// Собираем файл с инстансом спрайта
babel.transformFile(path.join(cwd, 'src/sprite.js'), {
  configFile: path.resolve(cwd, 'scripts/utils', 'babel.icons.js')
}, (err, result) => {
  fs.writeFileSync(path.join(cwd, DIST_FOLDER, 'sprite.js'), result.code);
});

// Собираем иконки
const promises = icons.map(({ id, size }) => {
  const svg = fs.readFileSync(path.join(cwd, `src/svg/${size}/${id}_${size}.svg`), 'utf-8');
  return svgo.optimize(svg).then(({ data }) => {
    return data
  }).then((content) => {
    return symbol({ content, id: `${id}_${size}` })
  }).then((es6) => {
    return new Promise((resolve) => {
      babel.transform(es6, {
        configFile: path.resolve(cwd, 'scripts/utils', 'babel.icons.js')
      }, (err, result) => resolve(result.code));
    });
  }).then((result) => {
    const dirPath = path.join(cwd, DIST_FOLDER, size);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath)
    }
    fs.writeFileSync(path.join(dirPath, `${id}.js`), result);
  })
});

Promise.all(promises).then(() => {
  console.log(`icons successfully generated in ${DIST_FOLDER}!`);
});
