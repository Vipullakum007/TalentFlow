// models/Client.js
const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ProfileImage: { type: String },
  companyName: { type: String },
  industry: { type: String },
  jobsPosted: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Client", clientSchema);
