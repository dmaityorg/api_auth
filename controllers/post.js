const Post = require('../models').Post;
const User = require('../models').User;

module.exports = {
  list(req, res) {
    return Post
      .findAll({
        include: [{
          model: User,
          as: 'User'
        }],
      })
      .then((posts) => res.status(200).send(posts))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Post
      .findByPk(req.params.id, {
        include: [{
          model: User,
          as: 'User'
        }],
      })
      .then((post) => {
        if (!post) {
          return res.status(404).send({
            message: 'Profile Not Found',
          });
        }
        return res.status(200).send(post);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    console.log(req.body)
    return Post
      .create({
        user_id: req.body.user_id,
        title: req.body.title,
        publish_date: req.body.publish_date,
        description: req.body.description,
      })
      .then((post) => res.status(201).send(post))
      .catch((error) => res.status(400).send(error));
  },
};