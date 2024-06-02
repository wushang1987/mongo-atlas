import express from "express";
import { responseFormat } from "./common";
import User from "../models/userModel";

var router = express.Router();

router.get("/user", async (req, res, next) => {
  const user = req.session.user;
  if (user) {
    // 如果用户已登录，显示用户信息
    res.send(responseFormat({ user: user })); // 假设你使用某种模板引擎（如 Pug, EJS 等）
  } else {
    // 如果用户未登录，显示未登录的内容
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
        // req.session.userId = user.id;
        // res.send("Login successful");
        // return res.redirect("/");

        req.session.regenerate(function (err) {
          if (err) next(err);

          // store user information in session, typically a user id
          req.session.user = user;

          // save the session before redirection to ensure page
          // load does not happen before session is saved
          req.session.save(function (err) {
            if (err) return next(err);

            // res.redirect("/");
            res.send("Login successful");
          });
        });

        // console.log(req.session);
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

export default router;
