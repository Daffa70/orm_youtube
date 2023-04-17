const {Channel, Video, User, Subscription} = require('../models');
const user = require('./user');

module.exports = {
    index: async (req, res, next) => {
        try {
            const channels = await Channel.findAll();

            return res.status(200).json({
                status: true,
                message: 'success',
                data: channels
            });
        } catch (error) {
            next(error);
        }
    },

    show: async (req, res, next) => {
        try {
            const {channel_id} = req.params;

            const channel = await Channel.findOne({
                where: {id: channel_id}, include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['id', 'name', 'email']
                    },
                    {
                        model: Video,
                        as: 'videos',
                        attributes: ['id', 'title', 'description']
                    },
                    {
                        model: User,
                        as: 'subscribers'
                    }
                ]
            });
            if (!channel) {
                return res.status(404).json({
                    status: false,
                    message: `can't find channel with id ${channel_id}!`,
                    data: null
                });
            }

            return res.status(200).json({
                status: true,
                message: 'success',
                data: channel
            });
        } catch (error) {
            next(error);
        }
    },

    store: async (req, res, next) => {
        try {
            const {name, description, user_id} = req.body;
            if (!name || !user_id) {
                return res.status(400).json({
                    status: false,
                    message: `name and user_id is required!`,
                    data: null
                });
            }


            const user = await User.findOne({where: {id: user_id}});
            if (!user) {
                return res.status(404).json({
                    status: false,
                    message: `can't find user with id ${user_id}!`,
                    data: null
                });
            }

            const channel = await Channel.create({name, description, user_id});

            return res.status(201).json({
                status: true,
                message: 'success',
                data: channel
            });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const {channel_id} = req.params;

            const updated = await Channel.update(req.body, {where: {id: channel_id}});

            if (updated[0] == 0) {
                return res.status(404).json({
                    status: false,
                    message: `can't find channel with id ${channel_id}!`,
                    data: null
                });
            }

            return res.status(201).json({
                status: true,
                message: 'success',
                data: null
            });
        } catch (error) {
            next(error);
        }
    },

    destroy: async (req, res, next) => {
        try {
            const {channel_id} = req.params;

            const deleted = await Channel.destroy({where: {id: channel_id}});

            if (!deleted) {
                return res.status(404).json({
                    status: false,
                    message: `can't find channel with id ${channel_id}!`,
                    data: null
                });
            }

            return res.status(200).json({
                status: true,
                message: 'success',
                data: null
            });
        } catch (error) {
            next(error);
        }
    },

    subscribe: async (req, res, next) => {
        try {
            const {user_id, channel_id} = req.body;

            const user = await User.findOne({where: {id: user_id}});
            const channel = await Channel.findOne({where: {id: channel_id}});
            if (!user || !channel || user.id == channel.user_id) {
                return res.status(404).json({
                    status: false,
                    message: `user_id and channel_id must be a valid id!`,
                    data: null
                });
            }

            const isSubscribed = await Subscription.findOne({where: {user_id, channel_id}});
            if (isSubscribed) {
                return res.status(400).json({
                    status: false,
                    message: `already subscribed!`,
                    data: null
                });
            }

            const subscription = await Subscription.create({user_id, channel_id});
            return res.status(201).json({
                status: true,
                message: 'success',
                data: subscription
            });
        } catch (error) {
            next(error);
        }
    },

    unsubscribe: async (req, res, next) => {
        try {
            const {user_id, channel_id} = req.body;

            const deleted = await Subscription.destroy({where: {channel_id, user_id}});

            if (!deleted) {
                return res.status(404).json({
                    status: false,
                    message: `can't find channel with id ${channel_id}!`,
                    data: null
                });
            }

            return res.status(200).json({
                status: true,
                message: 'success',
                data: null
            });
        } catch (error) {
            next(error);
        }
    }
};