import createError from "http-errors";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import User from "../model/user";
import { STATUS_CODES, ERROR_MESSAGE } from "../constants";
import { parseBearer } from "../utils/token";

export const verifyAuthorization = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = parseBearer(authorization);
  const secret = process.env.ACCESS_TOKEN_SECRET;

  if (!token) {
    return next(
      createError(STATUS_CODES.UNAUTHORIZED, ERROR_MESSAGE.TOKEN.INVALID_TOKEN)
    );
  }

  try {
    const decode = jwt.verify(token, secret);

    const user = await User.findById(decode.userId);
    if (!user) {
      return next(
        createError(
          STATUS_CODES.UNAUTHORIZED,
          ERROR_MESSAGE.LOGIN_IN.INVALID_USER
        )
      );
    }

    req.userId = decode.userId;
    next();

    return decode;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(
        createError(
          STATUS_CODES.UNAUTHORIZED,
          ERROR_MESSAGE.TOKEN.EXPIRED_TOKEN
        )
      );
    }
    if (error instanceof JsonWebTokenError) {
      return next(
        createError(
          STATUS_CODES.UNAUTHORIZED,
          ERROR_MESSAGE.TOKEN.INVALID_TOKEN
        )
      );
    }

    return next(error);
  }
};
