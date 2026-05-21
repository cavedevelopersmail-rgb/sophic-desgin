const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getThemes,
  getActiveTheme,
  createTheme,
  activateTheme,
} = require("../controllers/themeController");

router.get("/", authMiddleware, getThemes);
router.get("/active", getActiveTheme);
router.post("/", authMiddleware, createTheme);
router.put("/:id/activate", authMiddleware, activateTheme);

module.exports = router;
