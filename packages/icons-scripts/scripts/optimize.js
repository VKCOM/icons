const { optimize: svgo } = require('svgo');

/**
 * @param {string} svg
 * @param {any[]} plugins
 * @return {string}
 */
function optimize(svg, plugins) {
  return svgo(svg, {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false,
          },
        },
      },
      ...plugins,
    ],
  }).data;
}

module.exports = { optimize };
