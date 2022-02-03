import express from "express";
import { writePost, getPost } from "../controllers/post";
import { verifyAuthorization } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", verifyAuthorization, writePost);
router.get("/:postId", verifyAuthorization, getPost);

export default router;
