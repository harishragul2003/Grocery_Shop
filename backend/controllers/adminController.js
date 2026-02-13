const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
exports.getStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'user' });
        const totalOrders = await Order.countDocuments();
        const products = await Product.countDocuments();

        const orders = await Order.find({ paymentStatus: 'Completed' });
        const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);

        // Weekly revenue data for chart
        const last7Days = new Date();
        last7Days.setDate(last7Days.getDate() - 7);

        const recentOrders = await Order.find({
            createdAt: { $gte: last7Days },
            paymentStatus: 'Completed'
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
            const dateStr = order.createdAt.toISOString().split('T')[0];
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
                totalProducts: products,
                totalRevenue: totalRevenue.toFixed(2),
                chartData
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
