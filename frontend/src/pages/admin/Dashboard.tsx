import { useState, useEffect } from 'react';
import api from '../../services/api';
import {
    Users,
    ShoppingBag,
    DollarSign,
    Package,
    Loader2,
    ArrowUpRight,
    Plus,
    Edit,
    Trash2,
    Search
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, productsRes] = await Promise.all([
                    api.get('/admin/stats'),
                    api.get('/products?limit=100') // get all products for management
                ]);
                setStats(statsRes.data.data);
                setProducts(productsRes.data.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDeleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await api.delete(`/products/${id}`);
                setProducts(products.filter(p => p._id !== id));
            } catch (err) {
                alert('Error deleting product');
            }
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <Loader2 className="animate-spin text-emerald-500" size={48} />
                <p className="text-slate-400">Loading Dashboard...</p>
            </div>
        );
    }

    const statCards = [
        { title: 'Total Revenue', value: `$${stats?.totalRevenue}`, icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        { title: 'Total Orders', value: stats?.totalOrders, icon: ShoppingBag, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { title: 'Active Users', value: stats?.totalUsers, icon: Users, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        { title: 'Products', value: stats?.totalProducts, icon: Package, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    ];

    return (
        <div className="py-8 space-y-10">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-extrabold mb-2">Admin Dashboard</h2>
                    <p className="text-slate-400">Overview of your grocery shop's performance</p>
                </div>
                <Link
                    to="/admin/add-product"
                    className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-600/20 active:scale-95 text-white"
                >
                    <Plus size={20} />
                    Add New Product
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl hover:border-slate-700 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-2xl ${card.bg} ${card.color}`}>
                                <card.icon size={24} />
                            </div>
                            <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg flex items-center gap-1">
                                +12% <ArrowUpRight size={12} />
                            </span>
                        </div>
                        <h4 className="text-slate-400 text-sm font-medium mb-1">{card.title}</h4>
                        <p className="text-2xl font-bold">{card.value}</p>
                    </div>
                ))}
            </div>

            {/* Chart Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
                <h3 className="text-xl font-bold mb-8">Revenue (Last 7 Days)</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={stats?.chartData}>
                            <defs>
                                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
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
                                tickFormatter={(str) => {
                                    const date = new Date(str);
                                    return date.toLocaleDateString('en-US', { weekday: 'short' });
                                }}
                            />
                            <YAxis
                                stroke="#64748b"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(val) => `$${val}`}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }}
                                itemStyle={{ color: '#10b981' }}
                            />
                            <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Product Management Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                <div className="p-8 border-b border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <h3 className="text-xl font-bold">Manage Products</h3>
                    <div className="relative w-full md:w-80 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search product..."
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-950/50 text-slate-400 text-sm uppercase tracking-wider">
                                <th className="px-8 py-5 font-semibold">Product</th>
                                <th className="px-8 py-5 font-semibold">Category</th>
                                <th className="px-8 py-5 font-semibold">Price</th>
                                <th className="px-8 py-5 font-semibold">Stock</th>
                                <th className="px-8 py-5 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {filteredProducts.map((product) => (
                                <tr key={product._id} className="hover:bg-slate-800/30 transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl border border-slate-700 overflow-hidden bg-slate-800 shadow-inner">
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-100">{product.name}</p>
                                                <p className="text-xs text-slate-500 font-mono">ID: {product._id.slice(-6)}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="px-3 py-1 bg-slate-800 text-slate-400 rounded-lg text-xs font-bold border border-slate-700 uppercase tracking-tighter">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 font-bold text-emerald-400">${product.price}</td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-emerald-500' : 'bg-red-500 animate-pulse'}`}></div>
                                            <span className={product.stock > 10 ? 'text-slate-300' : 'text-red-400'}>{product.stock} units</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right space-x-2">
                                        <button className="p-2.5 text-slate-500 hover:text-emerald-500 hover:bg-emerald-500/10 rounded-xl transition-all">
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProduct(product._id)}
                                            className="p-2.5 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredProducts.length === 0 && (
                    <div className="py-20 text-center text-slate-500 border-t border-slate-800">
                        No products found matching your search.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
