const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { singleUpload } = require("../middlewares/multer");
const {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

// @route   GET /api/reviews/stats

// @route   GET /api/reviews
router.get("/", getReviews);

// @route   GET /api/reviews/:id
router.get("/:id", getReview);

// @route   POST /api/reviews
router.post("/", authMiddleware, singleUpload, createReview);

// @route   PUT /api/reviews/:id
router.put("/:id", authMiddleware, singleUpload, updateReview);

// @route   DELETE /api/reviews/:id
router.delete("/:id", authMiddleware, deleteReview);

module.exports = router;
