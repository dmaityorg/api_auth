"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
const postController = require('../controllers').post;
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/api/post', postController.list);
router.get('/api/post/:id', postController.getById);
//router.put('/api/profile/:id', profileController.update);
router.post('/api/post', postController.add);
module.exports = router;
