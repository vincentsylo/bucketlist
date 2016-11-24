/* eslint-disable no-console */
import express from 'express';
import compress from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

require('css-modules-require-hook/preset');
require('dotenv').config({ silent: true });

const server = express();

server.disable('x-powered-by');
server.use(compress());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());
server.use('/app', express.static('./dist/app'));

server.get('/favicon.ico', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'image/x-icon' });
  res.end();
});

require('./server/passport')(server);
require('./server/api')(server);

const setHtml = require('./server/setHtml');
server.get('*', setHtml);

const models = require('./server/models');
const port = process.env.PORT || 8081;
models.sequelize.sync({ force: false }).then(() => {
  server.listen(port, () => {
    console.info('==> 🌎 Server listening on port %s.', port);
  });
});
/* eslint-enable no-console */
