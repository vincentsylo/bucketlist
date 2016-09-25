import fs from 'fs';

module.exports = (server) => {
  fs.readdirSync(__dirname)
    .filter((file) => (file.indexOf('.') !== 0)
    && (file !== 'index.js')
    && file.substr(file.lastIndexOf('.') + 1) === 'js')
    .forEach((file) => require(`./${file}`)(server));
};
