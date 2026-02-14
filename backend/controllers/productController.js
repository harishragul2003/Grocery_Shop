const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
    try {
        const { keyword, category, minPrice, maxPrice, page = 1, limit = 8 } = req.query;

        // Fetch all products from Supabase
        let products = await Product.getAll();

        // Filter by keyword
        if (keyword) {
            products = products.filter(p => 
                p.name.toLowerCase().includes(keyword.toLowerCase()) ||
                p.description?.toLowerCase().includes(keyword.toLowerCase())
            );
        }

        // Filter by category
        if (category && category !== 'All') {
            products = products.filter(p => p.category === category);
        }

        // Filter by price range
        if (minPrice || maxPrice) {
            products = products.filter(p => {
                if (minPrice && p.price < Number(minPrice)) return false;
                if (maxPrice && p.price > Number(maxPrice)) return false;
                return true;
            });
        }

        // Get total count
        const total = products.length;

        // Pagination
        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        const offset = (pageNum - 1) * limitNum;
        const paginatedProducts = products.slice(offset, offset + limitNum);

        res.status(200).json({
            success: true,
            count: paginatedProducts.length,
            pagination: {
                total,
                pages: Math.ceil(total / limitNum),
                currentPage: pageNum,
                limit: limitNum
            },
            data: paginatedProducts
        });
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.getById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }
        res.status(200).json({ success: true, data: product });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({ success: true, data: product });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.update(req.params.id, req.body);
        if (!product) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }
        res.status(200).json({ success: true, data: product });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.delete(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
