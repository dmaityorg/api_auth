'use strict';

import { Model, Sequelize, DataTypes, Optional } from "sequelize";

export interface PostAttributes {
  id: number,
  title: string,
  description: string,
  publish_date: Date,
  user_id: number
}

interface PostCreationAttributes extends Optional<PostAttributes, 'id'> { };

export class Post extends Model<PostAttributes, PostCreationAttributes>
implements PostAttributes
{
  public id!: number;
  public title!: string;
  public description!: string;
  public publish_date!: Date;
  public user_id!: number;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  public static associate(models: any) {
    Post.belongsTo(models.User);
  }
};


export const initialize = (sequelize: Sequelize) => {
  Post.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    publish_date: DataTypes.DATE
  }, {
      sequelize,
      modelName: 'Post'
  });
  return Post;
};

export default initialize;