import mongoose from "mongoose";
import User from "../model/user";
import Profile from "../model/profile";
import createError from "http-errors";
import { STATUS_CODES, ERROR_MESSAGE } from "../constants";

export const editProfile = async (req, res, next) => {
  const {
    user: { username, account, intro, image },
  } = req.body;
  const { userId } = req;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw createError(
        STATUS_CODES.BAD_REQUEST,
        ERROR_MESSAGE.TOKEN.INVALID_TOKEN
      );
    }

    const existAccount = await Profile.exists({ account });

    if (existAccount) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json(ERROR_MESSAGE.SIGN_UP.INVALID_ACCOUNT);
    }

    const profile = await Profile.findOneAndUpdate(
      { user: userId },
      {
        username,
        account,
        intro,
        image,
      },
      { new: true }
    );

    const copyProfile = Object.assign({}, profile._doc);
    delete copyProfile.user;

    res.json({ user: copyProfile });
  } catch (error) {
    next(error);
  }
};

export const getUserProfile = async (req, res, next) => {
  const { userId } = req;
  const { account } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw createError(
        STATUS_CODES.BAD_REQUEST,
        ERROR_MESSAGE.TOKEN.INVALID_TOKEN
      );
    }

    const user = await User.findById(userId);

    if (!user) {
      throw createError(
        STATUS_CODES.NOT_FOUND,
        ERROR_MESSAGE.LOGIN_IN.INVALID_USER
      );
    }

    const userProfile = await Profile.findOne({ account });

    if (!userProfile) {
      throw createError(
        STATUS_CODES.BAD_REQUEST,
        ERROR_MESSAGE.LOGIN_IN.INVALID_USER
      );
    }

    const copyProfile = Object.assign({}, userProfile._doc);
    delete copyProfile.user;

    res.json({ profile: copyProfile });
  } catch (error) {
    next(error);
  }
};
