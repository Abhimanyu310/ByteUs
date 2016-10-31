var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');

var session = require('express-session');
var flash = require('connect-flash');
var validator = require('express-validator');
var passport = require('passport');


// var SequelStore = require('sequelstore-connect')(session);
// var SequelizeStore = require('connect-session-sequelize')(session.Store);
// const SequelizeConnection = require ('./models').sequelize;

// var Sequelize = require('sequelize');
// var sequelize = new Sequelize(
//     "byteus",
//     "root",
//     "silencer", {
//         "dialect": "mysql",
//         // "storage": "./session.mysql"
//     });


var routes = require('./routes/index');
var users = require('./routes/users');
var projects = require('./routes/projects');
var applications = require('./routes/applications');

var app = express();

dotenv.load();


require('./config/passport');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(validator());
app.use(cookieParser());
app.use(session({
    secret: 'mysupersecret',
    resave: false,
    saveUninitialized: false,
    // store: new SequelizeStore({database: sequelize}),
    cookie: {maxAge: 180 * 60 * 1000}
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());



app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE');
  next();
});


app.use('/user', users);
app.use('/application', applications);
app.use('/project', projects);
app.use('/', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
