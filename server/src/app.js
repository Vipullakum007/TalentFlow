// app.js
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
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://talent-flow-neon.vercel.app/", "https://talentflow.onrender.com"], // Allow only this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow cookies and credentials
  })
);

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/rate", ratingRoutes);


app.use("/freelancer/", freelancerRoutes);
app.use('/api/project/', projectRoutes);
app.use('/api/categories', categoryRoutes);

app.use("/", applicationRoutes);
const resumechecker = require("../src/ML-model/resume-checker");
app.use("/resume-checker", resumechecker);
const clientRoutes = require("./routes/clientRoutes");
app.use("/api/client", clientRoutes);

const resumeanalyze = require("../src/ML-model/resume-scorer");
app.use("/resume-analyze", resumeanalyze);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
