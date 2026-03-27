const express = require('express');
const { 
    getStats, 
    getAllUsers, 
    updateProductRating,
    getAllOrders,
    updateOrderStatus,
    getOrderById
} = require('../controllers/adminController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/stats', protect, isAdmin, getStats);
router.get('/users', protect, isAdmin, getAllUsers);
router.put('/products/:id/rating', protect, isAdmin, updateProductRating);

// Order management routes
router.get('/orders', protect, isAdmin, getAllOrders);
router.get('/orders/:id', protect, isAdmin, getOrderById);
router.put('/orders/:id/status', protect, isAdmin, updateOrderStatus);

module.exports = router;
