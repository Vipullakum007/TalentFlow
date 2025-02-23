const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Freelancer' },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },

  title: { type: String },
  description: { type: String },
  dueDate: { type: Date },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },

  budgetRange: {
    min: { type: Number, required: true, min: 0, default: 0 },
    max: { type: Number, required: true }
  },
  reviewStars: { type: Number, min: 0, max: 5, default: 0 },
  requiredLanguages: [{ type: String }],

  isAssigned: { type: Boolean, default: false }, // New field
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Category field
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);