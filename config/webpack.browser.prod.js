var webpack = require('webpack');
var ExtractText = require('extract-text-webpack-plugin');
var AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      './src/app.js'
    ],
  },

  output: {
    publicPath: '/app/',
    path: './dist/app',
    filename: '[name].[chunkHash].js',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0', 'react'],
          plugins: ['transform-decorators-legacy'],
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractText.extract('style', 'css?modules&-minifyGradients&localIdentName=[name]_[local]_[hash:base64:3]!postcss?parser=postcss-scss')
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loader: 'style!css',
      },
      { test: /\.(png|jpg|jpeg|gif|svg|woff)$/, loader: 'file?name=[name].[ext]', exclude: /node_modules/ },
    ],
  },

  postcss() {
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

  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ output: { screw_ie8: true, comments: false } }),
    new ExtractText('[name].[chunkHash].css'),
    new AssetsPlugin({ path: './dist', filename: 'assets.json' }),
  ],
};
