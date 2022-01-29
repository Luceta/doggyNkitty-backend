import express from "express";
import users from "./users";
import profile from "./profile";

const router = express.Router();

router.use("/users", users);
router.use("/profile", profile);

export default router;
