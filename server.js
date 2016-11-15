var express = require('express');
var app     = express();

var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local'),Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var mongostore = require('connect-mongo/es5')(session);
var multer = require('multer');
var fs = require('fs');
var engine = require('ejs-locals');

var pictures = multer({ dest: 'pictures/' });

var db = require('./config/database.js');
mongoose.Promise = global.Promise;
mongoose.connect(db.url);

//set static folder.
app.use(express.static(__dirname + '/assets'));
app.use('/uploads', express.static('uploads'));
app.use('/pictures', express.static('pictures'));
app.use('/product/', express.static(__dirname + '/assets/'));
app.use('/product/', express.static(__dirname + '/'));
app.use('/adproduct/', express.static(__dirname + '/assets/'));
app.use('/updatepro/', express.static(__dirname + '/assets/'));
app.use('/api/profile', express.static(__dirname + '/assets/'));
app.use('/admin/orders', express.static(__dirname + '/assets/'));
app.use('/admin/sales', express.static(__dirname + '/assets/'));

//use ejs-localsfor ejs template
app.engine('ejs', engine);
//view engine
app.set('view engine', 'ejs');

//body-parser and cookie-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(expressValidator());
app.use(cookieParser());
app.use(morgan('dev'));

//express session
app.use(session({
  secret: 'secret',
  saveUninitialized: false,
  resave: false,
  store: new mongostore({url: db.url, autoReconnect: true })
}));

//pasport initialize
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

//express validator
app.use(expressValidator({
  errorFormatter:function(param, msg, value){
    var namespace = param.split('.')
    , root = namespace.shift()
    , formParam = root;
    while(namespace.length){
      formParam += '['+ namespace.shift()+ ']';
    }
    return{
      param : formParam,
      msg : msg,
      value : value
    };
  }
}));
//connect-flash
app.use(flash());

//global vars
app.use(function(req, res, next){
  res.locals.success_msg =  req.flash('success_msg');
  res.locals.error_msg =  req.flash('error_msg');
  res.locals.error =  req.flash('error');
  res.locals.user =  req.user;
  res.locals.session = req.session;
  next();
});

//routes middleware
require('./app/routes/register.js')(app);
require('./app/routes/index.js')(app);
require('./app/routes/products.js')(app);
require('./app/routes/user.js')(app);
require('./app/routes/sessions.js')(app);
require('./app/routes/cart.js')(app);


app.set('port',(process.env.PORT || 8000));
app.listen(app.get('port'),function(){
  console.log('Running on port '+app.get('port'));
});

module.exports = app;
