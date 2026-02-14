import { motion } from 'framer-motion';
import { Search, ShoppingCart, Package, AlertCircle } from 'lucide-react';

const EmptyState = ({ 
  type = 'search', 
  title, 
  description, 
  actionText, 
  onAction,
  className = '' 
}) => {
  const getIcon = () => {
    switch (type) {
      case 'search':
        return <Search size={48} className="text-slate-400" />;
      case 'cart':
        return <ShoppingCart size={48} className="text-slate-400" />;
      case 'products':
        return <Package size={48} className="text-slate-400" />;
      case 'error':
        return <AlertCircle size={48} className="text-red-400" />;
      default:
        return <Search size={48} className="text-slate-400" />;
    }
  };

  const getDefaultContent = () => {
    switch (type) {
      case 'search':
        return {
          title: 'No products found',
          description: 'We couldn\'t find any products matching your search. Try adjusting your filters or search terms.',
          actionText: 'Clear Filters'
        };
      case 'cart':
        return {
          title: 'Your cart is empty',
          description: 'Looks like you haven\'t added any items to your cart yet. Start shopping to fill it up!',
          actionText: 'Start Shopping'
        };
      case 'products':
        return {
          title: 'No products available',
          description: 'There are no products available in this category at the moment. Please check back later.',
          actionText: 'Browse All Products'
        };
      case 'error':
        return {
          title: 'Something went wrong',
          description: 'We encountered an error while loading the content. Please try again.',
          actionText: 'Try Again'
        };
      default:
        return {
          title: 'Nothing to show',
          description: 'There\'s nothing here right now.',
          actionText: 'Go Back'
        };
    }
  };

  const defaultContent = getDefaultContent();
  const finalTitle = title || defaultContent.title;
  const finalDescription = description || defaultContent.description;
  const finalActionText = actionText || defaultContent.actionText;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`text-center py-12 sm:py-16 ${className}`}
    >
      <div className="max-w-md mx-auto px-4">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-slate-800/50 rounded-full flex items-center justify-center"
        >
          {getIcon()}
        </motion.div>

        {/* Title */}
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="text-xl sm:text-2xl font-semibold text-white mb-3"
        >
          {finalTitle}
        </motion.h3>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="text-slate-400 mb-6 text-sm sm:text-base leading-relaxed"
        >
          {finalDescription}
        </motion.p>

        {/* Action Button */}
        {onAction && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            onClick={onAction}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40"
          >
            {finalActionText}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default EmptyState;