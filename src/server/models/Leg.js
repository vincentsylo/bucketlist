module.exports = (sequelize, DataTypes) => {
  const Leg = sequelize.define('Leg', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    date: {
      type: DataTypes.STRING,
    },
    transport: {
      type: DataTypes.STRING,
    },
    hotel: {
      type: DataTypes.STRING,
    },
    isOrigin: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Leg.belongsTo(models.Journey, { as: 'journey', foreignKey: 'journeyId' });
        Leg.belongsTo(models.Place, { as: 'place', foreignKey: 'placeId' });
      },
    },
  });

  return Leg;
};
