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
    }
  }, {
    classMethods: {
      associate: (models) => {
        Place.belongsToMany(models.Journey, { as: 'journey', through: 'journey_place', foreignKey: 'placeId' });
        Place.belongsToMany(models.Leg, { as: 'leg', through: 'leg_place', foreignKey: 'placeId' });
      },
    },
  });

  return Place;
};
