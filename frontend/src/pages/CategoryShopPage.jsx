import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, ArrowRight, Zap, Check } from 'lucide-react';

const CategoryShopPage = ({ category }) => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    const navigate = useNavigate();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const [addedItems, setAddedItems] = useState({});

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

    const categoryProducts = category === 'All'
        ? products
        : (products ? products.filter((p) => p.category === category) : []);

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-600"></div>
        </div>
    );

    if (error) return (
        <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
            <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
        </div>
    );

    return (
        <div className="min-h-screen py-12 transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{category} Collection</h1>
                        <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <Link to="/" className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors">Home</Link>
                            <span className="mx-2">/</span>
                            <span className="text-gray-900 dark:text-gray-200">{category}</span>
                        </nav>
                    </div>
                </div>

                {categoryProducts.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <ShoppingBag className="mx-auto h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No products found</h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">We couldn't find any products in the {category} category.</p>
                        <Link to="/" className="inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full font-bold transition-all">
                            Continue Shopping <ArrowRight size={18} />
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                        {categoryProducts.map((product) => (
                            <Link key={product._id} to={`/product/${product._id}`} className="bg-white dark:bg-white/5 dark:backdrop-blur-md rounded-xl shadow-sm hover:shadow-2xl hover:shadow-pink-500/20 border border-gray-100 dark:border-white/10 hover:border-pink-500/30 dark:hover:border-pink-500/30 transition-all duration-500 group relative overflow-hidden flex flex-col">

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

                                    <div className="mt-auto flex items-end justify-between gap-2 mb-4">
                                        <div className="flex flex-col">
                                            <div className="flex items-baseline gap-1.5">
                                                <span className="text-lg font-bold text-gray-900 dark:text-white">₹{product.price}</span>
                                                <span className="text-xs text-gray-400 dark:text-white/40 line-through decoration-pink-500/30">₹{Math.round(product.price * 1.4)}</span>
                                            </div>
                                        </div>
                                        <span className="shrink-0 text-[10px] font-bold text-pink-600 bg-pink-50 dark:bg-pink-500/10 px-2 py-1 rounded-md uppercase tracking-wider border border-pink-100 dark:border-pink-500/20 group-hover:bg-pink-100 dark:group-hover:bg-pink-500/20 transition-colors">
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
                )}
            </div>
        </div>
    );
};

export default CategoryShopPage;
