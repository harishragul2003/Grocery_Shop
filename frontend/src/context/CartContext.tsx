import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface CartItem {
  _id: string;
  productId: {
    _id: string;
    name: string;
    price: number;
    image?: string;
    category: string;
    description?: string;
    originalPrice?: number;
    ratings?: number;
    numReviews?: number;
    inStock?: boolean;
  };
  qty: number;
}

interface CartContextType {
  cart: CartItem[];
  loading: boolean;
  addToCart: (product: any, qty?: number) => Promise<{ success: boolean; error?: string }>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQty: (productId: string, qty: number) => Promise<void>;
  getCartCount: () => number;
  getCartTotal: () => string;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    // Load cart from localStorage when component mounts or user changes
    useEffect(() => {
        const loadCart = () => {
            if (user) {
                const savedCart = localStorage.getItem(`cart_${user.email}`);
                if (savedCart) {
                    try {
                        setCart(JSON.parse(savedCart));
                    } catch (err) {
                        console.error('Error parsing cart from localStorage:', err);
                        setCart([]);
                    }
                } else {
                    setCart([]);
                }
            } else {
                setCart([]); // Clear cart if user logs out
            }
        };

        loadCart();
    }, [user]);

    // Save cart to localStorage whenever cart changes
    useEffect(() => {
        if (user && cart.length >= 0) {
            localStorage.setItem(`cart_${user.email}`, JSON.stringify(cart));
        }
    }, [cart, user]);

    const addToCart = async (product, qty = 1) => {
        if (!user) {
            alert('Please login to add items to cart');
            return { success: false, error: 'Please login to add items to cart' };
        }

        try {
            setLoading(true);
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Find if product already exists in cart
            const existingItemIndex = cart.findIndex(item => item.productId._id === product._id);
            
            let updatedCart;
            if (existingItemIndex >= 0) {
                // Update quantity if item exists
                updatedCart = cart.map((item, index) => 
                    index === existingItemIndex 
                        ? { ...item, qty: item.qty + qty }
                        : item
                );
            } else {
                // Add new item to cart
                const newItem = {
                    _id: `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                    productId: {
                        _id: product._id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        category: product.category,
                        description: product.description,
                        originalPrice: product.originalPrice,
                        ratings: product.ratings,
                        numReviews: product.numReviews,
                        inStock: product.inStock
                    },
                    qty: qty
                };
                
                updatedCart = [...cart, newItem];
            }
            
            setCart(updatedCart);
            return { success: true };
        } catch (err) {
            console.error('Error adding to cart:', err);
            return { success: false, error: 'Failed to add item to cart' };
        } finally {
            setLoading(false);
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            setLoading(true);
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 300));
            
            const updatedCart = cart.filter(item => item._id !== itemId);
            setCart(updatedCart);
        } catch (err) {
            console.error('Error removing from cart:', err);
        } finally {
            setLoading(false);
        }
    };

    const updateQty = async (productId, qty) => {
        try {
            setLoading(true);
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 300));
            
            if (qty <= 0) {
                // Remove item if quantity is 0 or less
                const updatedCart = cart.filter(item => item.productId._id !== productId);
                setCart(updatedCart);
            } else {
                // Update quantity
                const updatedCart = cart.map(item => 
                    item.productId._id === productId 
                        ? { ...item, qty: qty }
                        : item
                );
                setCart(updatedCart);
            }
        } catch (err) {
            console.error('Error updating quantity:', err);
        } finally {
            setLoading(false);
        }
    };

    const getCartCount = () => {
        return cart.reduce((total, item) => total + item.qty, 0);
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => {
            const price = item.productId?.price || 0;
            return total + (price * item.qty);
        }, 0).toFixed(2);
    };

    const clearCart = () => {
        setCart([]);
        if (user) {
            localStorage.removeItem(`cart_${user.email}`);
        }
    };

    return (
        <CartContext.Provider value={{
            cart,
            loading,
            addToCart,
            removeFromCart,
            updateQty,
            getCartCount,
            getCartTotal,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
