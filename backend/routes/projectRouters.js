const express = require("express");
const router = express.Router();
const {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectsController.js");
const { multipleUpload } = require("../middlewares/multer");

router.post("/", multipleUpload, createProject);
router.get("/", getProjects);
router.get("/:id", getProject);
router.put("/:id", multipleUpload, updateProject);
router.delete("/:id", deleteProject);

module.exports = router;
