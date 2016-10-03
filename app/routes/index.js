var productRoutes = require('./products');

var express = require('express');
var router = express.Router();

module.exports = function(app){

app.get('/', function(req, res){
  res.render('pages/index')
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

app.get('/admin-fruits', function(req, res){
  res.render('admin/admin-fruits.ejs');
});

app.get('/admin-kitchen', function(req, res){
  res.render('admin/admin-kitchen.ejs');
});

app.get('/admin-staples', function(req, res){
  res.render('admin/admin-staples.ejs');
});

app.get('/admin-pcare', function(req, res){
  res.render('admin/admin-pcare.ejs');
});

//Create new product Item
app.post('/create', productRoutes.create);

};
