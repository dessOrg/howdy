var User = require('../models/user');
var mongoose = require('mongoose');
var Order = require('../models/order');

module.exports = function(app) {

//get all adims
app.get('/admins', function(req,res){
  User.find({role:"admin"}, function(err, users){
    if(err) return err;

    Order.find({}, function(err, orders) {
      if (err) return err;

      var count = orders.length;
    res.render('admin/admins', {
      users : users, count
    } )
  })
  })
})

  //Admin can change roles for users via this route
app.get('/role/:username/:role', function (req, res){
  var role = req.params.role;
    var username = req.params.username;
    User.getUserByUsername(username, function(err, user){
      if(err) return err;
      if(user){
        if(role == 'admin'){
          user.update({role:role}, function(err, user){
          console.log(user);
            if(err) return(err)
            res.redirect('/dashboard');
          });
        }
      }else{
        res.send("user does not exist");
      }
    });

})

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
