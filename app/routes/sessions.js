//session routes for users
var User = require('../models/user');
var passport = require('passport');

module.exports =function(app) {

  app.get('/loginp', function(req, res){
    res.render('pages/login');
  });

  app.post('/login', function(req, res, next) {
        passport.authenticate('local', function(err,user){
          if(err) return err;
          if(!user){
            console.log('Not a user');
            return res.redirect('/loginp');
          }
          req.login(user, function(err){
            if(err) return err;

            console.log(req.user);
            res.redirect(req.session.returnTo || '/')
            delete req.session.returnTo;
          });
    })(req,res,next);
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
