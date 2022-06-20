const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const iconsMap = fs.readFileSync(path.resolve(process.cwd(), 'dist/icons-map.json'), {
  encoding: 'utf-8',
});

module.exports = {
  mode: 'production',
  entry: './src/docs/docs.js',
  output: {
    path: path.resolve(process.cwd(), 'docs'),
  },
  target: ['web', 'es5'],
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: [{
          loader: 'swc-loader',
          options: {
            jsc: {
              parser: {
                jsx: true,
              }
            }
          }
        }],
      },
      {
        test: /\.(otf|svg)/,
        use: 'file-loader',
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/docs/docs.html',
      title: 'VK Icons',
      hash: true,
      scriptLoading: 'blocking',
    }),
    new webpack.DefinePlugin({
      'window.ICONS': iconsMap,
    }),
  ],
  mode: 'development',
  cache: {
    type: 'filesystem',
  },
};
