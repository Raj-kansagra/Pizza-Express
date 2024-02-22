const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    id : String,
    pname : String,
    price : Number,
    image : String,
    category : String
  });
  
  
const product = mongoose.model('productModel',productSchema);
  
module.exports = product;