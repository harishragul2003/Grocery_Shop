import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Truck, Clock, Percent } from 'lucide-react';
import { Link } from 'react-router-dom';

const BannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      id: 1,
      title: "Fresh Vegetables",
      subtitle: "Up to 50% OFF",
      description: "Farm fresh vegetables delivered to your doorstep",
      buttonText: "Shop Vegetables",
      buttonLink: "/products?category=vegetables",
      bgGradient: "from-green-600 to-emerald-600",
      emoji: "🥬",
      offer: "50% OFF"
    },
    {
      id: 2,
      title: "Organic Fruits",
      subtitle: "Buy 2 Get 1 FREE",
      description: "Sweet, juicy and handpicked organic fruits",
      buttonText: "Shop Fruits",
      buttonLink: "/products?category=fruits",
      bgGradient: "from-orange-600 to-red-600",
      emoji: "🍎",
      offer: "Buy 2 Get 1"
    },
    {
      id: 3,
      title: "Dairy Products",
      subtitle: "Fresh Daily",
      description: "Pure milk, cheese, and dairy products",
      buttonText: "Shop Dairy",
      buttonLink: "/products?category=dairy",
      bgGradient: "from-blue-600 to-cyan-600",
      emoji: "🥛",
      offer: "Fresh Daily"
    },
    {
      id: 4,
      title: "Bakery Items",
      subtitle: "Freshly Baked",
      description: "Warm bread and pastries baked fresh daily",
      buttonText: "Shop Bakery",
      buttonLink: "/products?category=bakery",
      bgGradient: "from-amber-600 to-yellow-600",
      emoji: "🍞",
      offer: "Fresh Baked"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [banners.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-80 md:h-96 rounded-3xl overflow-hidden group">
      {/* Banner Slides */}
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`min-w-full h-full bg-gradient-to-r ${banner.bgGradient} relative overflow-hidden`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto px-6 md:px-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Left Content */}
                  <div className="text-white">
                    {/* Offer Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                      <Percent size={16} />
                      <span className="text-sm font-semibold">{banner.offer}</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-2">
                      {banner.title}
                    </h2>
                    <p className="text-xl md:text-2xl font-semibold mb-4 text-white/90">
                      {banner.subtitle}
                    </p>
                    <p className="text-lg mb-6 text-white/80">
                      {banner.description}
                    </p>

                    <Link
                      to={banner.buttonLink}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg hover:scale-105"
                    >
                      {banner.buttonText}
                      <ChevronRight size={20} />
                    </Link>
                  </div>

                  {/* Right Content - Large Emoji */}
                  <div className="flex justify-center items-center">
                    <div className="text-8xl md:text-9xl animate-bounce">
                      {banner.emoji}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Delivery Info Banner */}
      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-white">
        <div className="flex items-center gap-2">
          <Truck size={16} />
          <span className="text-sm font-semibold">Delivery in 10 minutes</span>
        </div>
      </div>
    </div>
  );
};

export default BannerSlider;