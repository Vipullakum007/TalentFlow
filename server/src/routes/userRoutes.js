const express = require('express');
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/auth');

const router = express.Router();

// Get user role
router.get("/:userId/role", verifyToken, userController.getUserRole);

// Get user profile
router.get("/:userId", verifyToken, userController.getUserProfile);

// Update user profile
router.put("/:userId", verifyToken, userController.updateUserProfile);

module.exports = router;
