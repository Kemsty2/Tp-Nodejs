var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHsb = require('express-handlebars');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var paypal = require('paypal-rest-sdk');
var options = {
    useMongoClient: true
};


var index = require('./routes/index');
var userRoute = require('./routes/user');

paypal.configure({
    'mode': 'sandbox',
    'client_id': 'AZMgKtYEfePp339pwSDMA54z8WAe1lMgJCjaqhJBXQq-gPl6vPjmSGajK25B6kpqz-KXWgh-I_7n-q2y',
    'client_secret': 'EF4md0NYiMmEqp-IaOH1OmSWfs7REtkHGC1hLX_W3be-u2glSj-_JvW1ltbvxjPxymkgNDOErdxqDSZi'
});

var app = express();

mongoose.connect('mongodb://localhost/shopping', options);
require('./config/passport');

// view engine setup
app.engine('.hbs', expressHsb({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', 'hbs');

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
    store: new MongoStore({ mongooseConnection: mongoose.connection}),
    cookie: { maxAge: 100 * 60 * 1000 }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    next();
});

app.use('/user', userRoute);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
