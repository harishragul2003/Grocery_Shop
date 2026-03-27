import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface Category {
  name: string;
  emoji: string;
  description: string;
  gradient: string;
  link: string;
}

interface CategoryCardProps {
  category: Category;
  index: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.1 }}
      className="group h-full cursor-pointer"
    >
      <Link
        to={category.link}
        className="block relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 hover:border-transparent transition-all duration-300 h-full"
      >
        {/* Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
        
        {/* Content */}
        <div className="relative p-5 text-center h-full flex flex-col justify-center">
          {/* Icon Container */}
          <div className="relative mb-3">
            <div 
              className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center text-4xl shadow-lg transition-all duration-300`}
            >
              {category.emoji}
            </div>
            
            {/* Glow Effect */}
            <div 
              className={`absolute inset-0 w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-50 blur-2xl transition-all duration-300`} 
            />
          </div>

          {/* Category Name */}
          <h3 className="text-lg font-bold text-white mb-2 transition-colors duration-300">
            {category.name}
          </h3>
          
          {/* Description */}
          <p className="text-sm text-slate-400 mb-4 transition-colors duration-300 line-clamp-2">
            {category.description}
          </p>

          {/* Arrow Icon */}
          <div className="flex justify-center mt-auto">
            <motion.div 
              whileHover={{ scale: 1.2, rotate: 45 }}
              className="w-8 h-8 rounded-full bg-slate-700 group-hover:bg-white/20 flex items-center justify-center transition-all duration-300"
            >
              <ArrowRight 
                size={16} 
                className="text-slate-400 group-hover:text-white transition-all duration-300" 
              />
            </motion.div>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
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
