'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// const {
//   Model
// } = require('sequelize');
var sequelize_1 = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    var Post = /** @class */ (function (_super) {
        __extends(Post, _super);
        function Post() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        Post.associate = function (models) {
            // define association here
        };
        return Post;
    }(sequelize_1.Model));
    ;
    Post.init({
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        publish_date: DataTypes.DATE,
        user_id: DataTypes.INTEGER
    }, {
        sequelize: sequelize,
        modelName: 'Post',
    });
    Post.associate = function (models) {
        Post.belongsTo(models.User, {
            foreignKey: 'user_id'
        });
    };
    return Post;
};
