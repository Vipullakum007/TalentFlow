// models/Payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Freelancer', required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['credit_card', 'paypal', 'bank_transfer'], required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);