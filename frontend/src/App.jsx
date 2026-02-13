import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy Loaded User Pages
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Payment = lazy(() => import('./pages/Payment'));
const Orders = lazy(() => import('./pages/Orders'));
const Profile = lazy(() => import('./pages/Profile'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess'));

// Lazy Loaded Admin Pages
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const AddProduct = lazy(() => import('./pages/admin/AddProduct'));
const ManageProducts = lazy(() => import('./pages/admin/ManageProducts'));
const AdminOrders = lazy(() => import('./pages/admin/AdminOrders'));

const PageLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
    <Loader2 className="animate-spin text-emerald-500" size={48} />
    <p className="text-slate-400 animate-pulse font-medium tracking-wide">Loading secure content...</p>
  </div>
);

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <Router>
              <div className="min-h-screen bg-slate-950 text-slate-50 font-sans w-full">
                <Navbar />
                <main className="pt-16 w-full">
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      {/* Public Routes */}
                      <Route path="/" element={<Home />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />

                      {/* Protected User Routes */}
                      <Route element={<ProtectedRoute />}>
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/payment" element={<Payment />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/payment-success" element={<PaymentSuccess />} />
                      </Route>

                      {/* Protected Admin Routes */}
                      <Route element={<ProtectedRoute adminOnly={true} />}>
                        <Route path="/admin" element={<Dashboard />} />
                        <Route path="/admin/add-product" element={<AddProduct />} />
                        <Route path="/admin/products" element={<ManageProducts />} />
                        <Route path="/admin/orders" element={<AdminOrders />} />
                      </Route>
                    </Routes>
                  </Suspense>
                </main>
                <Footer />
              </div>
            </Router>
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
