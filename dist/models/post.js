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
exports.initialize = exports.Post = void 0;
var sequelize_1 = require("sequelize");
;
var Post = /** @class */ (function (_super) {
    __extends(Post, _super);
    function Post() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Post.associate = function (models) {
        Post.belongsTo(models.User);
    };
    return Post;
}(sequelize_1.Model));
exports.Post = Post;
;
exports.initialize = function (sequelize) {
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
        sequelize: sequelize,
        modelName: 'Post'
    });
    return Post;
};
exports.default = exports.initialize;
