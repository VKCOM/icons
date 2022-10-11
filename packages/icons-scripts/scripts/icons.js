const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');
const rimraf = require('rimraf');
const { execSync } = require('child_process');
const {
  debugInfo,
  debugError,
  sortArrayAlphabetically,
} = require('./utils');
const { createIconsMap } = require('./icons-map');
const { prepareOptions } = require('./options');
const { optimize } = require('./optimize');
const { reactifyIcon } = require('./reactify');

/**
 * @typedef {import('./options').GenerateOptions} GenerateOptions
 * @param {GenerateOptions} options
 */
function generateIcons(options) {
  const {
    srcDirectory,
    distDirectory,
    keepTSSources,
    tsFilesDirectory,
    extraCategories,
    cwd,
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

  debugInfo('Copying templates...');
  [
    'src/sprite.ts',
    'src/SvgIcon.tsx',
    'src/IconSettings.tsx',
    'src/warnOnce.ts',
  ].forEach((srcFile) => {
    const scriptsSrc = path.resolve(__dirname, '..');
    fs.copyFileSync(path.resolve(scriptsSrc, srcFile), path.join(tsFilesDirectory, path.basename(srcFile)));
  });

  debugInfo('Creating icons map...');
  const iconsMap = createIconsMap(srcDirectory, extraCategories, '', deprecatedIcons);

  const exportsMap = {};

  debugInfo(`Optimizing and writing ${iconsMap.length} components...`);
  const promises = iconsMap.map((icon) => {
    const { id, dirname, filename, componentName, deprecated, replacement } = icon;

    // Берем svg-файл
    const svg = fs.readFileSync(path.join(cwd, `src/svg/${dirname}/${filename}.svg`), 'utf-8');

    // Превращаем svg-файл в ts-файл в виде строки
    return reactifyIcon({
      content: optimize(svg),
      id: filename,
      componentName,
      deprecated,
      replacement,
    }).then((result) => {
      // Записываем компонент в файл
      const iconDir = path.join(tsFilesDirectory, dirname);
      if (!fs.existsSync(iconDir)) {
        fs.mkdirSync(iconDir);
      }

      fs.writeFileSync(path.join(iconDir, `${id}.ts`), result);
      exportsMap[componentName] = `./${dirname}/${id}`;
    });
  });

  const compile = async () => {
    const swcConfig = path.resolve(__dirname, './configs/.swcrc');
    if (!fs.existsSync(swcConfig)) {
      debugError('swc config not found');
    }

    debugInfo('Running swc commonjs...');
    execSync(`swc ${tsFilesDirectory} -d ${distDirectory}/ --config-file ${swcConfig} -C module.type=commonjs`);

    debugInfo('Running swc es6...');
    execSync(`swc ${tsFilesDirectory} -d ${distDirectory}/es6/ --config-file ${swcConfig}`);

    debugInfo('Running tsc...');
    // const tsBuildInfoFile = path.resolve(cwd, 'node_modules', '.cache', '.tsbuildinfo');
    // --incremental --tsBuildInfoFile ${tsBuildInfoFile}

    [
      '/**/*.ts',
      '/*.ts',
    ].forEach((search) => {
      execSync(`tsc ${tsFilesDirectory + search} --emitDeclarationOnly --declaration --outDir ${distDirectory}/typings --jsx react --esModuleInterop --lib "dom,es2015"`);
    });
  };

  Promise.all(promises).then(() => {
    debugInfo('Creating index.ts file with exports');
    createIndexExports(exportsMap, tsFilesDirectory);

    return compile();
  }).then(() => {
    fs.writeFileSync(path.resolve(distDirectory, 'icons-map.json'), JSON.stringify(iconsMap));

    debugInfo(`Icons successfully generated to ${distDirectory} in ${Math.ceil(performance.now() - start)}ms!`);
  }).catch((e) => {
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
  const exports = [
    `export { IconSettingsProvider } from './IconSettings';`
  ];

  sortArrayAlphabetically(Object.keys(exportsMap)).forEach((componentName) => {
    const importSource = exportsMap[componentName];
    exports.push(`export { default as ${componentName} } from '${importSource}';`);
  });

  const code = exports.join('\n');
  fs.writeFileSync(path.join(dir, 'index.ts'), code);
}

module.exports = { generateIcons };
