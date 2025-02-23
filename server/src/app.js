const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const projectRoutes = require("./routes/projectRoutes");
const freelancerRoutes = require("./routes/freelancerRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const axios = require("axios"); // ✅ Import axios
const categoryRoutes = require("./routes/categoryRoutes");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173", 
  "https://talent-flow-neon.vercel.app"
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/rate", ratingRoutes);
app.use("/api/freelancer", freelancerRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/", applicationRoutes);
const resumechecker = require("../src/ML-model/resume-checker");
app.use("/resume-checker", resumechecker);
const clientRoutes = require("./routes/clientRoutes");
app.use("/api/client", clientRoutes);
const resumeanalyze = require("../src/ML-model/resume-scorer");
app.use("/resume-analyze", resumeanalyze);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));