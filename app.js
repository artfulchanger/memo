var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');
var flash = require('connect-flash');

var dbConfig = require('./config/database');
var mongoose = require('mongoose');
var passport = require('passport');
var expressSession = require('express-session');

var app = express();

// db
mongoose.connect(dbConfig.url);
require('./config/passport')(passport); // pass passport for configuration

// view engine setup
// This is where all the magic happens!
app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// Swig will cache templates for you, but you can disable
// that and use\ Express's caching instead, if you like:
app.set('view cache', false);
// To disable Swig's cache, do the following:
swig.setDefaults({ cache: false });
// NOTE: You should always cache templates in a production environment.
// Don't leave both of these to `false` in production!

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.png'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuring Passport
app.use(expressSession({
    secret: 'mySecretKey',
    saveUninitialized: true,
    resave: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport    

module.exports = app;
