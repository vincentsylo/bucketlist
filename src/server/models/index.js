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

db.User = require('./User')(sequelize, Sequelize.DataTypes);
db.Journey = require('./Journey')(sequelize, Sequelize.DataTypes);
db.Leg = require('./Leg')(sequelize, Sequelize.DataTypes);
db.Place = require('./Place')(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
