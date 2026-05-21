const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { heroSlidesUpload } = require("../middlewares/multer");
const { getHero, updateHero } = require("../controllers/heroController");

router.get("/", getHero);
router.put("/", authMiddleware, heroSlidesUpload, updateHero);

module.exports = router;
