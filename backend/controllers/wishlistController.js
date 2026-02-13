const User = require('../models/User');

// @desc    Add or Remove product from wishlist (Toggle)
// @route   POST /api/wishlist/:productId
// @access  Private
exports.toggleWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.params.productId;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        const isWishlisted = user.wishlist.includes(productId);

        if (isWishlisted) {
            // Remove from wishlist
            user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
            await user.save();
            return res.status(200).json({ success: true, message: 'Removed from wishlist', data: user.wishlist });
        } else {
            // Add to wishlist
            user.wishlist.push(productId);
            await user.save();
            return res.status(200).json({ success: true, message: 'Added to wishlist', data: user.wishlist });
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
        const user = await User.findById(req.user.id).populate('wishlist');
        res.status(200).json({ success: true, count: user.wishlist.length, data: user.wishlist });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
