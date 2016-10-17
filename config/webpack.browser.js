const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',

  entry: {
    app: [
      'babel-polyfill',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/dev-server',
      './src/app.js'
    ],
  },

  output: {
    publicPath: '/',
    path: '/',
    filename: 'app/[name].js',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          plugins: [
            [
              'react-transform', {
                transforms: [
                  { transform: 'react-transform-hmr', imports: ['react'], locals: ['module'] },
                  { transform: 'react-transform-catch-errors', imports: ['react', 'redbox-react'] },
                ],
              },
            ],
          ],
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:3]',
          'postcss?parser=postcss-scss',
        ],
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
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new AssetsPlugin({ path: './dist', filename: 'assets.json' }),
  ],

  devServer: {
    port: 8080,
    hot: true,
    stats: { colors: true, hash: false, timings: false, chunks: false, chunkModules: false, modules: false },
    proxy: {
      '**': 'http://localhost:8081',
    },
  },
};
