"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PlaylistVideo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PlaylistVideo.belongsTo(models.Video, {
        foreignKey: "video_id",
      });

      PlaylistVideo.belongsTo(models.Playlist, {
        foreignKey: "playlist_id",
      });
    }
  }
  PlaylistVideo.init(
    {
      playlist_id: DataTypes.INTEGER,
      video_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PlaylistVideo",
    }
  );
  return PlaylistVideo;
};
