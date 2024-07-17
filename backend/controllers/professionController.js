const Profession=require("../models/Profession");
exports.createProfession= async (req, res) => {
    try {
        const newProfession = new Profession(req.body);

        await newProfession.save();

        res.status(201).json(newProfession);
    } catch (error) {
        res.status(500).json({ message: 'Error creating service', error });
    }
};



exports.getProfessions = async (req, res) => {
  try {
    const professions = await Profession.find().populate('user', 'username'); // Fetch all services from the database
    res.json(professions); // Send the list of services as JSON response
  } catch (err) {
    console.error('Error fetching services:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deletProfession = async (req, res) => {
  try {
       const profession = await Profession.findByIdAndDelete(req.params.id); // Populate the user field with the username
      res.json(profession); // Send the list of services as JSON response
  } catch (err) {
      console.error('Error fetching profession:', err);
      res.status(500).json({ error: 'Internal server error' });
  }
};