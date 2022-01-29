import express from "express";
import { signup, login, emailValid } from "../controllers/users";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/emailvalid", emailValid);

export default router;
