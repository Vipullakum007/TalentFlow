const Project = require('../models/Project');
const Freelancer=require('../models/Freelancer');
// Create a new project
const createProject = async (req, res) => {
  try {
    const { clientId, title, description, dueDate, budgetRange, requiredLanguages } = req.body;
    console.log("create job : ", req.body);
    const newProject = new Project({
      clientId,
      title,
      description,
      dueDate,
      budgetRange,
      requiredLanguages,
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error: error.message });
  }
};

// Get all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    // .populate('clientId', 'name email') // Populate client details
    // .populate('freelancerId', 'name skills'); // Populate freelancer details if assigned
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
};

// Get a single project by ID
const getProjectById = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findById(projectId)
      .populate('clientId', 'name email')
      .populate('freelancerId', 'name skills');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project', error: error.message });
  }
};

// Update a project
const updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const updates = req.body;

    const updatedProject = await Project.findByIdAndUpdate(projectId, updates, { new: true })
      .populate('clientId', 'name email')
      .populate('freelancerId', 'name skills');

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error: error.message });
  }
};

// Delete a project
const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const deletedProject = await Project.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
};

// Get projects by status (e.g., pending or completed)
const getProjectsByStatus = async (req, res) => {
  try {
    const status = req.params.status;
    const projects = await Project.find({ status })
      .populate('clientId', 'name email')
      .populate('freelancerId', 'name skills');

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects by status', error: error.message });
  }
};

// Assign a freelancer to a project
const assignFreelancerToProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { freelancerId } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { freelancerId },
      { new: true }
    )
      .populate('clientId', 'name email')
      .populate('freelancerId', 'name skills');

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Error assigning freelancer', error: error.message });
  }
};

const getProjectsByClientId = async (req, res) => {
  try {
    const clientId = req.params.clientId;

    // Find all projects where the clientId matches
    const projects = await Project.find({ clientId })
      .populate('clientId', 'name email') // Populate client details
      .populate('freelancerId', 'name skills'); // Populate freelancer details if assigned

    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: 'No projects found for this client.' });
    }

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects by client ID', error: error.message });
  }
};

const recommendProjects = async (req, res) => {
  try {
    const userId = req.user.id; // This is the userId from the token
    console.log('User ID from token:', userId);

    // Find the freelancer document using the userId
    const freelancer = await Freelancer.findOne({ userId });

    if (!freelancer) {
      return res.status(404).json({ message: 'Freelancer not found' });
    }

    const freelancerId = freelancer._id; // This is the freelancerId
    console.log('Freelancer ID:', freelancerId);

    // Fetch all projects
    const projects = await Project.find({ isAssigned: false }); // Only unassigned projects

    // Filter and rank projects based on freelancer's skills and experience
    const recommendedProjects = projects
      .map(project => {
        // Calculate a score for each project based on matching skills and budget
        const skillMatch = project.requiredLanguages.filter(language =>
          freelancer.skills.includes(language)
        ).length;

        const budgetScore = project.budgetRange.max; // Higher budget projects get higher priority
        const dueDateScore = -new Date(project.dueDate).getTime(); // Sooner due dates get higher priority
        const experienceScore = freelancer.completedJobs; // More experienced freelancers get challenging projects

        // Total score (you can adjust the weights as needed)
        const totalScore = skillMatch * 0.5 + budgetScore * 0.3 + dueDateScore * 0.1 + experienceScore * 0.1;

        return { ...project.toObject(), score: totalScore };
      })
      .sort((a, b) => b.score - a.score); // Sort by score in descending order

    res.status(200).json(recommendedProjects);
  } catch (error) {
    console.error('Error recommending projects:', error);
    res.status(500).json({ message: 'Error fetching recommendations', error: error.message });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectsByStatus,
  assignFreelancerToProject,
  getProjectsByClientId,
  recommendProjects
};