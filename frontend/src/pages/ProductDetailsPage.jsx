import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [qty, setQty] = useState(1);

    const productList = useSelector((state) => state.productList);
    const { loading, error, product } = productList;

    useEffect(() => {
        dispatch(listProductDetails(id));
    }, [dispatch, id]);

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const addToCartHandler = () => {
        if (!userInfo) {
            navigate('/login');
            return;
        }
        dispatch(addToCart({
            productId: product._id,
            quantity: qty
        }));
        navigate('/cart');
    };

    const buyNowHandler = async () => {
        if (!userInfo) {
            navigate('/login?redirect=/shipping');
            return;
        }
        await dispatch(addToCart({
            productId: product._id,
            quantity: qty
        }));
        navigate('/cart'); // Changed to go to cart first to ensure flow, or directly to shipping if preferred
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-600"></div>
        </div>
    );
    if (error) return (
        <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold">Error Loading Product</h3>
                <p>{error}</p>
                <Link to="/" className="text-sm underline mt-2 inline-block hover:text-red-800 dark:hover:text-red-300">Back to Home</Link>
            </div>
        </div>
    );
    if (!product) return null;

    return (
        <div className="min-h-screen py-8 transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6 max-w-5xl">

                {/* Breadcrumb */}
                <nav className="mb-6 flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
                    <Link to="/" className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors">Home</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900 dark:text-gray-200 line-clamp-1">{product.name}</span>
                </nav>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-8 md:gap-6">

                        {/* Image Section - Compact for Mobile */}
                        <div className="p-4 md:p-8 bg-gray-50 dark:bg-gray-700/30 flex items-center justify-center relative group h-[300px] md:h-auto">
                            <div className="absolute top-4 left-4 z-10">
                                <span className="bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-300 text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                                    {product.brand || 'Bestseller'}
                                </span>
                            </div>

                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal p-2 drop-shadow-md"
                            />
                        </div>

                        {/* Product Info Section - Compact & Scrollable if needed */}
                        <div className="p-5 md:p-8 flex flex-col justify-center">
                            <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white leading-tight mb-2 line-clamp-2">
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-1.5 py-0.5 rounded-md">
                                    <span className="text-yellow-500 text-xs">★★★★☆</span>
                                    <span className="text-[10px] font-bold text-yellow-700 dark:text-yellow-400 ml-1">4.5</span>
                                </div>
                                <span className="text-xs text-gray-500 dark:text-gray-400 border-l border-gray-200 dark:border-gray-600 pl-3">
                                    {product.numReviews} Reviews
                                </span>
                                <span className="text-xs text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">
                                    In Stock
                                </span>
                            </div>

                            <div className="flex items-baseline gap-2 mb-4">
                                <span className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">₹{product.price}</span>
                                <span className="text-sm text-gray-400 line-through">₹{Math.round(product.price * 1.4)}</span>
                                <span className="text-xs font-bold text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/20 px-2 py-1 rounded-md ml-1">
                                    30% OFF
                                </span>
                            </div>

                            <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-sm line-clamp-3 md:line-clamp-none">
                                <p>{product.description}</p>
                            </div>

                            <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                                {/* Action Buttons - Compact Grid */}
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div className="relative">
                                        <select
                                            value={qty}
                                            onChange={(e) => setQty(Number(e.target.value))}
                                            className="w-full appearance-none bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white py-3 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 font-bold text-sm"
                                        >
                                            {[...Array(product.countInStock || 0).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    Qty: {x + 1}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                                            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>

                                    <button
                                        onClick={addToCartHandler}
                                        className="w-full px-4 py-3 rounded-xl font-bold uppercase tracking-wide text-xs border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-1"
                                    >
                                        Add
                                    </button>
                                </div>

                                <button
                                    onClick={buyNowHandler}
                                    className="w-full px-4 py-3.5 rounded-xl font-bold uppercase tracking-wide text-sm bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-[1.01] transition-all active:scale-95 flex items-center justify-center gap-2"
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Trust Badges Footer (New Section inside the details block) */}
                    <div className="bg-gray-50 dark:bg-gray-700/30 border-t border-gray-100 dark:border-gray-700 p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                            <div className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm text-pink-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <span>Authentic</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                            <div className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm text-purple-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                            </div>
                            <span>Secure Payment</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                            <div className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm text-blue-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                            </div>
                            <span>Easy Returns</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                            <div className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm text-orange-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <span>Fast Delivery</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
