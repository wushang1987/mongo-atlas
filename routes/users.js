import express from "express";
import { responseFormat } from "./common";
import User from "../models/userModel";

var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/add", async (req, res, next) => {
  const silence = new User({
    userName: req.body.userName,
    email: req.body.email,
  });
  const findResult = await User.find(req.body.userName);
  if (findResult.length > 0) {
    res.send(responseFormat("user is exist"));
  } else {
    silence.save();
    res.send(responseFormat("ok"));
  }
});

export default router;
