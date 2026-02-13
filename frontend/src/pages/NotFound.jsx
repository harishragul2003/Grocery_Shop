import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Number */}
          <motion.h1 
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-8xl sm:text-9xl font-bold text-emerald-500 mb-4"
          >
            404
          </motion.h1>
          
          {/* Error Message */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-2xl sm:text-3xl font-bold text-white mb-4"
          >
            Page Not Found
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-slate-400 mb-8 leading-relaxed"
          >
            Sorry, the page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105"
            >
              <Home size={20} />
              Go Home
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-600 hover:border-emerald-500 transition-all duration-200"
            >
              <ArrowLeft size={20} />
              Go Back
            </button>
          </motion.div>

          {/* Search Suggestion */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 p-4 bg-slate-900/50 rounded-xl border border-slate-800"
          >
            <div className="flex items-center justify-center gap-2 text-slate-400 mb-2">
              <Search size={16} />
              <span className="text-sm">Looking for something specific?</span>
            </div>
            <Link
              to="/products"
              className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
            >
              Browse all products →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;