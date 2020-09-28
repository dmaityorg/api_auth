import  express from "express";
const router = express.Router();
import * as  postController from '../controllers/post';

router.get("/posts", postController.findAllPost);
router.post("/posts", postController.createPost);
router.get("/post/:id", postController.findPost);

module.exports = router;

export default router;