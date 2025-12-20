
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingBag, User, Search, Menu, LogOut, ChevronDown, Heart, Sparkles, MapPin, Sun, Moon, X } from 'lucide-react';
import { toggleTheme } from '../redux/slices/themeSlice';
import { fetchCart } from '../redux/slices/cartSlice';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const theme = useSelector((state) => state.theme);
    const { mode } = theme;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            dispatch(fetchCart());
        }
    }, [dispatch, userInfo]);

    const [keyword, setKeyword] = useState('');
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const [locationAddress, setLocationAddress] = useState('Mumbai 400001');
    const [isLocating, setIsLocating] = useState(false);

    const handleLocationClick = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }

        setIsLocating(true);
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                // Using OpenStreetMap Nominatim API for free reverse geocoding
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                const data = await response.json();

                const city = data.address.city || data.address.town || data.address.village || data.address.state_district || 'Unknown Location';
                const postcode = data.address.postcode || '';

                setLocationAddress(`${city} ${postcode}`);
            } catch (error) {
                console.error('Error fetching address:', error);
                setLocationAddress(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
            } finally {
                setIsLocating(false);
            }
        }, (error) => {
            console.error('Error getting location:', error);
            alert('Unable to retrieve your location. Please allow location access.');
            setIsLocating(false);
        });
    };

    // Scroll effect for glassmorphism
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const searchHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search/${keyword}`);
        } else {
            navigate('/');
        }
    };

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        window.location.href = '/login';
    };

    const navLinks = [
        { name: 'Men', link: '/collection/men' },
        { name: 'Women', link: '/collection/women' },
    ];

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname + location.search === path || location.search.includes(path.split('=')[1]);
    };

    return (
        <header
            className={`sticky top-0 z-50 font-sans transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md py-2' : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md py-2 border-b border-gray-100 dark:border-gray-800'
                } `}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between gap-6">
                    {/* 1. Logo */}
                    <Link to="/" className="flex-shrink-0 group relative flex items-center gap-1">
                        <div className="relative">
                            <Sparkles className="w-8 h-8 text-pink-500 fill-pink-500/20 rotate-12 group-hover:rotate-45 transition-transform duration-500 ease-out" />
                            <div className="absolute inset-0 bg-pink-400 blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-pulse"></div>
                            <Sparkles className="absolute inset-0 w-8 h-8 text-pink-300 rotate-12 group-hover:rotate-45 transition-transform duration-500 ease-out opacity-50 animate-ping" style={{ animationDuration: '3s' }} />
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-[length:200%_auto] animate-gradient-x font-sans drop-shadow-sm group-hover:drop-shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-all duration-300">
                            GLOWIFY
                        </span>
                    </Link>

                    {/* 1.5 Location / Deliver To (Flipkart Style) */}
                    <div
                        onClick={handleLocationClick}
                        className="hidden xl:flex flex-col leading-tight cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 px-2 py-1 rounded transition-colors group/location"
                    >
                        <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium ml-5 group-hover/location:text-primary">
                            {isLocating ? 'Locating...' : 'Deliver to'}
                        </span>
                        <div className="flex items-center gap-1 text-sm font-bold text-gray-700 dark:text-gray-200">
                            <MapPin size={16} className={`text-pink-500 ${isLocating ? 'animate-spin' : 'animate-bounce'}`} />
                            <span className="group-hover/location:text-primary transition-colors truncate max-w-[150px]">
                                {locationAddress}
                            </span>
                            <ChevronDown size={14} className="text-gray-400" />
                        </div>
                    </div>

                    {/* 2. Men/Women Section (Nav) */}
                    <div className="hidden lg:flex items-center space-x-2 flex-shrink-0">
                        {navLinks.map((item) => (
                            <Link
                                key={item.name}
                                to={item.link}
                                className={`px-6 py-2 rounded-full text-base font-bold tracking-wide transition-all duration-300 ${isActive(item.link)
                                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-md transform scale-105'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                                    } `}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* 3. Search Bar (Flex Grow) - Moved before Login/Cart */}
                    <div className="hidden md:flex relative group flex-grow max-w-2xl mx-4 transition-all duration-300">
                        <form onSubmit={searchHandler} className="w-full">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full bg-gray-100/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:border-primary/20 rounded-full py-3 pl-12 pr-6 text-sm font-medium text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:bg-white dark:focus:bg-gray-800 focus:shadow-lg focus:shadow-primary/5 transition-all"
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                            <div className="absolute left-4 top-3 text-gray-400 group-focus-within:text-primary transition-colors">
                                <Search size={20} />
                            </div>
                        </form>
                    </div>


                    {/* 4. Cart Button - Moved BEFORE Login */}
                    <div className="flex items-center space-x-4 flex-shrink-0">
                        {/* Theme Toggle */}
                        <button
                            onClick={() => dispatch(toggleTheme())}
                            className="p-3 rounded-full bg-gray-100/60 dark:bg-gray-800/60 text-gray-600 dark:text-yellow-400 hover:bg-white dark:hover:bg-gray-800 transition-all hover:shadow-md"
                        >
                            {mode === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
                        </button>

                        <Link to="/cart" className="relative p-3 bg-gray-100/60 dark:bg-gray-800/60 hover:bg-white dark:hover:bg-gray-800 hover:text-primary hover:shadow-md rounded-full text-gray-600 dark:text-gray-200 transition-all duration-300">
                            <ShoppingBag size={22} className="stroke-[2.5]" />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-bounce">
                                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                                </span>
                            )}
                        </Link>

                        {/* 5. Login Button (Placed AFTER Cart/Search as requested) */}
                        <div className="hidden md:flex items-center flex-shrink-0">
                            {userInfo ? (
                                <div className="relative group z-50">
                                    <button className="flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 p-1.5 pr-4 rounded-full border border-transparent hover:border-gray-100 dark:hover:border-gray-700 transition-all duration-300 group-hover:shadow-sm">
                                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 group-hover:bg-primary/10 dark:group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                                            <User size={22} className="stroke-[2]" />
                                        </div>
                                        <div className="hidden lg:flex flex-col items-start leading-tight">
                                            <span className="text-sm font-bold text-gray-700 dark:text-white">{userInfo.name.split(' ')[0]}</span>
                                        </div>
                                        <ChevronDown size={14} className="text-gray-400 dark:text-gray-500" />
                                    </button>
                                    {/* Dropdown */}
                                    <div className="absolute right-0 top-full pt-3 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 text-left z-50">
                                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden p-2 ring-1 ring-black/5">
                                            <div className="px-4 py-3 bg-gray-50/80 dark:bg-gray-700/50 rounded-xl mb-2">
                                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Signed in as</p>
                                                <p className="text-sm font-bold truncate text-gray-800 dark:text-gray-100">{userInfo.email}</p>
                                            </div>
                                            <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-pink-50 dark:hover:bg-gray-700 rounded-xl transition-colors">
                                                <User size={16} /> Profile & Orders
                                            </Link>
                                            {userInfo.isAdmin && (
                                                <>
                                                    <div className="h-px bg-gray-100 dark:bg-gray-700 my-1 mx-2"></div>
                                                    <p className="px-4 py-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-wider">Admin</p>
                                                    <Link to="/admin/userlist" className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">Users</Link>
                                                    <Link to="/admin/productlist" className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">Products</Link>
                                                    <Link to="/admin/orderlist" className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">Orders</Link>
                                                </>
                                            )}
                                            <div className="h-px bg-gray-100 dark:bg-gray-700 my-1 mx-2"></div>
                                            <button onClick={logoutHandler} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors">
                                                <LogOut size={16} /> Logout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link to="/login" className="bg-gray-900 text-white text-sm font-bold px-8 py-3 rounded-full hover:bg-primary transition-all shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5 whitespace-nowrap">
                                    Login
                                </Link>
                            )}
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </div>


            {/* Mobile Search (Conditional) */}
            <div className="md:hidden px-4 pb-4 pt-2">
                <form onSubmit={searchHandler} className="w-full relative group">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl py-3 pl-12 pr-4 text-sm font-medium text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all shadow-sm group-hover:shadow-md"
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <div className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-pink-500 transition-colors">
                        <Search size={20} />
                    </div>
                </form>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-[100] lg:hidden">
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setMobileMenuOpen(false)}></div>
                    <div className="fixed inset-y-0 right-0 w-[75%] max-w-[280px] bg-white dark:bg-[#0f172a] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col h-[100dvh] border-l border-gray-100 dark:border-gray-800">
                        {/* Header */}
                        <div className="p-5 flex items-center justify-between border-b border-gray-100 dark:border-white/5 bg-white dark:bg-[#0f172a] sticky top-0 z-10">
                            <span className="text-lg font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 uppercase">MENU</span>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors"
                                aria-label="Close Menu"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
                            {/* User Info Mobile */}
                            {userInfo ? (
                                <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-4 border border-gray-100 dark:border-white/5">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                            {userInfo.name.charAt(0)}
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="font-bold text-gray-900 dark:text-white truncate text-sm">{userInfo.name}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{userInfo.email}</p>
                                        </div>
                                    </div>

                                    <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors py-2 group">
                                        <User size={16} className="group-hover:stroke-pink-600 dark:group-hover:stroke-pink-400 transition-colors" />
                                        My Profile
                                    </Link>

                                    {userInfo.isAdmin && (
                                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-white/10 grid grid-cols-2 gap-2">
                                            <p className="col-span-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Admin Panel</p>
                                            <Link to="/admin/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-xs bg-white dark:bg-white/5 p-2 rounded-lg text-center hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:text-pink-600 dark:hover:text-pink-400 transition-colors border border-gray-100 dark:border-white/5">Dashboard</Link>
                                            <Link to="/admin/productlist" onClick={() => setMobileMenuOpen(false)} className="text-xs bg-white dark:bg-white/5 p-2 rounded-lg text-center hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:text-pink-600 dark:hover:text-pink-400 transition-colors border border-gray-100 dark:border-white/5">Products</Link>
                                            <Link to="/admin/orderlist" onClick={() => setMobileMenuOpen(false)} className="text-xs bg-white dark:bg-white/5 p-2 rounded-lg text-center hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:text-pink-600 dark:hover:text-pink-400 transition-colors border border-gray-100 dark:border-white/5">Orders</Link>
                                            <Link to="/admin/userlist" onClick={() => setMobileMenuOpen(false)} className="text-xs bg-white dark:bg-white/5 p-2 rounded-lg text-center hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:text-pink-600 dark:hover:text-pink-400 transition-colors border border-gray-100 dark:border-white/5">Users</Link>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 transition-all transform hover:-translate-y-0.5">
                                    <User size={18} /> Login / Register
                                </Link>
                            )}

                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">Shop Categories</p>
                                <div className="space-y-1">
                                    {navLinks.map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.link}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-200 font-medium transition-all group"
                                        >
                                            {item.name}
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-pink-500 transition-colors"></span>
                                        </Link>
                                    ))}
                                    <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-200 font-medium transition-all group">
                                        All Products
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-pink-500 transition-colors"></span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {userInfo && (
                            <div className="p-4 border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5">
                                <button onClick={() => { logoutHandler(); setMobileMenuOpen(false); }} className="flex items-center justify-center gap-2 w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-3 rounded-xl font-bold transition-colors text-sm">
                                    <LogOut size={18} /> Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
