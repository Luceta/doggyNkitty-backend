import User from "../model/user";
import createError from "http-errors";
import { STATUS_CODES, ERROR_MESSAGE } from "../constants";
import { generateToken } from "../config/token";

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
    if (User.exists({ account })) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: ERROR_MESSAGE.SIGN_UP.INVALID_ACCOUNT });
    }

    if (User.exists({ email })) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: ERROR_MESSAGE.SIGN_UP.INVALID_ACCOUNT });
    }

    const user = await User.create({
      email,
      password,
      username,
      account,
      intro,
      image,
    });

    const userData = {
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        account: user.account,
        intro: user.intro,
        image: user.image,
      },
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

      return res.status(200).json({
        message: "ok",
        accessToken,
        refreshToken,
      });
    }
  } catch (error) {
    next(error);
  }
};
