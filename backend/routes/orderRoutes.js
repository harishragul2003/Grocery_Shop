const express = require('express');
const {
    createOrder,
    getMyOrders,
    getOrders,
    updateOrderStatus,
    deleteOrder
} = require('../controllers/orderController');

const { protect, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/')
    .get(isAdmin, getOrders)
    .post(createOrder);

router.get('/my', getMyOrders);

router.route('/:id')
    .put(isAdmin, updateOrderStatus)
    .delete(isAdmin, deleteOrder);

module.exports = router;
