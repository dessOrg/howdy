
var express = require('express');
var router = express.Router();
var Product = require('../models/products');
var User = require('../models/user');
var Cart = require('../models/cart');
var Order = require('../models/order');

module.exports = function(app){

    app.get('/', function(req, res){
      var cartProducts = {};
      var totalQty = 0;
      if (!req.session.cart) {
        Product.find({}, function(err, hproducts){
          if(err) return err;
          res.render('pages/index.ejs', {
            products : null,
            hproducts : hproducts
                });
          });
      }else {
        Product.find({}, function(err, hproducts){
          if(err) return err;
          var cart = new Cart(req.session.cart);
          var products = cart.generateArray();
          res.render('pages/index.ejs', {
            products,
            totalPrice: cart.totalPrice,
            hproducts : hproducts
                });
          });
      }


  });

app.get('/home', function(req, res) {



  })

app.get('/vegetables', function(req,res){
  if (!req.session.cart) {
    Product.find({category:"vegetables"},function(err, hproducts){
      if(err) return err;
      res.render('pages/vegetables.ejs',{
        products : null,
        hproducts : hproducts
      });
    });
  }else {
    Product.find({category:"vegetables"},function(err, hproducts){
      if(err) return err;
      var cart = new Cart(req.session.cart);
      var products = cart.generateArray();

      res.render('pages/vegetables.ejs',{
        products,
        totalPrice: cart.totalPrice,
        hproducts : hproducts
      });
    });
  }

  });

app.get('/fruits', function(req, res){
  if (!req.session.cart) {
    Product.find({category:"fruits"},function(err, hproducts){
      if(err) return err;
      res.render('pages/fruits.ejs',{
        products : null,
        hproducts : hproducts
      });
    });
  }else {
    Product.find({category:"fruits"},function(err, hproducts){
      if(err) return err;
      var cart = new Cart(req.session.cart);
      var products = cart.generateArray();
      res.render('pages/fruits.ejs',{
        products,
        totalPrice: cart.totalPrice,
        hproducts : hproducts
      });
    });
  }
});

app.get('/kitchen', function(req, res){
  if (!req.session.cart) {
    Product.find({category:"kitchen"},function(err, hproducts){
      if(err) return err;
      res.render('pages/kitchen.ejs',{
        products : null,
        hproducts : hproducts
      });
    });
  }else {
    Product.find({category:"kitchen"},function(err, hproducts){
      if(err) return err;
      var cart = new Cart(req.session.cart);
      var products = cart.generateArray();

      res.render('pages/kitchen.ejs',{
        products,
        totalPrice: cart.totalPrice,
        hproducts : hproducts
      });
    });
  }
});

app.get('/staples', function(req, res){
  if (!req.session.cart) {
    Product.find({category:"staples"},function(err, hproducts){
      if(err) return err;
      res.render('pages/staples.ejs',{
        products : null,
        hproducts : hproducts
      });
    });
  }else {
    Product.find({category:"staples"},function(err, hproducts){
      if(err) return err;
      var cart = new Cart(req.session.cart);
      var products = cart.generateArray();
      res.render('pages/staples.ejs',{
        products,
        totalPrice: cart.totalPrice,
        hproducts : hproducts
      });
    });
  }
});

app.get('product', function(req, res){
  res.render('pages/product.ejs');
});

app.get('/pcare', function(req, res){
  if (!req.session.cart) {
    Product.find({category:"pcare"},function(err, hproducts){
      if(err) return err;
      res.render('pages/pcare.ejs',{
        products : null,
        hproducts : hproducts
      });
    });
  }else {
    Product.find({category:"pcare"},function(err, hproducts){
      if(err) return err;
      var cart = new Cart(req.session.cart);
      var products = cart.generateArray();
      res.render('pages/pcare.ejs',{
        products,
        totalPrice: cart.totalPrice,
        hproducts : hproducts
      });
    });
  }
});

app.get('/contact', function(req, res){
  Order.find({}, function(err, orders) {
    if (err) return err;

    var count = orders.length;
  res.render('pages/contact.ejs', count);
});
});

app.get('/about', function(req, res){
  Order.find({status : "pending"}, function(err, orders) {
    if (err) return err;

    var count = orders.length;
  res.render('pages/about.ejs', count);
});
});

app.get('/dashboard', function(req, res){

    User.find({role : "normal"}, function(err, users){
      if(err) return err;

      Order.find({status : "pending"}, function(err, orders) {
        if (err) return err;

        var count = orders.length;
         res.render('admin/dashboard.ejs', {
         count,
        users : users
      });
    });
});
});

app.get('/add-item', function(req, res){

  Order.find({status : "pending"}, function(err, orders) {
    if (err) return err;

    var count = orders.length;
     res.render('admin/add-item.ejs', {
     count
      });
});

});



app.get('/admin-vegetables', function(req, res){

    Product.find({category:"vegetables"},function(err, products){
      if(err) return err;

      Order.find({status : "pending"}, function(err, orders) {
        if (err) return err;

        var count = orders.length;
        res.render('admin/admin-vegetables.ejs',{
          count, products:products
        });
    });

    });

});

app.get('/admin-fruits', function(req, res){
  Product.find({category: "fruits"}, function(err, products) {
    if(err) return err;

    Order.find({status : "pending"}, function(err, orders) {
      if (err) return err;

      var count = orders.length;
      res.render('admin/admin-fruits.ejs',{
        count, products:products
      });
  });
  });
  });

app.get('/admin-kitchen', function(req, res){
  Product.find({category: "kitchen"}, function(err, products) {
    if(err) return err;

    Order.find({status : "pending"}, function(err, orders) {
      if (err) return err;

      var count = orders.length;
      res.render('admin/admin-kitchen.ejs',{
        count, products:products
      });
  });
});
});

app.get('/admin-staples', function(req, res){
  Product.find({category: "staples"}, function(err, products) {
    if(err) return err;

    Order.find({status : "pending"}, function(err, orders) {
      if (err) return err;

      var count = orders.length;
      res.render('admin/admin-staples.ejs',{
        count, products:products
      });
  });
  })

});

app.get('/admin-pcare', function(req, res){
  Product.find({category: "pcare"}, function(err, products) {
    if(err) return err;

    Order.find({status : "pending"}, function(err, orders) {
      if (err) return err;

      var count = orders.length;
      res.render('admin/admin-pcare.ejs',{
        count, products:products
      });
  });
  })

});


};
