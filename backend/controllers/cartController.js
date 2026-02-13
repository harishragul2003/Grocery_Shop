const Cart = require('../models/Cart');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
exports.getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');

        if (!cart) {
            return res.status(200).json({ success: true, data: { items: [] } });
        }

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
        const { productId, qty, override } = req.body;

        let cart = await Cart.findOne({ userId: req.user.id });

        if (cart) {
            // Check if product already in cart
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

            if (itemIndex > -1) {
                // Update quantity
                if (override) {
                    cart.items[itemIndex].qty = qty;
                } else {
                    cart.items[itemIndex].qty += qty;
                }
            } else {
                // Add new item
                cart.items.push({ productId, qty });
            }
            await cart.save();
        } else {
            // Create new cart
            cart = await Cart.create({
                userId: req.user.id,
                items: [{ productId, qty }]
            });
        }

        res.status(200).json({ success: true, data: cart });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:itemId
// @access  Private
exports.removeFromCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) {
            return res.status(404).json({ success: false, error: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => item._id.toString() !== req.params.itemId);

        await cart.save();

        res.status(200).json({ success: true, data: cart });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
