"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var passport = require('passport');
var router = express_1.default.Router();
var User = require('../models').User;
router.post('/signup', function (req, res) {
    if (!req.body.username || !req.body.password) {
        res.status(400).send({ msg: 'Please pass username and password to success user request' });
    }
    else {
        User.create({
            username: req.body.username,
            password: req.body.password
        })
            .then(function (user) { return res.status(201).send(user); })
            .catch(function (error) {
            res.status(400).send(error);
        });
    }
});
router.post('/signin', function (req, res) {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(function (user) {
        if (!user) {
            return res.status(401).send({
                message: 'Authentication failed. User not found or Missmatch username and password',
            });
        }
        user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) {
                var token = jsonwebtoken_1.default.sign(JSON.parse(JSON.stringify(user)), 'nodeauthsecret', { expiresIn: 86400 * 30 });
                jsonwebtoken_1.default.verify(token, 'nodeauthsecret', function (err, data) {
                    console.log(err, data);
                });
                res.json({ success: true, token: 'JWT ' + token });
            }
            else {
                res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
            }
        });
    })
        .catch(function (error) { return res.status(400).send(error); });
});
var getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
};
module.exports = router;
