// user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  UID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Requests',
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "client"
  },
});

module.exports = mongoose.model('User', userSchema);