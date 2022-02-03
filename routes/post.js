import express from "express";
import { writePost } from "../controllers/post";
import { verifyAuthorization } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", verifyAuthorization, writePost);

export default router;
