import { motion } from 'framer-motion';
import { CreditCard, Smartphone, Building2, Wallet, CheckCircle, AlertCircle } from 'lucide-react';

const PaymentProcessor = ({ paymentMethod, onSuccess, onError }) => {
  const getPaymentIcon = () => {
    switch (paymentMethod) {
      case 'card':
        return CreditCard;
      case 'upi':
        return Smartphone;
      case 'netbanking':
        return Building2;
      case 'wallet':
        return Wallet;
      default:
        return CreditCard;
    }
  };

  const getPaymentMethodName = () => {
    switch (paymentMethod) {
      case 'card':
        return 'Credit/Debit Card';
      case 'upi':
        return 'UPI';
      case 'netbanking':
        return 'Net Banking';
      case 'wallet':
        return 'Digital Wallet';
      default:
        return 'Payment';
    }
  };

  const Icon = getPaymentIcon();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        className="bg-slate-900 rounded-2xl p-8 border border-slate-800 max-w-md w-full text-center"
      >
        <div className="mb-6">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon size={32} className="text-emerald-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Processing Payment</h3>
          <p className="text-slate-400">
            Securely processing your {getPaymentMethodName()} payment...
          </p>
        </div>

        <div className="space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full mx-auto"
          />
          
          <div className="text-sm text-slate-400">
            Please do not close this window or press the back button.
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PaymentProcessor;