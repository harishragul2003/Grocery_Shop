const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// @desc    Upload image
// @route   POST /api/upload
// @access  Private/Admin
router.post('/', protect, isAdmin, upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, error: 'Please upload an image' });
    }

    // Return the path that will be stored in the Product model
    // Note: On Windows, we replace backslashes with forward slashes for URL consistency
    const filePath = req.file.path.replace(/\\/g, '/');

    res.status(200).json({
        success: true,
        data: `/${filePath}`
    });
});

module.exports = router;
