import express from "express";
import { signup, login, emailValid, accountValid } from "../controllers/users";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/emailvalid", emailValid);
router.post("/accountvalid", accountValid);

export default router;
