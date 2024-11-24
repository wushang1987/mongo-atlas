import express from "express";
import { responseFormat } from "./common";
import User from "../models/userModel";

var router = express.Router();

router.get("/user", async (req, res, next) => {
  const user = req.session.user;
  if (user) {
    res.send(responseFormat({ user: user }));
  } else {
    res.send(responseFormat({ user: null }));
  }
});

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

router.get("/allUser", async (req, res, next) => {
  const user = await User.find({});
  console.log(user);
  if (user.length > 0) {
    res.send(responseFormat({ user: user }));
  } else {
    res.send(responseFormat({ user: null }));
  }
});

router.post(
  "/login",
  express.urlencoded({ extended: false }),
  async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).send("Invalid username or password");
      }
      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          throw err;
        }
        if (!isMatch) {
          return res.status(401).send("Invalid username or password");
        }
        req.session.regenerate(function (err) {
          if (err) next(err);

          req.session.user = user;
          req.session.save(function (err) {
            if (err) return next(err);
            res.send(responseFormat("Login successful"));
          });
        });
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

router.post("/logout", function (req, res, next) {
  req.session.user = null;
  req.session.save(function (err) {});
  res.send(responseFormat("Logout successful"));
});

export default router;
