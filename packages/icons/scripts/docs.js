const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config-docs');

console.log('creating doc');

fs.rmSync(path.join(process.cwd(), 'docs'), {
  force: true,
  recursive: true,
});

const compiler = webpack(webpackConfig);

compiler.run((err, stats) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(
    stats.toString({
      colors: true,
      children: false,
      modules: false,
      version: false,
      chunks: false,
      warnings: false,
    }),
  );
});
