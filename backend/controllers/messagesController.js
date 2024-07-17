const Message = require("../models/messages");

let io;

module.exports.setIoInstance = (ioInstance) => {
  io = ioInstance;
};

module.exports.sendMessage = (req, res) => {
    const newMessage=new Message(req.body)
    newMessage.save(req.body)
    .then(() => {
      io.emit('newMessage', newMessage);
      res.status(200).json({ message: "Message sent successfully" });
    })
    .catch(err => res.status(500).json(err));
};

module.exports.findMessageById = (req, res) => {
  Message.findById(req.params.id)
    .then((message) => res.json(message))
    .catch(err => res.status(404).json(err));
};


module.exports.findAllMessages = (req, res) => {
  Message.find().sort({ createdAt: -1 })
    .then((messages) => res.json(messages))
    .catch(err => res.status(500).json(err));
};

module.exports.deleteMessageById = (req, res) => {
  Message.findByIdAndDelete(req.params.id)
    .then((message) => res.json(message))
    .catch(err => res.status(404).json(err));
};
module.exports.editMessageById = (req, res) => {
    Message.findByIdAndUpdate(req.params.id,req.body)
      .then((message) => res.json(message))
      .catch(err => res.status(404).json(err));
  };