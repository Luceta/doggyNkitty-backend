import User from "../model/user";
import createError from "http-errors";
import { STATUS_CODES, ERROR_MESSAGE } from "../constants";

export const login = (req, res, next) => {};
export const signup = async (req, res, next) => {
  const { email, password, account, username, intro } = req.body;
  const image = req.file ? req.file.location : "";
  const accountReg = /^[_A-Za-z0-9+]*$/;

  if (password.length < 6) {
    throw createError(STATUS_CODES.BAD_REQUEST, ERROR_MESSAGE.CHECK_PASSWORD);
  }

  if (!(email && password && account && username)) {
    console.log(req.body);
    console.log("필 수 입력사항?");
    throw createError(STATUS_CODES.BAD_REQUEST, ERROR_MESSAGE.CHECK_CONTENT);
  }

  if (!accountReg.test(account)) {
    throw createError(
      STATUS_CODES.BAD_REQUEST,
      ERROR_MESSAGE.CHECK_ACCOUNT_TEXT
    );
  }

  try {
    const existsAccount = await User.exists({ account });
    if (existsAccount) {
      throw createError(STATUS_CODES.BAD_REQUEST, ERROR_MESSAGE.EXIST_ACCOUNT);
    }

    const user = await User.create({
      email,
      password,
      username,
      account,
      intro,
      image,
    });

    res.json({ message: "회원가입 성공", user });
  } catch (error) {
    next(error);
  }
};
