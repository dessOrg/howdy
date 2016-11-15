var express = require('express');
var app = express();
var Order = require('../models/order');
var Cart = require('../models/cart');
var Product = require('../models/products');

module.exports = function(app) {

  app.post("/cart",isLoggedIn, function(req, res){
    var user=req.user;
    var name=req.body.name;
    var paymentMode=req.body.paymentMode;
    var phone=req.body.phone;
    var residence=req.body.residence;
    var street=req.body.street;
    var building=req.body.building;
    //
    var status = "pending";
    var products = new Cart(req.session.cart);
    var cart = products.generateArray();
    var totalQty = products.totalQty;
    var totalPrice = products.totalPrice;
    var order = new Order();
      order.user = user;
      order.name = name;
      order.paymentMode = paymentMode;
      order.phone = phone;
      order.residence = residence;
      order.street = street;
      order.building = building;
      order.cart = cart;
      order.status = status;
      order.totalQty = totalQty;
      order.totalPrice = totalPrice;

   order.save(function(err, order){
     if(err) return err;

     console.log("order" + order);

     res.redirect('/api/profile')
   });
req.session = null // Deletes the cookie.
 });

 app.post("/art",isLoggedIn, function(req, res){
   var products = new Cart(req.session.cart);
   var cart = products.totalQty;
   console.log(products);
   });


 app.get('/api/profile', isLoggedIn, function(req, res, next) {
   if (!req.session.cart) {
     Order.find({user : req.user}, function(err, orders) {
       if (err) return err;

      var cart;
       orders.forEach(function(order) {
         cart =  new Cart(order.cart);
         order.items = cart.generateArray();

       });
        console.log(orders);
       res.render('pages/profile.ejs', {products : null, orders : orders});
     });

   }else {
     var cart = new Cart(req.session.cart);
     var products = cart.generateArray();
     Order.find({user : req.user}, function(err, orders) {
       if (err) return err;

       var cart;
       orders.forEach(function(order) {
         cart =  new Cart(order.cart);
         order.items = cart.generateArray();
       });
       res.render('pages/profile.ejs', {products, totalPrice: cart.totalPrice, orders : orders});
     });
   }

 });

 app.get('/admin/orders', isAdmin, function(req, res, next) {

     Order.find({status : "pending"}, function(err, orders) {
       if (err) return err;

      var cart;
       orders.forEach(function(order) {
         cart =  new Cart(order.cart);
         order.items = cart.generateArray();
       });
      var count = orders.length;
      res.render('admin/orders.ejs', { orders : orders, count : count});
     });

 });

 app.get('/admin/sales', isAdmin, function(req, res, next) {

     Order.find({status : "dispatched"}, function(err, orders) {
       if (err) return err;

      var cart;
       orders.forEach(function(order) {
         cart =  new Cart(order.cart);
         order.items = cart.generateArray();
       });

      Order.find({status : "pending"}, function(err, pOrders) {
        if (err) return err;
        var count = pOrders.length;
        var salesCount = orders.length;
      res.render('admin/sales.ejs', { orders, salesCount, count});
     });
});
 });


app.get("/add-to-cart/:id", function(req, res){
   var productId = req.params.id;
   var cart = new Cart(req.session.cart ? req.session.cart : {});
   Product.findById(productId, function(err, product) {
     if (err) {
         console.log("its getting the err");
         return res.redirect("/");
     }else {
       cart.add(product, product.id);
       req.session.cart = cart;
       var category = product.category;
       if (category == "vegetables") {
         res.redirect("/vegetables");
       }
       if (category == "fruits") {
         res.redirect("/fruits");
       }
       if (category == "staples") {
         res.redirect("/staples");
       }
       if (category == "kitchen") {
         res.redirect("/kitchen");
       }
       if (category == "pcare") {
         res.redirect("/pcare");
       }
     }
   })
});

app.get("/addItemToCart/:id", function(req, res){
   var productId = req.params.id;
   var cart = new Cart(req.session.cart ? req.session.cart : {});
   Product.findById(productId, function(err, product) {
     if (err) {
         console.log("its getting the err");
         return res.redirect("/cart");
     }else {
       cart.add(product, product.id);
       req.session.cart = cart;
       res.redirect("/cart");
     }
})
});

app.get('/cart', function(req, res){
   if (!req.session.cart) {
       res.render('pages/cart.ejs', {products : null});
   }
   var cart = new Cart(req.session.cart);
   var products = cart.generateArray();
   console.log(products);
   res.render('pages/cart.ejs', {products, totalPrice: cart.totalPrice});

});

app.get('/checkout', isLoggedIn, function(req, res){
  if (!req.session.cart) {
      res.render('pages/cart.ejs', {products : null});
  }
  var cart = new Cart(req.session.cart);
  var products = cart.generateArray();
  console.log(products);
  res.render('pages/checkout.ejs', {products, totalPrice: cart.totalPrice});
});

app.post('/dispatch/:id', function(req,res) {
  var order = new Order();
  Order.findById(req.params.id, function(err, order) {
    if (err) return err;

    order.status = "dispatched"
    order.save(function(err) {
      if (err) return err;

      res.redirect('/admin/orders');
    })

  })
})


};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.oldUrl = req.url;
  res.redirect('/login');
};

function isAdmin(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.oldUrl = req.url;
  res.redirect('/login');
}
