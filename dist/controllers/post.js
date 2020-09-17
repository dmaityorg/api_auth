"use strict";
var Post = require('../models').Post;
var User = require('../models').User;
module.exports = {
    list: function (req, res) {
        return Post
            .findAll({
            include: [{
                    model: User,
                    as: 'User'
                }],
        })
            .then(function (posts) { return res.status(200).send(posts); })
            .catch(function (error) { res.status(400).send(error); });
    },
    getById: function (req, res) {
        return Post
            .findByPk(req.params.id, {
            include: [{
                    model: User,
                    as: 'User'
                }],
        })
            .then(function (post) {
            if (!post) {
                return res.status(404).send({
                    message: 'Profile Not Found',
                });
            }
            return res.status(200).send(post);
        })
            .catch(function (error) { return res.status(400).send(error); });
    },
    add: function (req, res) {
        console.log(req.body);
        return Post
            .create({
            user_id: req.body.user_id,
            title: req.body.title,
            publish_date: req.body.publish_date,
            description: req.body.description,
        })
            .then(function (post) { return res.status(201).send(post); })
            .catch(function (error) { return res.status(400).send(error); });
    },
};
