import express, { json } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import logger from 'morgan'
import cookieParser from 'cookie-parser'

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";

const app = express();

app.use(json())

const PORT = process.env.PORT || 3000;




main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  const kittySchema = new mongoose.Schema({
    name: String
  });
  
  // NOTE: methods must be added to the schema before compiling it with mongoose.model()
  kittySchema.methods.speak = function speak() {
    const greeting = this.name
      ? 'Meow name is ' + this.name
      : 'I don\'t have a name';
    console.log(greeting);
  };
  
  const Kitten = mongoose.model('Kitten', kittySchema);
  
  const silence = new Kitten({ name: 'Silence' });
  console.log(silence.name); // 'Silence'
  
  
  const fluffy = new Kitten({ name: 'fluffy' });
  
  await fluffy.save();
  fluffy.speak();
}


app.get('/', async (req, res) => {
    res.json({ status: true, message: "Our node.js app works" })
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));