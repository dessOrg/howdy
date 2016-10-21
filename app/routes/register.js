var express = require('express');
var app = express();
var Product = require('../models/products');
var mongoose = require('mongoose');

module.exports = function(app){

  var User = require('../models/user');
  module.exports = function(app) {
  //login

   //get Register
    app.get('/new', function(req,res){
      var errors = "";
      var utaken = "";
      res.render('pages/register', {
        errors : errors,
        utaken : utaken,
       });
    }):

    //Register user
    app.get('/create', function(req, res){
      var fname=req.body.fname;
      var lname=req.body.lname;
      var phone=req.body.phone;
      var username=req.body.username;
      var password=req.body.password;
      var password2=req.body.password2;
      var role = "normal";

      //validation
      req.checkBody('fname','First Name is required').notEmpty();
      req.checkBody('lname','Last Name is required').notEmpty();
      req.checkBody('username','Username is required').notEmpty();
      req.checkBody('phone','Phone number is required').notEmpty();
      //req.checkBody('email','Email is not valid').isEmail();
      req.checkBody('password','Password is required').notEmpty();
      req.checkBody('password', 'Password should be 8 to 20 characters').len(8, 20);
      req.checkBody('password2','Passwords do not match').equals(req.body.password);

      var errors = req.validationErrors();
      if (errors){
        var msg = errors.msg;
        var utaken = "";
        res.render('pages/register', {
          errors : errors,
          msg : msg,
          utaken : utaken
      });
      console.log(errors);
      }
      else {
        User.getUserByUsername(username, function(err, user){
          if(err) throw err;
          if(user){
              var errors = "";
              var msg = "";
              var utaken = "That Username exists in our system."
              res.render('register', {
                errors : errors,
                msg : msg,
                utaken : utaken
            });
          }
          else{
              console.log('You have no register errors');
              var newUser=new User({
                fname: fname,
                lname: lname,
                username: username,
                phone: phone,
                password: password,
                role: role
              });
              User.createUser(newUser,function(err, user){
                if (err) throw err;
                console.log(user);
              });
              req.flash('success_msg', 'you are registered and now can login');
            res.redirect('/login');
          }
        });
      };
    }
  });

}
