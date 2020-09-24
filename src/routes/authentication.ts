import express, { Request, Response, Router, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User, UserRequestAttributes } from '../models/user';
const router: Router = express.Router();

router.post('/signup', function(req: Request, res: Response) {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({msg: 'Please pass username and password to success user request'})
  } else {
    User.create({
      username: req.body.username,
      password: req.body.password
    })
    .then((user: User) => res.status(201).send(user))
    .catch((error) => {
      console.log(error)
      res.status(400).send(error);
    });
  }
});

router.post('/signin', function(req: Request, res: Response) {
  console.log("+++++++++1 " )
  User.findOne({
      where: {
        username: req.body.username
      }
    })
    .then((user: any) => {
      console.log("+++++++++1 " + user)
      if (!user) {
        return res.status(401).send({
          message: 'Authentication failed. User not found or Missmatch username and password',
        });
      }
      console.log("+++++++++2 " + user)
      user.comparePassword(req.body.password, (err: any, isMatch: any) => {
        console.log("+++++++++3 " +  isMatch)

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

module.exports = router;