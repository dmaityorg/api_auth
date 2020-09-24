'use strict';

import { Sequelize, Model, DataTypes, Optional, HasManyCreateAssociationMixin } from 'sequelize';
import bcrypt from "bcrypt-nodejs"
import { hashPassword, comparePasswords } from '../modules/password';

export interface UserRequestAttributes {
  username: string,
  password: string,
};

interface UserAttributes extends UserRequestAttributes {
id: number;
createdAt?: Date;
updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id" | "password"> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public comparePassword(password: string): Promise<boolean> {
    return comparePasswords(password, this.password);
  };
  // Model associations.
  public static associate(models: any) {
    User.hasMany(models.Post)
  };
};

export const initialize = (sequelize: Sequelize) => {
User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },  
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  sequelize,
  modelName: 'User',
  underscored: true,
  hooks: {
    beforeCreate: async (user, options) => {
      if (user.password) {
        const hashedPassword = await hashPassword(user.password);
        user.password = hashedPassword;
      }
    }
  }
});
return User;
};

export default initialize;