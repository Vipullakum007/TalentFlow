const express = require("express");
const axios = require("axios");
const router = express.Router();
const huggingfaceApiKey = process.env.HUGGINGFACE_API_KEY;
const HUGGINGFACE_API_URL =
  "https://api-inference.huggingface.co/models/facebook/bart-large-mnli"; // Model URL

router.post("/ana", async (req, res) => {
  try {
    const { resumeText } = req.body;
    if (!resumeText) {
      return res.status(400).json({ error: "Resume text is required" });
    }

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
      "Error calling Hugging Face API:",
      error.response?.data || error.message
    );
    res.status(500).json({
      error: "Failed to analyze resume",
      details: error.response?.data,
    });
  }
});

module.exports = router;
