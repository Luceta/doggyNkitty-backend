import mongoose from "mongoose";
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

export const getPost = async (req, res, next) => {
  const { postId } = req.params;

  if (!mongoose.isValidObjectId(postId)) {
    throw createError(STATUS_CODES.BAD_REQUEST, "잘못된 id입니다.");
  }

  try {
    const post = await Post.findById(postId).populate("author");

    if (post) {
      res.json({ post });
    } else {
      throw createError(STATUS_CODES.NOT_FOUND, ERROR_MESSAGE.POST.NOT_FOUND);
    }
  } catch (error) {
    next(error);
  }
};

export const editPost = async (req, res, next) => {
  const {
    post: { content, image },
  } = req.body;
  const { userId } = req;
  const { postId } = req.params;
  const images = image.split(",");

  if (!mongoose.isValidObjectId(postId)) {
    throw createError(STATUS_CODES.BAD_REQUEST, "잘못된 id입니다.");
  }

  try {
    const profile = await Profile.findOne({ user: userId });
    const user = profile._id.toString();
    const post = await Post.findById(postId);
    const postAuthor = post.author.toString();

    if (postAuthor !== user) {
      throw createError(
        STATUS_CODES.BAD_REQUEST,
        ERROR_MESSAGE.POST.BAD_REQUEST
      );
    } else {
      console.log(post, "chekc original post");
      const newPost = await Post.findByIdAndUpdate(
        postId,
        {
          content,
          image,
        },
        { new: true }
      );
      res.json({ post: newPost });
    }
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  const { postId } = req.params;
  const { userId } = req;

  if (!mongoose.isValidObjectId(postId)) {
    throw createError(STATUS_CODES.BAD_REQUEST, "잘못된 id입니다.");
  }

  try {
    const profile = await Profile.findOne({ user: userId });
    const user = profile._id.toString();
    const existPost = await Post.findById(postId);

    if (!existPost) {
      res.status(404).json({ message: "존재하지 않는 게시글 입니다." });
    }

    if (existPost.author.toString() !== user) {
      throw createError(
        STATUS_CODES.BAD_REQUEST,
        ERROR_MESSAGE.POST.BAD_REQUEST
      );
    } else {
      await Post.findByIdAndDelete(postId);

      res.json({ message: "삭제되었습니다." });
    }
  } catch (error) {
    next(error);
  }
};

export const getMyPosts = async (req, res, next) => {
  const { account } = req.params;
  const { limit, skip } = req.query;
};
