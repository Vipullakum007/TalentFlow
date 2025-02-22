// controllers/freelancerController.js
const Freelancer = require("../models/Freelancer");

// Get all freelancers
const getAllFreelancers = async (req, res) => {
  try {
    const freelancers = await Freelancer.find();
    res.status(200).json(freelancers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get freelancer by ID
const getFreelancerById = async (req, res) => {
  try {
    const freelancer = await Freelancer.findById(req.params.id);
    if (!freelancer) {
      return res.status(404).json({ message: "Freelancer not found" });
    }
    res.status(200).json(freelancer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete freelancer by ID
const deleteFreelancerById = async (req, res) => {
  try {
    const freelancer = await Freelancer.findByIdAndDelete(req.params.id);
    if (!freelancer) {
      return res.status(404).json({ message: "Freelancer not found" });
    }
    res.status(200).json({ message: "Freelancer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//upadate freelancer by Id

const updateFreelancerProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const freelancer = await Freelancer.findById(id);

    if (!freelancer) {
      return res.status(404).json({ message: "Freelancer not found" });
    }

    if (req.file) {
      freelancer.profileImage = `/uploads/${req.file.filename}`;
    }

    await freelancer.save(); // Save the updated freelancer profile before sending the response
    res.json(freelancer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  updateFreelancerProfile,
  getAllFreelancers,
  getFreelancerById,
  deleteFreelancerById,
};
