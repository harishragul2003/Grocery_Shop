import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ShoppingBasket, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Heart,
  ArrowUp,
  Clock,
  Shield,
  Truck
} from 'lucide-react';
import { categories } from '../data/products';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    about: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Story', href: '/story' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Blog', href: '/blog' }
    ],
    customer: [
      { name: 'My Orders', href: '/orders' },
      { name: 'Help Center', href: '/help' },
      { name: 'Track Order', href: '/track' },
      { name: 'Return Policy', href: '/returns' },
      { name: 'Bulk Orders', href: '/bulk' }
    ],
    legal: [
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Refund Policy', href: '/refunds' },
      { name: 'Shipping Policy', href: '/shipping' }
    ],
    categories: categories
      .filter(cat => cat !== 'All')
      .slice(0, 5) // Show only first 5 categories
      .map(cat => ({ 
        name: cat, 
        href: `/products?category=${cat.toLowerCase()}` 
      }))
  };

  const socialLinks = [
    { 
      name: 'Facebook', 
      icon: <Facebook size={20} />, 
      href: 'https://facebook.com/naturecart',
      color: 'hover:text-blue-400'
    },
    { 
      name: 'Twitter', 
      icon: <Twitter size={20} />, 
      href: 'https://twitter.com/naturecart',
      color: 'hover:text-sky-400'
    },
    { 
      name: 'Instagram', 
      icon: <Instagram size={20} />, 
      href: 'https://instagram.com/naturecart',
      color: 'hover:text-pink-400'
    },
    { 
      name: 'YouTube', 
      icon: <Youtube size={20} />, 
      href: 'https://youtube.com/naturecart',
      color: 'hover:text-red-400'
    }
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 mb-6 group">
                  <div className="relative">
                    <ShoppingBasket 
                      className="text-emerald-500 group-hover:text-emerald-400 transition-colors duration-200" 
                      size={32} 
                    />
                    <div className="absolute -inset-1 bg-emerald-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </div>
                  <span className="text-xl sm:text-2xl font-bold text-white">
                    Nature<span className="text-emerald-500">Cart</span>
                  </span>
                </Link>

                <p className="text-slate-400 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  Your trusted partner for fresh, organic groceries delivered right to your doorstep. 
                  We're committed to bringing you the finest quality products with unmatched convenience.
                </p>

                {/* Contact Info */}
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  <div className="flex items-center gap-3 text-slate-400 hover:text-emerald-400 transition-colors">
                    <Phone size={16} />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400 hover:text-emerald-400 transition-colors">
                    <Mail size={16} />
                    <span>support@naturecart.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400 hover:text-emerald-400 transition-colors">
                    <MapPin size={16} />
                    <span>123 Green Street, Eco City, EC 12345</span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                  <div className="text-center">
                    <div className="text-emerald-500 font-bold text-lg">10k+</div>
                    <div className="text-slate-500 text-xs">Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-emerald-500 font-bold text-lg">500+</div>
                    <div className="text-slate-500 text-xs">Products</div>
                  </div>
                  <div className="text-center">
                    <div className="text-emerald-500 font-bold text-lg">4.8★</div>
                    <div className="text-slate-500 text-xs">Rating</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* About Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-white font-semibold text-lg mb-6">About</h3>
              <ul className="space-y-3">
                {footerLinks.about.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.href}
                      className="text-slate-400 hover:text-emerald-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Customer Service */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-white font-semibold text-lg mb-6">Contact</h3>
              <ul className="space-y-3">
                {footerLinks.customer.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.href}
                      className="text-slate-400 hover:text-emerald-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal & Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-white font-semibold text-lg mb-6">Terms</h3>
              <ul className="space-y-3 mb-8">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.href}
                      className="text-slate-400 hover:text-emerald-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <h4 className="text-white font-semibold mb-4">Categories</h4>
              <ul className="space-y-2">
                {footerLinks.categories.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.href}
                      className="text-slate-400 hover:text-emerald-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* App Download & Social Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 pt-8 border-t border-slate-800"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Newsletter Signup */}
              <div>
                <h3 className="text-white font-semibold text-lg mb-4">Stay Updated</h3>
                <p className="text-slate-400 text-sm mb-6">
                  Subscribe to our newsletter for exclusive deals and fresh product updates
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                  <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 hover:scale-105 whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Social Links */}
              <div className="text-center md:text-right">
                <h3 className="text-white font-semibold text-lg mb-4">Follow Us</h3>
                <p className="text-slate-400 text-sm mb-6">
                  Stay connected for updates, recipes, and special offers
                </p>
                <div className="flex justify-center md:justify-end gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all duration-200 text-slate-400 ${social.color} hover:scale-110 hover:border-emerald-500/50`}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <span>© 2026 NatureCart. All rights reserved.</span>
              <div className="hidden md:flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Shield size={14} className="text-emerald-500" />
                  <span>Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck size={14} className="text-emerald-500" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-emerald-500" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-emerald-600 border border-slate-700 hover:border-emerald-500 rounded-lg transition-all duration-200 text-slate-400 hover:text-white group"
            >
              <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
              <span className="text-sm">Back to Top</span>
            </button>
          </div>
        </div>

        {/* Made with Love */}
        <div className="text-center py-4 border-t border-slate-800">
          <p className="text-slate-500 text-sm flex items-center justify-center gap-2">Developed by <span className="text-red-500 font-semibold">HARISH RAGUL</span> <Heart size={14} className="text-red-500 animate-pulse" fill="currentColor" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;