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
const Compiler = require('svg-baker');

const compiler = new Compiler();

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
    cwd,
    svgoPlugins,
    onIconProcess,
    deprecatedIcons,
  } = prepareOptions(options);

  debugInfo('Generating icons...');
  const start = performance.now();

  debugInfo('Preparing directories...');
  [distDirectory, tsFilesDirectory].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    } else {
      rimraf.sync(path.join(dir, '*'));
    }
  });

  debugInfo('Creating icons map...');
  const iconsMap = createIconsMap(srcDirectory, extraCategories, '', deprecatedIcons);

  const exportsMap = {};

  debugInfo(`Optimizing and writing ${iconsMap.length} components...`);
  const promises = iconsMap.map(async (icon) => {
    const {
      id,
      dirname,
      filename,
      filepath,
      componentName,
      deprecated,
      replacement,
      content: contentInitial,
    } = icon;

    const content = optimize(contentInitial, svgoPlugins);
    const symbol = await compiler.addSymbol({ content, id: filename, path: '' });

    const viewBox = symbol.viewBox;
    const width = viewBox.split(' ')[2];
    const height = viewBox.split(' ')[3];

    onIconProcess({
      id,
      dirname,
      filename,
      filepath,
      componentName,
      deprecated,
      replacement,
      viewBox,
      width,
      height,
      content,
    });

    const exportName = componentName;

    // Превращаем svg-файл в ts-файл в виде строки
    return createReactIcon({
      id: symbol.id,
      viewBox: symbol.viewBox,
      content: symbol.render(),
      componentName,
      deprecated,
      replacement,
      width,
      height,
    }).then((result) => {
      // Записываем компонент в файл
      const iconDir = path.join(tsFilesDirectory, dirname);
      if (!fs.existsSync(iconDir)) {
        fs.mkdirSync(iconDir);
      }

      fs.writeFileSync(path.join(iconDir, `${id}.ts`), result);
      exportsMap[exportName] = `./${dirname}/${id}`;
    });
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
    // const tsBuildInfoFile = path.resolve(cwd, 'node_modules', '.cache', '.tsbuildinfo');
    // --incremental --tsBuildInfoFile ${tsBuildInfoFile}

    execSync(
      `tsc ${tsFilesDirectory}/**/*.ts ${tsFilesDirectory}/*.ts --emitDeclarationOnly --declaration --outDir ${distDirectory}/typings --jsx react --esModuleInterop --lib "dom,es2015"`,
    );
  };

  Promise.all(promises)
    .then(() => {
      debugInfo('Creating index.ts file with exports');
      createIndexExports(exportsMap, tsFilesDirectory);

      return compile();
    })
    .then(() => {
      fs.writeFileSync(path.resolve(distDirectory, 'icons-map.json'), JSON.stringify(iconsMap));

      debugInfo(
        `Icons successfully generated to ${distDirectory} in ${Math.ceil(
          performance.now() - start,
        )}ms!`,
      );
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
}

/**
 * @param {Record<string, string>} exportsMap
 * @param {string} dir
 */
function createIndexExports(exportsMap, dir) {
  const exported = [`export { IconSettingsProvider } from '@vkontakte/icons-sprite';`];

  sortArrayAlphabetically(Object.keys(exportsMap)).forEach((exportName) => {
    const importSource = exportsMap[exportName];
    exported.push(`export { ${exportName} } from '${importSource}';`);
  });

  const code = exported.join('\n');
  fs.writeFileSync(path.join(dir, 'index.ts'), code);
}

module.exports = { generateIcons };
