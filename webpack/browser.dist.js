import webpack from 'webpack';
import mergeConfigs from 'webpack-merge';
import { argv as args } from 'yargs';
import AssetsPlugin from 'assets-webpack-plugin';
import StatsPlugin from 'stats-webpack-plugin';
import CleanPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { commonConfig, statsConfig } from './common';

const browserConfig = {

  devtool: 'none',

  entry: {
    app: [
      'babel-polyfill',
      './src/app.js',
    ],
  },

  output: {
    publicPath: '/app/',
    path: './dist/app',
    filename: '[name].[chunkHash].js',
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      query: {
        cacheDirectory: true,
        presets: [
          'es2015',
          'stage-0',
          'react',
        ],
        plugins: [
          'transform-decorators-legacy',
        ],
      },
      exclude: /node_modules/,
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      loader: ExtractTextPlugin.extract(
        'style',
        'css?modules&-minifyGradients&localIdentName=[name]_[local]_[hash:base64:3]',
        'postcss?parser=postcss-scss',
      ),
    }, {
      test: /\.css$/,
      include: /node_modules/,
      loader: ExtractTextPlugin.extract(
        'style',
        'css',
      ),
    }, {
      test: /\.(png|jpe?g|gif|svg|woff)$/,
      loader: 'file?name=[hash].[ext]',
      exclude: /node_modules/,
    }, {
      test: /\.json$/,
      loader: 'json',
      exclude: /node_modules/,
    }],
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new CleanPlugin([
      'build',
      'dist',
    ], {
      root: process.cwd(),
      verbose: false,
    }),
    new AssetsPlugin({
      path: './dist',
      filename: 'assets.json',
    }),
    new ExtractTextPlugin('[name].[chunkHash].css'),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        screw_ie8: true,
        comments: false,
      },
      compress: {
        warnings: false,
        booleans: false,
        unused: false,
      },
    }),
  ],

  stats: statsConfig,

};

if (args.stats) {
  browserConfig.plugins.push(
    new StatsPlugin('../browser-stats.json'),
  );
}

export default mergeConfigs(commonConfig, browserConfig);
