const express = require('express');
const { toggleWishlist, getWishlist } = require('../controllers/wishlistController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect); // All wishlist routes are protected

router.route('/').get(getWishlist);
router.route('/:productId').post(toggleWishlist);

module.exports = router;
