// routes/ratingRoutes.js
const express = require('express');
const { rateFreelancer, rateClient, getAverageRatings } = require('../controllers/ratingController');
const auth = require('../middleware/auth');

const router = express.Router();

// Rate a freelancer (Client)
router.post('/freelancer', auth, rateFreelancer);

// Rate a client (Freelancer)
router.post('/client', auth, rateClient);

// Get average ratings for a user (Freelancer/Client)
router.get('/:userId', auth, getAverageRatings);

module.exports = router;