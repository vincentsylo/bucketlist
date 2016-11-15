var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  devtool: 'inline-source-map',

  entry: {
    app: ['babel-polyfill', './src/server.js'],
  },

  output: {
    publicPath: '/',
    path: './dist/public',
    filename: '../server.js',
    libraryTarget: 'commonjs2',
  },

  target: 'node',

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
      { test: /\.json$/, loader: 'json', exclude: /node_modules/ },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: [
          'isomorphic-style',
          'css?modules&-minifyGradients&localIdentName=[name]_[local]_[hash:base64:3]',
          'postcss?parser=postcss-scss',
        ],
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loader: 'isomorphic-style!style!css',
      },
      { test: /\.(png|jpg|jpeg|gif|svg|woff)$/, loader: 'file?name=[name].[ext]', exclude: /node_modules/ },
      { test: /\.ico$/, loader: 'file?name=[name].[ext]' },
    ],
  },

  postcss(webpack) {
    return [
      require('postcss-import')({ addDependencyTo: webpack }),
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
    ];
  },

  externals: [
    { assets: process.cwd() + '/dist/assets.json' },
    nodeExternals(),
  ],

  watch: true,
};
