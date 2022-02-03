import User from "../model/user";
import Profile from "../model/profile";
import createError from "http-errors";
import { STATUS_CODES, ERROR_MESSAGE } from "../constants";
import { generateToken } from "../utils/token";
import bcrypt from "bcrypt";

export const signup = async (req, res, next) => {
  const { email, password, account, username, intro } = req.body;
  const image = req.file ? req.file.location : "";
  const accountReg = /^[_A-Za-z0-9+]*$/;
  const emailReg =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;

  if (!emailReg.test(email)) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      message: ERROR_MESSAGE.SIGN_UP.CHECK_EMAIL,
    });
  }

  if (password.length < 6) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      message: ERROR_MESSAGE.SIGN_UP.CHECK_PASSWORD,
    });
  }

  if (!(email && password && account && username)) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      message: ERROR_MESSAGE.SIGN_UP.CHECK_CONTENT,
    });
  }

  if (!accountReg.test(account)) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      message: ERROR_MESSAGE.SIGN_UP.CHECK_ACCOUNT_TEXT,
    });
  }

  try {
    const existAccount = await Profile.exists({ account });
    const existEmail = await User.exists({ email });

    if (existAccount) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: ERROR_MESSAGE.SIGN_UP.INVALID_ACCOUNT });
    }

    if (existEmail) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: ERROR_MESSAGE.SIGN_UP.INVALID_EMAIL });
    }

    const user = await User.create({
      email,
      password,
    });

    const userProfile = await Profile.create({
      user: user._id,
      username,
      account,
      intro,
      image,
    });

    const userData = {
      _id: user._id,
      email: user.email,
      username: userProfile.username,
      account: userProfile.account,
      intro: userProfile.intro,
      image: userProfile.image,
    };

    res.json({ message: "회원가입 성공", user: userData });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      message: ERROR_MESSAGE.LOGIN_IN.CHECK_EMAIL,
    });
  }

  if (!password) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      message: ERROR_MESSAGE.LOGIN_IN.CHECK_PASSWORD,
    });
  }

  if (!(email && password)) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      message: ERROR_MESSAGE.LOGIN_IN.CHECK_CONTENT,
    });
  }
  try {
    const user = await User.findOne({ email });

    if (user === null) {
      next(
        createError(STATUS_CODES.NOT_FOUND, ERROR_MESSAGE.LOGIN_IN.INVALID_USER)
      );
    }

    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      const accessToken = generateToken(user._id);
      const refreshToken = generateToken(user._id, true);

      const userInfo = {
        _id: user._id,
        username: user.username,
        email: user.email,
        account: user.account,
        image: user.image,
        access_token: accessToken,
        refresh_token: refreshToken,
      };

      return res.status(200).json({
        user: userInfo,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const emailValid = async (req, res, next) => {
  const {
    user: { email },
  } = req.body;

  try {
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        message: ERROR_MESSAGE.EMAIL_VALID.EXIST_EMAIL,
      });
    }

    res.json({
      message: "사용 가능한 이메일 입니다.",
    });
  } catch (error) {
    next(error);
  }
};

export const accountValid = async (req, res, next) => {
  const {
    user: { account },
  } = req.body;

  try {
    const existUser = await User.findOne({ account });
    if (existUser) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        message: ERROR_MESSAGE.ACCOUNT_VALID.EXIST_ACCOUNT,
      });
    }

    res.json({
      message: "사용 가능한 계정ID 입니다.",
    });
  } catch (error) {
    next(error);
  }
};
