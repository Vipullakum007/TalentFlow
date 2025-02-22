const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const auth=require('../middleware/auth');
// Get all applications for a project (client-specific)
router.get('/projects/:projectId/applications',auth,applicationController.getApplicationsForProject);

router.patch('/applications/:applicationId/accept',auth, applicationController.acceptApplication);

router.post('/projects/createapplication',auth,applicationController.createApplication);

module.exports = router;