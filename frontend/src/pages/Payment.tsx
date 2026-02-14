import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { 
  CreditCard, 
  Smartphone, 
  Building2, 
  Wallet, 
  Shield, 
  ArrowLeft, 
  Check, 
  Lock,
  AlertCircle,
  Loader2
} from 'lucide-react';
import PaymentProcessor from '../components/PaymentProcessor';
import api from '../services/api';

const Payment = () => {
  const { cart, getCartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [showProcessor, setShowProcessor] = useState(false);
  const [error, setError] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
    
    // Get shipping address from localStorage
    const savedAddress = localStorage.getItem('shippingAddress');
    if (savedAddress) {
      setShippingAddress(savedAddress);
    }
  }, [cart, navigate]);
  
  // Card form state
  const [cardForm, setCardForm] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  // UPI form state
  const [upiId, setUpiId] = useState('');

  // Net Banking form state
  const [selectedBank, setSelectedBank] = useState('');

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, American Express',
      popular: true
    },
    {
      id: 'upi',
      name: 'UPI',
      icon: Smartphone,
      description: 'Google Pay, PhonePe, Paytm',
      popular: true
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: Building2,
      description: 'All major banks supported'
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      icon: Wallet,
      description: 'Paytm, Amazon Pay, Mobikwik'
    }
  ];

  const banks = [
    'State Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Punjab National Bank',
    'Bank of Baroda',
    'Canara Bank',
    'Union Bank of India'
  ];

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardInputChange = (field, value) => {
    let formattedValue = value;
    
    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/[^0-9]/g, '').substring(0, 4);
    }
    
    setCardForm(prev => ({
      ...prev,
      [field]: formattedValue
    }));
  };

  const validateCardForm = () => {
    const { cardNumber, expiryDate, cvv, cardholderName } = cardForm;
    
    if (!cardholderName.trim()) return 'Cardholder name is required';
    if (cardNumber.replace(/\s/g, '').length < 13) return 'Invalid card number';
    if (!expiryDate.match(/^\d{2}\/\d{2}$/)) return 'Invalid expiry date';
    if (cvv.length < 3) return 'Invalid CVV';
    
    return null;
  };

  const validateUPI = () => {
    if (!upiId.trim()) return 'UPI ID is required';
    if (!upiId.includes('@')) return 'Invalid UPI ID format';
    return null;
  };

  const validateNetBanking = () => {
    if (!selectedBank) return 'Please select a bank';
    return null;
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    
    if (!shippingAddress.trim()) {
      setError('Please provide a shipping address');
      return;
    }

    let validationError = null;
    
    switch (selectedPaymentMethod) {
      case 'card':
        validationError = validateCardForm();
        break;
      case 'upi':
        validationError = validateUPI();
        break;
      case 'netbanking':
        validationError = validateNetBanking();
        break;
      default:
        break;
    }

    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setLoading(true);
    setShowProcessor(true);

    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      const paymentData = {
        paymentMethod: selectedPaymentMethod,
        shippingAddress,
        items: cart,
        amount: getCartTotal()
      };

      // Add payment method specific data
      if (selectedPaymentMethod === 'card') {
        paymentData.cardDetails = cardForm;
      } else if (selectedPaymentMethod === 'upi') {
        paymentData.upiId = upiId;
      } else if (selectedPaymentMethod === 'netbanking') {
        paymentData.bank = selectedBank;
      }

      // For demo purposes, we'll simulate a successful payment
      // In a real app, this would call your payment API
      const mockSessionId = 'sess_' + Math.random().toString(36).substr(2, 9);
      
      // Store order total for success page
      localStorage.setItem('orderTotal', getCartTotal());
      
      // Clear shipping address from localStorage
      localStorage.removeItem('shippingAddress');
      
      // Clear cart after successful payment
      // In a real app, this would be handled by the backend
      setTimeout(() => {
        // Clear cart after a short delay to allow for success page display
      }, 1000);
      
      // Redirect to success page
      navigate(`/payment-success?session_id=${mockSessionId}`);
      
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.response?.data?.message || 'Payment failed. Please try again.');
      setShowProcessor(false);
    } finally {
      setLoading(false);
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  if (cart.length === 0) {
    return null;
  }

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="min-h-screen bg-slate-950 py-8"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <Link 
            to="/checkout" 
            className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors w-fit"
          >
            <ArrowLeft size={18} />
            <span>Back to Checkout</span>
          </Link>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <Shield className="text-emerald-500" size={24} />
            </div>
            <h1 className="text-3xl font-bold text-white">Secure Payment</h1>
          </div>
          <p className="text-slate-400">Your payment information is encrypted and secure</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods & Forms */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
            {/* Payment Method Selection */}
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <h2 className="text-xl font-bold text-white mb-6">Choose Payment Method</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <motion.button
                      key={method.id}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`payment-method-card ${
                        selectedPaymentMethod === method.id ? 'selected' : ''
                      }`}
                    >
                      {method.popular && (
                        <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                          Popular
                        </div>
                      )}
                      
                      <div className="flex items-center gap-3 mb-2">
                        <Icon size={24} className={selectedPaymentMethod === method.id ? 'text-emerald-400' : 'text-slate-400'} />
                        <span className="font-semibold text-white">{method.name}</span>
                        {selectedPaymentMethod === method.id && (
                          <Check size={16} className="text-emerald-400 ml-auto" />
                        )}
                      </div>
                      
                      <p className="text-sm text-slate-400">{method.description}</p>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Payment Form */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPaymentMethod}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-900 rounded-2xl p-6 border border-slate-800"
              >
                <h3 className="text-lg font-bold text-white mb-6">Payment Details</h3>
                
                {selectedPaymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={cardForm.cardholderName}
                        onChange={(e) => handleCardInputChange('cardholderName', e.target.value)}
                        className="payment-input"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardForm.cardNumber}
                        onChange={(e) => handleCardInputChange('cardNumber', e.target.value)}
                        className="payment-input card-input"
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={cardForm.expiryDate}
                          onChange={(e) => handleCardInputChange('expiryDate', e.target.value)}
                          className="payment-input card-input"
                          placeholder="MM/YY"
                          maxLength="5"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          value={cardForm.cvv}
                          onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                          className="payment-input card-input"
                          placeholder="123"
                          maxLength="4"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {selectedPaymentMethod === 'upi' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      UPI ID
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className={`payment-input ${upiId.includes('@') ? 'upi-valid' : upiId ? 'upi-invalid' : ''}`}
                      placeholder="yourname@paytm"
                    />
                    <p className="text-xs text-slate-400 mt-2">
                      Enter your UPI ID (e.g., yourname@paytm, yourname@googlepay)
                    </p>
                  </div>
                )}

                {selectedPaymentMethod === 'netbanking' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Select Your Bank
                    </label>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="bank-select w-full"
                    >
                      <option value="">Choose your bank</option>
                      {banks.map((bank) => (
                        <option key={bank} value={bank}>
                          {bank}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {selectedPaymentMethod === 'wallet' && (
                  <div className="text-center py-8">
                    <Wallet size={48} className="text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-400">
                      You will be redirected to your selected wallet provider to complete the payment.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Shipping Address */}
            <motion.div variants={itemVariants} className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-6">Shipping Address</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={user?.name || ''}
                    readOnly
                    className="payment-input cursor-not-allowed opacity-60"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Delivery Address *
                  </label>
                  <textarea
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="payment-input min-h-[100px] resize-none"
                    placeholder="House No, Street, Landmark, City, State, Zip Code"
                    required
                  />
                </div>
              </div>
            </motion.div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center gap-3"
                >
                  <AlertCircle size={20} className="text-red-400" />
                  <span className="text-red-400">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Order Summary */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 sticky top-8">
              <h3 className="text-lg font-bold text-white mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto">
                {cart.map((item) => (
                  <div key={item._id} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-800 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={item.productId.image} 
                        alt={item.productId.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {item.productId.name}
                      </p>
                      <p className="text-xs text-slate-400">Qty: {item.qty}</p>
                    </div>
                    <span className="text-sm font-bold text-white">
                      ${(item.productId.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-slate-800 pt-4 space-y-3">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span>${getCartTotal()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Shipping</span>
                  <span className="text-emerald-400">Free</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Tax</span>
                  <span>$0.00</span>
                </div>
                <div className="border-t border-slate-800 pt-3">
                  <div className="flex justify-between text-xl font-bold text-white">
                    <span>Total</span>
                    <span className="text-emerald-400">${getCartTotal()}</span>
                  </div>
                </div>
              </div>
              
              <motion.button
                onClick={handlePayment}
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="w-full mt-6 py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock size={20} />
                    Pay ${getCartTotal()}
                  </>
                )}
              </motion.button>
              
              <div className="security-badge justify-center mt-4">
                <Shield size={14} />
                <span>Secured by 256-bit SSL encryption</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Payment Processor Modal */}
      <AnimatePresence>
        {showProcessor && (
          <PaymentProcessor 
            paymentMethod={selectedPaymentMethod}
            onSuccess={() => setShowProcessor(false)}
            onError={() => setShowProcessor(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Payment;