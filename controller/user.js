const {User, Channel} = require('../models');

module.exports = {
    index: async (req, res, next) => {
        try {
            const users = await User.findAll();

            return res.status(200).json({
                status: true,
                message: 'success',
                data: users
            });
        } catch (error) {
            next(err);
        }
    },

    show: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const user = await User.findOne({
                where: {id: user_id}, include: [
                    {
                        model: Channel,
                        as: 'channel',
                        attributes: ['name', 'description']
                    },
                    {
                        model: Channel,
                        as: 'subscribes'
                    }
                ]
            });
            if (!user) {
                return res.status(404).json({
                    status: false,
                    message: `can't find user with id ${user_id}!`,
                    data: null
                });
            }

            return res.status(200).json({
                status: true,
                message: 'success',
                data: user
            });
        } catch (error) {
            next(error);
        }
    },

    store: async (req, res, next) => {
        try {
            const {name, email, password} = req.body;

            const user = await User.create({
                name: name,
                email: email,
                password: password,
            });

            return res.status(201).json({
                status: true,
                message: 'success',
                data: user
            });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const updated = await User.update(req.body, {where: {id: user_id}});

            if (updated[0] == 0) {
                return res.status(404).json({
                    status: false,
                    message: `can't find user with id ${user_id}!`,
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
            const {user_id} = req.params;

            const deleted = await User.destroy({where: {id: user_id}});

            if (!deleted) {
                return res.status(404).json({
                    status: false,
                    message: `can't find user with id ${user_id}!`,
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