import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Grid, List, Search, ChevronDown, X } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import FilterSidebar from '../components/FilterSidebar';
import EmptyState from '../components/EmptyState';
import { ProductSkeletonGrid } from '../components/ProductSkeleton';
import { supabase } from '../lib/supabaseClient';
import { categories, brands } from '../data/products';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image_url: string;
  stock: number;
  description?: string;
  brand?: string;
  ratings?: number;
  num_reviews?: number;
  original_price?: number;
}

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [products, setProducts] = useState<Product[]>([]);
  const itemsPerPage = 8;

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  // Filter and sort products
  const getFilteredProducts = () => {
    let filtered = products;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Filter by brands
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => 
        selectedBrands.includes(product.brand)
      );
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.ratings - a.ratings);
        break;
      case 'name':
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Handle category change with loading animation
  const handleCategoryChange = (category) => {
    setLoading(true);
    setSelectedCategory(category);
    setCurrentPage(1);
    
    // Simulate loading for smooth animation
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  // Handle other filter changes
  const handleFiltersChange = (filters) => {
    setLoading(true);
    setPriceRange(filters.priceRange || priceRange);
    setSelectedBrands(filters.selectedBrands || selectedBrands);
    setCurrentPage(1);
    
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setLoading(true);
    setSelectedCategory('all');
    setPriceRange([0, 200]);
    setSelectedBrands([]);
    setSearchQuery('');
    setCurrentPage(1);
    
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  // Handle URL parameters on component mount
  useEffect(() => {
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    if (category && category !== selectedCategory) {
      setSelectedCategory(category);
    }
    
    if (search && search !== searchQuery) {
      setSearchQuery(search);
    }
  }, [searchParams, selectedCategory, searchQuery]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, priceRange, selectedBrands, sortBy, searchQuery]);

  const handlePageChange = (page) => {
    setLoading(true);
    setCurrentPage(page);
    
    // Simulate loading delay for smooth transition
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  const toggleBrand = (brand) => {
    const newBrands = selectedBrands.includes(brand) 
      ? selectedBrands.filter(b => b !== brand)
      : [...selectedBrands, brand];
    
    setLoading(true);
    setSelectedBrands(newBrands);
    setCurrentPage(1);
    
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="min-h-screen bg-slate-950"
    >
      {/* Page Header */}
      <motion.div 
        variants={itemVariants}
        className="bg-slate-900 border-b border-slate-800"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8">
          <div className="flex items-center justify-between">
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-2xl sm:text-3xl font-bold text-white mb-2"
              >
                All Products
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-slate-400 text-sm sm:text-base"
              >
                Discover fresh, organic groceries delivered to your door
              </motion.p>
            </div>
            
            {/* Mobile Filter Toggle */}
            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="lg:hidden flex items-center gap-2 px-3 sm:px-4 py-2 bg-slate-800 text-white rounded-lg border border-slate-700 text-sm sm:text-base"
            >
              <Filter size={20} />
              Filters
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        variants={itemVariants}
        className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8"
      >
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          {/* Desktop Sidebar */}
          <FilterSidebar
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            selectedBrands={selectedBrands}
            onBrandToggle={toggleBrand}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onClearFilters={clearAllFilters}
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
          />

          {/* Product Grid */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex-1 min-w-0"
          >
            {/* Toolbar */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 bg-slate-900 rounded-lg p-3 sm:p-4 border border-slate-800 gap-3 sm:gap-4"
            >
              <div className="flex items-center gap-4">
                {loading ? (
                  <div className="h-4 bg-slate-800 rounded w-32 animate-pulse"></div>
                ) : (
                  <span className="text-slate-300 text-sm sm:text-base">
                    Showing {currentProducts.length} of {filteredProducts.length} products
                    {selectedCategory !== 'all' && (
                      <span className="ml-2 px-2 py-1 bg-emerald-600 text-white text-xs rounded-full">
                        {categories.find(cat => cat.toLowerCase() === selectedCategory)}
                      </span>
                    )}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-4">
                {/* Mobile Filter Toggle */}
                <motion.button
                  onClick={() => setShowFilters(!showFilters)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg border border-slate-700 hover:bg-slate-700 transition-colors"
                >
                  <Filter size={18} />
                  <span className="text-sm">Filters</span>
                </motion.button>

                {/* View Mode Toggle */}
                <div className="hidden sm:flex items-center bg-slate-800 rounded-lg p-1">
                  <motion.button
                    onClick={() => setViewMode('grid')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-emerald-600 text-white' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Grid size={18} />
                  </motion.button>
                  <motion.button
                    onClick={() => setViewMode('list')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-emerald-600 text-white' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <List size={18} />
                  </motion.button>
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-slate-800 border border-slate-700 text-white px-4 py-2 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                </div>
              </div>
            </motion.div>

            {/* Products Grid with Animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedCategory}-${currentPage}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {loading ? (
                  <ProductSkeletonGrid count={itemsPerPage} />
                ) : filteredProducts.length === 0 ? (
                  <EmptyState
                    type="search"
                    onAction={clearAllFilters}
                  />
                ) : (
                  <ProductGrid
                    products={currentProducts}
                    title=""
                    loading={false}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    showPagination={true}
                    itemsPerPage={itemsPerPage}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Products;