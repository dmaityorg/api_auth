"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const router = express_1.default.Router();
router.post('/signup', function (req, res) {
    if (!req.body.username || !req.body.password) {
        res.status(400).send({ msg: 'Please pass username and password to success user request' });
    }
    else {
        user_1.User.create({
            username: req.body.username,
            password: req.body.password
        })
            .then((user) => res.status(201).send(user))
            .catch((error) => {
            console.log(error);
            res.status(400).send(error);
        });
    }
});
router.post('/signin', function (req, res) {
    console.log("+++++++++1 ");
    user_1.User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then((user) => {
        console.log("+++++++++1 " + user);
        if (!user) {
            return res.status(401).send({
                message: 'Authentication failed. User not found or Missmatch username and password',
            });
        }
        console.log("+++++++++2 " + user);
        var token = jsonwebtoken_1.default.sign(JSON.parse(JSON.stringify(user)), 'nodeauthsecret', { expiresIn: 86400 * 30 });
        jsonwebtoken_1.default.verify(token, 'nodeauthsecret', function (err, data) {
            console.log(err, data);
        });
        res.json({ success: true, token: 'JWT ' + token });
        // user.comparePassword(req.body.password, (err: any, isMatch: any) => {
        //   console.log("+++++++++3 " +  isMatch)
        //   if(isMatch && !err) {
        //   } else {
        //     res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        //   }
        // })
    })
        .catch((error) => res.status(400).send(error));
});
module.exports = router;
