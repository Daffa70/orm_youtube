"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // relasi one-to-many -> channel
      Video.belongsTo(models.Channel, {
        foreignKey: "channel_id",
        as: "channel",
      });

      Video.belongsToMany(models.User, {
        foreignKey: "video_id",
        as: "comments",
        through: models.Comment,
      });

      // relasi playlistvideos
      Video.belongsToMany(models.Playlist, {
        foreignKey: "video_id",
        as: "playlistvideos",
        through: models.PlaylistVideo,
      });
    }
  }
  Video.init(
    {
      channel_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Video",
    }
  );
  return Video;
};
