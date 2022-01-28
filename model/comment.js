import mongoose from "mongoose";

const schema = mongoose.Schema;

const CommentSchema = schema(
  {
    content: {
      type: String,
      required: true,
    },
    created_by: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    comments: [
      {
        author: { type: mongoose.Types.ObjectId, ref: "User", required: true },
        content: { type: String, required: true },
      },
    ],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.model("Comment", CommentSchema);
