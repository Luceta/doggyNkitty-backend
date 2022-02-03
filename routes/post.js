import express from "express";
import { writePost, getPost, editPost, deletePost } from "../controllers/post";
import { verifyAuthorization } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", verifyAuthorization, writePost);
router
  .route("/:postId")
  .all(verifyAuthorization)
  .get(getPost)
  .put(editPost)
  .delete(deletePost);

export default router;
