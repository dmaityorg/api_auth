'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = exports.Post = void 0;
const sequelize_1 = require("sequelize");
;
class Post extends sequelize_1.Model {
    static associate(models) {
        Post.belongsTo(models.User);
    }
}
exports.Post = Post;
;
exports.initialize = (sequelize) => {
    Post.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: sequelize_1.DataTypes.INTEGER,
        title: sequelize_1.DataTypes.STRING,
        description: sequelize_1.DataTypes.STRING,
        publish_date: sequelize_1.DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Post',
        underscored: true,
    });
    return Post;
};
exports.default = exports.initialize;
