import express from "express";
import { responseFormat } from "./common";
import User from "../models/userModel";

var router = express.Router();

router.post("/signUp", async (req, res, next) => {
  const silence = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });
  const findResult = await User.find(req.body);

  if (findResult.length > 0) {
    res.send(responseFormat("user is exist"));
  } else {
    silence.save();
    res.send(responseFormat("ok"));
  }
});

export default router;
