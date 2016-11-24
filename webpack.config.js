/* eslint-disable */

require('babel-register')({
  presets: [
    'es2015-node6',
  ],
  plugins: [
    'add-module-exports',
  ],
});

var isWebpackDevServer = process.argv[1].indexOf('webpack-dev-server') > 1;

if (isWebpackDevServer) {
  module.exports = [
    require('./webpack/browser.local.js'),
    require('./webpack/server.local.js'),
  ];
} else {
  module.exports = [
    require('./webpack/browser.dist.js'),
    require('./webpack/server.dist.js'),
  ];
}
