"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _common = require("./common");
var _userModel = _interopRequireDefault(require("../models/userModel"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var router = _express.default.Router();
router.get("/user", async (req, res, next) => {
  const user = req.session.user;
  if (user) {
    res.send((0, _common.responseFormat)({
      user: user
    }));
  } else {
    res.send((0, _common.responseFormat)({
      user: null
    }));
  }
});
router.post("/signUp", async (req, res, next) => {
  const silence = new _userModel.default({
    username: req.body.username,
    password: req.body.password
  });
  const findResult = await _userModel.default.find(req.body);
  if (findResult.length > 0) {
    res.send((0, _common.responseFormat)("user is exist"));
  } else {
    silence.save();
    res.send((0, _common.responseFormat)("ok"));
  }
});
router.get("/allUser", async (req, res, next) => {
  const user = await _userModel.default.find({});
  console.log(user);
  if (user.length > 0) {
    res.send((0, _common.responseFormat)({
      user: user
    }));
  } else {
    res.send((0, _common.responseFormat)({
      user: null
    }));
  }
});
router.post("/login", _express.default.urlencoded({
  extended: false
}), async (req, res) => {
  try {
    const {
      username,
      password
    } = req.body;
    const user = await _userModel.default.findOne({
      username
    });
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
          res.send((0, _common.responseFormat)("Login successful"));
        });
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
router.post("/logout", function (req, res, next) {
  req.session.user = null;
  req.session.save(function (err) {});
  res.send((0, _common.responseFormat)("Logout successful"));
});
var _default = router;
exports.default = _default;