"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const schema = _mongoose.default.Schema;
const PostSchema = new schema({
  title: String,
  content: Object,
  createTime: Date,
  updateTime: Date
});
var _default = _mongoose.default.model("Post", PostSchema);
exports.default = _default;