var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const winston = require('./config/winston');
var morgan = require('morgan');
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
var userRouter = require('./routes/user');
var threadRouter = require('./routes/thread');
var loginRouter = require('./routes/login');

var app = express();

// Logging
if (process.env.NODE_ENV === "development") {
	app.use(morgan('combined', { stream: winston.stream }));
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
		store: pool.sessionStore,
		// secure: true, // requires an https connection
		resave: false,
		saveUninitialized: false,
		cookie: {
		  maxAge: 24 * 60 * 60 * 1000, // 24 horas más
		},
	})
);

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/thread', threadRouter);
app.use('/login', loginRouter);

// app.get('/logout', function(req, res){
// 	req.session.destroy(function(){
// 	// console.log("user logged out.")
// 	});
// 	res.redirect('/login');
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// add this line to include winston logging
	winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  // render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
