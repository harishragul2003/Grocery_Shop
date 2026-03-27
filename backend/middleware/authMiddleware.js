const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes
exports.protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        // Set token from Bearer token in header
        token = req.headers.authorization.split(' ')[1];
    }

    // Make sure token exists
    if (!token) {
        return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user by ID using our User model
        req.user = await User.getById(decoded.id);

        if (!req.user) {
            return res.status(401).json({ success: false, error: 'User not found' });
        }

        next();
    } catch (err) {
        console.error('Auth middleware error:', err);
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, error: 'Token expired, please login again' });
        }
        return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
    }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                error: `User role ${req.user?.role || 'unknown'} is not authorized to access this route`
            });
        }
        next();
    };
};

// Admin middleware alias
exports.isAdmin = exports.authorize('admin');
