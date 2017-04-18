// app/routes/projects.js
var express = require('express');
var app = express();
var url = require('url');
var base64url = require('base64url');
var multer = require('multer');
var fs = require('fs');
var pictures = multer({});
var Product = require('../models/products');
var Order = require('../models/order');
var Cart = require('../models/cart');
var mongoose = require('mongoose');

var upload = multer({ dest: 'uploads/' });

module.exports = function(app) {


    app.get('/product/:id',function(req, res) {
      var id = req.params.id;
      if (!req.session.cart) {

        Product.findById(id, function(err, hproduct){
          if(err) return err;

          var category = hproduct.category;

          Product.find({category : category}, function(err, hproducts) {
            if (err) return err;

            Product.find({category : "bestselling"}, function(err, bestselling){
              if (err) return err;
              res.render('pages/product.ejs',{
                products : null,
                hproduct : hproduct,
                hproducts : hproducts,
                bestselling : bestselling
              });
            });

          });
        });
      }else {
        Product.findById(id, function(err, hproduct){
          if(err) return err;
          var cart = new Cart(req.session.cart);
          var products = cart.generateArray();
          var category = hproduct.category;

          Product.find({category : category}, function(err, hproducts) {
            if (err) return err;

          Product.find({category : "bestselling"}, function(err, bestselling) {
              if (err) return err;

            res.render('pages/product.ejs',{
              products,
              totalPrice: cart.totalPrice,
              hproduct : hproduct,
              hproducts : hproducts,
              bestselling : bestselling
            });
          });
         });
        });
      }

    });

    app.get('/adproduct/:id', function(req, res){
      var id = req.params.id;
      Product.findById(id, function(err, product){
        if(err) return err;
        Order.find({status : "pending"}, function(err, orders) {
          if (err) return err;

          var count = orders.length;
          res.render('admin/admin-product.ejs',{
            count, product:product
          });
      });
      });
    });


  //route for posting product and saving them to database
  app.post("/uploads", upload.single('image'), function(req, res){
    var name = req.body.name;
    var category = req.body.category;
    var subCategory = req.body.subCategory;
    var price = req.body.price;
    var prevPrice = req.body.prevPrice;
    var note = req.body.note;
    var image = req.image;
    var tmp_path = req.file.path;

     /** The original name of the uploaded file
         stored in the variable "originalname". **/
     var target_path = 'uploads/' + req.file.originalname;
     /** A better way to copy the uploaded file. **/
     var src = fs.createReadStream(tmp_path);
     var dest = fs.createWriteStream(target_path);
     src.pipe(dest);
     fs.unlink(tmp_path); //deleting the tmp_path

    var product=new Product();
      product.name=name;
      product.category=category;
      product.subCategory=subCategory;
      product.price=price;
      product.prevPrice=prevPrice;
      product.picture=target_path;
      product.note=note;

    product.save(function(err, product){
      if(err) return err;

      res.redirect('/add-item');
    });


  });

    //route for updating the product details
    app.post('/updatepro/:id', function(req, res){
      //var id = req.body.id;
      var product = new Product();

      Product.findById(req.params.id, function(err, product){
        if(err) return err;

         product.name = req.body.name,
         product.category = req.body.category,
         product.subCategory = req.body.subCategory,
         product.price = req.body.price,
         product.prevPrice = req.body.prevPrice,
         product.note = req.body.note
        product.save(function(err){
          if(err) return err;

           var id = req.params.id;
           Product.findById(id, function(err, product){
             if(err) return err;

             res.render('admin/admin-product.ejs', {
               product : product
             });
           });
        })
      })
    })

    //admin routes for deleting products
    app.get('/deletepro/:id', function(req, res){

      Product.findById(req.params.id, function(err, product) {
       if (err) throw err;
       // delete product
       product.remove(function(err) {
      if (err) throw err;
       req.session.oldUrl = req.url;
       res.send( 'Product removed succesfully... PRESS f5 to refresh' );
  });
});
    });

};
