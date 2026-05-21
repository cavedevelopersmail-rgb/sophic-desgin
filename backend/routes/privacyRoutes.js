const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { getPrivacy, savePrivacy } = require('../controllers/privacyController');

// @route   GET /api/privacy
router.get('/', getPrivacy);

// @route   PUT /api/privacy
router.post('/', authMiddleware, savePrivacy);

module.exports = router;