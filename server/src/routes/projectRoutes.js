const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Create a new project
router.post('/', projectController.createProject);

// Get all projects
router.get('/', projectController.getAllProjects);

// Get a single project by ID
router.get('/:id', projectController.getProjectById);

// Update a project
router.put('/:id', projectController.updateProject);

// Delete a project
router.delete('/:id', projectController.deleteProject);

// Get projects by status
router.get('/status/:status', projectController.getProjectsByStatus);

// Assign a freelancer to a project
router.patch('/:id/assign-freelancer', projectController.assignFreelancerToProject);

module.exports = router;