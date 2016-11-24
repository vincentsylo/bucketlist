import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import { argv as args } from 'yargs';
import CopyPlugin from 'copy-webpack-plugin';
import StatsPlugin from 'stats-webpack-plugin';
import mergeConfigs from 'webpack-merge';
import colors from 'colors/safe';
import fs from 'fs';
import { exec } from 'child_process';
import { commonConfig, statsConfig, BuildCompletePlugin } from './common';

const serverConfig = {

  devtool: 'none',

  entry: {
    app: [
      'babel-polyfill',
      './src/server.js',
    ],
  },

  target: 'node',

  output: {
    filename: '../server.js',
    libraryTarget: 'commonjs2',
    publicPath: '/app/',
    path: './dist/app',
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      query: {
        cacheDirectory: true,
        presets: [
          'es2015-node6/object-rest',
          'stage-0',
          'react',
        ],
        plugins: ['transform-decorators-legacy'],
      },
      exclude: /node_modules/,
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      loaders: [
        'isomorphic-style',
        'css?modules&-minifyGradients&localIdentName=[name]_[local]_[hash:base64:3]',
        'postcss',
      ],
    }, {
      test: /\.css$/,
      include: /node_modules/,
      loader: 'isomorphic-style!style!css',
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

  externals: [nodeExternals(), {
    assets: './assets.json',
  }],

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new CopyPlugin([{
      from: './package.json',
      to: '../package.json',
    }, {
      from: './yarn.lock',
      to: '../yarn.lock',
    }]),
    new BuildCompletePlugin(() => {
      exec('yarn install --production', { cwd: 'dist' }, (error, stderr, stdout) => {
        if (error) {
          throw error;
        } else {
          fs.unlinkSync('./dist/package.json');
          fs.unlinkSync('./dist/yarn.lock');
          console.log(stdout);
          console.log(colors.green('\nBuild successfully created in ./dist directory'));
        }
      });
    }),
  ],

  stats: statsConfig,

};

if (args.stats) {
  serverConfig.plugins.push(
    new StatsPlugin('../server-stats.json'),
  );
}

export default mergeConfigs(commonConfig, serverConfig);
