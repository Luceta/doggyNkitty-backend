import mongoose from "mongoose";

const schema = mongoose.Schema;

const profileSchema = schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  following: [{ type: mongoose.Types.ObjectId, ref: "User", required: true }],
  follower: [{ type: mongoose.Types.ObjectId, ref: "User", required: true }],
  followingCount: {
    type: Number,
    default: 0,
  },
  followerCount: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Profile", profileSchema);
