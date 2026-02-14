import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart, updateQty, getCartTotal } = useCart();

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <div className="p-6 bg-slate-900 rounded-full mb-6">
                    <ShoppingBag size={48} className="text-slate-700" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Your cart is empty</h2>
                <p className="text-slate-400 mb-8">Looks like you haven't added anything to your cart yet.</p>
                <Link
                    to="/products"
                    className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold transition-all shadow-lg shadow-emerald-600/20"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="py-10 max-w-6xl mx-auto">
            <h2 className="text-4xl font-extrabold mb-10">Shopping Cart</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-4">
                    {cart.map((item) => (
                        <div key={item._id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex gap-6 items-center">
                            <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-slate-800">
                                <img
                                    src={item.productId?.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800'}
                                    alt={item.productId?.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="flex-grow">
                                <div className="flex justify-between mb-2">
                                    <h3 className="text-lg font-bold">{item.productId?.name}</h3>
                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                                <p className="text-sm text-slate-400 mb-4">{item.productId?.category}</p>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 bg-slate-800 rounded-lg p-1">
                                        <button
                                            onClick={() => updateQty(item.productId?._id, Math.max(1, item.qty - 1))}
                                            className="p-1 hover:bg-slate-700 rounded transition-colors"
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="w-8 text-center font-bold">{item.qty}</span>
                                        <button
                                            onClick={() => updateQty(item.productId?._id, item.qty + 1)}
                                            className="p-1 hover:bg-slate-700 rounded transition-colors"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                    <span className="text-xl font-bold text-emerald-400">${(item.productId?.price * item.qty).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sticky top-28">
                        <h3 className="text-xl font-bold mb-6">Order Summary</h3>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-slate-400">
                                <span>Subtotal</span>
                                <span>${getCartTotal()}</span>
                            </div>
                            <div className="flex justify-between text-slate-400">
                                <span>Shipping</span>
                                <span className="text-emerald-500 font-medium">Free</span>
                            </div>
                            <div className="h-px bg-slate-800 my-4"></div>
                            <div className="flex justify-between text-xl font-bold">
                                <span>Total</span>
                                <span className="text-emerald-400">${getCartTotal()}</span>
                            </div>
                        </div>

                        <Link
                            to="/checkout"
                            className="w-full flex items-center justify-center gap-2 py-4 bg-emerald-600 hover:bg-emerald-500 rounded-2xl font-bold transition-all shadow-xl shadow-emerald-600/20 group"
                        >
                            Checkout Now
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
