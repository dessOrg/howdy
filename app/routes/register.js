var express = require('express');
var app = express();
var User = require('../models/user');
var mongoose = require('mongoose');

module.exports = function(app){


   //get Register
    app.get('/register', function(req,res){
      var errors = "";
      var utaken = "";
      res.render('pages/register', {
        errors : errors,
        utaken : utaken,
       });
    });

    //Register user
    app.post('/signup', function(req, res){
      var firstname=req.body.firstname;
      var lastname=req.body.lastname;
      var email=req.body.email;
      var phone=req.body.phone;
      var residence=req.body.residence;
      var username=req.body.username;
      var password=req.body.password;
      var password2=req.body.password2;
      var role = "normal";

      //validation
      req.checkBody('firstname','First Name is required').notEmpty();
      req.checkBody('lastname','Last Name is required').notEmpty();
      req.checkBody('username','Username is required').notEmpty();
      req.checkBody('phone','Phone number is required').notEmpty();
      req.checkBody('residence','Residence is required').notEmpty();
      req.checkBody('email','Email is required').notEmpty();
      req.checkBody('email','Email is not valid').isEmail();
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
              res.render('pages/register', {
                errors : errors,
                msg : msg,
                utaken : utaken
            });
          }
          else{
              console.log('You have no register errors');
              var newUser=new User({
                firstname: firstname,
                lastname: lastname,
                username: username,
                email : email,
                phone: phone,
                residence : residence,
                password: password,
                role: role
              });
              User.createUser(newUser,function(err, user){
                if (err) throw err;
                console.log(user);
              });
              req.flash('success_msg', 'you are registered and now can login');
            res.redirect('/loginp');
          }
        });
      };

  });

}
