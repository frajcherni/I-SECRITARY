const Requests = require("../models/Requests");
let io;

module.exports.setIoInstance = (ioInstance) => {
  io = ioInstance;
};

// create a new message


module.exports.createMessage = async (req, res) => {
  const { email } = req.body;

  try {
    // check if the email exists or not
    const existEmail = await Requests.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Add the request without the UID
    const newMessage = new Requests(req.body);

    await newMessage.save();
    io.emit('newMessage', newMessage);

    res.status(200).json({ message: "Message was sent" });
  } catch (error) {
    res.status(500).json(error);
  }
};


// find all Requests 
module.exports.findRequests = (req, res) => {
    Requests.find().sort({ createdAt: -1 })
      .then((Requests) => {
        res.json(Requests);
      })
      .catch((err) => res.json(err));
  };
// find Requests not view 
module.exports.findRequestsNotView = (req, res) => {
  Requests.find({ status: "not viewed" })
    .then((Requests) => {
      res.json(Requests);
    })
    .catch((err) => res.json(err));
};

// find Requests not view 
module.exports.findRequestsViewed = (req, res) => {
  Requests.find({ status: "viewed" })
    .then((Requests) => {
      res.json(Requests);
    })
    .catch((err) => res.json(err));
};

// find message  by id
module.exports.findMessage = (req, res) => {
  Requests.findOne({ _id: req.params.id })
    .then((message) => {
      res.json(message);
    })
    .catch((err) => res.json(err));
};

// edit status of message 
module.exports.editStatusMessage=(req,res)=>{
    Requests.findByIdAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      }) .then((updateMessage) => {
        res.json(updateMessage);
      })
      .catch((err) => res.status(400).json(err));

}

// delete message 
module.exports.deleteMessage=(req,res)=>{
    Requests.findByIdAndDelete({ _id: req.params.id }) .then((deleteMessage) => {
        res.json(deleteMessage);
      })
      .catch((err) => res.status(400).json(err));

};