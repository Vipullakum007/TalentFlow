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
//update freelancer by Id
const updateFreelancerProfile = async (req, res) => {
  console.log("📂 Received Files:", req.files);
  console.log("📌 Request Body:", req.body);

  try {
    const { id } = req.params;
    const { skills, hourlyRate, bio, completedJobs } = req.body;
    const freelancer = await Freelancer.findById(id);

    if (!freelancer) {
      return res.status(404).json({ message: "Freelancer not found" });
    }

    // ✅ Update text fields
    if (skills) {
      freelancer.skills = Array.isArray(skills) ? skills : skills.split(",");
    }
    if (hourlyRate) {
      freelancer.hourlyRate = parseFloat(hourlyRate);
    }
    if (bio) {
      freelancer.bio = bio;
    }
    if (completedJobs) {
      freelancer.completedJobs = parseInt(completedJobs, 10);
    }

    // ✅ Handle file uploads
    if (req.files) {
      if (req.files.profileImage) {
        freelancer.profileImage = req.files.profileImage[0].path;
      }
      if (req.files.portfolio) {
        freelancer.portfolio = req.files.portfolio.map((file) => file.path);
      }
    }

    await freelancer.save();
    res.json({ message: "Profile updated successfully", freelancer });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ message: "Server error while updating profile", error: err.message || err });
  }
};
const getFreelancerByUserId = async (req, res) => {
  try {
    console.log("🔍 Received user object from token:", req.user);

    const { userId: idFromParam } = req.params;
    if (!idFromParam) {
      return res.status(400).json({ message: "User ID missing from URL parameter" });
    }

    // (Optional) Validate token user ID
    const idFromToken = req.user?.id || req.user?.userId;
    if (idFromToken && idFromToken !== idFromParam) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const freelancer = await Freelancer.findOne({ userId: idFromParam });

    if (!freelancer) {
      return res.status(404).json({ message: "Freelancer not found" });
    }

    res.json(freelancer);
  } catch (err) {
    console.error("❌ Error fetching freelancer:", err);
    res.status(500).json({ message: "Server error", error: err.message || err });
  }
};

module.exports = {
  updateFreelancerProfile,
  getAllFreelancers,
  getFreelancerById,
  deleteFreelancerById,
  getFreelancerByUserId
};
