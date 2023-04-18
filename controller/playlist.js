const { Playlist, Video, PlaylistVideo, Channel } = require("../models");

module.exports = {
  index: async (req, res, next) => {
    try {
      const playlists = await Playlist.findAll();

      return res.status(200).json({
        status: true,
        message: "success",
        data: playlists,
      });
    } catch (error) {
      next(err);
    }
  },
  // masih error
  show: async (req, res, next) => {
    try {
      const { id } = req.params;

      const playlist = await Playlist.findOne({
        where: { id: id },
        include: [
          {
            model: PlaylistVideo,
            as: "playlistvideos",
          },
          {
            model: Channel,
            as: "channel",
            attributes: ["id", "name"],
          },
        ],
      });

      if (!playlist) {
        return res.status(404).json({
          status: false,
          message: `can't find playlist with id ${id}!`,
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: "success",
        data: playlist,
      });
    } catch (error) {
      next(error);
    }
  },

  store: async (req, res, next) => {
    try {
      const { name, description, channel_id } = req.body;

      const channel = await Channel.findOne({ where: { id: channel_id } });
      if (!channel) {
        return res.status(404).json({
          status: false,
          message: `can't find channel with id ${channel_id}!`,
          data: null,
        });
      }

      const playlist = await Playlist.create({
        name: name,
        description: description,
        channel_id: channel_id,
      });

      return res.status(201).json({
        status: true,
        message: "success",
        data: playlist,
      });
    } catch (error) {
      next(error);
    }
  },
  // masih error
  update: async (req, res, next) => {
    try {
      const { id } = req.params;

      const updated = await Playlist.update(req.body, { where: { id: id } });

      if (updated[0] == 0) {
        return res.status(404).json({
          status: false,
          message: `can't find playlist with id ${id}!`,
          data: null,
        });
      }

      return res.status(201).json({
        status: true,
        message: "success",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },

  destroy: async (req, res, next) => {
    try {
      const { id } = req.params;

      const deleted = await Playlist.destroy({ where: { id: id } });

      if (!deleted) {
        return res.status(404).json({
          status: false,
          message: `can't find playlist with id ${id}!`,
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: "success",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },

  addPlaylistVideo: async (req, res, next) => {
    try {
      const { video_id, playlist_id } = req.body;

      const video = await Video.findOne({ where: { id: video_id } });
      const playlist = await Playlist.findOne({ where: { id: playlist_id } });
      if (!video || !playlist) {
        return res.status(404).json({
          status: false,
          message: `video_id and playlist_id must be a valid id!`,
          data: null,
        });
      }

      const isPlaylistVideo = await PlaylistVideo.findOne({
        where: { video_id, playlist_id },
      });
      if (isPlaylistVideo) {
        return res.status(400).json({
          status: false,
          message: `already add playlist video`,
          data: null,
        });
      }

      const playlistvideo = await PlaylistVideo.create({
        video_id,
        playlist_id,
      });
      return res.status(201).json({
        status: true,
        message: "success",
        data: playlistvideo,
      });
    } catch (error) {
      next(error);
    }
  },

  delPlaylistVideo: async (req, res, next) => {
    try {
      const { video_id, playlist_id } = req.body;

      const deleted = await PlaylistVideo.destroy({
        where: { playlist_id, video_id },
      });

      if (!deleted) {
        return res.status(404).json({
          status: false,
          message: `can't find channel with id ${playlist_id}!`,
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: "success",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },
};
