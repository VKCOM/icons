const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');
const rimraf = require('rimraf');
const { execSync } = require('child_process');
const { debugInfo, debugError, sortArrayAlphabetically } = require('./utils');
const { createIconsMap } = require('./icons-map');
const { prepareOptions } = require('./options');
const { optimize } = require('./optimize');
const { createReactIcon } = require('./output');
const { generateRasterIcons } = require('./raster/icons');

/**
 * @typedef {import('./options').GenerateOptions} GenerateOptions
 * @param {GenerateOptions} options
 */
function generateIcons(options) {
  const {
    srcDirectory,
    distDirectory,
    tsFilesDirectory,
    extraCategories,
    svgoPlugins,
    deprecatedIcons,
    rasterIcons,
  } = prepareOptions(options);

  debugInfo('Generating icons...');
  const start = performance.now();

  if (rasterIcons?.length) {
    generateRasterIcons(rasterIcons, srcDirectory);
  }

  debugInfo('Preparing directories...');
  [distDirectory, tsFilesDirectory].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    } else {
      rimraf.sync(path.join(dir, '*'));
    }
  });

  const exportsMap = {};

  debugInfo('Creating icons map...');
  createIconsMap(srcDirectory, extraCategories, '', deprecatedIcons, (content) => {
    return optimize(content, svgoPlugins);
  })
    .then((iconsMap) => {
      debugInfo(`Writing ${iconsMap.length} components...`);

      iconsMap.forEach((icon) => {
        const {
          id,
          symbolId,
          viewBox,
          symbol,
          componentName,
          deprecated,
          replacement,
          width,
          height,
          dirname,
          size,
        } = icon;

        // Превращаем svg-файл в ts-файл в виде строки
        const reactSource = createReactIcon({
          id: symbolId,
          viewBox,
          content: symbol,
          componentName,
          deprecated,
          replacement,
          width,
          height,
        });

        const exportName = componentName;

        // Записываем компонент в файл
        const iconDir = path.join(tsFilesDirectory, dirname);
        if (!fs.existsSync(iconDir)) {
          fs.mkdirSync(iconDir);
        }

        const fileName = `${id}${size ? `_${size}` : ''}`;
        fs.writeFileSync(path.join(iconDir, `${fileName}.ts`), reactSource);
        exportsMap[exportName] = `./${dirname}/${fileName}`;
      });

      debugInfo('Creating index.ts file with exports');
      createIndexExports(exportsMap, tsFilesDirectory);

      fs.writeFileSync(
        path.resolve(distDirectory, 'icons-map.json'),
        JSON.stringify(
          iconsMap.map((icon) => {
            const copy = { ...icon };

            // Удаляем лишние данные, они не нужны в документации
            delete copy.content;
            delete copy.symbol;

            return copy;
          }),
        ),
      );

      return compile();
    })
    .then(() => {
      const time = Math.ceil(performance.now() - start);
      debugInfo(`Icons successfully generated to ${distDirectory} in ${time}ms!`);
    })
    .catch((e) => {
      if (e.output) {
        e.output = String(e.output);
      }

      if (e.stdout) {
        e.stdout = String(e.stdout);
      }

      if (e.stderr) {
        e.stderr = String(e.stderr);
      }

      debugError(e);
    });

  const compile = async () => {
    const swcConfig = path.resolve(__dirname, './configs/.swcrc');
    if (!fs.existsSync(swcConfig)) {
      debugError('swc config not found');
    }

    debugInfo('Running swc commonjs...');
    execSync(
      `swc ${tsFilesDirectory} -d ${distDirectory}/ --config-file ${swcConfig} -C module.type=commonjs`,
    );

    debugInfo('Running swc es6...');
    execSync(`swc ${tsFilesDirectory} -d ${distDirectory}/es6/ --config-file ${swcConfig}`);

    debugInfo('Running tsc...');
    execSync(
      `tsc ${tsFilesDirectory}/**/*.ts ${tsFilesDirectory}/*.ts --emitDeclarationOnly --declaration --outDir ${distDirectory}/typings --jsx react --esModuleInterop --lib "dom,es2015"`,
    );
  };
}

/**
 * @param {Record<string, string>} exportsMap
 * @param {string} dir
 */
function createIndexExports(exportsMap, dir) {
  // TODO: v3 Удалить
  const exported = [`export { IconSettingsProvider } from '@vkontakte/icons-sprite';`];

  const keys = Object.keys(exportsMap);
  if (!keys) {
    return;
  }

  sortArrayAlphabetically(Object.keys(exportsMap)).forEach((exportName) => {
    const importSource = exportsMap[exportName];
    exported.push(`export { ${exportName} } from '${importSource}';`);
  });

  const code = exported.join('\n');
  fs.writeFileSync(path.join(dir, 'index.ts'), code);
}

module.exports = { generateIcons };
