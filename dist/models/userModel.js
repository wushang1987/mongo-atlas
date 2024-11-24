"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const schema = _mongoose.default.Schema;
const UserSchema = new schema({
  username: String,
  password: String
});
UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  _bcrypt.default.genSalt(10, (err, salt) => {
    if (err) return next(err);
    _bcrypt.default.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  _bcrypt.default.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};
var _default = _mongoose.default.model("User", UserSchema);
exports.default = _default;