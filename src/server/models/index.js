import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  }
);

const db = {};

fs.readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0)
  && (file !== 'index.js')
  && file.substr(file.lastIndexOf('.') + 1) === 'js')
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
