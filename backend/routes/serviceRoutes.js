const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { serviceFilesUpload } = require("../middlewares/multer");
const {
  getServices,
  getServiceBySlug,
  getServiceByIdPublic,
  createService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

router.get("/", getServices);
router.get("/id/:id", getServiceByIdPublic);
router.get("/slug/:slug", getServiceBySlug);
router.post("/", authMiddleware, serviceFilesUpload, createService);
router.put("/:id", authMiddleware, serviceFilesUpload, updateService);
router.delete("/:id", authMiddleware, deleteService);

module.exports = router;
