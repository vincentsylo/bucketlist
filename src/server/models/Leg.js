module.exports = (sequelize, DataTypes) => {
  const Leg = sequelize.define('Leg', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    country: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Leg.belongsTo(models.Journey, { as: 'journey', foreignKey: 'journeyId' });
      },
    },
  });

  return Leg;
};
