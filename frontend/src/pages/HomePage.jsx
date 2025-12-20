
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import ScrollReveal from '../components/ScrollReveal';
import ProductSection from '../components/ProductSection';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, ShoppingBag, ArrowRight, Zap, Check, Truck, ShieldCheck, Clock, Phone, Mail } from 'lucide-react';

const beautyBanner = '/images/fashion_hero_banner.png';

const categories = [
    { name: 'Top Offers', image: 'https://cdn-icons-png.flaticon.com/128/6632/6632834.png' },
    { name: 'Bangles', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=200&h=200' },
    { name: 'Fashion', image: 'https://cdn-icons-png.flaticon.com/128/3050/3050253.png' },
    { name: 'Lockets', image: 'https://rukminim2.flixcart.com/image/480/640/xif0q/shopsy-pendant-locket/e/3/m/na-na-ethnic-evil-eye-pendant-men-pendant-women-pedant-heavy-original-imagyuk5eqymwfhp.jpeg?q=90' },
    { name: 'Home', image: 'https://cdn-icons-png.flaticon.com/128/1946/1946488.png' },
    { name: 'Beauty', image: 'https://cdn-icons-png.flaticon.com/128/2763/2763321.png' },
    { name: 'Ear Rings', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=200&h=200' },
    { name: 'Toys', image: 'https://cdn-icons-png.flaticon.com/128/3082/3082060.png' },
    { name: 'Finger Rings', image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSdZJaycUKmtISffoT6EhavKa4UOajeulM1yK3Pj9EjaRgIhHp9mATE1dqbbTOL7p8hc6n_GANSVXDSggjE6odKEAvi41fCOWw0lQURte69iDBHOSONE1FIFw' },
];

// Product Section Component - Cleaner & Premium
const HomeProductSection = ({ title, data, addToCartHandler, buyNowHandler, addedItems }) => (
    <div className="my-8 md:my-16">
        <div className="container mx-auto px-4 md:px-6">
            <div className="flex justify-between items-end mb-8 relative">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{title}</h2>
                    <div className="h-1 w-16 bg-pink-500 mt-2 rounded-full"></div>
                </div>
                <Link to="/shop" className="flex items-center gap-1 text-sm font-bold text-pink-600 dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-300 transition-colors uppercase tracking-wider">
                    View All <ArrowRight size={16} />
                </Link>
            </div>

            <div className="flex overflow-x-auto gap-5 pb-8 -mx-4 px-5 md:gap-6 md:mx-0 md:px-0 scrollbar-hide snap-x scroll-pl-5">
                {data.map((product) => (
                    <Link key={product._id} to={`/product/${product._id}`} className="w-[200px] md:w-[240px] flex-shrink-0 bg-white dark:bg-white/5 dark:backdrop-blur-md rounded-2xl shadow-sm hover:shadow-xl hover:shadow-pink-500/20 border border-gray-200 dark:border-white/20 hover:border-pink-500/40 dark:hover:border-pink-500/40 transition-all duration-300 snap-start group relative overflow-hidden flex flex-col">

                        {/* Image Container */}
                        <div className="relative w-full aspect-[4/5] bg-gray-50 dark:bg-transparent overflow-hidden">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />

                            {/* Rating Badge */}
                            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 shadow-sm text-gray-900 group-hover:shadow-pink-200 transition-shadow">
                                {product.rating} <Star size={10} className="fill-yellow-400 text-yellow-400" />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 flex flex-col flex-1">
                            <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-1 mb-1 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">{product.name}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 tracking-wide uppercase">{product.brand || 'Cosmetic Shop'}</p>

                            <div className="mt-auto flex items-center justify-between mb-4">
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg font-bold text-gray-900 dark:text-white">₹{product.price}</span>
                                        <span className="text-xs text-gray-400 dark:text-white/40 line-through">₹{Math.round(product.price * 1.4)}</span>
                                    </div>
                                </div>
                                <span className="text-[10px] font-bold text-pink-600 bg-pink-50 dark:bg-pink-900/30 px-2 py-1 rounded-full uppercase tracking-wider group-hover:bg-pink-100 dark:group-hover:bg-pink-900/50 transition-colors">
                                    40% OFF
                                </span>
                            </div>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={(e) => addToCartHandler(e, product)}
                                    className="bg-transparent border border-gray-200 dark:border-white/20 hover:border-pink-500 hover:text-pink-600 dark:hover:text-pink-400 text-gray-600 dark:text-gray-300 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 uppercase tracking-wide group/btn hover:bg-pink-50 dark:hover:bg-pink-900/10"
                                >
                                    {addedItems[product._id] ? <Check size={14} className="text-green-500" /> : <ShoppingBag size={14} className="group-hover/btn:scale-110 transition-transform" />}
                                    Add
                                </button>
                                <button
                                    onClick={(e) => buyNowHandler(e, product)}
                                    className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 uppercase tracking-wide shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-[1.02]"
                                >
                                    <Zap size={14} className="fill-current" />
                                    Buy
                                </button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </div>
);

const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { keyword } = useParams();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    const [addedItems, setAddedItems] = useState({});

    // Typewriter Effect State
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    const words = ["Pure Elegance", "Trendsetter", "Iconic Style", "Classic Vibe"];

    useEffect(() => {
        const handleType = () => {
            const i = loopNum % words.length;
            const fullText = words[i];

            setCurrentText(isDeleting
                ? fullText.substring(0, currentText.length - 1)
                : fullText.substring(0, currentText.length + 1)
            );

            // Speed Control
            setTypingSpeed(isDeleting ? 80 : 150);

            // Logic for switching states
            if (!isDeleting && currentText === fullText) {
                setTimeout(() => setIsDeleting(true), 2000); // Wait before deleting
            } else if (isDeleting && currentText === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleType, typingSpeed);
        return () => clearTimeout(timer);
    }, [currentText, isDeleting, loopNum, typingSpeed, words]);

    useEffect(() => {
        dispatch(listProducts(keyword));
    }, [dispatch, keyword]);

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const addToCartHandler = async (e, product) => {
        e.preventDefault();
        if (!userInfo) {
            navigate('/login');
            return;
        }
        try {
            await dispatch(addToCart({
                productId: product._id,
                quantity: 1
            })).unwrap();

            setAddedItems((prev) => ({ ...prev, [product._id]: true }));
            setTimeout(() => {
                setAddedItems((prev) => ({ ...prev, [product._id]: false }));
            }, 2000);
        } catch (err) {
            alert('Failed to add to cart: ' + err);
        }
    };

    const buyNowHandler = async (e, product) => {
        e.preventDefault();
        if (!userInfo) {
            navigate('/login?redirect=/shipping');
            return;
        }
        try {
            await dispatch(addToCart({
                productId: product._id,
                quantity: 1
            })).unwrap();
            navigate('/cart');
        } catch (err) {
            alert('Failed to buy: ' + err);
        }
    };

    return (
        <div className="min-h-screen font-sans selection:bg-pink-500 selection:text-white pb-12 transition-colors duration-300 relative overflow-x-hidden">

            {/* 1. Category Navigation - Clean White Strip */}
            {!keyword && (
                <ScrollReveal>
                    <div className="bg-white dark:bg-gray-900/60 dark:backdrop-blur-xl border-b border-gray-100 dark:border-white/5 sticky top-0 z-30 shadow-sm transition-all duration-300">
                        <div className="container mx-auto">
                            <div className="flex overflow-x-auto justify-start md:justify-center gap-6 md:gap-10 py-2 scrollbar-hide">
                                {categories.map((cat, index) => (
                                    <div key={index}
                                        onClick={() => navigate(`/search/${cat.name}`)}
                                        className="flex flex-col items-center cursor-pointer min-w-[64px] group opacity-80 hover:opacity-100 transition-opacity">
                                        <div className="w-12 h-12 mb-1 rounded-xl bg-gray-50 dark:bg-white/5 group-hover:bg-pink-50 dark:group-hover:bg-pink-500/20 transition-colors p-2 flex items-center justify-center border border-transparent dark:border-white/10">
                                            <img src={cat.image} alt={cat.name} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal filter group-hover:contrast-125 transition-all" />
                                        </div>
                                        <span className="text-[10px] md:text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-pink-600 dark:group-hover:text-pink-400 font-sans tracking-wide">{cat.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            )}

            {/* 2. Professional Hero Section */}
            {!keyword && (
                <ScrollReveal delay={50}>
                    <div className="relative w-full h-[350px] md:h-[500px] lg:h-[600px] overflow-hidden bg-gray-900">
                        <img
                            src={beautyBanner}
                            alt="Premium Cosmetics"
                            className="w-full h-full object-cover opacity-90"
                        />

                        {/* Clean Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center">
                            <div className="container mx-auto px-4 md:px-8">
                                <div className="max-w-xl space-y-6 animate-fade-in-up">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white/90 text-xs font-semibold tracking-wider uppercase">
                                        <Zap size={12} className="text-yellow-400 fill-yellow-400" /> New Collection
                                    </div>
                                    <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight font-display min-h-[2.2em]">
                                        <span style={{ textShadow: '0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15)' }}>Radiate</span> <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 animate-gradient-x border-r-4 border-pink-500 pr-1 drop-shadow-2xl filter">{currentText}</span>
                                    </h1>
                                    <p className="text-gray-300 text-sm sm:text-base md:text-xl font-light leading-relaxed max-w-md drop-shadow-md">
                                        Discover our curated selection of premium beauty essentials designed to enhance your natural glow.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 md:pt-4">
                                        <Link to="/cart" className="bg-pink-600 hover:bg-pink-700 text-white px-2 py-3 sm:px-8 sm:py-4 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-pink-600/50 hover:-translate-y-1 active:scale-95 active:shadow-inner text-xs sm:text-sm tracking-wide text-center uppercase w-full sm:w-auto relative overflow-hidden group">
                                            <span className="relative z-10">SHOP NOW</span>
                                            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:animate-shimmer"></div>
                                        </Link>
                                        <button
                                            onClick={() => document.getElementById('fresh-arrivals')?.scrollIntoView({ behavior: 'smooth' })}
                                            className="px-2 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-white border border-white/30 hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1 active:scale-95 active:bg-gray-100 text-xs sm:text-sm tracking-wide bg-white/5 backdrop-blur-sm shadow-lg text-center uppercase w-full sm:w-auto">
                                            EXPLORE
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            )}



            {/* 4. Product Sections & Collections */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="w-12 h-12 border-4 border-gray-200 border-t-pink-500 rounded-full animate-spin"></div>
                </div>
            ) : error ? (
                <div className="container mx-auto px-4 py-8">
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">{error}</div>
                </div>
            ) : (
                <div className="pb-0">
                    {keyword ? (
                        <div className="container mx-auto px-4 md:px-6 py-12">
                            <h2 className="text-2xl font-bold mb-8 dark:text-white">Search Results for "{keyword}"</h2>
                            {products.length === 0 ? (
                                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                                    No products found matching your search.
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                                    {products.map((product) => (
                                        <ScrollReveal key={product._id}>
                                            <Link to={`/product/${product._id}`} className="bg-white dark:bg-white/5 dark:backdrop-blur-md rounded-xl shadow-sm hover:shadow-2xl hover:shadow-pink-500/20 border border-gray-100 dark:border-white/10 hover:border-pink-500/30 dark:hover:border-pink-500/30 transition-all duration-500 group relative overflow-hidden flex flex-col">
                                                {/* Image Container */}
                                                <div className="relative w-full aspect-[4/5] bg-gray-50 dark:bg-transparent overflow-hidden">
                                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 shadow-sm text-gray-900 group-hover:shadow-pink-200 transition-shadow">
                                                        {product.rating} <Star size={10} className="fill-yellow-400 text-yellow-400" />
                                                    </div>
                                                </div>
                                                {/* Content */}
                                                <div className="p-4 flex flex-col flex-1">
                                                    <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-1 mb-1 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">{product.name}</h3>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 tracking-wide uppercase">{product.brand || 'Cosmetic Shop'}</p>

                                                    <div className="mt-auto flex items-center justify-between mb-4">
                                                        <div className="flex flex-col">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-lg font-bold text-gray-900 dark:text-white">₹{product.price}</span>
                                                                <span className="text-xs text-gray-400 dark:text-white/40 line-through">₹{Math.round(product.price * 1.4)}</span>
                                                            </div>
                                                        </div>
                                                        <span className="text-[10px] font-bold text-pink-600 bg-pink-50 dark:bg-pink-900/30 px-2 py-1 rounded-full uppercase tracking-wider group-hover:bg-pink-100 dark:group-hover:bg-pink-900/50 transition-colors">40% OFF</span>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-3">
                                                        <button onClick={(e) => addToCartHandler(e, product)} className="bg-transparent border border-gray-200 dark:border-white/20 hover:border-pink-500 hover:text-pink-600 dark:hover:text-pink-400 text-gray-600 dark:text-gray-300 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 uppercase tracking-wide group/btn hover:bg-pink-50 dark:hover:bg-pink-900/10">
                                                            {addedItems[product._id] ? <Check size={14} className="text-green-500" /> : <ShoppingBag size={14} className="group-hover/btn:scale-110 transition-transform" />} Add
                                                        </button>
                                                        <button onClick={(e) => buyNowHandler(e, product)} className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 uppercase tracking-wide shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-[1.02]">
                                                            <Zap size={14} className="fill-current" /> Buy
                                                        </button>
                                                    </div>
                                                </div>
                                            </Link>
                                        </ScrollReveal>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            {/* Bestsellers Section */}
                            <ScrollReveal>
                                <HomeProductSection
                                    title="Trending Bestsellers"
                                    data={products.slice(0, 8)}
                                    addToCartHandler={addToCartHandler}
                                    buyNowHandler={buyNowHandler}
                                    addedItems={addedItems}
                                />
                            </ScrollReveal>

                            {/* Minimalist Banner */}
                            <ScrollReveal delay={50}>
                                <div className="container mx-auto px-4 md:px-6 my-8 md:my-16">
                                    <div className="relative rounded-2xl overflow-hidden h-64 md:h-80 shadow-2xl group">
                                        <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Promo" />
                                        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center p-6 transition-colors group-hover:bg-black/50">
                                            <span className="text-white/80 text-sm font-bold tracking-[0.2em] uppercase mb-4">Limited Time Offer</span>
                                            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display">Unlock Your Beauty Potential</h3>
                                            <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl">
                                                Discover More
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>

                            {/* Fresh Arrivals Section */}
                            <ScrollReveal>
                                <div id="fresh-arrivals">
                                    <HomeProductSection
                                        title="Fresh Arrivals"
                                        data={products.slice().reverse().slice(0, 8)}
                                        addToCartHandler={addToCartHandler}
                                        buyNowHandler={buyNowHandler}
                                        addedItems={addedItems}
                                    />
                                </div>
                            </ScrollReveal>

                            {/* Curated Collections Grid (The Glowify Edit) */}
                            <div className="container mx-auto px-4 md:px-6 py-8 md:py-16 mb-10 md:mb-20 relative z-10">
                                <ScrollReveal>
                                    <div className="text-center mb-12">
                                        <span className="text-pink-600 font-bold tracking-wider uppercase text-xs md:text-sm">Curated For You</span>
                                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mt-2 font-display">The Glowify Edit</h2>
                                    </div>
                                </ScrollReveal>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto md:h-[800px]">
                                    {/* Large item */}
                                    <ScrollReveal delay={50} className="h-full">
                                        <Link to="/collection/women" className="relative rounded-2xl overflow-hidden group h-[500px] md:h-full cursor-pointer block">
                                            <img src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Skincare" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12">
                                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">Party Glam Women</h3>
                                                <p className="text-gray-200 mb-6 max-w-sm">Wrap yourself in comfort with our every day collections</p>
                                                <span className="inline-flex items-center text-white font-bold uppercase tracking-wider text-sm border-b border-white pb-1 w-max">Shop Now <ArrowRight size={16} className="ml-2" /></span>
                                            </div>
                                        </Link>
                                    </ScrollReveal>
                                    <div className="flex flex-col gap-6 h-full">
                                        {/* Top item */}
                                        <ScrollReveal delay={50} className="flex-1">
                                            <Link to="/collection/men" className="relative rounded-2xl overflow-hidden group flex-1 h-[350px] md:h-auto cursor-pointer block">
                                                <img src="https://img.freepik.com/free-photo/young-man-menswear-shop-talking-phone_1303-19871.jpg?semt=ais_hybrid&w=740&q=80" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Makeup" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-8">
                                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Party Glam Men</h3>
                                                    <span className="text-white hover:text-pink-200 transition-colors font-semibold flex items-center gap-1">View Collection <ArrowRight size={14} /></span>
                                                </div>
                                            </Link>
                                        </ScrollReveal>
                                        {/* Bottom item */}
                                        <ScrollReveal delay={50} className="flex-1">
                                            <Link to="/shop" className="relative rounded-2xl overflow-hidden group flex-1 h-[350px] md:h-auto cursor-pointer block">
                                                <img src="https://media.istockphoto.com/id/2164807382/photo/making-the-best-of-the-day-together.jpg?s=612x612&w=0&k=20&c=ONB6q_9SXI4NOlfSwggNtbUYfJHdOIFvF-yuMNjJHD4=" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Sets" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-8">
                                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Collection</h3>
                                                    <span className="text-white hover:text-pink-200 transition-colors font-semibold flex items-center gap-1">Find the Perfect Gift <ArrowRight size={14} /></span>
                                                </div>
                                            </Link>
                                        </ScrollReveal>
                                    </div>
                                </div>
                            </div>

                            {/* 3. Trust Badges Strip (Moved to Bottom) */}
                            <ScrollReveal>
                                <div className="bg-white dark:bg-gray-900/60 dark:backdrop-blur-xl border-t border-gray-100 dark:border-white/5 py-12 mt-24 transition-colors duration-300 relative z-20">
                                    <div className="container mx-auto px-4">
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-gray-50 dark:divide-gray-800/50">
                                            <div className="flex flex-col items-center gap-2 group cursor-pointer">
                                                <div className="p-3 bg-pink-50 dark:bg-white/5 rounded-full text-pink-600 dark:text-pink-400 mb-1 group-hover:scale-110 transition-transform">
                                                    <Truck size={24} />
                                                </div>
                                                <h4 className="font-bold text-gray-800 dark:text-white text-sm">Free Shipping</h4>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">On all orders over ₹499</p>
                                            </div>
                                            <div className="flex flex-col items-center gap-2 group cursor-pointer">
                                                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-full text-purple-600 dark:text-purple-400 mb-1 group-hover:scale-110 transition-transform">
                                                    <ShieldCheck size={24} />
                                                </div>
                                                <h4 className="font-bold text-gray-800 dark:text-white text-sm">Secure Payment</h4>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">100% secure checkout</p>
                                            </div>
                                            <div className="flex flex-col items-center gap-2 group cursor-pointer">
                                                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-600 dark:text-blue-400 mb-1 group-hover:scale-110 transition-transform">
                                                    <Clock size={24} />
                                                </div>
                                                <h4 className="font-bold text-gray-800 dark:text-white text-sm">Fast Delivery</h4>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">2-4 days express delivery</p>
                                            </div>
                                            <div className="flex flex-col items-center gap-2 group cursor-pointer">
                                                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-full text-green-600 dark:text-green-400 mb-1 group-hover:scale-110 transition-transform">
                                                    <Phone size={24} />
                                                </div>
                                                <h4 className="font-bold text-gray-800 dark:text-white text-sm">24/7 Support</h4>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Dedicated support team</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default HomePage;
