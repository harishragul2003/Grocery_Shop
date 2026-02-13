import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { MapPin, CreditCard, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cart, getCartTotal } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [address, setAddress] = useState('');

    const handleCheckout = async (e) => {
        e.preventDefault();
        if (!address) {
            alert('Please provide a shipping address');
            return;
        }

        // Store shipping address in localStorage for the payment page
        localStorage.setItem('shippingAddress', address);
        
        // Navigate to payment page
        navigate('/payment');
    };

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <ShoppingBag size={64} className="text-slate-800 mb-6" />
                <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
                <Link to="/products" className="text-emerald-500 hover:underline">Back to shop</Link>
            </div>
        );
    }

    return (
        <div className="py-10 max-w-4xl mx-auto">
            <Link to="/cart" className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors w-fit">
                <ArrowLeft size={18} />
                <span>Return to Cart</span>
            </Link>

            <h2 className="text-4xl font-extrabold mb-10">Checkout</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Shipping Details */}
                <div className="space-y-8">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-emerald-500/10 rounded-lg">
                                <MapPin className="text-emerald-500" size={24} />
                            </div>
                            <h3 className="text-xl font-bold">Shipping Address</h3>
                        </div>

                        <form onSubmit={handleCheckout} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    readOnly
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-slate-400 outline-none cursor-not-allowed"
                                    value={user?.name}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Delivery Address</label>
                                <textarea
                                    placeholder="House No, Street, Landmark, City, State, Zip"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 focus:border-emerald-500 outline-none min-h-[120px] transition-all"
                                    required
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 rounded-2xl font-bold transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-3 active:scale-95"
                            >
                                <CreditCard size={20} />
                                Continue to Payment
                            </button>
                        </form>
                    </div>
                </div>

                {/* Order Summary */}
                <div>
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sticky top-28">
                        <h3 className="text-xl font-bold mb-6">Order Summary</h3>

                        <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            {cart.map(item => (
                                <div key={item._id} className="flex justify-between items-center gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-slate-800 rounded-lg overflow-hidden flex-shrink-0">
                                            <img src={item.productId.image} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold line-clamp-1">{item.productId.name}</p>
                                            <p className="text-xs text-slate-400">Qty: {item.qty}</p>
                                        </div>
                                    </div>
                                    <span className="text-sm font-bold">${(item.productId.price * item.qty).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="h-px bg-slate-800 my-6"></div>

                        <div className="space-y-3">
                            <div className="flex justify-between text-slate-400">
                                <span>Subtotal</span>
                                <span>${getCartTotal()}</span>
                            </div>
                            <div className="flex justify-between text-slate-400">
                                <span>Shipping</span>
                                <span className="text-emerald-500">Free</span>
                            </div>
                            <div className="flex justify-between text-2xl font-bold pt-4">
                                <span>Total</span>
                                <span className="text-emerald-500">${getCartTotal()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
