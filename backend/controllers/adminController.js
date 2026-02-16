const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
exports.getStats = async (req, res) => {
    try {
        // Get all users
        const users = await User.getAll();
        const totalUsers = users.filter(u => u.role === 'user').length;

        // Get all orders
        const orders = await Order.getAll();
        const totalOrders = orders.length;

        // Get all products
        const products = await Product.getAll();
        const totalProducts = products.length;

        // Calculate total revenue from completed orders
        const completedOrders = orders.filter(o => o.paymentStatus === 'Completed');
        const totalRevenue = completedOrders.reduce((acc, order) => acc + order.totalAmount, 0);

        // Weekly revenue data for chart
        const last7Days = new Date();
        last7Days.setDate(last7Days.getDate() - 7);

        const recentOrders = completedOrders.filter(o => {
            const orderDate = new Date(o.createdAt);
            return orderDate >= last7Days;
        });

        // Group by day
        const dailyRevenue = {};
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            dailyRevenue[dateStr] = 0;
        }

        recentOrders.forEach(order => {
            const dateStr = new Date(order.createdAt).toISOString().split('T')[0];
            if (dailyRevenue[dateStr] !== undefined) {
                dailyRevenue[dateStr] += order.totalAmount;
            }
        });

        const chartData = Object.keys(dailyRevenue).map(date => ({
            date,
            revenue: dailyRevenue[date]
        })).reverse();

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalOrders,
                totalProducts,
                totalRevenue: totalRevenue.toFixed(2),
                chartData
            }
        });
    } catch (err) {
        console.error('Error fetching stats:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update product rating
// @route   PUT /api/admin/products/:id/rating
// @access  Private/Admin
exports.updateProductRating = async (req, res) => {
    try {
        const { rating, reviewCount } = req.body;

        // Validate rating
        if (rating === undefined || rating < 0 || rating > 5) {
            return res.status(400).json({ success: false, error: 'Rating must be between 0 and 5' });
        }

        // Validate review count if provided
        if (reviewCount !== undefined && reviewCount < 0) {
            return res.status(400).json({ success: false, error: 'Review count cannot be negative' });
        }

        const product = await Product.update(req.params.id, {
            ratings: rating,
            num_reviews: reviewCount
        });

        if (!product) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }

        res.status(200).json({ success: true, data: product });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
