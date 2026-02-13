import { motion } from 'framer-motion';

const ProductSkeleton = ({ index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      className="bg-slate-900 rounded-xl shadow-lg overflow-hidden w-full h-full flex flex-col"
    >
      {/* Image Skeleton */}
      <div className="relative aspect-square bg-slate-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 animate-shimmer bg-[length:200%_100%]"></div>
        
        {/* Category Badge Skeleton */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-slate-700/80 rounded-lg w-12 sm:w-16 h-5 sm:h-6 animate-pulse"></div>
        
        {/* Wishlist Heart Skeleton */}
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-slate-700/80 rounded-full w-8 h-8 sm:w-10 sm:h-10 animate-pulse"></div>
      </div>

      {/* Content Skeleton */}
      <div className="p-3 sm:p-4 space-y-2 sm:space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-2 sm:space-y-3">
          {/* Product Name Skeleton */}
          <div className="space-y-1 sm:space-y-2">
            <div className="h-4 sm:h-5 bg-slate-800 rounded w-3/4 animate-pulse"></div>
            <div className="h-3 sm:h-4 bg-slate-800 rounded w-1/2 animate-pulse"></div>
          </div>

          {/* Rating Skeleton */}
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5 sm:gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-slate-800 rounded-full animate-pulse"></div>
              ))}
            </div>
            <div className="h-2.5 sm:h-3 bg-slate-800 rounded w-6 sm:w-8 animate-pulse"></div>
          </div>

          {/* Price Skeleton */}
          <div className="flex items-center gap-2">
            <div className="h-5 sm:h-6 bg-slate-800 rounded w-12 sm:w-16 animate-pulse"></div>
            <div className="h-3 sm:h-4 bg-slate-800 rounded w-8 sm:w-12 animate-pulse"></div>
          </div>
        </div>

        {/* Button Skeleton */}
        <div className="h-10 sm:h-12 bg-slate-800 rounded-xl w-full animate-pulse mt-auto"></div>
      </div>
    </motion.div>
  );
};

const ProductSkeletonGrid = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
      {[...Array(count)].map((_, index) => (
        <ProductSkeleton key={index} index={index} />
      ))}
    </div>
  );
};

export default ProductSkeleton;
export { ProductSkeletonGrid };