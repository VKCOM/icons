import * as fs from 'node:fs';
import * as path from 'node:path';
import { rspack } from '@rspack/core';

const iconsMap = fs.readFileSync(path.resolve(process.cwd(), 'dist/icons-map.json'), {
  encoding: 'utf-8',
});

export default {
  mode: 'production',
  entry: './src/docs/docs.js',
  output: {
    path: path.resolve(process.cwd(), 'docs'),
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'builtin:swc-loader',
            options: {
              jsc: {
                externalHelpers: true,
                parser: {
                  syntax: 'ecmascript',
                  jsx: true,
                },
                transform: {
                  react: {
                    runtime: 'automatic',
                  },
                },
                target: 'es2017',
              },
            },
          },
        ],
      },
    ],
  },
  experiments: {
    css: true,
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './src/docs/docs.html',
      title: 'VK Icons',
      hash: true,
      scriptLoading: 'blocking',
    }),
    new rspack.DefinePlugin({
      'window.ICONS': iconsMap,
    }),
  ],
};
