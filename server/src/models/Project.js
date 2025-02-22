// models/Project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Freelancer', required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  milestones: [{ 
    title: { type: String },
    description: { type: String },
    dueDate: { type: Date },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' }
  }],
  status: { type: String, enum: ['active', 'completed'], default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);