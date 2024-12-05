import { optimize as svgo } from 'svgo';

/**
 * @param {string} svg
 * @param {any[]} plugins
 * @return {string}
 */
export function optimize(svg, plugins) {
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
