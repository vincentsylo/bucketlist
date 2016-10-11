module.exports = (sequelize, DataTypes) => {
  const Leg = sequelize.define('Leg', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    destinationCountry: {
      type: DataTypes.STRING,
    },
    destinationState: {
      type: DataTypes.STRING,
    },
    arrivalDate: {
      type: DataTypes.STRING,
    },
    arrivalMethod: {
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
