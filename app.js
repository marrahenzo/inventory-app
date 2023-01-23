var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let compression = require('compression');
let helmet = require('helmet');
require('dotenv').config();

var indexRouter = require('./routes/index');
let gamesRouter = require('./routes/games');
let gameCopiesRouter = require('./routes/gameCopies');
let genresRouter = require('./routes/genres');
let platformsRouter = require('./routes/platforms');
let publishersRouter = require('./routes/publishers');
let ageRatingsRouter = require('./routes/ageRatings');
let developersRouter = require('./routes/developers');

var app = express();

const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connecion error: '));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(helmet());
app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/game', gamesRouter);
app.use('/gamecopy', gameCopiesRouter);
app.use('/genre', genresRouter);
app.use('/platform', platformsRouter);
app.use('/publisher', publishersRouter);
app.use('/rating', ageRatingsRouter);
app.use('/developer', developersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
