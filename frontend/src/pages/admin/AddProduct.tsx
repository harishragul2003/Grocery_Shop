import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import api from '../../services/api';
import ImageUpload from '../../components/ImageUpload';

const AddProduct = () => {
    const navigate = useNavigate();
    const { showSuccess, showError } = useToast();
    
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        original_price: '',
        category: '',
        stock: '',
        description: '',
        brand: ''
    });
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const categories = [
        'Fruits & Vegetables',
        'Dairy & Eggs',
        'Beverages',
        'Snacks',
        'Grains & Pulses',
        'Spices',
        'Bakery',
        'Personal Care',
        'Cleaning',
        'Other'
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!imageUrl) {
            showError('Please upload a product image');
            return;
        }

        if (!formData.name || !formData.price || !formData.category) {
            showError('Please fill in all required fields');
            return;
        }

        const stockValue = parseInt(formData.stock);
        if (isNaN(stockValue) || stockValue < 0) {
            showError('Stock quantity cannot be negative');
            return;
        }

        const priceValue = parseFloat(formData.price);
        if (isNaN(priceValue) || priceValue < 0) {
            showError('Price cannot be negative');
            return;
        }

        if (formData.original_price) {
            const originalPriceValue = parseFloat(formData.original_price);
            if (isNaN(originalPriceValue) || originalPriceValue < 0) {
                showError('Original price cannot be negative');
                return;
            }
        }

        setLoading(true);

        try {
            const productData = {
                name: formData.name,
                price: priceValue,
                original_price: formData.original_price ? parseFloat(formData.original_price) : undefined,
                category: formData.category,
                stock: stockValue,
                description: formData.description,
                brand: formData.brand,
                image_url: imageUrl,
                ratings: 0,
                num_reviews: 0
            };

            await api.post('/products', productData);
            showSuccess('Product added successfully!');
            navigate('/admin');
        } catch (err: any) {
            showError(err.response?.data?.error || 'Failed to add product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="py-10 max-w-4xl mx-auto px-4">
            <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">Add New Product</h2>
                <p className="text-slate-400">Fill in the details to add a product to your store</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
                {/* Product Image */}
                <div className="mb-8">
                    <ImageUpload 
                        onUploadSuccess={setImageUrl} 
                        currentImage={null}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Product Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Product Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter product name"
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                            required
                        />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Category *</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                            required
                        >
                            <option value="">Select category</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Price ($) *</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                            required
                        />
                    </div>

                    {/* Original Price */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Original Price ($)</label>
                        <input
                            type="number"
                            name="original_price"
                            value={formData.original_price}
                            onChange={handleChange}
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                        />
                    </div>

                    {/* Stock */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Stock Quantity</label>
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            placeholder="0"
                            min="0"
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                        />
                    </div>

                    {/* Brand */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Brand</label>
                        <input
                            type="text"
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            placeholder="Brand name"
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-2 mb-8">
                    <label className="text-sm font-medium text-slate-400">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter product description..."
                        rows={4}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all resize-none"
                    />
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => navigate('/admin')}
                        className="px-6 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl font-medium transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-600/50 rounded-xl font-bold transition-all shadow-lg shadow-emerald-600/20 active:scale-95 text-white flex items-center gap-2"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Adding...
                            </>
                        ) : (
                            'Add Product'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
