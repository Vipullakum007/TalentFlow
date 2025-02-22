// models/Rating.js
const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  ratedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who is giving the rating
  ratedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who is being rated
  role: { type: String, enum: ['freelancer', 'client'], required: true }, // Role of the user being rated
  workQuality: { type: Number, min: 1, max: 5 }, // Rating for work quality (for freelancers)
  communication: { type: Number, min: 1, max: 5 }, // Rating for communication (for freelancers)
  timeliness: { type: Number, min: 1, max: 5 }, // Rating for timeliness (for freelancers)
  professionalism: { type: Number, min: 1, max: 5 }, // Rating for professionalism (for clients)
  cooperation: { type: Number, min: 1, max: 5 }, // Rating for cooperation (for clients)
  feedback: { type: String }, // Optional feedback
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Rating', ratingSchema);