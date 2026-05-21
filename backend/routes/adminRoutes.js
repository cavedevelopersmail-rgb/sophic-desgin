const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  loginAdmin,
  logoutAdmin,
  getAdminProfile,
  updateAdminProfile,
  registerAdmin,
} = require("../controllers/adminController");

// @route   POST /api/admin/login
router.post("/login", loginAdmin);
router.post("/register", registerAdmin);
// @route   POST /api/admin/logout
router.post("/logout", authMiddleware, logoutAdmin);

// @route   GET /api/admin/profile
router.get("/profile", authMiddleware, getAdminProfile);

// @route   PUT /api/admin/profile
router.put("/profile", authMiddleware, updateAdminProfile);

module.exports = router;
