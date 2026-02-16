const express = require('express');
const { getStats, updateProductRating } = require('../controllers/adminController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/stats', protect, isAdmin, getStats);
router.put('/products/:id/rating', protect, isAdmin, updateProductRating);

module.exports = router;
