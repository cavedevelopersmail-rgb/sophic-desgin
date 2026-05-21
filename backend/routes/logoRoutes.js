const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const { singleUpload } = require("../middlewares/multer");
const {
  getAllLogos,
  getLogoById,
  createLogo,
  updateLogo,
  deleteLogo,
} = require("../controllers/logoController");

router.get("/", getAllLogos);
router.get("/:id", getLogoById);
router.post("/", authMiddleware, singleUpload, createLogo);
router.put("/:id", authMiddleware, singleUpload, updateLogo);
router.delete("/:id", authMiddleware, deleteLogo);


module.exports = router;