// app/routes/projects.js
var express = require('express');
var app = express();

var url = require('url');
var base64url = require('base64url');
var multer = require('multer');
var fs = require('fs');
var pictures = multer({});
var Product = require('../models/products');
var mongoose = require('mongoose');

var upload = multer({ dest: 'uploads/' });

module.exports = function(app) {


    app.get('/product/:id',function(req, res) {
      var id = req.params.id;
      Product.findById(id, function(err, product){
        if(err) return err;
        console.log(product);

      res.render('pages/product.ejs',{product:product});
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
        console.log(product);
        res.redirect('/add-item');
      });


    });

};
