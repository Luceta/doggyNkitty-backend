import mongoose from "mongoose";
import bcrypt from "bcrypt";

const schema = mongoose.Schema;

const userSchema = schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: { type: String, minLength: 6 },
    post: [{ type: mongoose.Types.ObjectId, ref: "Post", required: true }],
  },
  {
    versionKey: false,
  }
);

// TODO: code review
//password 에  3번 이상 틀릴 경우!!
// 실패한 ip같은 경우도 저장 하기!
// 이메일 전숭 중이라면!! 전송 해줘라!

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(
    this.password,
    Number(process.env.GEN_SAULT)
  );
});

const User = mongoose.model("User", userSchema);
export default User;
