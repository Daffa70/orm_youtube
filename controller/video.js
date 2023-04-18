const { Channel, Video, User, Comment } = require("../models");

module.exports = {
  index: async (req, res, next) => {
    try {
      const videos = await Video.findAll({
        include: [
          {
            model: Channel,
            as: "channel",
            attributes: ["id", "name", "description"],
          },
          {
            model: Comment,
            as: "comments",
          },
        ],
      });

      return res.status(200).json({
        status: true,
        message: "success",
        data: videos,
      });
    } catch (error) {
      next(error);
    }
  },

  show: async (req, res, next) => {
    try {
      const { video_id } = req.params;

      const video = await Video.findOne({
        where: { id: video_id },
        include: [
          {
            model: Channel,
            as: "channel",
            attributes: ["id", "name", "description"],
          },
          {
            model: Comment,
            as: "comments",
          },
        ],
      });

      if (!video) {
        return res.status(404).json({
          status: false,
          message: `can't find video with id ${video_id}!`,
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: "success",
        data: video,
      });
    } catch (error) {
      next(error);
    }
  },

  store: async (req, res, next) => {
    try {
      const { channel_id, title, description } = req.body;

      if (!channel_id || !title) {
        return res.status(400).json({
          status: false,
          message: "channel_id and title is required!",
          data: null,
        });
      }

      const channel = await Channel.findOne({ where: { id: channel_id } });
      if (!channel) {
        return res.status(404).json({
          status: false,
          message: `can't find channel with id ${channel_id}`,
          data: null,
        });
      }

      const video = await Video.create({
        channel_id: channel_id,
        title: title,
        description: description,
      });

      return res.status(201).json({
        status: true,
        message: "success",
        data: video,
      });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { video_id } = req.params;

      const updated = await Video.update(req.body, { where: { id: video_id } });

      if (updated[0] == 0) {
        return res.status(404).json({
          status: false,
          message: `can't find video with id ${video_id}!`,
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
      const { video_id } = req.params;

      const deleted = await Video.destroy({ where: { id: video_id } });

      if (!deleted) {
        return res.status(404).json({
          status: false,
          message: `can't find video with id ${video_id}!`,
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

  comment: async (req, res, next) => {
    try {
      const { user_id, video_id, name } = req.body;

      const comment = await Comment.create({ name, user_id, video_id });
      return res.status(201).json({
        status: true,
        message: "success",
        data: comment,
      });
    } catch (error) {
      next(error);
    }
  },

  uncomment: async (req, res, next) => {
    try {
      const { user_id, video_id, name } = req.body;

      const user = await User.findOne({ where: { id: user_id } });
      const video = await Video.findOne({ where: { id: video_id } });
      if (!user || !video) {
        return res.status(404).json({
          status: false,
          message: `user_id and video_id must be a valid id!`,
          data: null,
        });
      }

      const deleted = await Comment.destroy({
        where: { name: name, user_id: user_id, video_id: video_id },
      });

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
