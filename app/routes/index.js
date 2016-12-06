
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

          Product.find({category : "bestselling"}, function(err, bestselling){
            if(err) return err;

            Product.find({category : "special"}, function(err, special){
              if(err) return err;
              res.render('pages/index.ejs', {
                products : null,
                hproducts : hproducts,
                bestselling : bestselling,
                special : special
                    });

            });
          });


          });
      }else {
        Product.find({}, function(err, hproducts){
          if(err) return err;
          var cart = new Cart(req.session.cart);
          var products = cart.generateArray();
          Product.find({category : "bestselling"}, function(err, bestselling){
            if(err) return err;

            Product.find({category : "special"}, function(err, special){
              if(err) return err;
              res.render('pages/index.ejs', {
                products,
                totalPrice: cart.totalPrice,
                hproducts : hproducts,
                bestselling : bestselling,
                special : special
                    });

            });
          });

          });
      }


  });

app.get('/vegetables', function(req,res){
  if (!req.session.cart) {
    Product.find({category:"vegetables"},function(err, hproducts){
      if(err) return err;
      Product.find({category : "bestselling"}, function(err, bestselling){
        if(err) return err;

        Product.find({category : "special"}, function(err, special){
          if(err) return err;
          res.render('pages/vegetables.ejs', {
            products : null,
            hproducts : hproducts,
            bestselling : bestselling,
            special : special
                });

        });
      });

    });
  }else {
    Product.find({category:"vegetables"},function(err, hproducts){
      if(err) return err;
      var cart = new Cart(req.session.cart);
      var products = cart.generateArray();

      Product.find({category : "bestselling"}, function(err, bestselling){
        if(err) return err;

        Product.find({category : "special"}, function(err, special){
          if(err) return err;
          res.render('pages/vegetables.ejs', {
            products,
            totalPrice: cart.totalPrice,
            hproducts : hproducts,
            bestselling : bestselling,
            special : special
                });

        });
      });

  });
  }

  });

app.get('/fruits', function(req, res){
  if (!req.session.cart) {
    Product.find({category:"fruits"},function(err, hproducts){
      if(err) return err;
      Product.find({category : "bestselling"}, function(err, bestselling){
        if(err) return err;

        Product.find({category : "special"}, function(err, special){
          if(err) return err;
          res.render('pages/vegetables.ejs', {
            products : null,
            hproducts : hproducts,
            bestselling : bestselling,
            special : special
                });

        });
      });

    });
  }else {
    Product.find({category:"fruits"},function(err, hproducts){
      if(err) return err;
      var cart = new Cart(req.session.cart);
      var products = cart.generateArray();

      Product.find({category : "bestselling"}, function(err, bestselling){
        if(err) return err;

        Product.find({category : "special"}, function(err, special){
          if(err) return err;
          res.render('pages/vegetables.ejs', {
            products,
            totalPrice: cart.totalPrice,
            hproducts : hproducts,
            bestselling : bestselling,
            special : special
                });

        });
      });

  });
  }
});

app.get('/kitchen', function(req, res){
  if (!req.session.cart) {
    Product.find({category:"kitchen"},function(err, hproducts){
      if(err) return err;
      Product.find({category : "bestselling"}, function(err, bestselling){
        if(err) return err;

        Product.find({category : "special"}, function(err, special){
          if(err) return err;
          res.render('pages/vegetables.ejs', {
            products : null,
            hproducts : hproducts,
            bestselling : bestselling,
            special : special
                });

        });
      });

    });
  }else {
    Product.find({category:"kitchen"},function(err, hproducts){
      if(err) return err;
      var cart = new Cart(req.session.cart);
      var products = cart.generateArray();

      Product.find({category : "bestselling"}, function(err, bestselling){
        if(err) return err;

        Product.find({category : "special"}, function(err, special){
          if(err) return err;
          res.render('pages/vegetables.ejs', {
            products,
            totalPrice: cart.totalPrice,
            hproducts : hproducts,
            bestselling : bestselling,
            special : special
                });

        });
      });

  });
  }

});

