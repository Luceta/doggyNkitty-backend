import createError from "http-errors";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import User from "../model/user";
import { STATUS_CODES, ERROR_MESSAGE } from "../constants";
import { parseBearer } from "../utils/token";

const verifyAuthorization = (req, res, next) => {
  const { authorization } = req.headers;
  const token = parseBearer(authorization);
  const secret = process.env.ACCESS_TOKEN_SECRET;

  if (!token) {
    console.error(
      `Failed to parse Bearer token from ${req.headers.authorization}`
    );
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

    return decode;
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return next(
        createError(
          STATUS_CODES.UNAUTHORIZED,
          ERROR_MESSAGE.TOKEN.INVALID_TOKEN
        )
      );
    }

    if (error instanceof jwt.TokenExpiredError) {
      return next(
        createError(
          STATUS_CODES.UNAUTHORIZED,
          ERROR_MESSAGE.TOKEN.EXPIRED_TOKEN
        )
      );
    }

    return next(error);
  }
};
