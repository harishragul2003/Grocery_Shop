import { motion } from 'framer-motion';

export const ProductSkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800"
  >
    <div className="h-48 bg-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-slate-600 border-t-emerald-500 rounded-full animate-spin"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/50"></div>
    </div>
    <div className="p-4 space-y-3">
      <div className="h-6 bg-slate-800 rounded w-3/4 animate-pulse"></div>
      <div className="h-4 bg-slate-800 rounded w-1/2 animate-pulse"></div>
      <div className="h-8 bg-slate-800 rounded w-1/3 animate-pulse mt-4"></div>
    </div>
  </motion.div>
);

export const ProductSkeletonGrid = ({ count = 8 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
    {Array.from({ length: count }).map((_, index) => (
      <ProductSkeleton key={index} />
    ))}
  </div>
);
