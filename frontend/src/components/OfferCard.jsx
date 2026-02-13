import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, ShoppingCart, Gift, Percent, Tag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const OfferCard = ({ offer, index }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    if (!offer.endTime) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const endTime = new Date(offer.endTime).getTime();
      const difference = endTime - now;

      if (difference > 0) {
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [offer.endTime]);

  const getOfferIcon = () => {
    switch (offer.type) {
      case 'bogo':
        return <Gift className="text-white" size={24} />;
      case 'combo':
        return <Tag className="text-white" size={24} />;
      case 'discount':
        return <Percent className="text-white" size={24} />;
      default:
        return <Gift className="text-white" size={24} />;
    }
  };

  const getOfferBadge = () => {
    switch (offer.type) {
      case 'bogo':
        return 'Buy 1 Get 1';
      case 'combo':
        return 'Combo Deal';
      case 'discount':
        return `${offer.discount}% OFF`;
      default:
        return 'Special Offer';
    }
  };

  return (
    <Link to={offer.link} className="block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -8, scale: 1.02 }}
        className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 hover:border-transparent transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-emerald-500/20"
      >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${offer.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
      </div>

      <div className="relative p-6 h-full flex flex-col">
        {/* Offer Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r ${offer.gradient} rounded-full text-white text-sm font-bold shadow-lg`}>
            {getOfferIcon()}
            {getOfferBadge()}
          </div>
          
          {/* Countdown Timer */}
          {offer.endTime && (timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0) && (
            <div className="flex items-center gap-2 bg-red-500/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-red-500/30">
              <Clock size={14} className="text-red-400" />
              <span className="text-red-400 text-xs font-mono font-bold">
                {String(timeLeft.hours).padStart(2, '0')}:
                {String(timeLeft.minutes).padStart(2, '0')}:
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          )}
        </div>

        {/* Offer Title */}
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-green-400 group-hover:bg-clip-text transition-all duration-300">
          {offer.title}
        </h3>

        {/* Offer Description */}
        <p className="text-slate-400 text-sm mb-4 flex-grow group-hover:text-slate-300 transition-colors">
          {offer.description}
        </p>

        {/* Product Images */}
        {offer.products && offer.products.length > 0 && (
          <div className="flex -space-x-2 mb-4 overflow-hidden">
            {offer.products.slice(0, 3).map((product, idx) => (
              <div
                key={idx}
                className="w-12 h-12 rounded-full border-2 border-slate-700 overflow-hidden bg-slate-800 group-hover:border-emerald-500/50 transition-colors"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {offer.products.length > 3 && (
              <div className="w-12 h-12 rounded-full border-2 border-slate-700 bg-slate-800 flex items-center justify-center text-xs text-slate-400 font-bold group-hover:border-emerald-500/50 transition-colors">
                +{offer.products.length - 3}
              </div>
            )}
          </div>
        )}

        {/* Price Section */}
        <div className="mb-6">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl md:text-4xl font-bold text-white">
              ${offer.price}
            </span>
            {offer.originalPrice && (
              <span className="text-lg text-slate-500 line-through">
                ${offer.originalPrice}
              </span>
            )}
          </div>
          {offer.savings && (
            <p className="text-emerald-400 text-sm font-semibold">
              Save ${offer.savings}
            </p>
          )}
        </div>

        {/* Shop Now Button */}
        <div className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 hover:scale-105 flex items-center justify-center gap-2 group/btn">
          <ShoppingCart size={20} className="group-hover/btn:rotate-12 transition-transform" />
          Shop Now
          <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
        </div>

        {/* Glow Effect */}
        <div className={`absolute -inset-1 bg-gradient-to-r ${offer.gradient} opacity-0 group-hover:opacity-30 blur-xl transition-all duration-300 -z-10`} />
      </div>
    </motion.div>
    </Link>
  );
};

export default OfferCard;