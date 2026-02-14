const Wishlist = require('../models/Wishlist');

// @desc    Add or Remove product from wishlist (Toggle)
// @route   POST /api/wishlist/:productId
// @access  Private
exports.toggleWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.params.productId;

        const wishlist = await Wishlist.getByUser(userId);
        const isWishlisted = wishlist.items.includes(productId);

        if (isWishlisted) {
            // Remove from wishlist
            wishlist.items = wishlist.items.filter(id => id !== productId);
            const updatedWishlist = await Wishlist.upsert(userId, wishlist.items);
            return res.status(200).json({ success: true, message: 'Removed from wishlist', data: updatedWishlist });
        } else {
            // Add to wishlist
            wishlist.items.push(productId);
            const updatedWishlist = await Wishlist.upsert(userId, wishlist.items);
            return res.status(200).json({ success: true, message: 'Added to wishlist', data: updatedWishlist });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get current user wishlist
// @route   GET /api/wishlist
// @access  Private
exports.getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.getByUser(req.user.id);
        res.status(200).json({ success: true, count: wishlist.items.length, data: wishlist });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
