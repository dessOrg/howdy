//session routes for users
var User = require('../models/user');
var passport = require('passport');
var Cart = require('../models/cart');


module.exports =function(app) {

  app.get('/login', function(req, res){
    if (!req.session.cart) {
        res.render('pages/login.ejs', {products : null});
    }else {
      var cart = new Cart(req.session.cart);
      var products = cart.generateArray();
      console.log(products);
      res.render('pages/login.ejs', {products, totalPrice: cart.totalPrice});
    }


    });

  app.post('/login', function(req, res, next) {
        passport.authenticate('local', function(err,user){
          if(err) return err;
          if(!user){
            console.log('Not a user');
            return res.redirect('/login');
          }
          req.login(user, function(err){
            if(err) return err;

            console.log(req.user);
            res.redirect(req.session.returnTo || '/use')
            delete req.session.returnTo;


          });

    })(req,res,next);
  });

  app.get('/use', function(req,res){
    var user = req.user;
    var role = user.role;

    if(role =="admin"){
     res.redirect('/dashboard');
    }
    else if(role == "normal"){
      if(req.session.oldUrl) {
       var oldUrl = req.session.oldUrl;
       req.session.oldUrl = null;
       res.redirect(oldUrl);
     }else {
       res.redirect('/');
       }
    }
  });

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
    /*
     since we're using friendly forwarding (see req.sessio.returnTo) when we
     logout the (req.session.returnTo variable will still be around,
    so we need to destroy it
    */

    req.session.destroy();
  });

}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.oldUrl = req.url;
  res.redirect('/loginp');
}
