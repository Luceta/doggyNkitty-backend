import User from "../model/user";
import createError from "http-errors";
import { STATUS_CODES, ERROR_MESSAGE } from "../constants";

export const signup = async (req, res, next) => {
  const { email, password, account, username, intro } = req.body;
  const image = req.file ? req.file.location : "";
  const accountReg = /^[_A-Za-z0-9+]*$/;
  const emailReg =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;

  if (!emailReg.test(email)) {
    throw createError(
      STATUS_CODES.BAD_REQUEST,
      ERROR_MESSAGE.SIGN_UP.CHECK_EMAIL
    );
  }

  if (password.length < 6) {
    throw createError(
      STATUS_CODES.BAD_REQUEST,
      ERROR_MESSAGE.SIGN_UP.CHECK_PASSWORD
    );
  }

  if (!(email && password && account && username)) {
    console.log(req.body);
    console.log("필 수 입력사항?");
    throw createError(
      STATUS_CODES.BAD_REQUEST,
      ERROR_MESSAGE.SIGN_UP.CHECK_CONTENT
    );
  }

  if (!accountReg.test(account)) {
    throw createError(
      STATUS_CODES.BAD_REQUEST,
      ERROR_MESSAGE.SIGN_UP.CHECK_ACCOUNT_TEXT
    );
  }

  try {
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

export const login = async (req, res, next) => {};
