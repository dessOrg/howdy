var mongoose = require('mongoose');

var productSchema = mongoose.Schema({

  name :{
    type : String,
    index : true
  },
  category : {
    type :  String
  },
  subCategory : {
    type : String
  },
  price  : {
    type : String
  },
  prevPrice : {
    type : String
  },
  note : {
    type : String
  },
  picture : {
    type : String
  }
});

var productSchema = module.exports = mongoose.model('Product', productSchema);
