import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import LazyImage from './LazyImage';

const ProductCard = ({ product, index = 0 }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showFlyingImage, setShowFlyingImage] = useState(false);
  const { addToCart } = useCart();
  const { showSuccess, showError } = useToast();
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  const handleAddToCart = async () => {
    if (isAdded || isAddingToCart) return;

    // Start loading and button animation
    setIsAddingToCart(true);
    setIsAdded(true);

    // Trigger flying image animation
    setShowFlyingImage(true);

    // Add to cart via context
    const result = await addToCart(product, 1);

    if (result?.success) {
      // Trigger cart count animation in navbar
      window.dispatchEvent(new CustomEvent('cartItemAdded', {
        detail: { product, count: 1 }
      }));

      // Show success toast
      showSuccess(`${product.name} added to cart!`);
    } else {
      // Show error toast
      showError(result?.error || 'Failed to add item to cart');
    }

    // Reset flying image after animation
    setTimeout(() => {
      setShowFlyingImage(false);
    }, 1000);

    // Reset button state
    setTimeout(() => {
      setIsAdded(false);
      setIsAddingToCart(false);
    }, 2000);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  // Generate star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} size={12} className="text-amber-400 fill-current" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star key={i} size={12} className="text-amber-400 fill-current opacity-50" />
        );
      } else {
        stars.push(
          <Star key={i} size={12} className="text-slate-600" />
        );
      }
    }
    return stars;
  };

  return (
    <>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay: index * 0.1,
          ease: "easeOut"
        }}
        whileHover={{
          scale: 1.05,
          y: -8,
          transition: { duration: 0.3 }
        }}
        className="bg-slate-900 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 overflow-hidden group w-full h-full flex flex-col"
      >
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden">
          <LazyImage
            ref={imageRef}
            src={product.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400'}
            alt={product.name}
            className="w-full h-full hover:scale-105 transition-transform duration-400"
          />

        {/* Category Badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 0.2 }}
          className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-slate-950/80 backdrop-blur-sm px-2 py-1 rounded-lg"
        >
          <span className="text-xs font-medium text-emerald-400">
            {product.category}
          </span>
        </motion.div>

        {/* Wishlist Heart */}
        <motion.button
          onClick={handleWishlist}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className={`absolute top-2 sm:top-3 right-2 sm:right-3 p-1.5 sm:p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
            isWishlisted
              ? 'bg-red-500 text-white'
              : 'bg-slate-950/50 text-white hover:bg-slate-950/80'
          }`}
        >
          <motion.div
            animate={isWishlisted ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <Heart
              size={16}
              className={isWishlisted ? 'fill-current' : ''}
            />
          </motion.div>
        </motion.button>
      </div>

      {/* Product Info */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
        {/* Product Name */}
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.3 }}
          className="text-base sm:text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-emerald-400 transition-colors leading-tight"
        >
          {product.name}
        </motion.h3>

        {/* Rating */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.4 }}
          className="flex items-center gap-2 mb-2 sm:mb-3"
        >
          <div className="flex items-center gap-0.5">
            {renderStars(product.ratings || 0)}
          </div>
          <span className="text-xs text-slate-400">
            ({product.numReviews || 0})
          </span>
        </motion.div>

        {/* Price */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.5 }}
          className="flex items-center gap-2 mb-3 sm:mb-4"
        >
          <span className="text-lg sm:text-xl font-bold text-white">
            ${product.price}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-slate-500 line-through">
              ${product.originalPrice}
            </span>
          )}
        </motion.div>

        {/* Add to Cart Button */}
        <motion.button
          onClick={handleAddToCart}
          disabled={isAdded || isAddingToCart}
          whileHover={{ scale: (isAdded || isAddingToCart) ? 1 : 1.02 }}
          whileTap={{ scale: 0.95 }}
          animate={isAdded ? {
            scale: [1, 1.1, 1],
            backgroundColor: ["#10b981", "#059669", "#10b981"]
          } : {}}
          transition={{ duration: 0.3 }}
          className={`w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base ${
            isAdded
              ? 'bg-emerald-500 text-white cursor-not-allowed'
              : isAddingToCart
              ? 'bg-emerald-600 text-white cursor-not-allowed opacity-80'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white hover:shadow-lg'
          }`}
        >
          <motion.div
            animate={isAdded ? {
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            } : isAddingToCart ? {
              rotate: 360
            } : {}}
            transition={{
              duration: isAddingToCart ? 1 : 0.5,
              repeat: isAddingToCart ? Infinity : 0,
              ease: isAddingToCart ? "linear" : "easeInOut"
            }}
          >
            <ShoppingCart size={16} />
          </motion.div>
          <span className="hidden xs:inline">
            {isAdded ? 'Added!' : isAddingToCart ? 'Adding...' : 'Add to Cart'}
          </span>
          <span className="xs:hidden">
            {isAdded ? 'Added!' : isAddingToCart ? '...' : 'Add'}
          </span>
        </motion.button>
      </div>
    </motion.div>

    {/* Flying Product Image Animation */}
    <AnimatePresence>
      {showFlyingImage && (
        <motion.div
          initial={() => {
            const imageRect = imageRef.current?.getBoundingClientRect();

            return {
              position: 'fixed',
              left: imageRect?.left || 0,
              top: imageRect?.top || 0,
              width: imageRect?.width || 100,
              height: imageRect?.height || 100,
              zIndex: 1000,
              opacity: 1,
              scale: 1,
              rotate: 0
            };
          }}
          animate={() => {
            const cartElement = document.querySelector('[data-cart-icon]');
            const cartRect = cartElement?.getBoundingClientRect();

            return {
              left: (cartRect?.left || window.innerWidth - 100) + 10,
              top: (cartRect?.top || 20) + 10,
              width: 30,
              height: 30,
              opacity: 0,
              scale: 0.2,
              rotate: 360
            };
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
            rotate: { duration: 0.8, ease: "easeInOut" }
          }}
          className="pointer-events-none rounded-lg overflow-hidden shadow-lg border-2 border-emerald-400"
          style={{
            filter: 'drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3))'
          }}
        >
          <img
            src={product.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400'}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}
    </AnimatePresence>
  </>
  );
};

export default ProductCard;