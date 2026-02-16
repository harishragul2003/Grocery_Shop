import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import api from '../../services/api';
import {
    Edit,
    Trash2,
    Search,
    ChevronLeft,
    ChevronRight,
    Star
} from 'lucide-react';

const ManageProducts = () => {
    const { showSuccess, showError } = useToast();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [pagination, setPagination] = useState({
        total: 0,
        pages: 0,
        currentPage: 1,
        limit: 10
    });

    useEffect(() => {
        fetchProducts();
    }, [currentPage]);

    const fetchProducts = async () => {
        try {
            const params: Record<string, any> = {
                page: currentPage,
                limit: itemsPerPage
            };

            if (searchTerm) {
                params.keyword = searchTerm;
            }

            const response = await api.get('/products', { params });
            setProducts(response.data.data || []);
            setPagination(response.data.pagination || {
                total: 0,
                pages: 0,
                currentPage: 1,
                limit: 10
            });
            setLoading(false);
        } catch (err) {
            console.error('Error fetching products:', err);
            showError('Failed to load products');
            setLoading(false);
        }
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await api.delete(`/products/${id}`);
                showSuccess('Product deleted successfully');
                setProducts(products.filter(p => p._id !== id));
            } catch (err) {
                showError('Error deleting product');
            }
        }
    };

    const handleStockUpdate = async (id, currentStock) => {
        const newStock = prompt('Enter new stock quantity:', currentStock.toString());
        if (newStock === null) return;
        
        const stockValue = parseInt(newStock);
        if (isNaN(stockValue) || stockValue < 0) {
            showError('Invalid stock quantity');
            return;
        }

        try {
            await api.put(`/products/${id}`, { stock: stockValue });
            showSuccess('Stock updated successfully');
            fetchProducts();
        } catch (err) {
            showError(err.response?.data?.error || 'Failed to update stock');
        }
    };

    const handleRatingUpdate = async (id, currentRating) => {
        const newRating = prompt('Enter new rating (0-5):', currentRating.toString());
        if (newRating === null) return;
        
        const ratingValue = parseFloat(newRating);
        if (isNaN(ratingValue) || ratingValue < 0 || ratingValue > 5) {
            showError('Invalid rating. Must be between 0 and 5');
            return;
        }

        try {
            await api.put(`/admin/products/${id}/rating`, { rating: ratingValue });
            showSuccess('Rating updated successfully');
            fetchProducts();
        } catch (err) {
            showError(err.response?.data?.error || 'Failed to update rating');
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(pagination.total / pagination.limit);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
                <p className="text-slate-400">Loading products...</p>
            </div>
        );
    }

    return (
        <div className="py-10">
            <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2 text-emerald-500">Manage Products</h2>
                <p className="text-slate-400">Edit or delete existing products.</p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full max-w-md mb-6 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Products Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-950/50 text-slate-400 text-sm uppercase tracking-wider">
                                <th className="px-6 py-4 font-semibold">Product</th>
                                <th className="px-6 py-4 font-semibold">Category</th>
                                <th className="px-6 py-4 font-semibold">Price</th>
                                <th className="px-6 py-4 font-semibold">Stock</th>
                                <th className="px-6 py-4 font-semibold">Rating</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                        No products found matching your search.
                                    </td>
                                </tr>
                            ) : (
                                filteredProducts.map((product) => (
                                    <tr key={product._id} className="hover:bg-slate-800/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl border border-slate-700 overflow-hidden bg-slate-800 shadow-inner">
                                                    <img src={product.image_url || product.image} alt={product.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-100">{product.name}</p>
                                                    <p className="text-xs text-slate-500 font-mono">ID: {product._id.slice(-6)}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-slate-800 text-slate-400 rounded-lg text-xs font-bold border border-slate-700 uppercase tracking-tighter">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-emerald-400">
                                            ${product.price}
                                            {product.original_price && product.original_price > product.price && (
                                                <span className="ml-2 text-sm text-slate-500 line-through">
                                                    ${product.original_price}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-emerald-500' : product.stock > 0 ? 'bg-amber-500' : 'bg-red-500 animate-pulse'}`}></div>
                                                <span className={product.stock > 10 ? 'text-slate-300' : 'text-red-400'}>
                                                    {product.stock} units
                                                </span>
                                                <button
                                                    onClick={() => handleStockUpdate(product._id, product.stock)}
                                                    className="ml-2 text-xs text-emerald-500 hover:text-emerald-400 underline"
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="flex text-amber-400">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            size={14}
                                                            fill={i < Math.round(product.ratings || 0) ? "currentColor" : "none"}
                                                            className={i < Math.round(product.ratings || 0) ? "text-amber-400" : "text-slate-600"}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-sm text-slate-400">
                                                    ({product.ratings || 0})
                                                </span>
                                                <button
                                                    onClick={() => handleRatingUpdate(product._id, product.ratings || 0)}
                                                    className="ml-2 text-xs text-emerald-500 hover:text-emerald-400 underline"
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <Link
                                                to={`/admin/edit-product/${product._id}`}
                                                className="p-2.5 text-slate-500 hover:text-blue-500 hover:bg-blue-500/10 rounded-xl transition-all"
                                                title="Edit Product"
                                            >
                                                <Edit size={18} />
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteProduct(product._id)}
                                                className="p-2.5 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                                                title="Delete Product"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {filteredProducts.length > 0 && (
                    <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between">
                        <span className="text-sm text-slate-400">
                            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, pagination.total)} of {pagination.total} products
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg text-slate-400 hover:bg-slate-800 disabled:opacity-50 disabled:hover:bg-transparent transition-all"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <span className="text-sm text-slate-300">
                                Page {currentPage} of {totalPages || 1}
                            </span>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages || 1))}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg text-slate-400 hover:bg-slate-800 disabled:opacity-50 disabled:hover:bg-transparent transition-all"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageProducts;
