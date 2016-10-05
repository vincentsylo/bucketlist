import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import path from 'path';

export default function devServerTask(configLocation) {
  return new Promise((resolve, reject) => {
    let config = path.join(process.cwd(), configLocation);
    config = require(config);

    const compiler = webpack(config);

    const server = new WebpackDevServer(compiler, config.devServer);
    server.listen(config.devServer.port, () => {
      console.log(`==> 🌎 Dev server is running at http://localhost:${config.devServer.port}`);
    });

    compiler.plugin('done', stats => {
      if (stats.hasErrors()) {
        reject();
      } else {
        resolve();
      }
    });
  });
}
