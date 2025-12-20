import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, ArrowRight, Zap, Check, ShoppingBag } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import ScrollReveal from './ScrollReveal';

const ProductSection = ({ title, data }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    // Helper to check if item is in cart
    const addedItems = cartItems.reduce((acc, item) => {
        acc[item.product] = true;
        return acc;
    }, {});

    const addToCartHandler = (e, product) => {
        e.preventDefault();
        if (!userInfo) {
            navigate('/login');
            return;
        }
        dispatch(addToCart({ productId: product._id, quantity: 1 }));
    };

    const buyNowHandler = async (e, product) => {
        e.preventDefault();
        if (!userInfo) {
            navigate('/login?redirect=/shipping');
            return;
        }
        await dispatch(addToCart({ productId: product._id, quantity: 1 }));
        navigate('/shipping');
    };

    if (!data || data.length === 0) return null;

    return (
        <div className="py-8">
            {title && (
                <div className="flex items-end justify-between mb-8 px-4 md:px-0">
                    <div>
                        <span className="text-pink-600 font-bold tracking-wider uppercase text-xs md:text-sm">Explore</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-1 font-display">{title}</h2>
                    </div>
                    {/* View All Button could go here */}
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-0">
                {data.map((product, index) => (
                    <ScrollReveal key={product._id} delay={index * 50}>
                        <Link to={`/product/${product._id}`} className="bg-white dark:bg-gray-900/40 dark:backdrop-blur-md rounded-xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-white/10 transition-shadow duration-300 group relative overflow-hidden flex flex-col h-full" style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}>
                            {/* Image Container */}
                            <div className="relative w-full aspect-[4/5] bg-white dark:bg-transparent overflow-hidden">
                                <img src={product.image} alt={product.name} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold flex items-center gap-1 shadow-sm text-gray-800">
                                    {product.rating} <Star size={10} className="fill-yellow-400 text-yellow-400" />
                                </div>
                            </div>

                            <div className="p-4 flex flex-col flex-grow">
                                <h3 className="font-bold text-gray-800 dark:text-gray-100 text-sm md:text-base line-clamp-2 mb-1 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">{product.name}</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{product.brand}</p>
                                <div className="mt-auto flex items-center justify-between">
                                    <span className="text-base md:text-lg font-bold text-gray-900 dark:text-white">₹{product.price}</span>
                                    <div className="bg-gray-100 dark:bg-gray-700/50 p-2 rounded-full group-hover:bg-pink-600 group-hover:text-white transition-all duration-300">
                                        <ShoppingCart size={16} />
                                    </div>
                                </div>
                                <div className="mt-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-x-4 bottom-4 translate-y-4 group-hover:translate-y-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur pb-4 pt-2">
                                    <button onClick={(e) => addToCartHandler(e, product)} className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1">
                                        {addedItems[product._id] ? <Check size={14} className="text-green-500" /> : <ShoppingBag size={14} />} Add
                                    </button>
                                    <button onClick={(e) => buyNowHandler(e, product)} className="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1">
                                        <Zap size={14} /> Buy
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </ScrollReveal>
                ))}
            </div>
        </div>
    );
};

export default ProductSection;
