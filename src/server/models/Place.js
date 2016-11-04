module.exports = (sequelize, DataTypes) => {
  const Place = sequelize.define('Place', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    placeId: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.DOUBLE,
    },
    longitude: {
      type: DataTypes.DOUBLE,
    },
    photos: {
      type: DataTypes.JSON,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Place.hasMany(models.Leg, { as: 'legs', foreignKey: 'placeId' });
      },
    },
  });

  return Place;
};
