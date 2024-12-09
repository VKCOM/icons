import * as fs from 'node:fs';
import * as path from 'node:path';
import { performance } from 'node:perf_hooks';
import * as util from 'node:util';
import * as childProcess from 'node:child_process';
import * as glob from 'glob';
import { debugInfo, debugError, sortArrayAlphabetically } from './utils.js';
import { createIconsMap } from './icons-map.js';
import { prepareOptions } from './options.js';
import { optimize } from './optimize.js';
import { createReactIcon } from './output/index.js';
import { generateRasterIcons } from './raster/icons.js';

const exec = util.promisify(childProcess.exec);

/**
 * @typedef {import('./options').GenerateOptions} GenerateOptions
 * @param {GenerateOptions} options
 */
export function generateIcons(options) {
  const {
    srcDirectory,
    distDirectory,
    tsFilesDirectory,
    extraCategories,
    svgoPlugins,
    deprecatedIcons,
  } = prepareOptions(options);

  debugInfo('Generating icons...');
  const start = performance.now();

  debugInfo('Preparing directories...');
  [distDirectory, tsFilesDirectory].forEach((dir) => {
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
    fs.writeFileSync(path.join(iconDir, `${fileName}.tsx`), reactSource);

    if (!isSubcomponent) {
      exportsMap[exportName] = `./${dirname}/${fileName}`;
    }
  };

  const compile = async () => {
    const swcConfig = path.resolve(import.meta.dirname, './configs/.swcrc');
    if (!fs.existsSync(swcConfig)) {
      debugError('swc config not found');
    }

    debugInfo('Running swc...');

    await Promise.all([
      exec(
        `swc ${tsFilesDirectory} --strip-leading-paths -d ${distDirectory}/ --config-file ${swcConfig}`,
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
  const exported = [`export { IconAppearanceProvider } from '@vkontakte/icons-sprite';`];

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
