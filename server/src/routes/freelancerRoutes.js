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

// Update freelancer profile with image & resume upload
router.put(
  "/:id",
  auth,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "portfolio", maxCount: 1 },
  ]),
  updateFreelancerProfile
);

module.exports = router;
