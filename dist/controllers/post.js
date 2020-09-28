"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPost = exports.createPost = exports.findAllPost = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = require("http-status-codes");
const models_1 = __importDefault(require("../models"));
exports.findAllPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield models_1.default.Post.findAll();
        return res.status(200).json(post);
    }
    catch (error) {
        return next(http_errors_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error));
    }
});
exports.createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield models_1.default.Post.findOne({
            where: {
                title: req.body.title
            }
        });
        if (post) {
            return res.status(200).json({ 'Message': "Post already present" });
        }
        else {
            const postDetails = req.body;
            const newPost = yield models_1.default.Post.create(postDetails);
            return res.status(200).json({ 'Message': "Post successfully created" });
        }
    }
    catch (error) {
        return next(http_errors_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error));
    }
});
exports.findPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield models_1.default.Post.findByPk(req.params.id);
        if (post) {
            return res.status(200).json(post);
        }
        else {
            return res.status(200).json({ 'Message': "Can Not find" });
        }
    }
    catch (error) {
        return next(http_errors_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error));
    }
});
