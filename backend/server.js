const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables FIRST
dotenv.config();

const { supabase } = require('./config/supabaseClient');
const { connectDB } = require('./config/db');

// Connect to Database
connectDB();

const app = express();

const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
// const xss = require('xss-clean'); // Temporarily disabled
const hpp = require('hpp');

// Middleware
app.use(express.json());

// Set security headers
app.use(helmet());

// Prevent XSS attacks - temporarily disabled
// app.use(xss());

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 100 // limit each IP to 100 requests per windowMs
});
// app.use('/api', limiter);
if (process.env.NODE_ENV === "production") {
    app.use('/api', limiter);
}


// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = [
            "http://localhost:5173",
            "http://10.159.28.124:5173",
            "http://192.168.137.1:5174",
            process.env.CLIENT_URL,
            process.env.FRONTEND_URL
        ].filter(Boolean);

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));


// Set static folder
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Basic Route
app.get('/', (req, res) => {
    res.send('Grocery Shop API is running...');
});

// Mount routers
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/wishlist', require('./routes/wishlistRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
