const Project = require("../models/Project.js");
const cloudinary = require("../config/cloudinary.js");
const getDataUri = require("../config/dataUri.js");

// Create Project
exports.createProject = async (req, res) => {
  try {
    const {
      title,
      location,
      year,
      category,
      description,
      highlights,
      scope,
      value,
      featured,
    } = req.body;
    const files = req.files; // Array of files

    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, description and category are required",
      });
    }

    // Upload all images to Cloudinary
    const imageUploadPromises = files.map(async (file) => {
      const fileUri = getDataUri(file);
      return cloudinary.uploader.upload(fileUri.content);
    });

    const cloudResults = await Promise.all(imageUploadPromises);
    const images = cloudResults.map((result) => ({
      url: result.secure_url,
      publicId: result.public_id,
    }));

    // Parse highlights if it's a string
    let parsedHighlights = [];
    if (typeof highlights === "string") {
      try {
        parsedHighlights = JSON.parse(highlights);
      } catch {
        parsedHighlights = highlights.split(",").map((h) => h.trim());
      }
    } else if (Array.isArray(highlights)) {
      parsedHighlights = highlights;
    }

    // Create project with image URLs
    const project = await Project.create({
      title,
      location,
      year,
      category,
      description,
      highlights: parsedHighlights,
      scope,
      value,
      images, // Store array of objects with url and publicId
      featured: featured === "true",
    });

    res.status(201).json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get All Projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get Single Project
exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Update Project
exports.updateProject = async (req, res) => {
  try {
    const {
      title,
      location,
      year,
      category,
      description,
      highlights,
      scope,
      value,
      keepImages = [], // Array of publicIds to keep
      featured,
    } = req.body;

    const files = req.files;
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Parse keepImages if it's a string
    let keepImagesArray = [];
    if (typeof keepImages === "string") {
      try {
        keepImagesArray = JSON.parse(keepImages);
      } catch {
        keepImagesArray = keepImages.split(",").map((id) => id.trim());
      }
    } else if (Array.isArray(keepImages)) {
      keepImagesArray = keepImages;
    }

    // Delete images not in keepImagesArray
    const imagesToDelete = project.images.filter(
      (img) => !keepImagesArray.includes(img.publicId)
    );

    // Delete from Cloudinary
    const deletePromises = imagesToDelete.map((img) =>
      cloudinary.uploader.destroy(img.publicId)
    );

    await Promise.all(deletePromises);

    // Keep only images that are in keepImagesArray
    project.images = project.images.filter((img) =>
      keepImagesArray.includes(img.publicId)
    );

    // If new images are uploaded
    if (files && files.length > 0) {
      const imageUploadPromises = files.map(async (file) => {
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        return {
          url: cloudResponse.secure_url,
          publicId: cloudResponse.public_id,
        };
      });

      const newImages = await Promise.all(imageUploadPromises);
      project.images.push(...newImages);
    }

    // Parse highlights if it's a string
    let parsedHighlights = [];
    if (typeof highlights === "string") {
      try {
        parsedHighlights = JSON.parse(highlights);
      } catch {
        parsedHighlights = highlights.split(",").map((h) => h.trim());
      }
    } else if (Array.isArray(highlights)) {
      parsedHighlights = highlights;
    }

    // Update other fields
    project.title = title || project.title;
    project.location = location || project.location;
    project.year = year || project.year;
    project.category = category || project.category;
    project.description = description || project.description;
    project.highlights =
      parsedHighlights.length > 0 ? parsedHighlights : project.highlights;
    project.scope = scope || project.scope;
    project.value = value || project.value;
    project.featured = featured || project.featured;

    await project.save();

    res.json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Delete Project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Delete all images from Cloudinary
    const deletePromises = project.images.map((img) =>
      cloudinary.uploader.destroy(img.publicId)
    );

    await Promise.all(deletePromises);

    res.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
