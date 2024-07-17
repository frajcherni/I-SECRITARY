const Service = require('../models/Service');
const User = require('../models/User');

exports.createService = async (req, res) => {
    try {
        const newService = new Service(req.body);
        await newService.save();
        res.status(201).json(newService);
    } catch (error) {
        res.status(500).json({ message: 'Error creating service', error });
    }
};

exports.getServices = async (req, res) => {
    try {
        const services = await Service.find().populate('user', 'username'); // Populate the user field with the username
        res.json(services); // Send the list of services as JSON response
    } catch (err) {
        console.error('Error fetching services:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.deletService = async (req, res) => {
  try {
       const service = await Service.findByIdAndDelete(req.params.id); // Populate the user field with the username
      res.json(service); // Send the list of services as JSON response
  } catch (err) {
      console.error('Error fetching service:', err);
      res.status(500).json({ error: 'Internal server error' });
  }
};

