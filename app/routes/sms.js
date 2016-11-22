var express = require('express');
var app = express();
var Order = require('../models/order');
var Cart = require('../models/cart');
var Product = require('../models/products');

// We need this to build our post string
var querystring = require('querystring');
var https       = require('https');


module.exports = function(app) {
  // Your login credentials
  var username = 'desshub';
  var apikey   = 'b8a87060086b16297c5ebe5190964f09fd258ec51a969ad88cd8c131243ef8fc';

app.get('/api/sms/:id', function(req, res){
  var orderId = req.params.id;

  Order.findById(orderId, function(err, order) {
    if (err) return err ;
    var phone = order.phone;

    function sendMessage() {

    // Define the recipient numbers in a comma separated string
    // Numbers should be in international format as shown
    var to      = phone;

    // And of course we want our recipients to know what we really do
    var message = "You order has been received. Thank you for shopping with us";

    // Build the post string from an object

    var post_data = querystring.stringify({
        'username' : username,
        'to'       : to,
        'message'  : message
    });

    var post_options = {
        host   : 'api.africastalking.com',
        path   : '/version1/messaging',
        method : 'POST',

        rejectUnauthorized : false,
        requestCert        : true,
        agent              : false,

        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Content-Length': post_data.length,
            'Accept': 'application/json',
            'apikey': apikey
        }
    };

    var post_req = https.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            var jsObject   = JSON.parse(chunk);
            var recipients = jsObject.SMSMessageData.Recipients;
            if ( recipients.length > 0 ) {
                for (var i = 0; i < recipients.length; ++i ) {
                    var logStr  = 'number=' + recipients[i].number;
                    logStr     += ';cost='   + recipients[i].cost;
                    logStr     += ';status=' + recipients[i].status; // status is either "Success" or "error message"
                    console.log(logStr);
                    }
                } else {
                    console.log('Error while sending: ' + jsObject.SMSMessageData.Message);
            }
        });
    });

    // Add post parameters to the http request
    post_req.write(post_data);

    post_req.end();
}
//Call sendMessage method
sendMessage();
res.redirect('/admin/orders');

  })
})

};
