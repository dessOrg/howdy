var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = mongoose.Schema({
  user :{
    type : Schema.Types.ObjectId, ref: "User"
  },
  name : {
    type :  String
  },
  phone  : {
    type : String
  },
  residence : {
    type : String
  },
  street :{
    type :  String
  },
  building :{
    type :  String
  },
  status :{
    type :  String
  },
  paymentMode :{
    type :  String
  },
  totalQty :{
    type :  String
  },
  totalPrice :{
    type :  String
  },
  cart :{
      type : Object
}
});

var orderSchema = module.exports = mongoose.model('Order', orderSchema);
