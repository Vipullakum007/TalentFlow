const axios = require("axios");
const pdfParse = require("pdf-parse");

// Function to extract text from resume PDF
async function parseResume(resumeUrl) {
  try {
    // Download PDF from Cloudinary
    const response = await axios.get(resumeUrl, {
      responseType: "arraybuffer",
    });
    const pdfBuffer = Buffer.from(response.data);

    // Parse text from PDF
    const parsedData = await pdfParse(pdfBuffer);
    return parsedData.text;
  } catch (error) {
    console.error("❌ Error extracting text from resume:", error.message);
    return null;
  }
}

module.exports = { parseResume };
