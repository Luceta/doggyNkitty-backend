import jwt from "jsonwebtoken";
import { REFRESH_DURATION, ACCESS_DURATION } from "../constants/time";

const ISSUER = "doggyNkitty";

export const generateToken = (userId, isRefreshToken = false) => {
  const secret = isRefreshToken
    ? process.env.REFRESH_TOKEN_SECRET
    : process.env.ACCESS_TOKEN_SECRET;

  const expires = isRefreshToken ? REFRESH_DURATION : ACCESS_DURATION;

  const token = jwt.sign({ userId }, secret, {
    issuer: ISSUER,
    algorithm: process.env.JWT_ALGORITHM,
    expiresIN: `${expires}`,
  });

  return token;
};

export const parseBearer = (authorization) => {
  const BEARER = "Bearer ";
  if (!authorization || authorization.startsWith(BEARER)) {
    return null;
  }

  return authorization.slice(BEARER.length);
};
