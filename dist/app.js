"use strict";

var _express = _interopRequireWildcard(require("express"));
var _path = _interopRequireDefault(require("path"));
var _morgan = _interopRequireDefault(require("morgan"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _cors = _interopRequireDefault(require("cors"));
var _index = _interopRequireDefault(require("./routes/index"));
var _auth = _interopRequireDefault(require("./routes/auth"));
var _post = _interopRequireDefault(require("./routes/post"));
var _connectDB = _interopRequireDefault(require("./connectDB"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
(0, _connectDB.default)();
const app = (0, _express.default)();
const corsOptions = {
  origin: "http://47.121.180.10:3000/",
  optionsSuccessStatus: 200,
  credentials: true
};
app.use((0, _cors.default)(corsOptions));
app.use((0, _expressSession.default)({
  secret: "dcc",
  resave: false,
  saveUninitialized: true
  // cookie: { maxAge: 60000, secure: false }, // 设置 cookie 过期时间
}));

const PORT = process.env.PORT || 3000;

// view engine setup
app.set("views", _path.default.join(__dirname, "views"));
app.set("view engine", "jade");
app.use((0, _morgan.default)("dev"));
app.use((0, _express.json)());
app.use((0, _express.urlencoded)({
  extended: false
}));
app.use((0, _cookieParser.default)());
app.use(_express.default.static(_path.default.join(__dirname, "public")));
app.use("/", _index.default);
app.use("/auth", _auth.default);
app.use("/post", _post.default);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
app.listen(PORT, () => console.log(`App listening at port ${PORT}`));