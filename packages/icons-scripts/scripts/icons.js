const fs = require('fs');
const path = require('path');
const glob = require('glob');
const { performance } = require('perf_hooks');
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);
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
    distES6Directory,
    tsFilesDirectory,
    extraCategories,
    svgoPlugins,
    deprecatedIcons,
  } = prepareOptions(options);

  debugInfo('Generating icons...');
  const start = performance.now();

  debugInfo('Preparing directories...');
  [distDirectory, distES6Directory, tsFilesDirectory].forEach((dir) => {
    fs.rmSync(dir, {
      force: true,
      recursive: true,
    });
    fs.mkdirSync(dir);
  });

  let exportsMap = {};

  debugInfo('Creating raster icons map...');
  const rasterIconsExportsMap = generateRasterIcons(srcDirectory, tsFilesDirectory);

  exportsMap = {
    ...exportsMap,
    ...rasterIconsExportsMap,
  };

  debugInfo('Creating icons map...');
  createIconsMap(srcDirectory, extraCategories, '', deprecatedIcons, (content) => {
    return optimize(content, svgoPlugins);
  })
    .then((iconsMap) => {
      debugInfo(
        `Writing ${iconsMap.length} vector & ${
          Object.keys(rasterIconsExportsMap).length
        } raster components...`,
      );

      iconsMap.forEach(processIconMapEntity);

      debugInfo('Creating index.ts file with exports');
      createIndexExports(exportsMap, tsFilesDirectory);

      fs.writeFileSync(
        path.resolve(distDirectory, 'icons-map.json'),
        JSON.stringify(
          iconsMap.map((icon) => {
            const copy = { ...icon };

            // Удаляем лишние данные, они не нужны в документации
            delete copy.symbol;
            delete copy.content;
            delete copy.subcomponents;

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
    .catch((error) => {
      if (error.output) {
        error.output = String(error.output);
      }

      if (error.stdout) {
        error.stdout = String(error.stdout);
      }

      if (error.stderr) {
        error.stderr = String(error.stderr);
      }

      debugError(error);
    });

  /**
   * @param {Icon} icon
   */
  const processIconMapEntity = (icon) => {
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
      attrs,
      subcomponents,
      isSubcomponent,
    } = icon;

    subcomponents?.forEach(processIconMapEntity);

    // Превращаем svg-файл в ts-файл в виде строки
    const reactSource = createReactIcon({
      id: symbolId,
      attrs,
      width,
      height,
      viewBox,
      content: symbol,
      componentName,
      deprecated,
      replacement,
      subcomponents,
    });

    const exportName = componentName;

    // Записываем компонент в файл
    const iconDir = path.join(tsFilesDirectory, dirname);
    if (!fs.existsSync(iconDir)) {
      fs.mkdirSync(iconDir);
    }

    const fileName = `${id}${size ? `_${size}` : ''}`;
    fs.writeFileSync(path.join(iconDir, `${fileName}.ts`), reactSource);

    if (!isSubcomponent) {
      exportsMap[exportName] = `./${dirname}/${fileName}`;
    }
  };

  const compile = async () => {
    const swcConfig = path.resolve(__dirname, './configs/.swcrc');
    if (!fs.existsSync(swcConfig)) {
      debugError('swc config not found');
    }

    debugInfo('Running swc...');

    await Promise.all([
      exec(
        `swc ${tsFilesDirectory} --strip-leading-paths -d ${distDirectory}/ --config-file ${swcConfig} -C module.type=commonjs`,
      ),
      exec(
        `swc ${tsFilesDirectory} --strip-leading-paths -d ${distES6Directory}/ --config-file ${swcConfig}`,
      ),
    ]);

    debugInfo('Copy declarations');

    /**
     * Копирует файлы с декларациями в папку distDirectory/typings
     *
     * @param {string} file
     */
    const copyFile = async (file) => {
      const relativePath = path.relative(distDirectory, file);

      await fs.promises.mkdir(path.join(distDirectory, 'typings', path.dirname(relativePath)), {
        recursive: true,
      });
      await fs.promises.copyFile(file, path.join(distDirectory, 'typings', relativePath));
    };

    const matches = await glob.glob(`${distDirectory}/**/*.d.ts`);

    await Promise.all(matches.map(copyFile));
  };
}

/**
 * @param {Record<string, string>} exportsMap
 * @param {string} dir
 */
function createIndexExports(exportsMap, dir) {
  // TODO: v3 Удалить IconSettingsProvider
  const exported = [
    `export { IconSettingsProvider, IconAppearanceProvider } from '@vkontakte/icons-sprite';`,
  ];

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
