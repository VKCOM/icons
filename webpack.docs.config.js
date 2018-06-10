const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const icons = require('./src/entries');

module.exports = {
  entry: './src/docs.js',
  output: {
    path: path.resolve(__dirname, './docs'),
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader'
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/docs.html',
      title: 'VK Icons',
      hash: process.env.NODE_ENV === 'production'
    }),
    new webpack.DefinePlugin({
      icons: JSON.stringify(icons)
    })
  ],
  mode: process.env.NODE_ENV || 'development',
};
