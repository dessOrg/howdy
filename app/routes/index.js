var express = require('express');
var app = express();


module.exports = function(app){

app.get('/', function(req, res){
  res.render('pages/index.ejs')
});

app.get('/vegetables', function(req, res){
  res.render('pages/vegetables.ejs');
});

app.get('/fruits', function(req, res){
  res.render('pages/fruits.ejs');
});

app.get('/kitchen', function(req, res){
  res.render('pages/kitchen.ejs');
});

app.get('/staples', function(req, res){
  res.render('pages/staples.ejs');
});

app.get('product', function(req, res){
  res.render('pages/product.ejs');
});

app.get('/pcare', function(req, res){
  res.render('pages/pcare.ejs');
});

app.get('/login', function(req, res){
  res.render('pages/login.ejs');
});

app.get('/register', function(req, res){
  res.render('pages/register.ejs');
});

app.get('/contact', function(req, res){
  res.render('pages/contact.ejs');
});

app.get('/dashboard', function(req, res){
  res.render('admin/dashboard.ejs');
});

app.get('/add-item', function(req, res){
  res.render('admin/add-item.ejs');
});

app.get('/admin-vegetables', function(req, res){
  res.render('admin/admin-vegetables.ejs');
});

};
