import express from "express";
import { responseFormat } from "./common";
import User from "../models/userModel";

var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/add", function (req, res, next) {
  const silence = new User({
    userName: req.body.userName,
    email: req.body.email,
  });
  silence.save();
  res.send(responseFormat("ok"));
});

export default router;
