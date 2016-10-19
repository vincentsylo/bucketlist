module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define('Country', {
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
        Country.hasMany(models.State, { as: 'states', foreignKey: 'countryId' });
        Country.hasMany(models.Image, { as: 'images', foreignKey: 'countryId' });
      },
    },
  });

  return Country;
};
