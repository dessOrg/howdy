
var express = require('express');
var router = express.Router();
var Product = require('../models/products');

module.exports = function(app){

app.get('/', function(req, res){
  res.render('pages/index')
});

app.get('/vegetables', function(req,res){
    Product.find({category:"vegetables"},function(err, products){
      if(err) return err;
      console.log(products);

    res.render('pages/vegetables.ejs',{
      products:products,
      page:'vegetables'
      });
    });
  });

app.get('/fruits', function(req, res){
  Product.find({category:"fruits"},function(err, products){
    if(err) return err;
    console.log(products);

  res.render('pages/fruits.ejs',{
    products:products,
    page:'fruits'
    });
  });
});

app.get('/kitchen', function(req, res){
  Product.find({category:"kitchen"},function(err, products){
    if(err) return err;
    console.log(products);

  res.render('pages/kitchen.ejs',{
    products:products,
    page:'kitchen'
    });
  });
});

app.get('/staples', function(req, res){
  Product.find({category:"staples"},function(err, products){
    if(err) return err;
    console.log(products);

  res.render('pages/staples.ejs',{
    products:products,
    page:'staples'
    });
  });
});

app.get('product', function(req, res){
  res.render('pages/product.ejs');
});

app.get('/pcare', function(req, res){
  Product.find({category:"pcare"},function(err, products){
    if(err) return err;
    console.log(products);

  res.render('pages/pcare.ejs',{
    products:products,
    page:'pcare'
    });
  });
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
   Product.find({category: "vegetables"}, function(err, products) {
     if(err) return err;

     res.render('admin/admin-vegetables.ejs', {products:products})
   })

});

app.get('/admin-fruits', function(req, res){
  Product.find({category: "fruits"}, function(err, products) {
    if(err) return err;

    res.render('admin/admin-fruits.ejs', {products:products})
  })

  });

app.get('/admin-kitchen', function(req, res){
  Product.find({category: "kitchen"}, function(err, products) {
    if(err) return err;

    res.render('admin/admin-kitchen.ejs', {products:products})
  })

});

app.get('/admin-staples', function(req, res){
  Product.find({category: "staples"}, function(err, products) {
    if(err) return err;

    res.render('admin/admin-staples.ejs', {products:products})
  })

});

app.get('/admin-pcare', function(req, res){
  Product.find({category: "pcare"}, function(err, products) {
    if(err) return err;

    res.render('admin/admin-pcare.ejs', {products:products})
  })

});


};
