/*here resume-checker takes two input :
1.resumeText
2.its role

then based on above parameter its give you some tips to improve or give feedback*/

const express = require("express");
const axios = require("axios");
const router = express.Router();
const huggingfaceApiKey = process.env.HUGGINGFACE_API_KEY;
const HUGGINGFACE_API_URL =
  "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct ";

router.post("", async (req, res) => {
  try {
    const { resumeText, jobRole } = req.body;
    if (!resumeText || !jobRole) {
      return res
        .status(400)
        .json({ error: "Resume text and job role are required" });
    }

    // Instruction for AI to analyze the resume
    const prompt = `
        You are an expert career coach. Review the following resume for the role of ${jobRole}.
        Provide specific improvement suggestions to enhance the candidate's chances of getting hired.
  
        Resume:
        ${resumeText}
  
        Tips for Improvement:
      `;

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
