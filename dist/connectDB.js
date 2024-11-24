"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function connectDB() {
  await _mongoose.default.connect("mongodb://127.0.0.1:27017/authTest");
  const db = _mongoose.default.connection;
  db.on("connection", stream => {
    console.log("someone connected!");
  });
  db.once("connection", stream => {
    console.log("Ah, we have our first user!");
  });
}
var _default = connectDB;
exports.default = _default;