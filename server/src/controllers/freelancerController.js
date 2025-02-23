const Freelancer = require("../models/Freelancer");

// Get all freelancers
const getAllFreelancers = async (req, res) => {
  try {
    const freelancers = await Freelancer.find().populate("userId", "email");;
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
//update freelancer by Id
const updateFreelancerProfile = async (req, res) => {
  try {
    console.log("📂 Received Files:", req.files); // Debugging
    console.log("📌 Request Body:", req.body);

    const { id } = req.params;
    const freelancer = await Freelancer.findById(id);

    if (!freelancer) {
      return res.status(404).json({ message: "Freelancer not found" });
    }

    // Check if files are uploaded
    if (!req.files || (!req.files.profileImage && !req.files.portfolio)) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // Store profile image URL
    if (req.files.profileImage) {
      freelancer.profileImage = req.files.profileImage[0].path;
    }

    // Store portfolio PDF URL
    if (req.files.portfolio) {
      freelancer.portfolio = req.files.portfolio[0].path;
    }

    await freelancer.save();
    res.json({ message: "Profile updated successfully", freelancer });
  } catch (err) {
    console.error("❌ Error:", err); // Error log karavanu

    res.status(500).json({
      message: "Server error while updating profile",
      error: err.message || err,
    });
  }
};

module.exports = {
  updateFreelancerProfile,
  getAllFreelancers,
  getFreelancerById,
  deleteFreelancerById,
};
