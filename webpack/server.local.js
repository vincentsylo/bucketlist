import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import WriteFilePlugin from 'write-file-webpack-plugin';
import mergeConfigs from 'webpack-merge';
import colors from 'colors/safe';
import nodemon from 'nodemon';
import open from 'open';
import { commonConfig, statsConfig, BuildCompletePlugin, rewriteSourceMaps } from './common';

const serverConfig = {

  devtool: 'eval-source-map',

  entry: {
    app: [
      'babel-polyfill',
      './src/server.js',
    ],
  },

  output: {
    filename: '../server.js',
    libraryTarget: 'commonjs2',
    publicPath: 'http://localhost:8080/build/',
    path: 'build/public',
    devtoolModuleFilenameTemplate: rewriteSourceMaps({
      protocol: 'file',
    }),
  },

  target: 'node',

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
      loader: 'file?name=[name].[ext]',
      exclude: /node_modules/,
    }, {
      test: /\.json$/,
      loader: 'json',
      exclude: /node_modules/,
    }],
  },

  externals: [nodeExternals(), {
    assets: `${process.cwd()}/build/assets.json`,
  }],

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new WriteFilePlugin({
      log: false,
    }),
    new BuildCompletePlugin(() => {
      nodemon({
        script: './build/server.js',
        // exec: 'node --inspect',
      });
      setTimeout(() => {
        open('http://localhost:8080');
      }, 1000);
      process.stdout.write(colors.green('\nDev server is running at http://localhost:8080\n'));
    }),
  ],

  devServer: {
    outputPath: 'build/public',
    stats: statsConfig,
  },

};

export default mergeConfigs(commonConfig, serverConfig);
