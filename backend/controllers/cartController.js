const Cart = require('../models/Cart');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.getByUser(req.user.id);
        res.status(200).json({ success: true, data: cart });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Add product to cart
// @route   POST /api/cart/add
// @access  Private
exports.addToCart = async (req, res) => {
    try {
        const { productId, qty = 1, override } = req.body;

        const cart = await Cart.getByUser(req.user.id);
        const existingItem = cart.items.find(item => item.product_id === productId);

        if (existingItem) {
            if (override) {
                existingItem.qty = qty;
            } else {
                existingItem.qty += qty;
            }
        } else {
            cart.items.push({ product_id: productId, qty });
        }

        const updatedCart = await Cart.upsert(req.user.id, cart.items);
        res.status(200).json({ success: true, data: updatedCart });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:itemId
// @access  Private
exports.removeFromCart = async (req, res) => {
    try {
        const cart = await Cart.getByUser(req.user.id);
        cart.items = cart.items.filter(item => item.product_id !== req.params.itemId);

        const updatedCart = await Cart.upsert(req.user.id, cart.items);
        res.status(200).json({ success: true, data: updatedCart });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
