const Service = require('../models/Service');

exports.createService = async (req, res) => {
    try {
        const { service } = req.body;
        const newService = new Service({ service });

        await newService.save();

        res.status(201).json(newService);
    } catch (error) {
        res.status(500).json({ message: 'Error creating service', error });
    }
};



exports.getServices = async (req, res) => {
  try {
    const services = await Service.find(); // Fetch all services from the database
    res.json(services); // Send the list of services as JSON response
  } catch (err) {
    console.error('Error fetching services:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

