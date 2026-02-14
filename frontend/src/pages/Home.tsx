import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import CategoryCarousel from '../components/CategoryCarousel';
import ProductList from '../components/ProductList';
import OffersSection from '../components/OffersSection';
import WhyChooseUs from '../components/WhyChooseUs';
import { supabase } from '../lib/supabaseClient';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image_url: string;
  stock: number;
  description?: string;
  brand?: string;
  ratings?: number;
  num_reviews?: number;
  original_price?: number;
}

const Home = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('name', { ascending: true });

            if (error) {
                console.error('Error fetching products:', error);
                setProducts([]);
            } else {
                setProducts(data || []);
            }
            setLoading(false);
        };

        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 relative overflow-hidden">
            {/* Animated Background Elements - More Colorful */}
            <div className="fixed inset-0 pointer-events-none">
                {/* Gradient Orbs - Larger and More Colorful */}
                <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-1/4 sm:top-1/3 right-10 sm:right-20 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-1/3 sm:bottom-1/4 left-1/6 sm:left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
                <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-64 sm:w-80 h-64 sm:h-80 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-fuchsia-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
                
                {/* Floating Particles - More Colorful */}
                <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-emerald-400/40 rounded-full animate-bounce delay-300 shadow-[0_0_10px_rgba(52,211,153,0.8)]"></div>
                <div className="absolute top-1/2 right-1/4 w-2.5 h-2.5 bg-blue-400/50 rounded-full animate-bounce delay-700 shadow-[0_0_10px_rgba(96,165,250,0.8)]"></div>
                <div className="absolute bottom-1/3 left-1/5 w-3.5 h-3.5 bg-purple-400/40 rounded-full animate-bounce delay-1200 shadow-[0_0_10px_rgba(192,132,252,0.8)]"></div>
                <div className="absolute top-3/4 right-1/3 w-2.5 h-2.5 bg-amber-400/50 rounded-full animate-bounce delay-900 shadow-[0_0_10px_rgba(251,191,36,0.8)]"></div>
                <div className="absolute top-1/3 right-1/5 w-2 h-2 bg-pink-400/40 rounded-full animate-bounce delay-500 shadow-[0_0_10px_rgba(244,114,182,0.8)]"></div>
                <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-cyan-400/40 rounded-full animate-bounce delay-1500 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
                
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAx')] opacity-30"></div>
                
                {/* Colorful Orbs Animation */}
                <motion.div 
                    animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360]
                    }}
                    transition={{ 
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-500/5 to-blue-500/5 rounded-full blur-3xl"
                />
            </div>

            {/* Content with relative positioning */}
            <div className="relative z-10">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="py-4 sm:py-6"
                >
                    <Hero />
                </motion.div>

                {/* Categories Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="py-2 sm:py-4"
                >
                    <CategoryCarousel />
                </motion.div>

                {/* Best Sellers Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="py-2 sm:py-4"
                >
                    <ProductList title="Best Sellers" />
                </motion.div>

                {/* Offers Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="py-2 sm:py-4"
                >
                    <OffersSection />
                </motion.div>

                {/* Features Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="py-2 sm:py-4"
                >
                    <WhyChooseUs />
                </motion.div>
            </div>
        </div>
    );
};

export default Home;