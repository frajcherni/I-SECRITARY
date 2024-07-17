const Request = require("../models/Requests");

let io;

module.exports.setIoInstance = (ioInstance) => {
  io = ioInstance;
};

module.exports.createRequest = async (req, res) => {
  const { email } = req.body;
  try {
    const existEmail = await Request.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const newRequest = new Request(req.body);
    await newRequest.save();
    io.emit('newRequest', newRequest);
    res.status(200).json({ message: "Request sent successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.findRequests = (req, res) => {
  Request.find().sort({ createdAt: -1 })
    .then((requests) => res.json(requests))
    .catch((err) => res.status(500).json(err));
};

module.exports.findRequestsNotViewed = (req, res) => {
  Request.find({ status: "not viewed" })
    .then((requests) => res.json(requests))
    .catch((err) => res.status(500).json(err));
};

module.exports.findRequestsViewed = (req, res) => {
  Request.find({ status: "viewed" })
    .then((requests) => res.json(requests))
    .catch((err) => res.status(500).json(err));
};

module.exports.findRequestById = (req, res) => {
  Request.findOne({ _id: req.params.id })
    .then((request) => res.json(request))
    .catch((err) => res.status(404).json(err));
};

module.exports.editRequestStatus = (req, res) => {
  Request.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedRequest) => res.json(updatedRequest))
    .catch((err) => res.status(400).json(err));
};

module.exports.deleteRequest = (req, res) => {
  Request.findByIdAndDelete(req.params.id)
    .then((deletedRequest) => res.json(deletedRequest))
    .catch((err) => res.status(400).json(err));
};
