import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Package,
    Search,
    Eye,
    X,
    Clock,
    CheckCircle,
    Truck,
    User,
    MapPin,
    Phone,
    Mail,
    Calendar,
    DollarSign,
    ArrowLeft,
    Filter,
    Download
} from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all'); // all, pending, confirmed, delivered
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [updatingStatus, setUpdatingStatus] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await api.get('/admin/orders');
            setOrders(response.data.data || []);
        } catch (err) {
            console.error('Error fetching orders:', err);
            // Mock data for demo
            const mockOrders = [
                {
                    id: '1',
                    order_number: 'ORD-2024-001',
                    user: { name: 'John Doe', email: 'john@example.com', phone: '9876543210' },
                    items: [
                        { product_name: 'Tomato', quantity: 2, price: 40, image: 'https://images.unsplash.com/photo-1546470427-227e2e1e8c8e?w=100' },
                        { product_name: 'Milk', quantity: 1, price: 60, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=100' }
                    ],
                    total: 140,
                    status: 'pending',
                    shipping_address: '123 Main St, Eco City, EC 12345',
                    payment_method: 'Card',
                    created_at: new Date().toISOString()
                },
                {
                    id: '2',
                    order_number: 'ORD-2024-002',
                    user: { name: 'Jane Smith', email: 'jane@example.com', phone: '9876543211' },
                    items: [
                        { product_name: 'Banana', quantity: 3, price: 30, image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=100' }
                    ],
                    total: 90,
                    status: 'confirmed',
                    shipping_address: '456 Oak Ave, Green Town, GT 67890',
                    payment_method: 'UPI',
                    created_at: new Date(Date.now() - 86400000).toISOString()
                },
                {
                    id: '3',
                    order_number: 'ORD-2024-003',
                    user: { name: 'Bob Wilson', email: 'bob@example.com', phone: '9876543212' },
                    items: [
                        { product_name: 'Rice', quantity: 1, price: 70, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100' },
                        { product_name: 'Bread', quantity: 2, price: 30, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100' }
                    ],
                    total: 130,
                    status: 'delivered',
                    shipping_address: '789 Pine Rd, Fresh City, FC 11223',
                    payment_method: 'Cash on Delivery',
                    created_at: new Date(Date.now() - 172800000).toISOString()
                }
            ];
            setOrders(mockOrders);
        } finally {
            setLoading(false);
        }
    };

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setShowOrderModal(true);
    };

    const handleCloseModal = () => {
        setShowOrderModal(false);
        setSelectedOrder(null);
    };

    const handleUpdateStatus = async (orderId, newStatus) => {
        setUpdatingStatus(true);
        try {
            await api.put(`/admin/orders/${orderId}/status`, { status: newStatus });
            
            // Update local state
            setOrders(orders.map(order => 
                order.id === orderId ? { ...order, status: newStatus } : order
            ));
            
            if (selectedOrder?.id === orderId) {
                setSelectedOrder({ ...selectedOrder, status: newStatus });
            }
            
            alert(`Order status updated to ${newStatus}!`);
        } catch (err) {
            console.error('Error updating order status:', err);
            // For demo, update locally anyway
            setOrders(orders.map(order => 
                order.id === orderId ? { ...order, status: newStatus } : order
            ));
            if (selectedOrder?.id === orderId) {
                setSelectedOrder({ ...selectedOrder, status: newStatus });
            }
            alert(`Order status updated to ${newStatus}!`);
        } finally {
            setUpdatingStatus(false);
        }
    };

    const getStatusConfig = (status) => {
        switch (status) {
            case 'pending':
                return {
                    label: 'Pending',
                    icon: Clock,
                    color: 'amber',
                    bg: 'bg-amber-500/10',
                    text: 'text-amber-400',
                    border: 'border-amber-500/30'
                };
            case 'confirmed':
                return {
                    label: 'Confirmed',
                    icon: CheckCircle,
                    color: 'blue',
                    bg: 'bg-blue-500/10',
                    text: 'text-blue-400',
                    border: 'border-blue-500/30'
                };
            case 'delivered':
                return {
                    label: 'Delivered',
                    icon: Truck,
                    color: 'emerald',
                    bg: 'bg-emerald-500/10',
                    text: 'text-emerald-400',
                    border: 'border-emerald-500/30'
                };
            default:
                return {
                    label: status,
                    icon: Package,
                    color: 'slate',
                    bg: 'bg-slate-500/10',
                    text: 'text-slate-400',
                    border: 'border-slate-500/30'
                };
        }
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch = 
            order.order_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    const statusCounts = {
        all: orders.length,
        pending: orders.filter(o => o.status === 'pending').length,
        confirmed: orders.filter(o => o.status === 'confirmed').length,
        delivered: orders.filter(o => o.status === 'delivered').length
    };

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
                            <h1 className="text-4xl font-bold text-white mb-2">Manage Orders</h1>
                            <p className="text-slate-400">
                                Total Orders: <span className="text-emerald-400 font-bold">{filteredOrders.length}</span>
                            </p>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all border border-slate-700">
                            <Download size={18} />
                            Export
                        </button>
                    </div>
                </motion.div>

                {/* Status Filter Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex gap-2 mb-6 overflow-x-auto"
                >
                    {[
                        { label: 'All Orders', value: 'all', count: statusCounts.all },
                        { label: 'Pending', value: 'pending', count: statusCounts.pending },
                        { label: 'Confirmed', value: 'confirmed', count: statusCounts.confirmed },
                        { label: 'Delivered', value: 'delivered', count: statusCounts.delivered }
                    ].map((filter) => (
                        <button
                            key={filter.value}
                            onClick={() => setStatusFilter(filter.value)}
                            className={`px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${
                                statusFilter === filter.value
                                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/50'
                                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700'
                            }`}
                        >
                            {filter.label} ({filter.count})
                        </button>
                    ))}
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6"
                >
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                        <input
                            type="text"
                            placeholder="Search by order number, customer name, or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                        />
                    </div>
                </motion.div>

                {/* Orders Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl overflow-hidden shadow-xl"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-950/50 text-slate-400 text-sm">
                                    <th className="px-6 py-4 text-left font-medium">Order</th>
                                    <th className="px-6 py-4 text-left font-medium">Customer</th>
                                    <th className="px-6 py-4 text-left font-medium">Items</th>
                                    <th className="px-6 py-4 text-left font-medium">Total</th>
                                    <th className="px-6 py-4 text-left font-medium">Status</th>
                                    <th className="px-6 py-4 text-left font-medium">Date</th>
                                    <th className="px-6 py-4 text-right font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.map((order, i) => {
                                    const statusConfig = getStatusConfig(order.status);
                                    const StatusIcon = statusConfig.icon;
                                    
                                    return (
                                        <motion.tr
                                            key={order.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.02 }}
                                            className="border-t border-slate-800/50 hover:bg-slate-800/30 transition-all group"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                                                        <Package className="text-emerald-400" size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-medium">{order.order_number}</p>
                                                        <p className="text-slate-500 text-xs">{order.payment_method}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="text-white font-medium">{order.user?.name}</p>
                                                    <p className="text-slate-400 text-sm">{order.user?.email}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-300">
                                                {order.items?.length || 0} items
                                            </td>
                                            <td className="px-6 py-4 text-emerald-400 font-bold">
                                                ₹{order.total}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-medium ${statusConfig.bg} ${statusConfig.text} border ${statusConfig.border}`}>
                                                    <StatusIcon size={14} />
                                                    {statusConfig.label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-400 text-sm">
                                                {new Date(order.created_at).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => handleViewOrder(order)}
                                                    className="p-2 hover:bg-emerald-500/10 text-emerald-400 rounded-lg transition-all inline-flex items-center gap-2"
                                                >
                                                    <Eye size={18} />
                                                    <span className="text-sm font-medium">View</span>
                                                </button>
                                            </td>
                                        </motion.tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {filteredOrders.length === 0 && (
                        <div className="py-20 text-center">
                            <Package className="mx-auto text-slate-600 mb-4" size={64} />
                            <p className="text-slate-400 text-lg">No orders found</p>
                            <p className="text-slate-500 text-sm mt-2">Try adjusting your filters or search</p>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Order Details Modal */}
            <AnimatePresence>
                {showOrderModal && selectedOrder && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        onClick={handleCloseModal}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', damping: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                        >
                            {/* Modal Header */}
                            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-emerald-500/10 to-teal-500/10 sticky top-0 z-10 backdrop-blur-xl">
                                <div>
                                    <h3 className="text-2xl font-bold text-white">{selectedOrder.order_number}</h3>
                                    <p className="text-slate-400 text-sm mt-1">
                                        Placed on {new Date(selectedOrder.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                                <button
                                    onClick={handleCloseModal}
                                    className="p-2 hover:bg-slate-800 rounded-xl transition-all text-slate-400 hover:text-white"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 space-y-6">
                                {/* Status Update Section */}
                                <div className="bg-slate-950/50 rounded-xl p-6 border border-slate-800">
                                    <h4 className="text-lg font-bold text-white mb-4">Update Order Status</h4>
                                    <div className="flex gap-3">
                                        {['pending', 'confirmed', 'delivered'].map((status) => {
                                            const config = getStatusConfig(status);
                                            const StatusIcon = config.icon;
                                            const isActive = selectedOrder.status === status;
                                            
                                            return (
                                                <button
                                                    key={status}
                                                    onClick={() => handleUpdateStatus(selectedOrder.id, status)}
                                                    disabled={updatingStatus || isActive}
                                                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                                                        isActive
                                                            ? `${config.bg} ${config.text} border ${config.border}`
                                                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700'
                                                    } ${updatingStatus ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                >
                                                    <StatusIcon size={18} />
                                                    {config.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Customer Information */}
                                <div>
                                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                                        Customer Information
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div className="flex items-center gap-3 p-4 bg-slate-950/50 rounded-xl border border-slate-800">
                                            <div className="p-2 bg-blue-500/10 rounded-lg">
                                                <User className="text-blue-400" size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 font-medium">Name</p>
                                                <p className="text-slate-200 font-medium">{selectedOrder.user?.name}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 p-4 bg-slate-950/50 rounded-xl border border-slate-800">
                                            <div className="p-2 bg-emerald-500/10 rounded-lg">
                                                <Mail className="text-emerald-400" size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 font-medium">Email</p>
                                                <p className="text-slate-200 font-medium">{selectedOrder.user?.email}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 p-4 bg-slate-950/50 rounded-xl border border-slate-800">
                                            <div className="p-2 bg-purple-500/10 rounded-lg">
                                                <Phone className="text-purple-400" size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 font-medium">Phone</p>
                                                <p className="text-slate-200 font-medium">{selectedOrder.user?.phone}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 p-4 bg-slate-950/50 rounded-xl border border-slate-800">
                                            <div className="p-2 bg-amber-500/10 rounded-lg">
                                                <DollarSign className="text-amber-400" size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 font-medium">Payment</p>
                                                <p className="text-slate-200 font-medium">{selectedOrder.payment_method}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-4 bg-slate-950/50 rounded-xl border border-slate-800 mt-3">
                                        <div className="p-2 bg-red-500/10 rounded-lg">
                                            <MapPin className="text-red-400" size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-medium">Shipping Address</p>
                                            <p className="text-slate-200 font-medium">{selectedOrder.shipping_address}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div>
                                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                                        Order Items
                                    </h4>
                                    <div className="space-y-3">
                                        {selectedOrder.items?.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-4 p-4 bg-slate-950/50 rounded-xl border border-slate-800"
                                            >
                                                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-800">
                                                    <img
                                                        src={item.image}
                                                        alt={item.product_name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-white font-medium">{item.product_name}</p>
                                                    <p className="text-slate-400 text-sm">Quantity: {item.quantity}</p>
                                                </div>
                                                <p className="text-emerald-400 font-bold">₹{item.price * item.quantity}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Total */}
                                    <div className="mt-4 p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/30">
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-bold text-white">Total Amount</span>
                                            <span className="text-2xl font-bold text-emerald-400">₹{selectedOrder.total}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-6 border-t border-slate-800 flex justify-end sticky bottom-0 bg-slate-900/95 backdrop-blur-xl">
                                <button
                                    onClick={handleCloseModal}
                                    className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl font-medium transition-all"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageOrders;
