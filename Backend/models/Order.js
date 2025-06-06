const mongoose = require('mongoose');
//const Order = require('../../../Restaurant/Backend/models/Order');

const orderSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Dine In', 'Take Away'],
    required: true
  },
  status: {
    type: String,
    enum: ['Processing', 'Done', 'Served', 'Not Picked Up'],
    default: 'Processing'
  },
  doneAt: { type: Date },

   tableId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Table',
    default: null
  },
  tableNumber: { type: Number, required: false }, 
  chef: { type: mongoose.Schema.Types.ObjectId, ref: 'Chef' },

  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
      notes: String
    }
  ],
  total: Number,
  customer: {
    name: String,
    phone: String,
    address: String
  },
  cookingInstructions: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);

