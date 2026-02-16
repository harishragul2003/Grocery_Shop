import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { categories } from '../data/products';

const CategoryCarousel = () => {
  // Create category data with emojis and gradients, filtering out 'All' and limiting to 7
  const categoryData = categories
    .filter(cat => cat !== 'All')
    .slice(0, 7)
    .map((category, index) => {
      const categoryMap = {
        'Vegetables': {
          emoji: '🥕',
          description: 'Fresh farm vegetables',
          gradient: 'from-green-500 to-emerald-600'
        },
        'Fruits': {
          emoji: '🍎',
          description: 'Sweet & juicy fruits',
          gradient: 'from-red-500 to-orange-500'
        },
        'Dairy': {
          emoji: '🥛',
          description: 'Pure dairy products',
          gradient: 'from-blue-500 to-cyan-500'
        },
        'Bakery': {
          emoji: '🍞',
          description: 'Fresh baked goods',
          gradient: 'from-amber-500 to-orange-500'
        },
        'Grains': {
          emoji: '🍚',
          description: 'Premium quality grains',
          gradient: 'from-amber-500 to-yellow-500'
        },
        'Snacks': {
          emoji: '🍪',
          description: 'Tasty snacks & treats',
          gradient: 'from-purple-500 to-pink-500'
        },
        'Pantry': {
          emoji: '🫙',
          description: 'Kitchen essentials',
          gradient: 'from-slate-500 to-gray-600'
        },
        'Beverages': {
          emoji: '☕',
          description: 'Refreshing drinks',
          gradient: 'from-indigo-500 to-purple-500'
        },
        'Frozen': {
          emoji: '🧊',
          description: 'Frozen foods',
          gradient: 'from-cyan-500 to-blue-500'
        }
      };

      const categoryInfo = categoryMap[category] || {
        emoji: '🛒',
        description: 'Quality products',
        gradient: 'from-gray-500 to-slate-600'
      };

      return {
        id: index + 1,
        name: category,
        emoji: categoryInfo.emoji,
        description: categoryInfo.description,
        gradient: categoryInfo.gradient,
        link: `/products?category=${category.toLowerCase()}`
      };
    });

  return (
    <section className="py-4 sm:py-6 relative overflow-hidden w-full">
      <div className="w-full px-3 sm:px-4 lg:px-6 max-w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Shop by Category
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            Discover fresh products organized by categories for easy shopping
          </p>
        </motion.div>

        {/* Category Carousel - Horizontal Scroll */}
        <div className="flex overflow-x-auto gap-2 sm:gap-3 lg:gap-4 pb-4 pt-2 scrollbar-hide snap-x snap-mandatory w-full">
          {categoryData.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="snap-center shrink-0 w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px]"
            >
              <Link
                to={category.link}
                className="group block"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-90 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 text-center">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.3 }}
                      className="text-5xl sm:text-6xl mb-3"
                    >
                      {category.emoji}
                    </motion.div>
                    <h3 className="text-white font-bold text-lg sm:text-xl mb-1 truncate px-2">
                      {category.name}
                    </h3>
                    <p className="text-white/80 text-xs sm:text-sm line-clamp-2 px-2">
                      {category.description}
                    </p>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCarousel;
