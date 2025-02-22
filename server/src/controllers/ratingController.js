// controllers/ratingController.js
const Rating = require('../models/Rating');
const User = require('../models/User');
const Freelancer = require('../models/Freelancer');
const Client = require('../models/Client');

// Rate a freelancer
const rateFreelancer = async (req, res) => {
  const { ratedTo, workQuality, communication, timeliness, feedback } = req.body;
  const ratedBy = req.user.id; // Client ID from JWT

  try {
    // Check if the user being rated is a freelancer
    const freelancer = await Freelancer.findOne({ userId: ratedTo });
    if (!freelancer) {
      return res.status(400).json({ message: 'User is not a freelancer' });
    }

    // Check if the user who is rating is a client
    const client = await Client.findOne({userId: ratedBy});
    if(!client){
        return res.status(400).json({ message: 'Current User is not a client' });
    }

    // Create a new rating
    const rating = new Rating({
      ratedBy,
      ratedTo,
      role: 'freelancer',
      workQuality,
      communication,
      timeliness,
      feedback
    });
    await rating.save();

    res.status(201).json(rating);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Rate a client
const rateClient = async (req, res) => {
  const { ratedTo, professionalism, cooperation, feedback } = req.body;
  const ratedBy = req.user.id; // Freelancer ID from JWT

  try {
    // Check if the user being rated is a client
    const client = await Client.findOne({ userId: ratedTo });
    if (!client) {
      return res.status(400).json({ message: 'User is not a client' });
    }

    // Check if the user who is rating is a freelancer
    const freelancer = await Freelancer.findOne({ userId: ratedBy });
    if (!freelancer) {
      return res.status(400).json({ message: 'Current User is not a freelancer' });
    }

    // Create a new rating
    const rating = new Rating({
      ratedBy,
      ratedTo,
      role: 'client',
      professionalism,
      cooperation,
      feedback
    });
    await rating.save();

    res.status(201).json(rating);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get average ratings for a user
const getAverageRatings = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Fetch all ratings for the user
    const ratings = await Rating.find({ ratedTo: userId });

    // Calculate average ratings
    const totalRatings = ratings.length;
    const avgWorkQuality = ratings.reduce((sum, rating) => sum + (rating.workQuality || 0), 0) / totalRatings;
    const avgCommunication = ratings.reduce((sum, rating) => sum + (rating.communication || 0), 0) / totalRatings;
    const avgTimeliness = ratings.reduce((sum, rating) => sum + (rating.timeliness || 0), 0) / totalRatings;
    const avgProfessionalism = ratings.reduce((sum, rating) => sum + (rating.professionalism || 0), 0) / totalRatings;
    const avgCooperation = ratings.reduce((sum, rating) => sum + (rating.cooperation || 0), 0) / totalRatings;

    res.status(200).json({
      totalRatings: totalRatings,
      avgWorkQuality: avgWorkQuality.toFixed(2),
      avgCommunication: avgCommunication.toFixed(2),
      avgTimeliness: avgTimeliness.toFixed(2),
      avgProfessionalism: avgProfessionalism.toFixed(2),
      avgCooperation: avgCooperation.toFixed(2),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { rateFreelancer, rateClient, getAverageRatings };