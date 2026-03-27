import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Users,
    ShoppingBag,
    Package,
    DollarSign,
    TrendingUp,
    Search,
    Bell,
    Menu,
    X,
    Eye,
    Edit,
    Trash2,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Shield,
    ChevronDown,
    LogOut,
    Settings,
    Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

// Animated Counter Component
const AnimatedCounter = ({ value, prefix = '', suffix = '' }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const duration = 2000;
        const steps = 60;
        const increment = value / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [value]);

    return (
        <span>
            {prefix}
            {typeof count === 'number' ? count.toLocaleString() : count}
            {suffix}
        </span>
    );
};

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [stats, setStats] = useState(null);
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showUserModal, setShowUserModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [userSearchTerm, setUserSearchTerm] = useState('');
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    
    // Product CRUD states
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
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [statsRes, productsRes, usersRes] = await Promise.all([
                api.get('/admin/stats'),
                api.get('/products?limit=100'),
                api.get('/admin/users')
            ]);
            setStats(statsRes.data.data);
            setProducts(productsRes.data.data);
            setUsers(usersRes.data.data);
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await api.delete(`/products/${id}`);
                setProducts(products.filter(p => p.id !== id));
                alert('Product deleted successfully!');
                fetchData(); // Refresh data
            } catch (err) {
                console.error('Error deleting product:', err);
                alert('Failed to delete product');
            }
        }
    };

    const handleOpenProductModal = (product = null) => {
        if (product) {
            // Edit mode
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
            // Add mode
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
                // Update existing product
                await api.put(`/products/${editingProduct.id}`, productData);
                alert('Product updated successfully!');
            } else {
                // Create new product
                await api.post('/products', productData);
                alert('Product created successfully!');
            }
            
            handleCloseProductModal();
            fetchData(); // Refresh data
        } catch (err) {
            console.error('Error saving product:', err);
            alert(err.response?.data?.error || 'Failed to save product');
        }
    };

    const filteredProducts = products.filter(p =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredUsers = users.filter(u =>
        u.name?.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(userSearchTerm.toLowerCase())
    );

    const statCards = [
        {
            title: 'Total Revenue',
            value: stats?.totalRevenue || 0,
            prefix: '$',
            icon: DollarSign,
            color: 'emerald',
            gradient: 'from-emerald-500 to-teal-500'
        },
        {
            title: 'Total Orders',
            value: stats?.totalOrders || 0,
            icon: ShoppingBag,
            color: 'blue',
            gradient: 'from-blue-500 to-cyan-500'
        },
        {
            title: 'Active Users',
            value: stats?.totalUsers || 0,
            icon: Users,
            color: 'purple',
            gradient: 'from-purple-500 to-pink-500'
        },
        {
            title: 'Products',
            value: stats?.totalProducts || 0,
            icon: Package,
            color: 'amber',
            gradient: 'from-amber-500 to-orange-500'
        }
    ];

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
        <div className="min-h-screen bg-slate-950 flex">
            {/* Sidebar */}
            <motion.aside
                initial={{ x: -300 }}
                animate={{ x: sidebarOpen ? 0 : -300 }}
                transition={{ type: 'spring', damping: 20 }}
                className={`fixed left-0 top-0 h-full bg-slate-900/50 backdrop-blur-xl border-r border-slate-800/50 z-40 ${
                    sidebarOpen ? 'w-64' : 'w-0'
                }`}
            >
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                            <LayoutDashboard className="text-white" size={20} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white">Admin</h1>
                            <p className="text-xs text-slate-400">Dashboard</p>
                        </div>
                    </div>

                    <nav className="space-y-2">
                        {[
                            { icon: LayoutDashboard, label: 'Dashboard', active: true, path: '/admin/dashboard' },
                            { icon: Package, label: 'Products', path: '/admin/products' },
                            { icon: ShoppingBag, label: 'Orders', path: '/admin/orders' },
                            { icon: Users, label: 'Customers', path: '/admin/users' },
                            { icon: Settings, label: 'Settings', path: '#' }
                        ].map((item, i) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Link
                                    to={item.path}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                        item.active
                                            ? 'bg-emerald-500/10 text-emerald-400 shadow-lg shadow-emerald-500/20'
                                            : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                                    }`}
                                >
                                    <item.icon size={20} />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            </motion.div>
                        ))}
                    </nav>
                </div>
            </motion.aside>

            {/* Main Content */}
            <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
                {/* Top Navbar */}
                <motion.nav
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    className="sticky top-0 z-30 bg-slate-900/50 backdrop-blur-xl border-b border-slate-800/50"
                >
                    <div className="px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="p-2 hover:bg-slate-800/50 rounded-xl transition-all"
                            >
                                <Menu className="text-slate-400" size={20} />
                            </button>

                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search anything..."
                                    className="pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 w-64"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="relative p-2 hover:bg-slate-800/50 rounded-xl transition-all">
                                <Bell className="text-slate-400" size={20} />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            </button>

                            <div className="relative">
                                <button
                                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                                    className="flex items-center gap-3 px-3 py-2 hover:bg-slate-800/50 rounded-xl transition-all"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                                        <span className="text-white font-bold text-sm">
                                            {user?.name?.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <ChevronDown className="text-slate-400" size={16} />
                                </button>

                                <AnimatePresence>
                                    {showProfileMenu && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden"
                                        >
                                            <button
                                                onClick={logout}
                                                className="w-full flex items-center gap-2 px-4 py-3 text-slate-300 hover:bg-slate-800 transition-all"
                                            >
                                                <LogOut size={16} />
                                                <span>Logout</span>
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </motion.nav>

                {/* Dashboard Content */}
                <div className="p-6 space-y-6 min-h-screen">
                    {/* Welcome Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h2 className="text-3xl font-bold text-white mb-2">
                            Welcome back, {user?.name}! 👋
                        </h2>
                        <p className="text-slate-400">Here's what's happening with your store today.</p>
                    </motion.div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {statCards.map((card, i) => (
                            <motion.div
                                key={card.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ scale: 1.02, y: -5 }}
                                className="relative group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl blur-xl"
                                    style={{
                                        background: `linear-gradient(135deg, ${card.color === 'emerald' ? '#10b981' : card.color === 'blue' ? '#3b82f6' : card.color === 'purple' ? '#a855f7' : '#f59e0b'}, transparent)`
                                    }}
                                />
                                <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6 shadow-xl">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`p-3 rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg`}>
                                            <card.icon className="text-white" size={24} />
                                        </div>
                                        <div className="flex items-center gap-1 text-emerald-400 text-sm">
                                            <TrendingUp size={16} />
                                            <span>+12%</span>
                                        </div>
                                    </div>
                                    <h3 className="text-slate-400 text-sm font-medium mb-1">{card.title}</h3>
                                    <p className="text-3xl font-bold text-white">
                                        <AnimatedCounter value={card.value} prefix={card.prefix} />
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Revenue Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6 shadow-xl"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">Revenue Overview</h3>
                                <p className="text-slate-400 text-sm">Last 7 days performance</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-xl">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                    <span className="text-emerald-400 text-sm font-medium">Live</span>
                                </div>
                                <Link
                                    to="/admin/revenue"
                                    className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-500/50 transition-all text-sm"
                                >
                                    View Details →
                                </Link>
                            </div>
                        </div>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={stats?.chartData || []}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                    <XAxis
                                        dataKey="date"
                                        stroke="#64748b"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#64748b"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(val) => `$${val}`}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#0f172a',
                                            border: '1px solid #1e293b',
                                            borderRadius: '12px',
                                            boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
                                        }}
                                        itemStyle={{ color: '#10b981' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#10b981"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorRevenue)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* User Details Modal */}
            <AnimatePresence>
                {showUserModal && selectedUser && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        onClick={() => setShowUserModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', damping: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden"
                        >
                            {/* Modal Header */}
                            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-emerald-500/10 to-teal-500/10">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/50">
                                        <span className="text-white font-bold text-2xl">
                                            {selectedUser.name?.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">{selectedUser.name}</h3>
                                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold mt-2 ${
                                            selectedUser.role === 'admin'
                                                ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                                                : 'bg-slate-800 text-slate-300'
                                        }`}>
                                            <Shield size={12} />
                                            {selectedUser.role}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowUserModal(false)}
                                    className="p-2 hover:bg-slate-800 rounded-xl transition-all text-slate-400 hover:text-white"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 space-y-6">
                                {/* Contact Information */}
                                <div>
                                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                                        Contact Information
                                    </h4>
                                    <div className="space-y-3">
                                        <motion.div
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.1 }}
                                            className="flex items-center gap-3 p-4 bg-slate-950/50 rounded-xl border border-slate-800"
                                        >
                                            <div className="p-2 bg-emerald-500/10 rounded-lg">
                                                <Mail className="text-emerald-500" size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 font-medium">Email Address</p>
                                                <p className="text-slate-200 font-medium">{selectedUser.email}</p>
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                            className="flex items-center gap-3 p-4 bg-slate-950/50 rounded-xl border border-slate-800"
                                        >
                                            <div className="p-2 bg-blue-500/10 rounded-lg">
                                                <Phone className="text-blue-500" size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 font-medium">Phone Number</p>
                                                <p className="text-slate-200 font-medium">{selectedUser.phone || 'Not provided'}</p>
                                            </div>
                                        </motion.div>

                                        {selectedUser.address && (
                                            <motion.div
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.3 }}
                                                className="flex items-center gap-3 p-4 bg-slate-950/50 rounded-xl border border-slate-800"
                                            >
                                                <div className="p-2 bg-amber-500/10 rounded-lg">
                                                    <MapPin className="text-amber-500" size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-500 font-medium">Address</p>
                                                    <p className="text-slate-200 font-medium">{selectedUser.address}</p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>

                                {/* Account Information */}
                                <div>
                                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                                        Account Information
                                    </h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                            className="p-4 bg-slate-950/50 rounded-xl border border-slate-800"
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                <Calendar className="text-slate-500" size={16} />
                                                <p className="text-xs text-slate-500 font-medium">Member Since</p>
                                            </div>
                                            <p className="text-slate-200 font-bold">
                                                {new Date(selectedUser.created_at).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </motion.div>

                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                            className="p-4 bg-slate-950/50 rounded-xl border border-slate-800"
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                <Users className="text-slate-500" size={16} />
                                                <p className="text-xs text-slate-500 font-medium">User ID</p>
                                            </div>
                                            <p className="text-slate-200 font-bold font-mono text-sm">
                                                {selectedUser.id.slice(0, 8)}...
                                            </p>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-6 border-t border-slate-800 flex justify-end">
                                <button
                                    onClick={() => setShowUserModal(false)}
                                    className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl font-medium transition-all"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

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

export default Dashboard;
