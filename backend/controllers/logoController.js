const getDataUri = require("../config/dataUri");
const cloudinary = require("../config/cloudinary");
const Logo = require("../models/Logo");

// @desc    Get all logos
// @route   GET /api/logos
const getAllLogos = async (req, res) => {
  try {
    const logos = await Logo.find().sort({ uploadedAt: -1 });
    if (!logos) {
      return res.status(400).json({
        success: false,
        message: "Logo  not found.",
      });
    }
    res.status(200).json({
      success: true,
      logos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// @desc    Get single logo by ID
// @route   GET /api/logos/:id
const getLogoById = async (req, res) => {
  try {
    const logo = await Logo.findById(req.params.id);
    if (!logo) {
      return res
        .status(404)
        .json({ success: false, message: "Logo not found" });
    }
    res.status(200).json({
      success: true,
      logo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// @desc    Create new logo
// @route   POST /api/logos
const createLogo = async (req, res) => {
  try {
    const { companyName, status } = req.body;
    const file = req.file;

    
    if (!companyName || !file) {
      return res
        .status(400)
        .json({ success: false, message: "All field is required" });
    }

    let cloudResponse;
    if (file) {
      const fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    }

    const addLogo = await Logo.create({
      companyName,
      logo: cloudResponse?.secure_url,
      status,
      uploadedAt: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Logo uploaded successfully",
      addLogo,
    });
  } catch (error) {
    console.log(error.meesage);
    res.status(500).json({ success: false, message: "Failed to upload logo" });
  }
};

// @desc    Update logo
// @route   PUT /api/logos/:id
const updateLogo = async (req, res) => {
  try {
    const { companyName, status } = req.body;
    const file = req.file;

    const updatedLogo = await Logo.findById(req.params.id);

    if (!updatedLogo) {
      return res
        .status(404)
        .json({ success: false, message: "Logo not found" });
    }

    if (companyName) updatedLogo.companyName = companyName;
    if (status) updateLogo.status = status;
    if (file) {
      const dataUri = getDataUri(file);
      const response = await cloudinary.uploader.upload(dataUri.content);
      updateLogo.logo = response?.secure_url;
    }

    await updatedLogo.save();

    res.status(200).json({
      success: true,
      message: "Logo updated successfully.",
      updatedLogo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc    Delete logo
// @route   DELETE /api/logos/:id
const deleteLogo = async (req, res) => {
  try {
    const deleted = await Logo.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Logo not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Logo deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  getLogoById,
  getAllLogos,
  createLogo,
  updateLogo,
  deleteLogo,
};
