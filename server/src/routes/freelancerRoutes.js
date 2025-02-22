// routes/freelancerRoutes.js
const express = require('express');
const { getFreelancerProfile, updateFreelancerProfile } = require('../controllers/freelancerController');

const router = express.Router();

router.get('/:id', getFreelancerProfile);
router.put('/:id', updateFreelancerProfile);

module.exports = router;