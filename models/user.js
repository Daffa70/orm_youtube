'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // relasi one-to-one -> channel
      User.hasOne(models.Channel, {foreignKey: 'user_id', as: 'channel'});

      // relase many-to-many -> channel
      User.belongsToMany(models.Channel, {foreignKey: 'user_id', as: 'subscribes', through: models.Subscription});
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};