import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    Search,
    Eye,
    X,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Shield,
    ArrowLeft,
    UserCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [showUserModal, setShowUserModal] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await api.get('/admin/users');
            setUsers(response.data.data);
        } catch (err) {
            console.error('Error fetching users:', err);
            alert('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const handleViewUser = (user) => {
        setSelectedUser(user);
        setShowUserModal(true);
    };

    const handleCloseModal = () => {
        setShowUserModal(false);
        setSelectedUser(null);
    };

    const filteredUsers = users.filter(u =>
        u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.phone?.toLowerCase().includes(searchTerm.toLowerCase())
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
                            <h1 className="text-4xl font-bold text-white mb-2">Manage Users</h1>
                            <p className="text-slate-400">
                                Total Users: <span className="text-emerald-400 font-bold">{filteredUsers.length}</span>
                                {' | '}
                                Admins: <span className="text-purple-400 font-bold">
                                    {filteredUsers.filter(u => u.role === 'admin').length}
                                </span>
                            </p>
                        </div>
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
                            placeholder="Search users by name, email, or phone..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                        />
                    </div>
                </motion.div>

                {/* Users Grid */}
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
                                    <th className="px-6 py-4 text-left font-medium">User</th>
                                    <th className="px-6 py-4 text-left font-medium">Email</th>
                                    <th className="px-6 py-4 text-left font-medium">Phone</th>
                                    <th className="px-6 py-4 text-left font-medium">Role</th>
                                    <th className="px-6 py-4 text-left font-medium">Joined</th>
                                    <th className="px-6 py-4 text-right font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user, i) => (
                                    <motion.tr
                                        key={user.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.02 }}
                                        className="border-t border-slate-800/50 hover:bg-slate-800/30 transition-all group"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                                                    <span className="text-white font-bold text-lg">
                                                        {user.name?.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium">{user.name}</p>
                                                    <p className="text-slate-500 text-xs">ID: {user.id.slice(0, 8)}...</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-300">{user.email}</td>
                                        <td className="px-6 py-4 text-slate-300">{user.phone || 'N/A'}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                                                user.role === 'admin'
                                                    ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                                                    : 'bg-slate-800 text-slate-300 border border-slate-700'
                                            }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-400 text-sm">
                                            {new Date(user.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleViewUser(user)}
                                                className="p-2 hover:bg-emerald-500/10 text-emerald-400 rounded-lg transition-all inline-flex items-center gap-2"
                                            >
                                                <Eye size={18} />
                                                <span className="text-sm font-medium">View</span>
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredUsers.length === 0 && (
                        <div className="py-20 text-center">
                            <UserCircle className="mx-auto text-slate-600 mb-4" size={64} />
                            <p className="text-slate-400 text-lg">No users found</p>
                            <p className="text-slate-500 text-sm mt-2">Try adjusting your search</p>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* User Details Modal */}
            <AnimatePresence>
                {showUserModal && selectedUser && (
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
                                                : 'bg-slate-800 text-slate-300 border border-slate-700'
                                        }`}>
                                            <Shield size={12} />
                                            {selectedUser.role}
                                        </span>
                                    </div>
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

export default ManageUsers;
