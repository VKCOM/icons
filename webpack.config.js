const path = require('path');
const entries = require('./src/entries');

const config = {
  entry: entries,
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [{
          loader: 'babel-loader'
        }, {
          loader: path.resolve('./loaders/svgToReact')
        }, {
          loader: 'svg-sprite-loader'
        }, {
          loader: path.resolve('./loaders/optimizeSvg')
        }]
      }
    ]
  },
  optimization: {
    minimize: false,
    splitChunks: {
      minChunks: 2,
      name: 'icons.common',
      chunks: 'all'
    }
  },
  mode: process.env.NODE_ENV || 'development',
  externals: {
    'react': 'react',
    'prop-types': 'prop-types'
  }
};

module.exports = config;
