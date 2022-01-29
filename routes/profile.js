import express from "express";
import { editProfile, getUserProfile } from "../controllers/profile";
import { verifyAuthorization } from "../middlewares/authMiddleware";
const router = express.Router();

router.get("/:account", verifyAuthorization, getUserProfile);
router.put("/", verifyAuthorization, editProfile);

export default router;
