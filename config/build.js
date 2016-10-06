import { remove, webpack, copy, chdir, exec } from './tasks';

(async () => {
  try {
    await remove('./dist');
    await webpack('./config/webpack.browser.prod.js');
    await webpack('./config/webpack.server.prod.js');

    await copy('./package.json', './dist/package.json');
    await copy('./npm-shrinkwrap.json', './dist/npm-shrinkwrap.json');
    await chdir('./dist');
    await exec('npm install --production');
    await remove('./package.json');
    await remove('./npm-shrinkwrap.json');

    console.log(`\nBuild successfully created in ./dist directory`);
  } catch (error) {
    if (error) console.log(error);

    process.exit(1);
  }
})();
