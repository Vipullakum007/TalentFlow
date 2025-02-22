// app.js
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
const freelancerRoutes = require("./routes/freelancerRoutes");
app.use("/api/freelancer", freelancerRoutes);

const clientRoutes = require("./routes/clientRoutes");
app.use("/api/client", clientRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
