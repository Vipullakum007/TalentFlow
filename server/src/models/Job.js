// models/Job.js
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Freelancer' },
  skillsRequired: [{ type: String }],
  budget: { type: Number },
  status: { type: String, enum: ['open', 'in-progress', 'completed'], default: 'open' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', jobSchema);