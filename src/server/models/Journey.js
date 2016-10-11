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
    originCountry: {
      type: DataTypes.STRING,
    },
    originState: {
      type: DataTypes.STRING,
    },
    departureDate: {
      type: DataTypes.DATE,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Journey.hasMany(models.Leg, { as: 'legs', foreignKey: 'journeyId' });
        Journey.belongsTo(models.User, { as: 'createdBy', foreignKey: 'userId' });
      },
    },
  });

  return Journey;
};
