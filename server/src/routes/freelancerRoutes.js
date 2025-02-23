const express = require("express");
const auth = require("../middleware/auth");
const { upload } = require("../config/cloudinary");
const {
  updateFreelancerProfile,
  getAllFreelancers,
  getFreelancerById,
  deleteFreelancerById,
  getFreelancerByUserId,
} = require("../controllers/freelancerController");

const router = express.Router();
router.get("/", auth, getAllFreelancers);

// Get freelancer by ID
router.get("/:id", auth, getFreelancerById);
router.get("/user/:userId", auth, getFreelancerByUserId);
// Delete freelancer by ID
router.delete("/:id", auth, deleteFreelancerById);

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