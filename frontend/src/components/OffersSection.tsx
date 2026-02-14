import { motion } from 'framer-motion';
import { Gift, Sparkles, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import OfferCard from './OfferCard';

const OffersSection = () => {
  // Mock offers data - replace with actual API data
  const offers = [
    {
      id: 1,
      type: 'bogo',
      title: 'Fresh Fruits BOGO',
      description: 'Buy any fruit and get another one absolutely free. Limited time offer!',
      price: 4.99,
      originalPrice: 9.98,
      savings: 4.99,
      gradient: 'from-emerald-500 to-green-600',
      endTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
      link: '/products?offer=bogo-fruits',
      products: [
        {
          name: 'Apples',
          image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=200'
        },
        {
          name: 'Bananas',
          image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=200'
        },
        {
          name: 'Oranges',
          image: 'https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&q=80&w=200'
        }
      ]
    },
    {
      id: 2,
      type: 'combo',
      title: 'Breakfast Combo',
      description: 'Complete breakfast package: Milk, Bread, Eggs & Butter at special price',
      price: 12.99,
      originalPrice: 18.99,
      savings: 6.00,
      gradient: 'from-emerald-600 to-green-700',
      endTime: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(), // 6 hours from now
      link: '/products?offer=breakfast-combo',
      products: [
        {
          name: 'Milk',
          image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=200'
        },
        {
          name: 'Bread',
          image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=200'
        },
        {
          name: 'Eggs',
          image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&q=80&w=200'
        },
        {
          name: 'Butter',
          image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=200'
        }
      ]
    },
    {
      id: 3,
      type: 'discount',
      title: 'Mega Vegetable Sale',
      description: 'Get 40% off on all fresh vegetables. Stock up for the week!',
      price: 15.99,
      originalPrice: 26.99,
      savings: 11.00,
      discount: 40,
      gradient: 'from-emerald-500 to-green-600',
      endTime: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(), // 12 hours from now
      link: '/products?offer=vegetable-sale',
      products: [
        {
          name: 'Tomatoes',
          image: 'https://images.unsplash.com/photo-1546470427-e5ac89c8ba3b?auto=format&fit=crop&q=80&w=200'
        },
        {
          name: 'Carrots',
          image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&q=80&w=200'
        },
        {
          name: 'Spinach',
          image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=200'
        }
      ]
    }
  ];

  return (
    <section className="py-12 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900/50"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAx')] opacity-30"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-20 w-24 h-24 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div 
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="p-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl shadow-lg"
            >
              <Gift className="text-white" size={32} />
            </motion.div>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="text-amber-400" size={24} />
            </motion.div>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4">
            Special Offers & Combo Deals
          </h2>
          <p className="text-slate-400 max-w-3xl mx-auto">
            Don't miss out on these amazing deals! Limited time offers with huge savings
          </p>
          
          {/* Animated Subtitle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            animate={{ 
              boxShadow: [
                "0 0 0 0 rgba(239, 68, 68, 0.4)",
                "0 0 0 10px rgba(239, 68, 68, 0)",
                "0 0 0 0 rgba(239, 68, 68, 0)"
              ]
            }}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-full text-red-400 font-semibold"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ 
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Clock size={20} />
            </motion.div>
            Hurry! Limited Time Offers
          </motion.div>
        </motion.div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {offers.map((offer, index) => (
            <OfferCard key={offer.id} offer={offer} index={index} />
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600 rounded-3xl p-8 relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-green-500/5 animate-pulse"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-4 mb-6">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg"
                >
                  <Sparkles className="text-white" size={32} />
                </motion.div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                Want More Exclusive Deals?
              </h3>
              <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter and be the first to know about flash sales, 
                exclusive discounts, and special combo offers!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all hover:border-slate-500"
                />
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 flex items-center gap-2 whitespace-nowrap"
                >
                  Subscribe
                  <ArrowRight size={20} />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OffersSection;