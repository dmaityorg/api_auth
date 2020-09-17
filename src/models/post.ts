'use strict';
// const {
//   Model
// } = require('sequelize');

import { Model } from 'sequelize';
module.exports = (sequelize: any, DataTypes: any) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  };
  Post.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    publish_date: DataTypes.DATE,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });

  Post.associate = function(models) {
    Post.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
  };
  return Post;
};