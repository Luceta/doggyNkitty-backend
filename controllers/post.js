import Post from "../model/post";
import Profile from "../model/profile";
import { STATUS_CODES, ERROR_MESSAGE } from "../constants";
import createError from "http-errors";

export const writePost = async (req, res, next) => {
  const {
    post: { content, image },
  } = req.body;
  const { userId } = req;
  const images = image.split(",");

  if (!(content || image)) {
    throw createError(
      STATUS_CODES.BAD_REQUEST,
      ERROR_MESSAGE.POST_VALID.CHECK_CONTENT
    );
  }

  try {
    const profile = await Profile.findOne({ user: userId });
    const newPost = await Post.create({
      content,
      image: images,
      author: profile._id,
    });

    const postInfo = await Post.findById(newPost._id).populate("author");

    res.json({ post: postInfo });
  } catch (error) {
    next(error);
  }
};
