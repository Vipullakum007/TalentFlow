const express = require("express");
const auth = require("../middleware/auth");
const { upload } = require("../config/cloudinary");
const {
  updateFreelancerProfile,
  getAllFreelancers,
  getFreelancerById,
  deleteFreelancerById,
} = require("../controllers/freelancerController");

const router = express.Router();

// Get all freelancers
router.get("/", auth, getAllFreelancers);

// Get freelancer by ID
router.get("/:id", auth, getFreelancerById);

// Delete freelancer by ID
router.delete("/:id", auth, deleteFreelancerById);

// Update freelancer profile with image upload
router.put(
  "/:id",
  auth,
  upload.single("profileImage"),
  updateFreelancerProfile
);

module.exports = router;
