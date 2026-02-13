import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShoppingBasket, 
  ShoppingCart, 
  User as UserIcon, 
  LogOut, 
  Menu, 
  X, 
  Heart,
  Search,
  Bell,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import SearchBar from './SearchBar';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [cartAnimation, setCartAnimation] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen for cart item added events and update cart count
  useEffect(() => {
    const handleCartItemAdded = (event) => {
      setCartAnimation(true);
      setTimeout(() => setCartAnimation(false), 600);
      // Update cart count immediately
      setCartCount(getCartCount());
    };

    window.addEventListener('cartItemAdded', handleCartItemAdded);
    return () => window.removeEventListener('cartItemAdded', handleCartItemAdded);
  }, [getCartCount]);

  // Update cart count when cart changes
  useEffect(() => {
    const newCount = getCartCount();
    if (newCount > cartCount) {
      setCartAnimation(true);
      setTimeout(() => setCartAnimation(false), 600);
    }
    setCartCount(newCount);
  }, [getCartCount(), cartCount]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileDropdownOpen(false);
  }, [location]);

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
    ...(user ? [{ path: '/orders', label: 'Orders' }] : []),
  ];

  const adminLinks = user?.role === 'admin' ? [
    { path: '/admin', label: 'Dashboard' },
    { path: '/admin/products', label: 'Manage Products' },
    { path: '/admin/orders', label: 'Orders' },
  ] : [];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-950/98 backdrop-blur-xl border-b border-slate-800/60 shadow-2xl shadow-slate-950/50' 
          : 'bg-slate-950/90 backdrop-blur-lg border-b border-slate-800/40'
      }`}
    >
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-18">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group flex-shrink-0"
          >
            <div className="relative">
              <ShoppingBasket 
                className="text-emerald-500 group-hover:text-emerald-400 transition-colors duration-200" 
                size={28} 
              />
              <div className="absolute -inset-1 bg-emerald-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
            <span className="text-lg sm:text-xl lg:text-2xl font-bold">
              Nature<span className="text-emerald-500">Cart</span>
            </span>
          </Link>

          {/* Center Search Bar - Desktop Only */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <SearchBar className="w-full" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3 py-2 font-medium transition-all duration-200 ${
                  isActiveRoute(link.path)
                    ? 'text-emerald-400'
                    : 'text-slate-300 hover:text-emerald-400'
                }`}
              >
                {link.label}
                {isActiveRoute(link.path) && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
                )}
              </Link>
            ))}
            
            {/* Admin Links */}
            {adminLinks.length > 0 && (
              <div className="flex items-center gap-6 ml-4 pl-4 border-l border-slate-700">
                {adminLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-3 py-2 font-medium transition-all duration-200 ${
                      isActiveRoute(link.path)
                        ? 'text-amber-400'
                        : 'text-slate-300 hover:text-amber-400'
                    }`}
                  >
                    {link.label}
                    {isActiveRoute(link.path) && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
                    )}
                  </Link>
                ))}
              </div>
            )}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile Search Button */}
            <button className="lg:hidden p-1.5 sm:p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-all duration-200">
              <Search size={18} />
            </button>

            {/* Cart */}
            <Link 
              to="/cart" 
              className="relative p-1.5 sm:p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-all duration-200 group"
              data-cart-icon
            >
              <motion.div
                animate={cartAnimation ? {
                  scale: [1, 1.2, 1],
                  rotate: [0, -8, 8, -4, 4, 0],
                  y: [0, -2, 0]
                } : {}}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <ShoppingCart size={18} />
              </motion.div>
              
              <AnimatePresence>
                {getCartCount() > 0 && (
                  <motion.span
                    key={getCartCount()}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: cartAnimation ? [0, 1.4, 1] : 1, 
                      opacity: 1 
                    }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ 
                      duration: cartAnimation ? 0.6 : 0.3,
                      ease: "easeOut"
                    }}
                    className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs font-bold px-1 sm:px-1.5 py-0.5 rounded-full ring-2 ring-slate-950 group-hover:bg-emerald-500 transition-colors min-w-[18px] sm:min-w-[20px] text-center"
                  >
                    {getCartCount()}
                  </motion.span>
                )}
              </AnimatePresence>
              
              {/* Cart pulse effect */}
              <AnimatePresence>
                {cartAnimation && (
                  <motion.div
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{ scale: 2, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-emerald-400 rounded-lg pointer-events-none"
                  />
                )}
              </AnimatePresence>
            </Link>

            {/* Wishlist */}
            {user && (
              <button className="hidden lg:flex p-1.5 sm:p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-200">
                <Heart size={18} />
              </button>
            )}

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-3 p-1.5 sm:p-2 text-slate-300 hover:text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-all duration-200"
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center border border-emerald-400/30">
                    <UserIcon size={14} className="text-white" />
                  </div>
                  <span className="hidden lg:block text-sm font-medium">
                    {user.name.split(' ')[0]}
                  </span>
                </button>

                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-700">
                      <p className="text-sm font-medium text-slate-200">{user.name}</p>
                      <p className="text-xs text-slate-400">{user.email}</p>
                    </div>
                    
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:text-emerald-400 hover:bg-emerald-400/10 transition-all duration-200"
                    >
                      <UserIcon size={16} />
                      Profile
                    </Link>
                    
                    <Link
                      to="/orders"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:text-emerald-400 hover:bg-emerald-400/10 transition-all duration-200"
                    >
                      <ShoppingCart size={16} />
                      My Orders
                    </Link>
                    
                    <button className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:text-emerald-400 hover:bg-emerald-400/10 transition-all duration-200 w-full">
                      <Settings size={16} />
                      Settings
                    </button>
                    
                    <div className="border-t border-slate-700 mt-2 pt-2">
                      <button
                        onClick={logout}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-all duration-200 w-full"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-slate-300 hover:text-emerald-400 font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 active:scale-95"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-all duration-200"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-slate-800 py-3 sm:py-4">
            {/* Mobile Search Bar */}
            <div className="px-3 sm:px-4 mb-3 sm:mb-4">
              <SearchBar className="w-full" />
            </div>
            
            <nav className="flex flex-col gap-1 sm:gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActiveRoute(link.path)
                      ? 'text-emerald-400 bg-emerald-400/10'
                      : 'text-slate-300 hover:text-emerald-400 hover:bg-emerald-400/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {adminLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActiveRoute(link.path)
                      ? 'text-amber-400 bg-amber-400/10'
                      : 'text-slate-300 hover:text-amber-400 hover:bg-amber-400/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {!user && (
                <div className="flex flex-col gap-1 sm:gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-800">
                  <Link
                    to="/login"
                    className="px-3 sm:px-4 py-2.5 sm:py-3 text-slate-300 hover:text-emerald-400 hover:bg-emerald-400/5 rounded-lg font-medium transition-all duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-lg transition-all duration-200"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;