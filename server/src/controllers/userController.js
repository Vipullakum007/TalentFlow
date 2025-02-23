const express = require('express');
const User = require('../models/User');

// Get user profile
const getUserProfile = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get user role
const getUserRole = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ role: user.role });
    } catch (error) {
        console.error("Error fetching user role:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update user profile
const updateUserProfile = async (req, res) => {
    try {
        const userId = req.params.userId;
        const updatedData = req.body;

        const user = await User.findByIdAndUpdate(userId, updatedData, {
            new: true,
            runValidators: true,
        }).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getUserProfile,
    getUserRole,
    updateUserProfile,
};