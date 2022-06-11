const { optimize: svgo } = require('svgo');
const removeTransparentPaths = require('./plugins/removeTransparentPaths.js');

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
      removeTransparentPaths,
    ],
  }).data;
}

module.exports = { optimize };
