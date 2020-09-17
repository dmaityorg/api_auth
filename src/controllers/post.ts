const Post = require('../models').Post;
const User = require('../models').User;

module.exports = {
  list(req: any, res: any) {
    return Post
      .findAll({
        include: [{
          model: User,
          as: 'User'
        }],
      })
      .then((posts: any) => res.status(200).send(posts))
      .catch((error: any) => { res.status(400).send(error); });
  },

  getById(req: any, res: any) {
    return Post
      .findByPk(req.params.id, {
        include: [{
          model: User,
          as: 'User'
        }],
      })
      .then((post: any) => {
        if (!post) {
          return res.status(404).send({
            message: 'Profile Not Found',
          });
        }
        return res.status(200).send(post);
      })
      .catch((error: any) => res.status(400).send(error));
  },

  add(req: any, res: any) {
    console.log(req.body)
    return Post
      .create({
        user_id: req.body.user_id,
        title: req.body.title,
        publish_date: req.body.publish_date,
        description: req.body.description,
      })
      .then((post: any) => res.status(201).send(post))
      .catch((error: any) => res.status(400).send(error));
  },
};