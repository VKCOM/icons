const babel = require('@babel/core');
const path = require('path');
const fs = require('fs');

const configFile = path.resolve(process.cwd(), 'scripts/utils', 'babel.config-icons.js');

function transformFile ({ path, outputPath, options }) {
  return babel.transformFile(path, {
    configFile,
    ...options
  }, (err, result) => {
    if (err) {
      throw new Error(err)
    }
    fs.writeFileSync(outputPath, result.code);
  });
}

function transform (code) {
  return new Promise((resolve) => {
    babel.transform(code, {
      configFile
    }, (err, result) => {
      if (err) {
        throw new Error(err)
      }
      resolve(result.code)
    });
  })
}

module.exports.transformFile = transformFile;
module.exports.transform = transform;
