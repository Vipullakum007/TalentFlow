// models/Freelancer.js
const mongoose = require("mongoose");
const freelancerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  skills: [{ type: String }],
  profileImage: { type: String },
  portfolio: [{ type: String }], // Stores resumes (PDFs)
  hourlyRate: { type: Number },
  bio: { type: String },
  ratings: [{ type: Number }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  completedJobs: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Freelancer", freelancerSchema);
