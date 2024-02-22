const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    cart : Array
  });

  const User = mongoose.model('userModel',userSchema);

module.exports = User;