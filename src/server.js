/* eslint-disable global-require, no-console */
require('babel-core/register');
require('css-modules-require-hook/preset');
require('babel-polyfill');
require('dotenv').config({ silent: true });

const express = require('express');
const compress = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const setHtml = require('./server/setHtml');

const server = express();
server.disable('x-powered-by');
server.use(compress());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());
server.use('/dist', express.static('dist'));

server.get('/favicon.ico', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'image/x-icon' });
  res.end();
});

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const WebpackDashboard = require('webpack-dashboard');
  const WebpackDashboardPlugin = require('webpack-dashboard/plugin');
  const config = require('../config/webpack.development.js');

  const compiler = webpack(config);
  const dashboard = new WebpackDashboard();
  compiler.apply(new WebpackDashboardPlugin(dashboard.setData));

  server.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
    quiet: true,
  }));
  server.use(require('webpack-hot-middleware')(compiler, {
    log: () => {},
  }));
}

server.get('*', setHtml);

const port = process.env.PORT || 3000;
server.listen(port, (err) => {
  if (err) {
    console.error(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});
/* eslint-enable global-require, no-console */
