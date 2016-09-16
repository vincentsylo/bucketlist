module.exports = (sequelize, DataTypes) => {
  const Journey = sequelize.define('Journey', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Journey.belongsTo(models.User, { as: 'Creator', foreignKey: 'userId' });
      },
    },
  });

  return Journey;
};