import webpack from 'webpack';
import path from 'path';

export default function webpackTask(configLocation) {
  return new Promise((resolve, reject) => {
    let config = path.join(process.cwd(), configLocation);
    config = require(config);

    webpack(config, (err, stats) => {
      if (err) console.log(err);
      console.log(stats.toString({ colors: true, modules: false, chunks: false, hash: false, timings: false }));

      if (stats.hasErrors()) {
        reject();
      } else {
        resolve();
      }
    });
  });
}
