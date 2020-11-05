var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// body parser
var bodyParser = require('body-parser')
// multer
var multer  = require('multer');
var upload = multer({ dest: './uploads' });
// dotenv
require('dotenv').config()
// winston
// session
var session = require('express-session');
// bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;
// mysql y mysql session
const pool = require("./config/db.js");
// passport
// handlebars
const hbs = require('express-handlebars');
// const hbsHelpers = require('./helpers/hbs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var threadRouter = require('./routes/thread');

var app = express();

// Logging
if (process.env.NODE_ENV === "development") {
	app.use(logger("dev"));
}

app.engine(
	"hbs",
	hbs({
		defaultLayout: 'layout',
		extname: ".hbs",
		helpers: require('./helpers/hbs')
	})
);
app.set('view engine', 'hbs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	session({
		secret: process.env.SECRET_KEY,
		// store: pool.sessionStore,
		resave: false,
		saveUninitialized: false,
		cookie: {
		  maxAge: 24 * 60 * 60 * 1000, // 24 horas más
		},
	})
);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/thread', threadRouter);

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

module.exports = app;
