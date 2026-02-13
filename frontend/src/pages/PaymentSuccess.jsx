import { useEffect, useState, useRef } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import api from '../services/api';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [order, setOrder] = useState(null);
    const navigate = useNavigate();
    const effectRan = useRef(false);
    const { clearCart } = useCart();

    useEffect(() => {
        // Prevent double execution in React Strict Mode
        if (effectRan.current) return;

        if (!sessionId) {
            navigate('/');
            return;
        }

        const verifyPayment = async () => {
            try {
                // For demo purposes, simulate successful payment verification
                // In a real app, this would verify with your payment provider
                const mockOrder = {
                    _id: sessionId,
                    status: 'confirmed',
                    total: localStorage.getItem('orderTotal') || '0.00'
                };
                
                setOrder(mockOrder);
                
                // Clear the cart after successful payment
                clearCart();
                
                // Clean up localStorage
                localStorage.removeItem('orderTotal');
                
            } catch (err) {
                console.error('Verification error:', err);
                setError('Could not verify your payment. Please contact support.');
            } finally {
                setLoading(false);
            }
        };

        verifyPayment();
        effectRan.current = true;
    }, [sessionId, navigate]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6">
                <Loader2 className="animate-spin text-emerald-500" size={64} />
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Verifying Payment...</h2>
                    <p className="text-slate-400">Please do not close this window.</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
                <div className="p-4 bg-red-500/10 rounded-full mb-6">
                    <AlertCircle className="text-red-500" size={48} />
                </div>
                <h2 className="text-3xl font-bold mb-4">Something went wrong</h2>
                <p className="text-slate-400 mb-8 max-w-md">{error}</p>
                <Link to="/cart" className="px-8 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold transition-all">
                    Return to Cart
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] py-10 px-4">
            <div className="relative mb-10">
                <div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-20 animate-pulse"></div>
                <div className="relative p-6 bg-slate-900 border border-slate-800 rounded-full">
                    <CheckCircle className="text-emerald-500" size={80} />
                </div>
            </div>

            <div className="text-center mb-12">
                <h2 className="text-5xl font-extrabold mb-4">Payment Successful!</h2>
                <p className="text-slate-400 text-lg max-w-lg mx-auto">
                    Thank you for your purchase. Your order <span className="text-emerald-400 font-mono font-bold tracking-tight">#{order?._id?.slice(-8).toUpperCase()}</span> has been confirmed and is being processed.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
                <Link
                    to="/orders"
                    className="flex items-center justify-center gap-2 py-4 px-6 bg-slate-900 border border-slate-800 rounded-2xl font-bold hover:bg-slate-800 transition-all text-slate-300"
                >
                    <Package size={20} />
                    View My Orders
                </Link>
                <Link
                    to="/products"
                    className="flex items-center justify-center gap-2 py-4 px-6 bg-emerald-600 hover:bg-emerald-500 rounded-2xl font-bold transition-all shadow-xl shadow-emerald-500/20 group"
                >
                    Continue Shopping
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;
