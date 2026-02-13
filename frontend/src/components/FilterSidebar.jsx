import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, Star, Check, Search } from 'lucide-react';
import { categories, brands } from '../data/products';

const FilterSidebar = ({ 
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  selectedBrands,
  onBrandToggle,
  searchQuery,
  onSearchChange,
  onClearFilters,
  isOpen, 
  onClose
}) => {
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);

  // Update local price range when prop changes
  useEffect(() => {
    setLocalPriceRange(priceRange);
  }, [priceRange]);

  // Filter out 'All' from categories for the filter sidebar
  const filterCategories = categories.filter(cat => cat !== 'All');

  const handlePriceChange = (index, value) => {
    const newPriceRange = [...localPriceRange];
    newPriceRange[index] = Number(value);
    setLocalPriceRange(newPriceRange);
    onPriceRangeChange(newPriceRange);
  };

  const sidebarVariants = {
    hidden: { 
      opacity: 0, 
      x: -20,
      transition: { duration: 0.3 }
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.4,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  const SidebarContent = () => (
    <motion.div 
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      className="bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-800"
    >
      {/* Header */}
      <motion.div 
        variants={itemVariants}
        className="flex items-center justify-between mb-4 sm:mb-6"
      >
        <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
          <Filter size={20} />
          Filters
        </h2>
        {/* Mobile Close Button */}
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="lg:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <X className="text-slate-400" size={20} />
        </motion.button>
      </motion.div>

      {/* Search */}
      <motion.div variants={itemVariants} className="mb-6">
        <label className="block text-sm font-medium text-slate-300 mb-2">Search Products</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
          />
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div variants={itemVariants} className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
        <div className="space-y-3">
          {/* All Categories Option */}
          <motion.label 
            variants={itemVariants}
            whileHover={{ x: 4 }}
            className="flex items-center cursor-pointer group"
          >
            <div className="relative">
              <input
                type="radio"
                name="category"
                value="all"
                checked={selectedCategory === 'all'}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="sr-only"
              />
              <motion.div 
                animate={{
                  backgroundColor: selectedCategory === 'all' ? '#10b981' : 'transparent',
                  borderColor: selectedCategory === 'all' ? '#10b981' : '#64748b'
                }}
                transition={{ duration: 0.2 }}
                className="w-5 h-5 rounded-full border-2 transition-all"
              >
                <AnimatePresence>
                  {selectedCategory === 'all' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-2 h-2 bg-white rounded-full absolute top-0.5 left-0.5"
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
            <span className="ml-3 text-slate-300 group-hover:text-white transition-colors font-medium">
              All Categories
            </span>
          </motion.label>

          {/* Individual Categories */}
          {filterCategories.map((category) => (
            <motion.label 
              key={category} 
              variants={itemVariants}
              whileHover={{ x: 4 }}
              className="flex items-center cursor-pointer group"
            >
              <div className="relative">
                <input
                  type="radio"
                  name="category"
                  value={category.toLowerCase()}
                  checked={selectedCategory === category.toLowerCase()}
                  onChange={(e) => onCategoryChange(e.target.value)}
                  className="sr-only"
                />
                <motion.div 
                  animate={{
                    backgroundColor: selectedCategory === category.toLowerCase() ? '#10b981' : 'transparent',
                    borderColor: selectedCategory === category.toLowerCase() ? '#10b981' : '#64748b'
                  }}
                  transition={{ duration: 0.2 }}
                  className="w-5 h-5 rounded-full border-2 transition-all"
                >
                  <AnimatePresence>
                    {selectedCategory === category.toLowerCase() && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-2 h-2 bg-white rounded-full absolute top-0.5 left-0.5"
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
              <span className="ml-3 text-slate-300 group-hover:text-white transition-colors">
                {category}
              </span>
            </motion.label>
          ))}
        </div>
      </motion.div>

      {/* Price Range */}
      <motion.div variants={itemVariants} className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Price Range</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm text-slate-400 mb-1">Min</label>
              <input
                type="number"
                value={localPriceRange[0]}
                onChange={(e) => handlePriceChange(0, e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                min="0"
              />
            </div>
            <div className="text-slate-400 mt-6">-</div>
            <div className="flex-1">
              <label className="block text-sm text-slate-400 mb-1">Max</label>
              <input
                type="number"
                value={localPriceRange[1]}
                onChange={(e) => handlePriceChange(1, e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                min="0"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Brands */}
      <motion.div variants={itemVariants} className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Brands</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {brands.map((brand) => (
            <motion.label 
              key={brand} 
              variants={itemVariants}
              whileHover={{ x: 4 }}
              className="flex items-center cursor-pointer group"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => onBrandToggle(brand)}
                  className="sr-only"
                />
                <motion.div 
                  animate={{
                    backgroundColor: selectedBrands.includes(brand) ? '#10b981' : 'transparent',
                    borderColor: selectedBrands.includes(brand) ? '#10b981' : '#64748b'
                  }}
                  transition={{ duration: 0.2 }}
                  className="w-5 h-5 rounded border-2 transition-all"
                >
                  <AnimatePresence>
                    {selectedBrands.includes(brand) && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Check size={12} className="text-white absolute top-0.5 left-0.5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
              <span className="ml-3 text-slate-300 group-hover:text-white transition-colors">
                {brand}
              </span>
            </motion.label>
          ))}
        </div>
      </motion.div>

      {/* Clear Filters */}
      <motion.button
        variants={itemVariants}
        onClick={onClearFilters}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 hover:border-slate-600 transition-all font-medium"
      >
        Clear All Filters
      </motion.button>
    </motion.div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-72 xl:w-80 flex-shrink-0">
        <div className="sticky top-8">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          >
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30 
              }}
              className="absolute right-0 top-0 h-full w-72 sm:w-80 bg-slate-950 border-l border-slate-800 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-6">
                <SidebarContent />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilterSidebar;