import express from "express";
import { signup, login } from "../controllers/users";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);

export default router;
