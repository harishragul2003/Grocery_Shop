import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoggedIn = () => {
            try {
                const savedUser = localStorage.getItem('user');
                const token = localStorage.getItem('token');
                
                if (savedUser && token) {
                    setUser(JSON.parse(savedUser));
                }
            } catch (err) {
                console.error('Error loading user from localStorage:', err);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkLoggedIn();
    }, []);

    const login = (userData) => {
        const user = userData.user || userData.data || userData;
        setUser(user);
        localStorage.setItem('token', userData.token || 'demo-token');
        localStorage.setItem('user', JSON.stringify(user));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Also clear cart when user logs out
        const cartKeys = Object.keys(localStorage).filter(key => key.startsWith('cart_'));
        cartKeys.forEach(key => localStorage.removeItem(key));
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
