import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CategoryCard = ({ category, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group"
    >
      <Link
        to={category.link}
        className="block relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 hover:border-transparent transition-all duration-300"
      >
        {/* Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
        
        {/* Content */}
        <div className="relative p-4 sm:p-6 text-center">
          {/* Icon Container */}
          <div className="relative mb-3 sm:mb-4">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center text-2xl sm:text-4xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
              {category.emoji}
            </div>
            
            {/* Glow Effect */}
            <div className={`absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-30 blur-xl transition-all duration-300`} />
          </div>

          {/* Category Name */}
          <h3 className="text-sm sm:text-lg font-semibold text-white mb-1 sm:mb-2 group-hover:text-white transition-colors">
            {category.name}
          </h3>
          
          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-400 mb-3 sm:mb-4 group-hover:text-slate-300 transition-colors">
            {category.description}
          </p>

          {/* Arrow Icon */}
          <div className="flex justify-center">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-700 group-hover:bg-white/20 flex items-center justify-center transition-all duration-300">
              <ArrowRight 
                size={14} 
                className="text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" 
              />
            </div>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
        </div>

        {/* Animated Border */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
          <div className="absolute inset-[1px] rounded-2xl bg-slate-900" />
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;