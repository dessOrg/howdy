var express = require('express');
var app = express();


module.exports = function(app){

app.get('/', function(req, res){
  res.render('pages/index.ejs')
})

};
