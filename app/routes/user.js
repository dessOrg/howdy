var User = require('../models/user');
var mongoose = require('mongoose');

module.exports = function(app) {

  //admin routes for deleting users
  app.get('/deleteuser/:id', function(req, res){
    console.log(req.params.id);
    User.findById(req.params.id, function(err, user) {
     if (err) throw err;
     console.log(user);
     // delete user
     user.remove(function(err) {
    if (err) throw err;

     res.redirect('/dashboard');
     console.log("deleted succesfully")
     //res.send( 'user removed succesfully... PRESS f5 to refresh' );
});
});
  });

}
