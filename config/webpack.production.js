'use strict';

const path = require('path');
const webpack = require('webpack');
const del = require('del');
const ExtractText = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

class CleanPlugin {
  constructor(options) {
    this.options = options;
  }

  apply() {
    del.sync(this.options.files, { force: true });
  }
}

module.exports = {
  entry: {
    app: './src/app.js',
  },

  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/dist/',
  },

  plugins: [
    new CleanPlugin({
      files: [path.join(__dirname, '../dist')],
    }),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ output: { screw_ie8: true, comments: false } }),
    new ExtractText('[name].css'),
    new OptimizeCssAssetsPlugin(),
  ],

  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel',
        query: {
          plugins: [
            ['transform-decorators-legacy'],
          ],
        },
      },
      {
        test: /\.css$/,
        loader: ExtractText.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:3]!postcss?parser=postcss-scss'),
      },
      { test: /\.(png|jpg|jpeg|gif|svg|woff)$/, loader: 'file?name=[name].[ext]', exclude: /node_modules/ },
    ],
  },

  postcss: function () {
    return [
      require('precss'),
      require('autoprefixer')({
        browsers: [
          'last 2 Chrome versions',
          'Explorer >= 10',
          'last 2 Firefox versions',
          'Safari >= 8',
        ],
      }),
      require('postcss-flexbugs-fixes'),
      require('postcss-simple-vars')({
        variables: function () {
          return require('./colors');
        }
      }),
    ];
  },

  resolve: {
    modulesDirectories: ['node_modules']
  },

};
