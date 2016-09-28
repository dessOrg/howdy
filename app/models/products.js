var mongoose = require('mongoose');

var productSchema = mongoose.Schema({

  name :{
    type : String,
    index : true
  },
  category : {
    type :  String
  },
  sub-category : {
    type : String
  },
  price {
    type : Double
  },
  prev-price : {
    type : Double
  },
  note : {
    type : String
  }
});

var productSchema = module.exports = mongoose.model('Product', productSchema);
