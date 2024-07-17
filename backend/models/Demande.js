// demande.js
const mongoose = require('mongoose');

const DemandeSchema = new mongoose.Schema({
  UID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Requests',
    required: true
  },
  paymentDetails: {
    type: Object,
    required: true
  },
  // Add other fields as necessary
});

module.exports = mongoose.model('Demande', DemandeSchema);