app.get('/staples', function(req, res){
  if (!req.session.cart) {
    Product.find({category:"staples"},function(err, hproducts){
      if(err) return err;
      Product.find({category : "bestselling"}, function(err, bestselling){
        if(err) return err;

        Product.find({category : "special"}, function(err, special){
          if(err) return err;
          res.render('pages/vegetables.ejs', {
            products : null,
            hproducts : hproducts,
            bestselling : bestselling,
            special : special
                });

        });
      });

    });
  }else {
    Product.find({category:"staples"},function(err, hproducts){
      if(err) return err;
      var cart = new Cart(req.session.cart);
      var products = cart.generateArray();

      Product.find({category : "bestselling"}, function(err, bestselling){
        if(err) return err;

        Product.find({category : "special"}, function(err, special){
          if(err) return err;
          res.render('pages/vegetables.ejs', {
            products,
            totalPrice: cart.totalPrice,
            hproducts : hproducts,
            bestselling : bestselling,
            special : special
                });

        });
      });

  });
  }

});

app.get('/pcare', function(req, res){
  if (!req.session.cart) {
    Product.find({category:"pcare"},function(err, hproducts){
      if(err) return err;
      Product.find({category : "bestselling"}, function(err, bestselling){
        if(err) return err;

        Product.find({category : "special"}, function(err, special){
          if(err) return err;
          res.render('pages/vegetables.ejs', {
            products : null,
            hproducts : hproducts,
            bestselling : bestselling,
            special : special
                });

        });
      });

    });
  }else {
    Product.find({category:"pcare"},function(err, hproducts){
      if(err) return err;
      var cart = new Cart(req.session.cart);
      var products = cart.generateArray();

      Product.find({category : "bestselling"}, function(err, bestselling){
        if(err) return err;

        Product.find({category : "special"}, function(err, special){
          if(err) return err;
          res.render('pages/vegetables.ejs', {
            products,
            totalPrice: cart.totalPrice,
            hproducts : hproducts,
            bestselling : bestselling,
            special : special
                });

        });
      });

  });
  }

});

app.get('/contact', function(req, res){
  if (!req.session.cart) {

          res.render('pages/contact.ejs', {
            products : null
                      });

      }else {
    var cart = new Cart(req.session.cart);
      var products = cart.generateArray();
          res.render('pages/contact.ejs', {
            products,
            totalPrice: cart.totalPrice,
            });

}

});

app.get('/about', function(req, res){
  if (!req.session.cart) {

    Product.find({category : "bestselling"}, function(err, bestselling){
      if(err) return err;

      Product.find({category : "special"}, function(err, special){
        if(err) return err;
        res.render('pages/about.ejs', {
          products : null,
          bestselling : bestselling,
          special : special
              });

      });
    });
      }else {
    var cart = new Cart(req.session.cart);
      var products = cart.generateArray();
      Product.find({category : "bestselling"}, function(err, bestselling){
        if(err) return err;

        Product.find({category : "special"}, function(err, special){
          if(err) return err;
          res.render('pages/about.ejs', {
            products,
            totalPrice: cart.totalPrice,
            bestselling : bestselling,
            special : special
                });

        });
      });
  }

});

app.get('/faq', function(req, res){
  if (!req.session.cart) {

          res.render('pages/faq.ejs', {
            products : null
                      });

      }else {
    var cart = new Cart(req.session.cart);
      var products = cart.generateArray();
          res.render('pages/faq.ejs', {
            products,
            totalPrice: cart.totalPrice,
            });

}

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
      res.render('admin/admin-vegetables.ejs',{
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
      res.render('admin/admin-vegetables.ejs',{
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
      res.render('admin/admin-vegetables.ejs',{
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
      res.render('admin/admin-vegetables.ejs',{
        count, products:products
      });
  });
  })

});

app.get('/admin/specials', function(req, res){
  Product.find({category: "special"}, function(err, products) {
    if(err) return err;

    Order.find({status : "pending"}, function(err, orders) {
      if (err) return err;

      var count = orders.length;
      res.render('admin/admin-vegetables.ejs',{
        count, products:products
      });
  });
  })

});

app.get('/admin/bestselling', function(req, res){
  Product.find({category: "bestselling"}, function(err, products) {
    if(err) return err;
    Order.find({status : "pending"}, function(err, orders) {
      if (err) return err;

      var count = orders.length;
      res.render('admin/admin-vegetables.ejs',{
        count, products:products
      });
  });
  })

});

};
