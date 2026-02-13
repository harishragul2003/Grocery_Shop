import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, TrendingUp, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { mockProducts } from '../data/products';

const ProductList = ({ title = "Best Sellers", showQuickView = true, limit = 8 }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      setLoading(true);
      // In real app, replace with actual API call
      setTimeout(() => {
        // Get a random selection of products for variety
        const shuffled = [...mockProducts].sort(() => 0.5 - Math.random());
        setProducts(shuffled.slice(0, limit));
        setLoading(false);
      }, 1000);
    };

    fetchProducts();
  }, [limit]);

  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 4
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + itemsPerView.desktop >= products.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, products.length - itemsPerView.desktop) : prev - 1
    );
  };

  if (loading) {
    return (
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div className="h-6 sm:h-8 bg-slate-800 rounded w-32 sm:w-48 animate-pulse"></div>
            <div className="h-8 sm:h-10 bg-slate-800 rounded w-24 sm:w-32 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-slate-800 rounded-2xl h-80 sm:h-96 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-1.5 sm:p-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg">
              <TrendingUp className="text-white" size={20} />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                {title}
              </h2>
              <p className="text-slate-400 mt-1 text-sm sm:text-base">
                Most popular products this week
              </p>
            </div>
          </div>

          {/* View All Button */}
          <Link
            to="/products"
            className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all hover:scale-105 text-sm sm:text-base"
          >
            View All
            <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard product={product} showQuickView={showQuickView} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductList;