import mongoose from "mongoose";

const schema = mongoose.Schema;

const profileSchema = schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    username: { type: String, required: true, trim: true },
    account: { type: String, unique: true, required: true, trim: true },
    intro: { type: String, required: true },
    image: { type: String },
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
    post: [{ type: mongoose.Types.ObjectId, ref: "Post", required: true }],
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("Profile", profileSchema);
