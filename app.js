import "dotenv/config";
import cors from "cors";
import express from "express";
import logger from "morgan";
import createError from "http-errors";
import cookieParser from "cookie-parser";
import routers from "./routes";
import "./db";

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(routers);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.log(err)
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
