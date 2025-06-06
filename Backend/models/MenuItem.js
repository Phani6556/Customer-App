const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  category: String,
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
