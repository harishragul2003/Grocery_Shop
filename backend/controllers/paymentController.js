const stripe = require('stripe')(process.env.PAYMENT_KEY);
const Order = require('../models/Order');
const Cart = require('../models/Cart');

// @desc    Create Stripe Checkout Session
// @route   POST /api/payment/create-checkout-session
// @access  Private
exports.createCheckoutSession = async (req, res) => {
    try {
        const { shippingAddress, items } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ success: false, error: 'No items in order' });
        }

        const line_items = items.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.productId.name,
                    images: [item.productId.image],
                },
                unit_amount: Math.round(item.productId.price * 100), // Stripe expects amount in cents
            },
            quantity: item.qty,
        }));

        // Create checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/cart`,
            customer_email: req.user.email,
            metadata: {
                userId: req.user.id.toString(),
                shippingAddress,
            }
        });

        res.status(200).json({ success: true, url: session.url });
    } catch (err) {
        console.error('Stripe Error:', err);
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Verify payment and save order
// @route   POST /api/payment/verify
// @access  Private
exports.verifyPayment = async (req, res) => {
    try {
        const { sessionId } = req.body;
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === 'paid') {
            // Check if order already exists for this session to prevent duplicates
            const existingOrder = await Order.findOne({ paymentId: sessionId });
            if (existingOrder) {
                return res.status(200).json({ success: true, data: existingOrder });
            }

            // Get cart items for this user
            const cart = await Cart.findOne({ userId: session.metadata.userId }).populate('items.productId');

            if (!cart) {
                return res.status(400).json({ success: false, error: 'Cart not found' });
            }

            // Create order
            const orderData = {
                userId: session.metadata.userId,
                products: cart.items.map(item => ({
                    productId: item.productId._id,
                    name: item.productId.name,
                    qty: item.qty,
                    price: item.productId.price
                })),
                totalAmount: session.amount_total / 100,
                paymentStatus: 'Completed',
                shippingAddress: session.metadata.shippingAddress,
                paymentId: sessionId
            };

            const order = await Order.create(orderData);

            // Clear cart
            cart.items = [];
            await cart.save();

            res.status(201).json({ success: true, data: order });
        } else {
            res.status(400).json({ success: false, error: 'Payment not completed' });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: 'Verification failed' });
    }
};
