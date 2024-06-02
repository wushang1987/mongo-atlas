import express from "express";
import { responseFormat } from "./common";
import User from "../models/userModel";

var router = express.Router();

router.post("/signUp", async (req, res, next) => {
  const silence = new User({
    username: req.body.username,
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

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(401).send("Invalid username or password");
    user.comparePassword(password, (err, isMatch) => {
      if (err) throw err;
      if (!isMatch) return res.status(401).send("Invalid username or password");
      // 登录成功，设置 session
      req.session.user = user._id;
      res.send("Login successful");
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

export default router;
