const webpack = require('webpack');

module.exports = {
  devtool: '#cheap-module-eval-source-map',

  entry: {
    app: [
      'babel-polyfill',
      'webpack-hot-middleware/client',
      './src/app.js'
    ],
  },

  output: {
    publicPath: '/',
    path: '/',
    filename: '[name].js',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0', 'react'],
          plugins: [
            [
              'react-transform', {
              transforms: [
                { transform: 'react-transform-hmr', imports: ['react'], locals: ['module'] },
                { transform: 'react-transform-catch-errors', imports: ['react', 'redbox-react'] },
              ],
            },
            ],
            'transform-decorators-legacy',
          ],
        },
      },
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:3]',
          'postcss?parser=postcss-scss',
        ],
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
    ];
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],

  resolve: {
    modulesDirectories: ['node_modules']
  },
};