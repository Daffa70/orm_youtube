'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Playlist.belongsToMany(models.Video, {
        foreignKey: "playlist_id",
        as: "playlistvideos",
        through: models.Comment,
      });
    }
  }
  Playlist.init({
    playlist_id: DataTypes.INTEGER,
    video_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Playlist',
  });
  return Playlist;
};