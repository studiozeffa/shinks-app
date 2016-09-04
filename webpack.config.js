'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname + '/app',
  entry: './index.js',
  output: {
    path: __dirname + '/build',
    publicPath: '/build/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
    }, {
      test: /\.html$/,
      loader: 'html'
    }]
  },
  plugins: [
    new ExtractTextPlugin('style.css')
  ],
  resolve: {
    alias: {
      config: `${__dirname}/config/${process.env.NODE_ENV || 'development'}`
    }
  }
};
