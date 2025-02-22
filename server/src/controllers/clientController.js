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

module.exports = {
  getAllClients,
  getClientById,
  deleteClientById,
  updateClientProfile,
};
