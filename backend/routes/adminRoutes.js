const express = require('express');
const { getStats } = require('../controllers/adminController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/stats', protect, isAdmin, getStats);

module.exports = router;
