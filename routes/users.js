import express from "express";

const router = express.Router();

router.get("/login", function (req, res, next) {
  res.send("make login router");
});

export default router;
