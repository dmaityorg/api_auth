import express from "express";
import jwt from "jsonwebtoken";
import passport from "passport";

const router = express.Router();
const User = require('../models').User;

router.post('/signup', function(req: any, res: any) {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({msg: 'Please pass username and password to success user request'})
  } else {
    User.create({
      username: req.body.username,
      password: req.body.password
    })
    .then((user: any) => res.status(201).send(user))
    .catch((error: any) => {
      res.status(400).send(error);
    });
  }
});

router.post('/signin', function(req: any, res: any) {
  User.findOne({
      where: {
        username: req.body.username
      }
    })
    .then((user: any) => {
      if (!user) {
        return res.status(401).send({
          message: 'Authentication failed. User not found or Missmatch username and password',
        });
      }
      user.comparePassword(req.body.password, (err: any, isMatch: any) => {
        if(isMatch && !err) {
          var token = jwt.sign(JSON.parse(JSON.stringify(user)), 'nodeauthsecret', {expiresIn: 86400 * 30});
          jwt.verify(token, 'nodeauthsecret', function(err: any, data: any){
            console.log(err, data);
          })
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      })
    })
    .catch((error: any) => res.status(400).send(error));
  });

 let getToken = function (headers: any) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;