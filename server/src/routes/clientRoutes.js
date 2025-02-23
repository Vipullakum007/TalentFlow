const express = require("express");
const auth = require("../middleware/auth");
const { upload } = require("../config/cloudinary");
const {
  getAllClients,
  getClientById,
  deleteClientById,
  updateClientProfile,
  getClientByUserId
} = require("../controllers/clientController");

const router = express.Router();

// Get all clients
router.get("/", getAllClients);

// Get client by ID
router.get("/:id", auth, getClientById);

// Delete client by ID
router.delete("/:id", auth, deleteClientById);

// Update client profile (with optional image upload)
router.put("/:id", auth, upload.single("profileImage"), updateClientProfile);

router.get("/user/:userId", auth, getClientByUserId);

module.exports = router;
