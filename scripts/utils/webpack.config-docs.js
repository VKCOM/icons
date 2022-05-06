const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const icons = require('./icons');

module.exports = {
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
      'window.ICONS': JSON.stringify(icons.iconsMap()),
    }),
  ],
  mode: 'development',
  cache: {
    type: 'filesystem',
  },
};
