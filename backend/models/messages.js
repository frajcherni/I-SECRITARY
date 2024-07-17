const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  username: {
    type:String,
    required:[true,"enter your name please"]},
  email: {
    type:String,
    required:[true,"email is required"]},
  message:{ type:String,
  required:[true,"create your message"]},
  status: {
    type: String,
    default: "not viewed",
  }
  
},{timestamp: true});

// Check if the model is already compiled, if not then compile it
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
