const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
  key: { type: String, unique: true },
  totalRevenue: { type: Number, default: 0 },
});

module.exports = mongoose.model('Stat', statSchema);
