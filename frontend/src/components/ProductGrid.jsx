import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { ProductSkeletonGrid } from './ProductSkeleton';
import { mockProducts } from '../data/products';

const ProductGrid = ({ 
  products = [], 
  title = "Best Sellers", 
  loading = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
  showPagination = false,
  itemsPerPage = 8
}) => {
  // Use imported products data if none provided
  const displayProducts = products.length > 0 ? products : mockProducts.slice(0, 8);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    
    // Calculate start and end page numbers
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    buttons.push(
      <motion.button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
        whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
        className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg border transition-all ${
          currentPage === 1
            ? 'border-slate-700 text-slate-500 cursor-not-allowed'
            : 'border-slate-600 text-slate-300 hover:border-emerald-500 hover:text-emerald-400 hover:bg-slate-800'
        }`}
      >
        <ChevronLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
      </motion.button>
    );

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <motion.button
          key={i}
          onClick={() => handlePageChange(i)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg border transition-all text-sm sm:text-base ${
            i === currentPage
              ? 'border-emerald-500 bg-emerald-600 text-white'
              : 'border-slate-600 text-slate-300 hover:border-emerald-500 hover:text-emerald-400 hover:bg-slate-800'
          }`}
        >
          {i}
        </motion.button>
      );
    }

    // Next button
    buttons.push(
      <motion.button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
        whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
        className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg border transition-all ${
          currentPage === totalPages
            ? 'border-slate-700 text-slate-500 cursor-not-allowed'
            : 'border-slate-600 text-slate-300 hover:border-emerald-500 hover:text-emerald-400 hover:bg-slate-800'
        }`}
      >
        <ChevronRight size={16} className="sm:w-[18px] sm:h-[18px]" />
      </motion.button>
    );

    return buttons;
  };

  return (
    <motion.section 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="py-6 sm:py-8 lg:py-12"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Section Title */}
        {title && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 sm:mb-8"
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white text-center">
              {title}
            </h2>
          </motion.div>
        )}

        {/* Product Grid or Skeleton */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProductSkeletonGrid count={itemsPerPage} />
            </motion.div>
          ) : displayProducts.length === 0 ? (
            <motion.div
              key="no-products"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center py-12 sm:py-16"
            >
              <div className="text-slate-400 text-base sm:text-lg mb-4">No products found</div>
              <div className="text-slate-500 text-sm sm:text-base">Try adjusting your filters or search terms</div>
            </motion.div>
          ) : (
            <motion.div 
              key={`page-${currentPage}`}
              variants={gridVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6"
            >
              {displayProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  variants={itemVariants}
                  layout
                >
                  <ProductCard 
                    product={product}
                    index={index}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {showPagination && !loading && displayProducts.length > 0 && totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col items-center justify-center mt-8 sm:mt-12 space-y-4"
          >
            <div className="flex items-center space-x-1 sm:space-x-2">
              {renderPaginationButtons()}
            </div>
            
            {/* Page Info */}
            <div className="text-slate-400 text-xs sm:text-sm">
              Page {currentPage} of {totalPages}
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default ProductGrid;