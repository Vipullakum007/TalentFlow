const Client = require("../models/Client");

// Get all clients
const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get client by ID
const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json(client);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete client by ID
const deleteClientById = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json({ message: "Client deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update client profile (including image upload)
const updateClientProfile = async (req, res) => {
  try {
    const { companyName, industry } = req.body;
    const profileImage = req.file ? req.file.path : undefined; // Cloudinary image URL

    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      { companyName, industry, ...(profileImage && { profileImage }) },
      { new: true }
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json(updatedClient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getClientByUserId = async (req, res) => {
  try {
    console.log("🔍 Received user object from token:", req.user);

    const { userId: idFromParam } = req.params;
    if (!idFromParam) {
      return res.status(400).json({ message: "User ID missing from URL parameter" });
    }

    // (Optional) Validate token user ID
    const idFromToken = req.user?.id || req.user?.userId;
    if (idFromToken && idFromToken !== idFromParam) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const client = await Client.findOne({ userId: idFromParam });

    if (!client) {
      return res.status(404).json({ message: "client not found" });
    }

    res.json(client);
  } catch (err) {
    console.error("❌ Error fetching client:", err);
    res.status(500).json({ message: "Server error", error: err.message || err });
  }
};

module.exports = {
  getAllClients,
  getClientById,
  deleteClientById,
  updateClientProfile,
  getClientByUserId
};
