import { motion } from 'framer-motion';
import CategoryCard from './CategoryCard';
import { categories } from '../data/products';

const CategoryGrid = () => {
  // Create category data with emojis and gradients, filtering out 'All'
  const categoryData = categories
    .filter(cat => cat !== 'All')
    .map((category, index) => {
      const categoryMap: Record<string, { emoji: string; description: string; gradient: string }> = {
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
        },
        'Meat': {
          emoji: '🥩',
          description: 'Fresh cuts & premium meat',
          gradient: 'from-red-600 to-rose-600'
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
    <section className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
            Shop by Category
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base px-4">
            Discover fresh products organized by categories for easy shopping
          </p>
        </motion.div>

        {/* Categories Grid - 2 rows with 5 cards each */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {/* First row - 5 cards */}
          {categoryData.slice(0, 5).map((category, index) => (
            <CategoryCard 
              key={category.id} 
              category={category} 
              index={index}
            />
          ))}
          {/* Second row - 5 cards */}
          {categoryData.slice(5).map((category, index) => (
            <CategoryCard 
              key={category.id} 
              category={category} 
              index={index + 5}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
