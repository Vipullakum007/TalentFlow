const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Storage for Profile Images
const profileStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "freelancer_profiles",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

// Multer Storage for PDFs (Resume)
const resumeStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "freelancer_resumes",
    resource_type: "raw", // Required for non-image files like PDFs
    allowed_formats: ["pdf"],
  },
});

// Initialize Multer with both storage options
const upload = multer({ storage: profileStorage });
const resumeUpload = multer({ storage: resumeStorage });

module.exports = { upload, resumeUpload };
