import webpack from 'webpack';
import mergeConfigs from 'webpack-merge';
import WriteFilePlugin from 'write-file-webpack-plugin';
import CleanPlugin from 'clean-webpack-plugin';
import AssetsPlugin from 'assets-webpack-plugin';
import { commonConfig, statsConfig, rewriteSourceMaps } from './common';

const browserConfig = {

  devtool: 'eval-source-map',

  entry: {
    app: [
      'babel-polyfill',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/dev-server',
      './src/app.js',
    ],
  },

  output: {
    publicPath: 'http://localhost:8080/build/',
    path: 'build',
    filename: 'app/[name].js',
    devtoolModuleFilenameTemplate: rewriteSourceMaps({
      protocol: 'http',
      host: 'localhost',
      port: 8080,
    }),
    hotUpdateChunkFilename: 'webpack-dev-server/[id].[hash].hot-update.js',
    hotUpdateMainFilename: 'webpack-dev-server/[hash].hot-update.json',
  },

  module: {
    noParse: /\.min\.js/,
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
          [
            'react-transform', {
              transforms: [{
                transform: 'react-transform-hmr',
                imports: ['react'],
                locals: ['module'],
              }, {
                transform: 'react-transform-catch-errors',
                imports: [
                  'react',
                  'redbox-react',
                ],
              }],
            },
          ],
          'transform-decorators-legacy',
        ],
      },
      exclude: /node_modules/,
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      loaders: [
        'style',
        'css?modules&-minifyGradients&localIdentName=[name]_[local]_[hash:base64:3]',
        'postcss',
      ],
    }, {
      test: /\.css$/,
      include: /node_modules/,
      loader: 'style!css',
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

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new WriteFilePlugin({
      log: false,
    }),
    new CleanPlugin([
      'build/webpack-dev-server',
      'dist',
    ], {
      root: process.cwd(),
      verbose: false,
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new AssetsPlugin({
      path: './build',
      filename: 'assets.json',
    }),
  ],

  devServer: {
    contentBase: 'build/public',
    outputPath: 'build/public',
    stats: statsConfig,
    port: 8080,
    hot: true,
    proxy: {
      '**': 'http://localhost:8081',
    },
  },
};

export default mergeConfigs(commonConfig, browserConfig);
