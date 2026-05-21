const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
// const { getTerms, updateTerms, createTerms, deleteTerms } = require('../controllers/termsController');
const { getTerms, saveTerms } =  require("../controllers/termsController");

// @route   GET /api/terms
// router.get('/', getTerms);

// // @route   PUT /api/terms/:id
// router.put('/:id', authMiddleware, updateTerms);

// // @route   POST /api/terms
// router.post('/', authMiddleware, createTerms);

// // @route   DELETE /api/terms/:id
// router.delete('/:id', authMiddleware, deleteTerms);


router.get("/", getTerms);
router.post("/",authMiddleware, saveTerms);


module.exports = router;