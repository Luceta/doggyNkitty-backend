import express from "express";
import users from "./users";
import profile from "./profile";
import post from "./post";
import image from "./image";

const router = express.Router();

router.use("/users", users);
router.use("/profile", profile);
router.use("/post", post);
router.use("/image", image);

export default router;
