const { optimize: svgo } = require('svgo');

/**
 * @param {string} svg
 * @return {string}
 */
function optimize(svg) {
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
    ],
  }).data;
}

module.exports = { optimize };
