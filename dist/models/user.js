'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require('bcrypt-nodejs');
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        username: DataTypes.STRING,
        password: DataTypes.STRING
    }, {});
    User.beforeSave(function (user, options) {
        if (user.changed('password')) {
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
        }
    });
    User.prototype.comparePassword = function (passw, cb) {
        bcrypt.compare(passw, this.password, function (err, isMatch) {
            if (err) {
                return cb(err);
            }
            cb(null, isMatch);
        });
    };
    User.associate = function (models) {
        User.hasMany(models.Post, {
            foreignKey: 'user_id',
            as: 'posts'
        });
    };
    return User;
};
