require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const  mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');


//imports from folder in app
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users/userRouter');
const jwtStrategyCheck = require('./routes/lib/passport/userPassport');
var app = express();

//connecting to backend database
mongoose.connect(process.env.MONGO_DB,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
}).then(()=>{
  console.log("MongoDB Connect");
}).catch((e)=>{
  console.log(e);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(passport.initialize());
passport.use("jwt-user",jwtStrategyCheck);

app.use('/', indexRouter);
app.use('/api/users', usersRouter);

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
  res.json({message:"APP Error", error: err.message});
});

module.exports = app;
