const Application = require('../models/application');
const Project = require('../models/Project');

const createApplication = async (req, res) => {
  try {
    const { projectId, freelancerId, proposedBudget } = req.body;

    // Check if the project is already assigned
    const project = await Project.findById(projectId);
    if (project.isAssigned) {
      return res.status(400).json({ message: 'This project is no longer accepting applications.' });
    }

    // Create the application
    const newApplication = new Application({
      projectId,
      freelancerId,
      proposedBudget,
    });
    project.applicants.push(freelancerId);
    await project.save();

    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    res.status(500).json({ message: 'Error creating application', error: error.message });
  }
};

// Get all applications for a specific project (owned by the client)
const getApplicationsForProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const clientId = req.user.id; // Assuming client ID is extracted from the authenticated user

    // Check if the project belongs to the client
    const project = await Project.findOne({ _id: projectId, clientId });

    if (!project) {
      return res.status(404).json({ message: 'Project not found or you do not have permission to view this project.' });
    }

    // Fetch all applications for the project
    const applications = await Application.find({ projectId })
      .populate('freelancerId', 'name skills'); // Populate freelancer details

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications', error: error.message });
  }
};

const acceptApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const clientId = req.user.id; // Assuming client ID is extracted from the authenticated user

    // Find the application
    const application = await Application.findById(applicationId)
      .populate('projectId', 'clientId isAssigned');

    if (!application) {
      return res.status(404).json({ message: 'Application not found.' });
    }

    // Check if the project belongs to the client
    if (application.projectId.clientId.toString() !== clientId) {
      return res.status(403).json({ message: 'You do not have permission to accept this application.' });
    }

    // Check if the project is already assigned
    if (application.projectId.isAssigned) {
      return res.status(400).json({ message: 'This project has already been assigned to a freelancer.' });
    }

    // Mark the project as assigned
    await Project.findByIdAndUpdate(application.projectId._id, {
      isAssigned: true,
      freelancerId: application.freelancerId
    });

    // Update the accepted application's status
    await Application.findByIdAndUpdate(applicationId, { status: 'accepted' });

    // Reject all other pending applications for the project
    await Application.updateMany(
      { projectId: application.projectId._id, _id: { $ne: applicationId } },
      { status: 'rejected' }
    );

    res.status(200).json({ message: 'Application accepted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error accepting application', error: error.message });
  }
};
const getAvailableJobsForFreelancer = async (req, res) => {
  try {
    const freelancerId = req.user.id; // Assuming the user ID is extracted from auth middleware
    console.log(freelancerId);
    // Get jobs where the freelancer has NOT applied
    const jobs = await Project.find({
      _id: { $nin: await Application.find({ freelancerId }).distinct("projectId") },
    });
    console.log(jobs);
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error: error.message });
  }
};


module.exports = {
  createApplication,
  getApplicationsForProject,
  acceptApplication,
  getAvailableJobsForFreelancer,
};