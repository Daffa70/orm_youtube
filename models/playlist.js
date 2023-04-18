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
      // define association here
        // relasi playlistvideos
        Playlist.belongsToMany(models.Video, {
          foreignKey: "playlist_id",
          as: "playlistvideos",
          through: models.PlaylistVideo,
        });
    }
  }
  Playlist.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    channel_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Playlist',
  });
  return Playlist;
};