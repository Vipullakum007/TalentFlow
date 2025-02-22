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

// Set up storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "freelancer_profiles", // Folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

// Initialize multer with Cloudinary storage
const upload = multer({ storage });

module.exports = { upload }; // ✅ Ensure upload is correctly exported
