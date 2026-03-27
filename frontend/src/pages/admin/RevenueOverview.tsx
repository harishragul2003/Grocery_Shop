import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    TrendingDown,
    ShoppingCart,
    Package,
    Users,
    CreditCard,
    Calendar,
    Download,
    ArrowLeft,
    Trophy,
    AlertCircle,
    Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts';
import api from '../../services/api';

// Animated Counter Component
const AnimatedCounter = ({ value, prefix = '', suffix = '', decimals = 0 }) => {
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
                setCount(current);
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [value]);

    return (
        <span>
            {prefix}
            {decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}
            {suffix}
        </span>
    );
};

const RevenueOverview = () => {
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState('7days'); // 7days, 30days, thisMonth
    const [revenueData, setRevenueData] = useState({
        totalRevenue: 48320,
        growthPercentage: 18,
        lastWeekRevenue: 40900,
        chartData: [],
        orders: 156,
        productsSold: 892,
        newCustomers: 34,
        paymentSuccessRate: 98.4,
        bestDay: { day: 'Friday', revenue: 9200, orders: 26 },
        lowestDay: { day: 'Monday', revenue: 3100, orders: 8 },
        categoryData: [],
        topProducts: []
    });

    useEffect(() => {
        fetchRevenueData();
    }, [timeRange]);

    const fetchRevenueData = async () => {
        setLoading(true);
        try {
            // Mock data for now - replace with actual API call
            const mockData = {
                totalRevenue: 48320,
                growthPercentage: 18,
                lastWeekRevenue: 40900,
                chartData: [
                    { date: 'Mon', revenue: 3100, orders: 8 },
                    { date: 'Tue', revenue: 5200, orders: 15 },
                    { date: 'Wed', revenue: 7800, orders: 22 },
                    { date: 'Thu', revenue: 6500, orders: 18 },
                    { date: 'Fri', revenue: 9200, orders: 26 },
                    { date: 'Sat', revenue: 8900, orders: 31 },
                    { date: 'Sun', revenue: 7620, orders: 36 }
                ],
                orders: 156,
                productsSold: 892,
                newCustomers: 34,
                paymentSuccessRate: 98.4,
                bestDay: { day: 'Friday', revenue: 9200, orders: 26 },
                lowestDay: { day: 'Monday', revenue: 3100, orders: 8 },
                categoryData: [
                    { name: 'Vegetables', value: 40, revenue: 19328 },
                    { name: 'Fruits', value: 25, revenue: 12080 },
                    { name: 'Dairy', value: 15, revenue: 7248 },
                    { name: 'Snacks', value: 10, revenue: 4832 },
                    { name: 'Others', value: 10, revenue: 4832 }
                ],
                topProducts: [
                    { name: 'Tomato', units: 140, revenue: 5600, image: 'https://images.unsplash.com/photo-1546470427-227e2e1e8c8e?w=100' },
                    { name: 'Milk', units: 95, revenue: 3800, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=100' },
                    { name: 'Banana', units: 120, revenue: 3600, image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=100' },
                    { name: 'Rice', units: 45, revenue: 3150, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100' },
                    { name: 'Bread', units: 78, revenue: 2340, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100' }
                ]
            };
            setRevenueData(mockData);
        } catch (err) {
            console.error('Error fetching revenue data:', err);
        } finally {
            setLoading(false);
        }
    };

    const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#64748b'];

    const insights = [
        {
            icon: TrendingUp,
            text: `Sales increased ${revenueData.growthPercentage}% due to higher weekend traffic.`,
            color: 'emerald'
        },
        {
            icon: Package,
            text: 'Vegetables category driving most revenue.',
            color: 'blue'
        },
        {
            icon: Sparkles,
            text: 'Consider promoting dairy products to boost weekday sales.',
            color: 'amber'
        }
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full"
                />
            </div>
        );
    }

    const revenueDifference = revenueData.totalRevenue - revenueData.lastWeekRevenue;
    const isGrowth = revenueDifference > 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between"
                >
                    <div>
                        <Link
                            to="/admin/dashboard"
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 mb-4 transition-colors"
                        >
                            <ArrowLeft size={20} />
                            Back to Dashboard
                        </Link>
                        <h1 className="text-4xl font-bold text-white mb-2">💰 Revenue Overview</h1>
                        <p className="text-slate-400">Last 7 Days Performance</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all border border-slate-700">
                        <Download size={18} />
                        Export CSV
                    </button>
                </motion.div>

                {/* Time Range Toggle */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex gap-2"
                >
                    {[
                        { label: 'Last 7 Days', value: '7days' },
                        { label: 'Last 30 Days', value: '30days' },
                        { label: 'This Month', value: 'thisMonth' }
                    ].map((option) => (
                        <button
                            key={option.value}
                            onClick={() => setTimeRange(option.value)}
                            className={`px-4 py-2 rounded-xl font-medium transition-all ${
                                timeRange === option.value
                                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/50'
                                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700'
                            }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </motion.div>

                {/* Hero Insight Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative overflow-hidden bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent" />
                    <div className="relative z-10">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-slate-400 text-sm font-medium mb-2">Total Revenue</p>
                                <h2 className="text-6xl font-bold text-white mb-4">
                                    ₹<AnimatedCounter value={revenueData.totalRevenue} />
                                </h2>
                                <div className="flex items-center gap-3">
                                    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
                                        isGrowth ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                                    }`}>
                                        {isGrowth ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                                        <span className="font-bold text-lg">
                                            {isGrowth ? '+' : ''}{revenueData.growthPercentage}%
                                        </span>
                                    </div>
                                    <p className="text-slate-400">compared to last week</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-slate-500 text-sm mb-1">Last Week</p>
                                <p className="text-2xl font-bold text-slate-400">₹{revenueData.lastWeekRevenue.toLocaleString()}</p>
                                <p className="text-emerald-400 font-bold mt-2">+₹{revenueDifference.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Revenue Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">Revenue Trend</h3>
                            <p className="text-slate-400 text-sm">Daily performance breakdown</p>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-xl">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            <span className="text-emerald-400 text-sm font-medium">Live</span>
                        </div>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData.chartData}>
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
                                    tickFormatter={(val) => `₹${val}`}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#0f172a',
                                        border: '1px solid #1e293b',
                                        borderRadius: '12px',
                                        boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
                                    }}
                                    itemStyle={{ color: '#10b981' }}
                                    formatter={(value: any, name: string) => {
                                        if (name === 'revenue') return [`₹${value}`, 'Revenue'];
                                        if (name === 'orders') return [value, 'Orders'];
                                        return [value, name];
                                    }}
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

                {/* Mini KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        {
                            icon: ShoppingCart,
                            label: 'Orders',
                            value: revenueData.orders,
                            color: 'emerald',
                            gradient: 'from-emerald-500 to-teal-500'
                        },
                        {
                            icon: Package,
                            label: 'Products Sold',
                            value: revenueData.productsSold,
                            color: 'blue',
                            gradient: 'from-blue-500 to-cyan-500'
                        },
                        {
                            icon: Users,
                            label: 'New Customers',
                            value: revenueData.newCustomers,
                            color: 'purple',
                            gradient: 'from-purple-500 to-pink-500'
                        },
                        {
                            icon: CreditCard,
                            label: 'Payment Success',
                            value: revenueData.paymentSuccessRate,
                            suffix: '%',
                            color: 'amber',
                            gradient: 'from-amber-500 to-orange-500'
                        }
                    ].map((card, i) => (
                        <motion.div
                            key={card.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + i * 0.1 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl blur-xl"
                                style={{
                                    background: `linear-gradient(135deg, ${card.color === 'emerald' ? '#10b981' : card.color === 'blue' ? '#3b82f6' : card.color === 'purple' ? '#a855f7' : '#f59e0b'}, transparent)`
                                }}
                            />
                            <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                                <div className={`p-3 rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg w-fit mb-4`}>
                                    <card.icon className="text-white" size={24} />
                                </div>
                                <h3 className="text-slate-400 text-sm font-medium mb-1">{card.label}</h3>
                                <p className="text-3xl font-bold text-white">
                                    <AnimatedCounter value={card.value} suffix={card.suffix || ''} decimals={card.suffix ? 1 : 0} />
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Best & Lowest Day Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Best Day */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                        className="relative overflow-hidden bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 shadow-xl shadow-emerald-500/10"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-emerald-500/10 rounded-xl">
                                    <Trophy className="text-emerald-400" size={24} />
                                </div>
                                <div>
                                    <p className="text-emerald-400 text-sm font-bold">🏆 Best Sales Day</p>
                                    <p className="text-white text-2xl font-bold">{revenueData.bestDay.day}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-slate-500 text-xs mb-1">Revenue</p>
                                    <p className="text-emerald-400 text-xl font-bold">₹{revenueData.bestDay.revenue.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-slate-500 text-xs mb-1">Orders</p>
                                    <p className="text-white text-xl font-bold">{revenueData.bestDay.orders}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Lowest Day */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                        className="relative overflow-hidden bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl"
                    >
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-amber-500/10 rounded-xl">
                                    <AlertCircle className="text-amber-400" size={24} />
                                </div>
                                <div>
                                    <p className="text-amber-400 text-sm font-bold">⚠ Lowest Sales Day</p>
                                    <p className="text-white text-2xl font-bold">{revenueData.lowestDay.day}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-slate-500 text-xs mb-1">Revenue</p>
                                    <p className="text-slate-300 text-xl font-bold">₹{revenueData.lowestDay.revenue.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-slate-500 text-xs mb-1">Orders</p>
                                    <p className="text-white text-xl font-bold">{revenueData.lowestDay.orders}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Revenue by Category & Top Products */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Pie Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl"
                    >
                        <h3 className="text-xl font-bold text-white mb-1">Revenue by Category</h3>
                        <p className="text-slate-400 text-sm mb-6">Product category breakdown</p>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={revenueData.categoryData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {revenueData.categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#0f172a',
                                            border: '1px solid #1e293b',
                                            borderRadius: '12px'
                                        }}
                                        formatter={(value: any, name: string, props: any) => [
                                            `₹${props.payload.revenue.toLocaleString()}`,
                                            name
                                        ]}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Top Products */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl"
                    >
                        <h3 className="text-xl font-bold text-white mb-1">Top 5 Selling Products</h3>
                        <p className="text-slate-400 text-sm mb-6">Best performers this week</p>
                        <div className="space-y-4">
                            {revenueData.topProducts.map((product, i) => (
                                <motion.div
                                    key={product.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.1 + i * 0.1 }}
                                    className="flex items-center gap-4 p-3 bg-slate-950/50 rounded-xl border border-slate-800 hover:border-emerald-500/30 transition-all"
                                >
                                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-800">
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-white font-medium">{product.name}</p>
                                        <p className="text-slate-500 text-sm">{product.units} units sold</p>
                                    </div>
                                    <p className="text-emerald-400 font-bold">₹{product.revenue.toLocaleString()}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Smart Insights Panel */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-6 shadow-2xl"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-purple-500/10 rounded-xl">
                            <Sparkles className="text-purple-400" size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Smart Insights</h3>
                            <p className="text-slate-400 text-sm">AI-powered business recommendations</p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        {insights.map((insight, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.3 + i * 0.1 }}
                                className="flex items-start gap-3 p-4 bg-slate-950/50 rounded-xl border border-slate-800"
                            >
                                <div className={`p-2 rounded-lg ${
                                    insight.color === 'emerald' ? 'bg-emerald-500/10' :
                                    insight.color === 'blue' ? 'bg-blue-500/10' : 'bg-amber-500/10'
                                }`}>
                                    <insight.icon className={`${
                                        insight.color === 'emerald' ? 'text-emerald-400' :
                                        insight.color === 'blue' ? 'text-blue-400' : 'text-amber-400'
                                    }`} size={20} />
                                </div>
                                <p className="text-slate-300 flex-1">{insight.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default RevenueOverview;
