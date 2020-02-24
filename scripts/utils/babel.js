const babel = require('@babel/core');
const path = require('path');
const fs = require('fs');

const configFile = path.resolve(process.cwd(), 'scripts/utils', 'babel.config-icons.js');

/**
 * Трансоформирует файл при помощи Babel.
 * @param path
 * @param outputPath
 * @param options
 */
function transformFile({path, outputPath, options}) {
  const {code} = babel.transformFileSync(path, {configFile, ...options});
  fs.writeFileSync(outputPath, code);
}

/**
 * Трансформирует код при помощи Babel.
 * @param code
 * @returns {*}
 */
function transform(code) {
  return babel.transform(code, {configFile}).code;
}

module.exports.transformFile = transformFile;
module.exports.transform = transform;
