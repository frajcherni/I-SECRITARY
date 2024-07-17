// models/Service.js

const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  service: String,
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
},
  createdAt: { type: Date, default: Date.now }
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;