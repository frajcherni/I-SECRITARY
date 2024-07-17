const mongoose = require('mongoose');

const professionSchema = new mongoose.Schema({
  profession:
  {type:String,
    required :[true,"profession is required "]},
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
},
  createdAt: { type: Date, default: Date.now }
});

const Profession = mongoose.model('Profession', professionSchema);

module.exports = Profession;