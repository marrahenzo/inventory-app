var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
let gamesRouter = require('./routes/games');
let gameCopiesRouter = require('./routes/gameCopies');
let genresRouter = require('./routes/genres');
let platformsRouter = require('./routes/platforms');
let publishersRouter = require('./routes/publishers');
let ageRatingsRouter = require('./routes/ageRatings');
let developersRouter = require('./routes/developers');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/games', gamesRouter);
app.use('/copies', gameCopiesRouter);
app.use('/genres', genresRouter);
app.use('/platforms', platformsRouter);
app.use('/publishers', publishersRouter);
app.use('/ageratings', ageRatingsRouter);
app.use('/developers', developersRouter);

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
