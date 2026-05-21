const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @desc    Login admin
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide username and password",
      });
    }

    // Find admin by username or email
    const admin = await Admin.findOne({
      $or: [{ username }, { email: username }],
    });

    if (!admin || !admin.isActive) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check password
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate token
    const token = generateToken(admin._id);

    // Store token in session
    req.session.token = token;

    res.json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Logout admin
// @route   POST /api/admin/logout
// @access  Private
const logoutAdmin = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Could not log out",
      });
    }
    res.json({
      success: true,
      message: "Logout successful",
    });
  });
};

// @desc    Get admin profile
// @route   GET /api/admin/profile
// @access  Private
const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password");
    res.json({
      success: true,
      admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Update admin profile
// @route   PUT /api/admin/profile
// @access  Private
const updateAdminProfile = async (req, res) => {
  try {
    const { username, email, currentPassword, newPassword } = req.body;
    const admin = await Admin.findById(req.admin.id);

    if (username) admin.username = username;
    if (email) admin.email = email;

    // If changing password, verify current password
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({
          success: false,
          message: "Current password is required to set new password",
        });
      }

      const isCurrentPasswordValid = await admin.comparePassword(
        currentPassword
      );
      if (!isCurrentPasswordValid) {
        return res.status(400).json({
          success: false,
          message: "Current password is incorrect",
        });
      }

      admin.password = newPassword;
    }

    await admin.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const registerAdmin = async (req, res) => {
  try {
    // // Check if any admin already exists
    // const existingAdmin = await Admin.findOne();
    // if (existingAdmin) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "Admin registration is disabled",
    //   });
    // }

    // const { username, email, password } = req.body;

    // if (!username || !email || !password) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Please provide username, email, and password",
    //   });
    // }

    // // Check if admin already exists
    // const adminExists = await Admin.findOne({
    //   $or: [{ username }, { email }],
    // });

    // if (adminExists) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Admin already exists",
    //   });
    // }

    // // Create admin
    // const admin = await Admin.create({
    //   username,
    //   email,
    //   password,
    // });

    // // Generate token
    // const token = generateToken(admin._id);

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      // token,
      // admin: {
      //   id: admin._id,
      //   username: admin.username,
      //   email: admin.email,
      // },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  loginAdmin,
  logoutAdmin,
  getAdminProfile,
  updateAdminProfile,
  registerAdmin,
};
