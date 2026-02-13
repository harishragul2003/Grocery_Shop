import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, Loader2, UserPlus, AlertCircle } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            const { name, email, password } = formData;

            // Basic validation
            if (password.length < 6) {
                setError('Password must be at least 6 characters long');
                return;
            }

            // Check if email already exists (mock check)
            const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            if (existingUsers.some(user => user.email === email)) {
                setError('An account with this email already exists');
                return;
            }

            // Create new user
            const newUser = {
                id: Date.now().toString(),
                name,
                email,
                role: 'user',
                createdAt: new Date().toISOString()
            };

            // Save to registered users list
            existingUsers.push({ ...newUser, password }); // Store password for demo login
            localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

            // Create auth data
            const authData = {
                user: newUser,
                token: `demo-token-${newUser.id}-${Date.now()}`
            };

            login(authData);
            navigate('/');
        } catch (err) {
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-10 shadow-2xl relative overflow-hidden group">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 blur-3xl rounded-full group-hover:bg-emerald-500/20 transition-all duration-700"></div>

                <div className="relative">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center p-4 bg-emerald-500/10 rounded-2xl mb-4 text-emerald-500">
                            <UserPlus size={32} />
                        </div>
                        <h2 className="text-3xl font-extrabold text-white mb-2">Create Account</h2>
                        <p className="text-slate-400">Join our grocery community today</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500 animate-shake">
                            <AlertCircle size={20} className="shrink-0" />
                            <p className="text-sm font-medium">{error}</p>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">Full Name</label>
                            <div className="relative group/input">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-emerald-500 transition-colors">
                                    <User size={18} />
                                </span>
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    className="block w-full bg-slate-950 border border-slate-800 text-white rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-600"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">Email Address</label>
                            <div className="relative group/input">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-emerald-500 transition-colors">
                                    <Mail size={18} />
                                </span>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="block w-full bg-slate-950 border border-slate-800 text-white rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-600"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">Password</label>
                            <div className="relative group/input">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-emerald-500 transition-colors">
                                    <Lock size={18} />
                                </span>
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    minLength="6"
                                    className="block w-full bg-slate-950 border border-slate-800 text-white rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-600"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <p className="mt-2 text-xs text-slate-500 ml-1">Must be at least 6 characters</p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-2xl shadow-xl text-lg font-bold text-white bg-emerald-600 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-emerald-600/20"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin mr-2" size={20} />
                                    Creating Account...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-slate-400">
                        Already have an account?{' '}
                        <Link to="/login" className="font-bold text-emerald-500 hover:text-emerald-400 transition-colors">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
