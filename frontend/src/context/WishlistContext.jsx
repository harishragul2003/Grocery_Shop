import { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        const fetchWishlist = async () => {
            if (user) {
                try {
                    setLoading(true);
                    const { data } = await api.get('/wishlist');
                    setWishlist(data.data.map(item => item._id)); // Just store IDs for quick lookup
                } catch (err) {
                    console.error('Error fetching wishlist:', err);
                } finally {
                    setLoading(false);
                }
            } else {
                setWishlist([]);
            }
        };

        fetchWishlist();
    }, [user]);

    const toggleWishlist = async (productId) => {
        if (!user) {
            alert('Please login to manage your wishlist');
            return;
        }

        try {
            const { data } = await api.post(`/wishlist/${productId}`);
            setWishlist(data.data); // Backend returns the updated array of IDs
            return { success: true, message: data.message };
        } catch (err) {
            console.error('Error toggling wishlist:', err);
            return { success: false };
        }
    };

    const isInWishlist = (productId) => {
        return wishlist.includes(productId);
    };

    return (
        <WishlistContext.Provider value={{ wishlist, loading, toggleWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);
