'use strict';

import { Model } from "sequelize"

var bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize: any, DataTypes: any) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.beforeSave((user: any, options: any) => {
    if (user.changed('password')) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
  });
  User.prototype.comparePassword = function (passw: any, cb: any) {
    bcrypt.compare(passw, this.password, function (err: any, isMatch: any) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
  };
  User.associate = function(models: any) {
    User.hasMany(models.Post, {
      foreignKey: 'user_id',
      as: 'posts'
    });
  };
  
  return User;
};