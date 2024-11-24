"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _common = require("./common");
var _postModel = _interopRequireDefault(require("../models/postModel"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var router = _express.default.Router();
router.post("/add", async (req, res, next) => {
  const silence = new _postModel.default({
    title: req.body.title,
    content: req.body.content,
    createTime: req.body.createTime,
    updateTime: req.body.updateTime
  });
  const findResult = await _postModel.default.find({
    title: req.body.title
  });
  console.log(findResult);
  if (findResult.length > 0) {
    res.send((0, _common.responseFormat)("post is exist"));
  } else {
    silence.save();
    res.send((0, _common.responseFormat)("ok"));
  }
});
router.get("/allPost", async (req, res, next) => {
  const post = await _postModel.default.find({});
  console.log(post);
  if (post.length > 0) {
    res.send((0, _common.responseFormat)({
      allPost: post
    }));
  } else {
    res.send((0, _common.responseFormat)({
      allPost: null
    }));
  }
});
var _default = router;
exports.default = _default;