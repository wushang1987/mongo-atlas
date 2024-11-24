import express, { json, urlencoded } from "express";
import path from "path";
import logger from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import cors from "cors";

import indexRouter from "./routes/index";
import authRouter from "./routes/auth";
import postRouter from "./routes/post";

import connectDB from "./connectDB";

connectDB();
const app = express();

const corsOptions = {
  origin: "http://47.121.180.10:3000/",
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));

app.use(
  session({
    secret: "dcc",
    resave: false,
    saveUninitialized: true,
    // cookie: { maxAge: 60000, secure: false }, // 设置 cookie 过期时间
  })
);

const PORT = process.env.PORT || 3000;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/post", postRouter);

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
