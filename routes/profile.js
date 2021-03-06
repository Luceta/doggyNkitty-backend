import express from "express";
import {
  editProfile,
  getUserProfile,
  followUser,
  unfollowUser,
  followingList,
  followerList,
} from "../controllers/profile";
import { verifyAuthorization } from "../middlewares/authMiddleware";
const router = express.Router();

router.get("/:account", verifyAuthorization, getUserProfile);
router.put("/", verifyAuthorization, editProfile);
router.post("/:account/follow", verifyAuthorization, followUser);
router.delete("/:account/unfollow", verifyAuthorization, unfollowUser);
router.get("/:account/following", verifyAuthorization, followingList);
router.get("/:account/follower", verifyAuthorization, followerList);

export default router;
