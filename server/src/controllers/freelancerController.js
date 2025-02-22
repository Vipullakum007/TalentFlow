// controllers/freelancerController.js
const Freelancer = require('../models/Freelancer');

const getFreelancerProfile = async (req, res) => {
  try {
    const freelancer = await Freelancer.findById(req.params.id).populate('reviews');
    res.json(freelancer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateFreelancerProfile = async (req, res) => {
  try {
    const freelancer = await Freelancer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(freelancer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getFreelancerProfile, updateFreelancerProfile };