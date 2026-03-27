import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Package,
    Search,
    Plus,
    Edit,
    Trash2,
    X,
    ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showProductModal, setShowProductModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [productForm, setProductForm] = useState({
        name: '',
        price: '',
        original_price: '',
        category: '',
        stock: '',
        description: '',
        brand: '',
        image_url: '',
        ratings: '0',
        num_reviews: '0'
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await api.get('/products?limit=1000');
            setProducts(response.data.data);
        } catch (err) {
            console.error('Error fetching products:', err);
            alert('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenProductModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setProductForm({
                name: product.name || '',
                price: product.price || '',
                original_price: product.original_price || product.originalPrice || '',
                category: product.category || '',
                stock: product.stock || '',
                description: product.description || '',
                brand: product.brand || '',
                image_url: product.image_url || product.image || '',
                ratings: product.ratings || '0',
                num_reviews: product.num_reviews || product.numReviews || '0'
            });
        } else {
            setEditingProduct(null);
            setProductForm({
                name: '',
                price: '',
                original_price: '',
                category: '',
                stock: '',
                description: '',
                brand: '',
                image_url: '',
                ratings: '0',
                num_reviews: '0'
            });
        }
        setShowProductModal(true);
    };

    const handleCloseProductModal = () => {
        setShowProductModal(false);
        setEditingProduct(null);
    };

    const handleProductFormChange = (e) => {
        const { name, value } = e.target;
        setProductForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveProduct = async (e) => {
        e.preventDefault();
        
        try {
            const productData = {
                ...productForm,
                price: parseFloat(productForm.price),
                original_price: productForm.original_price ? parseFloat(productForm.original_price) : null,
                stock: parseInt(productForm.stock),
                ratings: parseFloat(productForm.ratings),
                num_reviews: parseInt(productForm.num_reviews)
            };

            if (editingProduct) {
                await api.put(`/products/${editingProduct.id}`, productData);
                alert('Product updated successfully!');
            } else {
                await api.post('/products', productData);
                alert('Product created successfully!');
            }
            
            handleCloseProductModal();
            fetchProducts();
        } catch (err) {
            console.error('Error saving product:', err);
            alert(err.response?.data?.error || 'Failed to save product');
        }
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await api.delete(`/products/${id}`);
                alert('Product deleted successfully!');
                fetchProducts();
            } catch (err) {
                console.error('Error deleting product:', err);
                alert('Failed to delete product');
            }
        }
    };

    const filteredProducts = products.filter(p =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full"
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <Link
                        to="/admin/dashboard"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 mb-4 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Back to Dashboard
                    </Link>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2">Manage Products</h1>
                            <p className="text-slate-400">
                                Total Products: <span className="text-emerald-400 font-bold">{filteredProducts.length}</span>
                            </p>
                        </div>
                        <button
                            onClick={() => handleOpenProductModal()}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-500/50 transition-all"
                        >
                            <Plus size={20} />
                            Add New Product
                        </button>
                    </div>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6"
                >
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                        <input
                            type="text"
                            placeholder="Search products by name, category, or brand..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                        />
                    </div>
                </motion.div>

                {/* Products Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl overflow-hidden shadow-xl"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-950/50 text-slate-400 text-sm">
                                    <th className="px-6 py-4 text-left font-medium">Product</th>
                                    <th className="px-6 py-4 text-left font-medium">Category</th>
                                    <th className="px-6 py-4 text-left font-medium">Brand</th>
                                    <th className="px-6 py-4 text-left font-medium">Price</th>
                                    <th className="px-6 py-4 text-left font-medium">Stock</th>
                                    <th className="px-6 py-4 text-left font-medium">Rating</th>
                                    <th className="px-6 py-4 text-right font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product, i) => (
                                    <motion.tr
                                        key={product.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.02 }}
                                        className="border-t border-slate-800/50 hover:bg-slate-800/30 transition-all group"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-800 border border-slate-700 flex-shrink-0">
                                                    <img
                                                        src={product.image_url || product.image}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-white font-medium truncate">{product.name}</p>
                                                    <p className="text-slate-500 text-xs truncate">{product.description?.slice(0, 50)}...</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-xs font-medium">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-300">{product.brand || 'N/A'}</td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="text-emerald-400 font-bold">${product.price}</p>
                                                {product.original_price && (
                                                    <p className="text-slate-500 text-xs line-through">${product.original_price}</p>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-emerald-500' : 'bg-red-500 animate-pulse'}`} />
                                                <span className={product.stock > 10 ? 'text-slate-300' : 'text-red-400'}>
                                                    {product.stock} units
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1">
                                                <span className="text-amber-400">★</span>
                                                <span className="text-white font-medium">{product.ratings || 0}</span>
                                                <span className="text-slate-500 text-xs">({product.num_reviews || 0})</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleOpenProductModal(product)}
                                                    className="p-2 hover:bg-emerald-500/10 text-emerald-400 rounded-lg transition-all"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteProduct(product.id)}
                                                    className="p-2 hover:bg-red-500/10 text-red-400 rounded-lg transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="py-20 text-center">
                            <Package className="mx-auto text-slate-600 mb-4" size={64} />
                            <p className="text-slate-400 text-lg">No products found</p>
                            <p className="text-slate-500 text-sm mt-2">Try adjusting your search or add a new product</p>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Product Add/Edit Modal */}
            <AnimatePresence>
                {showProductModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        onClick={handleCloseProductModal}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', damping: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                        >
                            <form onSubmit={handleSaveProduct}>
                                {/* Modal Header */}
                                <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-emerald-500/10 to-teal-500/10 sticky top-0 z-10 bg-slate-900/95 backdrop-blur">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">
                                            {editingProduct ? 'Edit Product' : 'Add New Product'}
                                        </h3>
                                        <p className="text-slate-400 text-sm mt-1">
                                            {editingProduct ? 'Update product information' : 'Fill in the details below'}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleCloseProductModal}
                                        className="p-2 hover:bg-slate-800 rounded-xl transition-all text-slate-400 hover:text-white"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                {/* Modal Body */}
                                <div className="p-6 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Product Name */}
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                Product Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={productForm.name}
                                                onChange={handleProductFormChange}
                                                required
                                                className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                                                placeholder="Enter product name"
                                            />
                                        </div>

                                        {/* Category */}
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                Category *
                                            </label>
                                            <select
                                                name="category"
                                                value={productForm.category}
                                                onChange={handleProductFormChange}
                                                required
                                                className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                                            >
                                                <option value="">Select category</option>
                                                <option value="Vegetables">Vegetables</option>
                                                <option value="Fruits">Fruits</option>
                                                <option value="Dairy">Dairy</option>
                                                <option value="Bakery">Bakery</option>
                                                <option value="Meat">Meat</option>
                                                <option value="Beverages">Beverages</option>
                                            </select>
                                        </div>

                                        {/* Brand */}
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                Brand
                                            </label>
                                            <input
                                                type="text"
                                                name="brand"
                                                value={productForm.brand}
                                                onChange={handleProductFormChange}
                                                className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                                                placeholder="Enter brand name"
                                            />
                                        </div>

                                        {/* Price */}
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                Price ($) *
                                            </label>
                                            <input
                                                type="number"
                                                name="price"
                                                value={productForm.price}
                                                onChange={handleProductFormChange}
                                                required
                                                step="0.01"
                                                min="0"
                                                className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                                                placeholder="0.00"
                                            />
                                        </div>

                                        {/* Original Price */}
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                Original Price ($)
                                            </label>
                                            <input
                                                type="number"
                                                name="original_price"
                                                value={productForm.original_price}
                                                onChange={handleProductFormChange}
                                                step="0.01"
                                                min="0"
                                                className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                                                placeholder="0.00"
                                            />
                                        </div>

                                        {/* Stock */}
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                Stock Quantity *
                                            </label>
                                            <input
                                                type="number"
                                                name="stock"
                                                value={productForm.stock}
                                                onChange={handleProductFormChange}
                                                required
                                                min="0"
                                                className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                                                placeholder="0"
                                            />
                                        </div>

                                        {/* Ratings */}
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                Ratings (0-5)
                                            </label>
                                            <input
                                                type="number"
                                                name="ratings"
                                                value={productForm.ratings}
                                                onChange={handleProductFormChange}
                                                step="0.1"
                                                min="0"
                                                max="5"
                                                className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                                                placeholder="0.0"
                                            />
                                        </div>

                                        {/* Number of Reviews */}
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                Number of Reviews
                                            </label>
                                            <input
                                                type="number"
                                                name="num_reviews"
                                                value={productForm.num_reviews}
                                                onChange={handleProductFormChange}
                                                min="0"
                                                className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                                                placeholder="0"
                                            />
                                        </div>

                                        {/* Image URL */}
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                Image URL
                                            </label>
                                            <input
                                                type="url"
                                                name="image_url"
                                                value={productForm.image_url}
                                                onChange={handleProductFormChange}
                                                className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                                                placeholder="https://example.com/image.jpg"
                                            />
                                        </div>

                                        {/* Description */}
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                Description
                                            </label>
                                            <textarea
                                                name="description"
                                                value={productForm.description}
                                                onChange={handleProductFormChange}
                                                rows={4}
                                                className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none"
                                                placeholder="Enter product description"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Modal Footer */}
                                <div className="p-6 border-t border-slate-800 flex justify-end gap-3 sticky bottom-0 bg-slate-900/95 backdrop-blur">
                                    <button
                                        type="button"
                                        onClick={handleCloseProductModal}
                                        className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl font-medium transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-500/50 transition-all"
                                    >
                                        {editingProduct ? 'Update Product' : 'Create Product'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageProducts;
