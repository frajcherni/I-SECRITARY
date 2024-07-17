const mongoose = require("mongoose");

const RequestsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
  },
  mobileNumber: {
    type: Number,
    required: [true, 'Mobile number is required'],
  },
  language: {
    type: String,
  },
  postaleAdresse: {
    type: String,
  },
  sirenSiret: {
    type: Number,
  },
  creationDate: {
    type: String,
  },
  profession: {
    type: String,
  },
  service: {
    type: String,
  },
  status: {
    type: String,
    default: "not viewed",
  }
}, { timestamps: true });

const Requests = mongoose.model("Requests", RequestsSchema);

module.exports = Requests;
