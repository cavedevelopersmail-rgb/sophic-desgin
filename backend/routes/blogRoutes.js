const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { singleUpload } = require("../middlewares/multer");

const {
  getBlogs,
  getBlog,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

// @route   GET /api/blogs
router.get("/", getBlogs);

// @route   GET /api/blogs/slug/:slug
router.get("/slug/:slug", getBlogBySlug);

// @route   GET /api/blogs/:id
router.get("/:id", getBlog);

// @route   POST /api/blogs
router.post("/", authMiddleware, singleUpload, createBlog);

// @route   PUT /api/blogs/:id
router.put("/:id", authMiddleware, singleUpload, updateBlog);

// @route   DELETE /api/blogs/:id
router.delete("/:id", authMiddleware, deleteBlog);

module.exports = router;
