var express = require("express");
var app = express();

var path = require("path");
var bodyParser = require("body-parser");
var cookieParser =  require('cookie-parser');
var morgan = require('morgan');

var fs = require('fs');
var engine = require('ejs-locals');

//set static folder.
app.use(express.static(__dirname + '/assets'));

//use ejs-localsfor ejs template
app.engine('ejs', engine);
//view engine
app.set('view engine', 'ejs');

//body-parser and cookie-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieParser());
app.use(morgan('dev'));

//routes middleware
require('./app/routes/index.js')(app);


app.set('port',(process.env.PORT || 8000));
app.listen(app.get('port'),function(){
  console.log('Running on port '+app.get('port'));
});
