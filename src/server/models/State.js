module.exports = (sequelize, DataTypes) => {
  const State = sequelize.define('State', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.DOUBLE,
    },
    longitude: {
      type: DataTypes.DOUBLE,
    },
  }, {
    classMethods: {
      associate: (models) => {
        State.belongsTo(models.Country, { as: 'country', foreignKey: 'countryId' });
        State.hasMany(models.Image, { as: 'images', foreignKey: 'stateId' });
      },
    },
  });

  return State;
};
