module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
      unique: true,
    },
    hash: {
      type: DataTypes.STRING,
    },
    passwordResetToken: {
      type: DataTypes.STRING,
    },
    passwordResetExpiry: {
      type: DataTypes.DATE,
    },
  }, {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Journey, { as: 'UserJourneys', foreignKey: 'userId' });
      },
    },
  });

  return User;
};
