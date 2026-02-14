import { motion } from 'framer-motion';
import { Truck, Leaf, RotateCcw, Shield, CheckCircle, Clock, Award, HeartHandshake } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      icon: <Truck className="w-8 h-8" />,
      title: 'Fast Delivery',
      description: 'Get your groceries delivered within 10-30 minutes to your doorstep',
      color: 'emerald',
      gradient: 'from-emerald-500 to-green-500',
      stats: '10-30 min'
    },
    {
      id: 2,
      icon: <Leaf className="w-8 h-8" />,
      title: 'Fresh Products',
      description: '100% fresh and organic products sourced directly from farms',
      color: 'green',
      gradient: 'from-green-500 to-lime-500',
      stats: '100% Fresh'
    },
    {
      id: 3,
      icon: <RotateCcw className="w-8 h-8" />,
      title: 'Easy Return',
      description: 'Hassle-free returns within 24 hours if you\'re not satisfied',
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500',
      stats: '24 Hours'
    },
    {
      id: 4,
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure Payment',
      description: '100% secure transactions with encrypted payment gateway',
      color: 'purple',
      gradient: 'from-purple-500 to-indigo-500',
      stats: '100% Secure'
    }
  ];

  const additionalFeatures = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      text: 'Quality Guaranteed'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      text: '24/7 Customer Support'
    },
    {
      icon: <Award className="w-6 h-6" />,
      text: 'Best Price Promise'
    },
    {
      icon: <HeartHandshake className="w-6 h-6" />,
      text: '10,000+ Happy Customers'
    }
  ];

  return (
    <section className="py-12 bg-slate-900/50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAx')] opacity-30"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-emerald-500/8 to-green-500/8 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-blue-500/8 to-cyan-500/8 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-20 w-24 h-24 bg-gradient-to-r from-purple-500/8 to-indigo-500/8 rounded-full blur-2xl animate-pulse delay-500"></div>
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.div 
              animate={{ 
                x: [0, 10, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="p-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl shadow-lg"
            >
              <Truck className="text-white" size={32} />
            </motion.div>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4">
            Why Choose NatureCart?
          </h2>
          <p className="text-slate-400 max-w-3xl mx-auto">
            We're committed to providing you with the best grocery shopping experience
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-transparent transition-all duration-300 text-center overflow-hidden"
            >
              {/* Gradient Border on Hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                <div className="absolute inset-[1px] rounded-2xl bg-slate-900" />
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon Container */}
                <div className="relative mb-6">
                  <motion.div 
                    whileHover={{ 
                      rotate: [0, -10, 10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 0.5 }}
                    className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300`}
                  >
                    {feature.icon}
                  </motion.div>
                  
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-30 blur-xl transition-all duration-300`} />
                  
                  {/* Stats Badge */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
                    className="absolute -top-2 -right-2 bg-slate-800 border border-slate-600 rounded-full px-2 py-1 text-xs font-bold text-emerald-400 group-hover:border-emerald-500/50 transition-colors"
                  >
                    {feature.stats}
                  </motion.div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-green-400 group-hover:bg-clip-text transition-all duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                  {feature.description}
                </p>
              </div>

              {/* Hover Glow */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-300 -z-10`} />
            </motion.div>
          ))}
        </div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600 rounded-3xl p-8 relative overflow-hidden"
        >
          {/* Background Animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-green-500/5 animate-pulse"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                More Reasons to Love Us
              </h3>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Join thousands of satisfied customers who trust us for their daily grocery needs
              </p>
            </div>

            {/* Additional Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalFeatures.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-emerald-500/50 transition-all duration-200 group"
                >
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400 group-hover:bg-emerald-500/30 transition-colors"
                  >
                    {item.icon}
                  </motion.div>
                  <span className="text-white font-medium group-hover:text-emerald-400 transition-colors">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "10k+", label: "Happy Customers" },
              { value: "500+", label: "Products Available" },
              { value: "4.8★", label: "Average Rating" },
              { value: "24/7", label: "Customer Support" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="text-center group cursor-pointer"
              >
                <motion.div 
                  animate={{ 
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                  className="text-3xl font-bold text-emerald-500 mb-2 group-hover:text-emerald-400 transition-colors"
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;