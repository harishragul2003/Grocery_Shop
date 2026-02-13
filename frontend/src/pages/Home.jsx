import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import CategoryGrid from '../components/CategoryGrid';
import ProductList from '../components/ProductList';
import OffersSection from '../components/OffersSection';
import WhyChooseUs from '../components/WhyChooseUs';

const Home = () => {
    return (
        <div className="min-h-screen bg-slate-950 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                {/* Gradient Orbs */}
                <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-1/4 sm:top-1/3 right-10 sm:right-20 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-blue-500/8 to-cyan-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-1/3 sm:bottom-1/4 left-1/6 sm:left-1/4 w-56 sm:w-80 h-56 sm:h-80 bg-gradient-to-r from-purple-500/8 to-pink-500/8 rounded-full blur-3xl animate-pulse delay-2000"></div>
                <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
                
                {/* Floating Particles */}
                <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-emerald-400/30 rounded-full animate-bounce delay-300"></div>
                <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-blue-400/40 rounded-full animate-bounce delay-700"></div>
                <div className="absolute bottom-1/3 left-1/5 w-1.5 h-1.5 bg-purple-400/30 rounded-full animate-bounce delay-1200"></div>
                <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-amber-400/40 rounded-full animate-bounce delay-900"></div>
                
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAx')] opacity-30"></div>
            </div>

            {/* Content with relative positioning */}
            <div className="relative z-10">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Hero />
                </motion.div>

                {/* Categories Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <CategoryGrid />
                </motion.div>

                {/* Best Sellers Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <ProductList title="Best Sellers" />
                </motion.div>

                {/* Offers Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <OffersSection />
                </motion.div>

                {/* Features Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <WhyChooseUs />
                </motion.div>
            </div>
        </div>
    );
};

export default Home;