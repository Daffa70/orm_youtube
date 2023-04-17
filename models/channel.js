'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Channel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // relasi one-to-one -> user
      Channel.belongsTo(models.User, {foreignKey: 'user_id', as: 'user'});

      // relasi one-to-many -> video
      Channel.hasMany(models.Video, {foreignKey: 'channel_id', as: 'videos'});

      // relasi many-to-many -> use
      Channel.belongsToMany(models.User, {foreignKey: 'channel_id', as: 'subscribers', through: models.Subscription});
    }
  }
  Channel.init({
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Channel',
  });
  return Channel;
};