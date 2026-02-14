import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for exit animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-emerald-500" />;
      case 'error':
        return <XCircle size={20} className="text-red-500" />;
      case 'warning':
        return <AlertCircle size={20} className="text-amber-500" />;
      case 'info':
        return <Info size={20} className="text-blue-500" />;
      default:
        return <CheckCircle size={20} className="text-emerald-500" />;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'success':
        return 'bg-emerald-600 border-emerald-500';
      case 'error':
        return 'bg-red-600 border-red-500';
      case 'warning':
        return 'bg-amber-600 border-amber-500';
      case 'info':
        return 'bg-blue-600 border-blue-500';
      default:
        return 'bg-emerald-600 border-emerald-500';
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`fixed bottom-4 right-4 z-50 ${getColors()} text-white px-4 py-3 rounded-lg shadow-lg border flex items-center gap-3 min-w-[300px] max-w-md`}
      >
        {getIcon()}
        <span className="flex-1 font-medium text-sm">{message}</span>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="text-white/80 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast;