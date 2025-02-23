const express = require("express");
const axios = require("axios");
const Freelancer = require("../models/Freelancer"); // Import Freelancer model
const { parseResume } = require("../ML-model/resume-parser"); // Import resume parser function
const router = express.Router();

const huggingfaceApiKey = process.env.HUGGINGFACE_API_KEY;
const HUGGINGFACE_API_URL =
  "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct";

router.post("/:freelancerId", async (req, res) => {
  try {
    const { jobRole } = req.body;
    const { freelancerId } = req.params;

    if (!jobRole) {
      return res.status(400).json({ error: "Job role is required" });
    }

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

    // AI Prompt for Resume Analysis
    const prompt = `
      You are an expert career coach. Review the following resume for the role of ${jobRole}.
      Provide specific improvement suggestions to enhance the candidate's chances of getting hired.

      Resume:
      ${resumeText}

      Tips for Improvement:
    `;

    // Call Hugging Face API
    const response = await axios.post(
      HUGGINGFACE_API_URL,
      JSON.stringify({ inputs: prompt }),
      {
        headers: {
          Authorization: `Bearer ${huggingfaceApiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ tips: response.data });
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
