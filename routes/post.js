import express from "express";
import { writePost, getPost, editPost } from "../controllers/post";
import { verifyAuthorization } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", verifyAuthorization, writePost);
router.get("/:postId", verifyAuthorization, getPost);
router.put("/:postId", verifyAuthorization, editPost);

export default router;
