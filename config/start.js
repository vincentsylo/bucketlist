import { devServer, webpack } from './tasks';
import nodemon from 'nodemon';

(async () => {
  try {
    await devServer('./config/webpack.browser.js');
    await webpack('./config/webpack.server.js');

    nodemon('./dist/server.js');
  } catch (error) {
    process.exit(1);
  }
})();
