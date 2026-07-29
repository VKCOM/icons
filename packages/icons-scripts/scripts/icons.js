import * as fs from 'node:fs';
import * as path from 'node:path';
import { performance } from 'node:perf_hooks';
import * as swc from '@swc/core';
import * as glob from 'glob';
import { createIconsMap } from './icons-map.js';
import { optimize } from './optimize.js';
import { prepareOptions } from './options.js';
import { createReactIcon } from './output/index.js';
import { generateRasterIcons } from './raster/icons.js';
import { debugError, debugInfo, sortArrayAlphabetically } from './utils.js';

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

    const fileName = `${id}${size ? `_${size}` : ''}`;

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
      base64: Buffer.from(addPreviewBackground(icon.content)).toString('base64'),
    });

    const exportName = componentName;

    // Записываем компонент в файл
    const iconDir = path.join(tsFilesDirectory, dirname);
    if (!fs.existsSync(iconDir)) {
      fs.mkdirSync(iconDir);
    }

    fs.writeFileSync(path.join(iconDir, `${fileName}.tsx`), reactSource);

    if (!isSubcomponent) {
      exportsMap[exportName] = `./${dirname}/${fileName}`;
    }
  };

  const compile = async () => {
    const swcrcPath = path.resolve(import.meta.dirname, './configs/.swcrc');
    if (!fs.existsSync(swcrcPath)) {
      debugError('swc config not found');
    }

    debugInfo('Running swc...');

    const swcOptions = JSON.parse(fs.readFileSync(swcrcPath, 'utf8'));

    // При программном вызове `jsc.baseUrl` должен быть абсолютным путём
    // (CLI резолвил его относительно .swcrc сам — @swc/core этого не делает).
    const configDir = path.dirname(swcrcPath);
    if (swcOptions.jsc?.baseUrl) {
      swcOptions.jsc.baseUrl = path.resolve(configDir, swcOptions.jsc.baseUrl);
    }

    // `--strip-leading-paths`: убираем ведущий `./` из относительного пути,
    // сохраняя структуру каталогов из tsFilesDirectory внутри distDirectory.
    const transformOptions = {
      ...swcOptions,
      filename: 'icon.tsx',
      swcrc: false,
      isModule: true,
    };

    const entries = await glob.glob(`${tsFilesDirectory}/**/*.{ts,tsx,js,jsx,mjs,es,es6}`, {
      nodir: true,
    });

    await Promise.all(
      entries.map(async (file) => {
        const relativePath = path.relative(tsFilesDirectory, file);
        const ext = path.extname(file);
        const outPath = path.join(distDirectory, relativePath);
        const outJsPath = `${outPath.slice(0, -ext.length)}.js`;

        const { code, output } = await swc.transformFile(file, transformOptions);

        await fs.promises.mkdir(path.dirname(outJsPath), { recursive: true });
        await fs.promises.writeFile(outJsPath, code);

        // emitIsolatedDts возвращает декларации в `output` как JSON-обёртку
        // `{"__swc_isolated_declarations__":"..."}` — разворачиваем её,
        // как это делает @swc/cli (см. compile.js).
        if (!output) {
          return;
        }

        const dts = JSON.parse(output)?.__swc_isolated_declarations__;
        if (!dts) {
          return;
        }

        const outDtsPath = `${outPath.slice(0, -ext.length)}.d.ts`;
        await fs.promises.writeFile(outDtsPath, dts);
      }),
    );

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

/**
 * Добавляет белый фон со скруглением 4px для предпросмотра в документации.
 *
 * Иконки используют `currentColor` и прозрачный фон, поэтому на тёмной теме
 * или в markdown-предпросмотре они могут быть не видны — кладём белый rect.
 * `currentColor` заменяется на чёрный, чтобы на белом фоне иконка всегда
 * была видна. Скругление задаётся через `rx`, а контент иконки обрезается
 * по тому же скруглённому прямоугольнику через `clipPath`, чтобы углы не
 * выступали за фон.
 *
 * @param {string} svg
 * @return {string}
 */
const PREVIEW_BG_RADIUS = 4;
const PREVIEW_CLIP_ID = 'preview-bg';

function addPreviewBackground(svg) {
  const rect = `<rect width="100%" height="100%" rx="${PREVIEW_BG_RADIUS}" fill="white"/>`;
  const clipPath = `<clipPath id="${PREVIEW_CLIP_ID}"><rect width="100%" height="100%" rx="${PREVIEW_BG_RADIUS}"/></clipPath>`;

  return svg
    .replace(
      /<svg\b[^>]*>/,
      (match) => `${match}${clipPath}${rect}<g clip-path="url(#${PREVIEW_CLIP_ID})">`,
    )
    .replace(/<\/svg>\s*$/, '</g></svg>')
    .replaceAll('currentColor', 'black');
}
