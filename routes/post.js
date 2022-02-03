import express from "express";
import { writePost } from "../controllers/post";

const router = express.Router();

router.post("/", writePost);

export default router;
