import  express, { Router } from "express";
const router: Router = express.Router();
import * as  postController from '../controllers/post';

router.get("/posts", postController.findAllPost);
router.post("/posts", postController.createPost);
router.get("/post/:id", postController.findPost);
router.put("/posts/:id", postController.updatePost);

module.exports = router;

export default router;