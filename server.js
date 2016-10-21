var express = require("express");
var app = express();

var path = require("path");
var bodyParser = require("body-parser");
var expressValidator = require('express-validator');
var cookieParser =  require('cookie-parser');
var morgan = require('morgan');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var multer = require('multer');
var fs = require('fs');
var engine = require('ejs-locals');


var pictures = multer({ dest: 'pictures/' });

var db = require('./config/database.js');
mongoose.connect(db.url);

//set static folder.
app.use(express.static(__dirname + '/assets'));
app.use('/uploads', express.static('uploads'));
app.use('/pictures', express.static('pictures'));
app.use('/product/', express.static(__dirname + '/assets/'));
app.use('/product/', express.static(__dirname + '/'));
app.use('/adproduct/', express.static(__dirname + '/assets/'));
app.use('/updatepro/', express.static(__dirname + '/assets/'));

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

//routes middleware
//require('./app/routes/home.js')(app);
require('./app/routes/index.js')(app);
require('./app/routes/products.js')(app);

app.set('port',(process.env.PORT || 8000));
app.listen(app.get('port'),function(){
  console.log('Running on port '+app.get('port'));
});

module.exports = app;
