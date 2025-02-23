const express = require("express");
const axios = require("axios");
const Freelancer = require("../models/Freelancer"); // Import Freelancer model
const { parseResume } = require("../ML-model/resume-parser"); // Import resume parser function
const router = express.Router();

const huggingfaceApiKey = process.env.HUGGINGFACE_API_KEY;
const HUGGINGFACE_API_URL =
  "https://api-inference.huggingface.co/models/facebook/bart-large-mnli"; // Model URL

router.get("/:freelancerId", async (req, res) => {
  try {
    const { freelancerId } = req.params;

    // Fetch freelancer from DB
    const freelancer = await Freelancer.findById(freelancerId);
    if (!freelancer || !freelancer.portfolio) {
      return res
        .status(404)
        .json({ error: "Freelancer or portfolio not found" });
    }

    const resumeUrl = freelancer.portfolio; // Get resume URL from portfolio field
    console.log("📂 Resume URL:", resumeUrl);

    // Extract text from resume
    const resumeText = await parseResume(resumeUrl);
    if (!resumeText) {
      return res
        .status(500)
        .json({ error: "Failed to extract text from resume" });
    }

    // Call Hugging Face API for job role classification
    const response = await axios.post(
      HUGGINGFACE_API_URL,
      JSON.stringify({
        inputs: resumeText,
        parameters: {
          candidate_labels: [
            "Software Engineer",
            "Data Scientist",
            "Project Manager",
            "Python expert",
          ],
        },
      }),
      {
        headers: {
          Authorization: `Bearer ${huggingfaceApiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ suggestions: response.data });
  } catch (error) {
    console.error(
      "❌ Error calling Hugging Face API:",
      error.response?.data || error.message
    );
    res.status(500).json({
      error: "Failed to analyze resume",
      details: error.response?.data,
    });
  }
});

module.exports = router;
