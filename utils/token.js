import jwt from "jsonwebtoken";
import { REFRESH_DURATION, ACCESS_DURATION } from "../config/token";
import { TIMES } from "../constants/time";

const ISSUER = "doggyNkitty";

export const generateToken = (userId, isRefreshToken = false) => {
  const secret = isRefreshToken
    ? process.env.REFRESH_TOKEN_SECRET
    : process.env.ACCESS_TOKEN_SECRET;

  const duration = isRefreshToken ? REFRESH_DURATION : ACCESS_DURATION;
  const currentTime = Math.floor(Date.now() / TIMES.ONE_SECOND_MS);
  const exp = currentTime + duration;

  const token = jwt.sign({ userId, exp }, secret, {
    issuer: ISSUER,
    algorithm: process.env.JWT_ALGORITHM,
  });

  return token;
};

export const parseBearer = (authorization) => {
  const BEARER = "Bearer ";

  if (!authorization || !authorization.startsWith(BEARER)) {
    return null;
  }

  return authorization.slice(BEARER.length);
};
