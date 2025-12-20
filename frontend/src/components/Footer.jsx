import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 pt-16 pb-8 transition-colors duration-300 font-sans">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-400 dark:to-purple-400">
                                GLOWIFY
                            </span>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                            Your premier destination for premium cosmetics and beauty essentials. Elevate your glow with our curated collection.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/sonu_kr_saw78?igsh=bmF6NHZoZ2lydzAw" className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-pink-50 dark:hover:bg-pink-900/30 hover:text-pink-600 dark:hover:text-pink-400 transition-all">
                                <Instagram size={20} />
                            </a>
                            <a href="https://github.com/sonukumarsaw12" className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all">
                                <Github size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-sky-50 dark:hover:bg-sky-900/30 hover:text-sky-600 dark:hover:text-sky-400 transition-all">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-6">Quick Links</h4>
                        <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                            <li><Link to="/shop" className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors">Shop All</Link></li>
                            <li><Link to="/about" className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors">Contact</Link></li>
                            <li><Link to="/faq" className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors">FAQs</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-6">Customer Care</h4>
                        <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                            <li><Link to="/shipping" className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors">Shipping Policy</Link></li>
                            <li><Link to="/returns" className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors">Returns & Exchanges</Link></li>
                            <li><Link to="/terms" className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors">Terms of Service</Link></li>
                            <li><Link to="/privacy" className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-6">Contact Us</h4>
                        <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-start gap-3">
                                <MapPin size={18} className="text-pink-500 flex-shrink-0 mt-0.5" />
                                <span>1227 GBP Crest Toll Plaza<br />Kharar, Mohali Punjab 140301</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={18} className="text-pink-500 flex-shrink-0" />
                                <span>+91 62006 02843</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={18} className="text-pink-500 flex-shrink-0" />
                                <span>skrajsonu6200@gmail.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Glowify Cosmetic Shop. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-gray-900 dark:hover:text-gray-300 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-gray-900 dark:hover:text-gray-300 transition-colors">Terms</a>
                        <a href="#" className="hover:text-gray-900 dark:hover:text-gray-300 transition-colors">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
