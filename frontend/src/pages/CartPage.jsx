import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Trash2, Minus, Plus, ShieldCheck } from 'lucide-react';
import { removeFromCart, addToCart, fetchCart } from '../redux/slices/cartSlice';

const CartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    React.useEffect(() => {
        if (userInfo) {
            dispatch(fetchCart());
        }
    }, [dispatch, userInfo]);

    // Calculations
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const totalMRP = cartItems.reduce((acc, item) => acc + item.quantity * (item.price * 1.25), 0);
    const discount = totalMRP - totalPrice;
    const deliveryCharges = totalPrice > 500 ? 0 : 40;
    const finalAmount = totalPrice + deliveryCharges;

    const checkoutHandler = () => {
        if (userInfo) {
            navigate('/shipping');
        } else {
            navigate('/login?redirect=/shipping');
        }
    }

    const updateQuantity = (item, newQty) => {
        if (newQty > 0 && newQty <= item.countInStock) {
            const diff = newQty - item.quantity;
            dispatch(addToCart({
                productId: item.product,
                quantity: diff
            }));
        }
    }

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }

    return (
        <div className="min-h-screen py-8 pb-24 font-sans transition-colors duration-300">
            <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-6">

                    {/* Left: Cart Items */}
                    <div className="lg:w-[70%] space-y-4">
                        {/* Header Section */}
                        <div className="bg-white dark:bg-gray-900/60 dark:backdrop-blur-xl border border-gray-100 dark:border-white/10 p-4 shadow-sm rounded-xl flex justify-between items-center transition-all duration-300">
                            <h1 className="text-lg font-bold text-gray-800 dark:text-white font-display">Shopping Cart ({totalItems})</h1>
                        </div>

                        {cartItems.length === 0 ? (
                            <div className="bg-white dark:bg-gray-900/60 dark:backdrop-blur-xl border border-gray-100 dark:border-white/10 p-12 text-center rounded-xl shadow-lg flex flex-col items-center transition-all duration-300">
                                <img
                                    src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
                                    alt="Empty Cart"
                                    className="w-48 mb-6 opacity-80 dark:opacity-60 invert dark:invert-0"
                                />
                                <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">Your cart is empty!</h2>
                                <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">Add items to it now.</p>
                                <Link to="/shop" className="bg-pink-600 hover:bg-pink-700 text-white px-16 py-3 rounded-full text-sm font-bold shadow-lg hover:shadow-pink-600/30 transition-all transform hover:-translate-y-1">
                                    Shop Now
                                </Link>
                            </div>
                        ) : (
                            <div className="bg-white dark:bg-gray-900/60 dark:backdrop-blur-xl border border-gray-100 dark:border-white/10 shadow-lg rounded-xl overflow-hidden transition-all duration-300">
                                {cartItems.map((item) => (
                                    <div key={item.product} className="p-6 flex flex-col sm:flex-row gap-6 border-b border-gray-100 dark:border-white/5 last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                        {/* Image */}
                                        <div className="w-28 h-28 flex-shrink-0 mx-auto sm:mx-0 bg-white rounded-lg p-2 border border-gray-100 dark:border-white/10 shadow-sm">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                        </div>

                                        {/* Details */}
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <Link to={`/product/${item.product}`} className="font-bold text-gray-800 dark:text-gray-100 hover:text-pink-600 dark:hover:text-pink-400 transition line-clamp-2 text-base mb-1 font-display">
                                                        {item.name}
                                                    </Link>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-3 font-medium">Seller: RetailNet</div>

                                                    <div className="flex items-baseline gap-3 mb-4">
                                                        <span className="text-gray-400 dark:text-gray-500 line-through text-sm">₹{Math.round(item.price * 1.25)}</span>
                                                        <span className="text-lg font-bold text-gray-900 dark:text-white">₹{item.price}</span>
                                                        <span className="text-green-600 dark:text-green-400 text-sm font-bold bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">20% Off</span>
                                                    </div>
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400 text-right hidden sm:block">
                                                    Delivery by <span className="text-gray-900 dark:text-gray-200 font-bold">Sun Nov 19</span> | <span className="text-green-600 dark:text-green-400 font-medium">Free</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-6 mt-2">
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => updateQuantity(item, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                        className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 transition-all hover:scale-110 active:scale-95"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <input
                                                        type="text"
                                                        value={item.quantity}
                                                        readOnly
                                                        className="w-12 text-center bg-transparent text-gray-900 dark:text-white font-bold text-sm focus:outline-none"
                                                    />
                                                    <button
                                                        onClick={() => updateQuantity(item, item.quantity + 1)}
                                                        disabled={item.quantity >= item.countInStock}
                                                        className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 transition-all hover:scale-110 active:scale-95"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCartHandler(item.product)}
                                                    className="font-bold text-gray-500 dark:text-gray-400 text-sm hover:text-red-500 dark:hover:text-red-400 uppercase tracking-wide transition-colors flex items-center gap-1 group"
                                                >
                                                    <Trash2 size={14} className="group-hover:stroke-red-500 transition-colors" /> Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="p-4 flex justify-end sm:hidden bg-gray-50 dark:bg-white/5 border-t border-gray-100 dark:border-white/10">
                                    <button
                                        onClick={checkoutHandler}
                                        className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-xl font-bold shadow-lg uppercase tracking-wide transition-all"
                                    >
                                        Place Order
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Mobile Sticky Place Order */}
                        {cartItems.length > 0 && (
                            <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200 dark:border-white/10 p-4 shadow-2xl lg:hidden z-50 flex justify-between items-center transition-all">
                                <div>
                                    <span className="text-gray-500 dark:text-gray-400 text-xs line-through block">₹{Math.round(totalMRP)}</span>
                                    <span className="text-gray-900 dark:text-white font-bold text-xl">₹{finalAmount}</span>
                                </div>
                                <button
                                    onClick={checkoutHandler}
                                    className="bg-pink-600 text-white px-8 py-3 rounded-full font-bold shadow-lg uppercase tracking-wide hover:scale-105 transition-transform"
                                >
                                    Place Order
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Right: Price Details */}
                    {cartItems.length > 0 && (
                        <div className="lg:w-[30%]">
                            <div className="bg-white dark:bg-gray-900/60 dark:backdrop-blur-xl border border-gray-100 dark:border-white/10 shadow-lg rounded-xl sticky top-24 overflow-hidden transition-all duration-300">
                                <div className="p-5 border-b border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
                                    <h2 className="text-gray-500 dark:text-gray-400 font-bold uppercase text-xs tracking-wider">Price Details</h2>
                                </div>

                                <div className="p-5 space-y-4">
                                    <div className="flex justify-between text-base font-medium">
                                        <span className="text-gray-600 dark:text-gray-300">Price ({totalItems} items)</span>
                                        <span className="text-gray-900 dark:text-white">₹{Math.round(totalMRP)}</span>
                                    </div>
                                    <div className="flex justify-between text-base font-medium">
                                        <span className="text-gray-600 dark:text-gray-300">Discount</span>
                                        <span className="text-green-600 dark:text-green-400">- ₹{Math.round(discount)}</span>
                                    </div>
                                    <div className="flex justify-between text-base font-medium">
                                        <span className="text-gray-600 dark:text-gray-300">Delivery Charges</span>
                                        <span className="text-green-600 dark:text-green-400">{deliveryCharges === 0 ? 'Free' : `₹${deliveryCharges}`}</span>
                                    </div>

                                    <div className="border-t border-dashed border-gray-200 dark:border-gray-600 my-4 pt-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-bold text-gray-900 dark:text-white font-display">Total Amount</span>
                                            <span className="text-lg font-bold text-gray-900 dark:text-white">₹{finalAmount}</span>
                                        </div>
                                    </div>

                                    <div className="text-green-600 dark:text-green-400 font-bold text-sm border-t border-dashed border-gray-200 dark:border-gray-600 pt-3 flex items-center gap-2">
                                        <ShieldCheck size={16} /> You will save ₹{Math.round(discount)} on this order
                                    </div>
                                </div>

                                {/* Desktop Button */}
                                <div className="p-5 border-t border-gray-100 dark:border-white/10 hidden lg:block bg-gray-50/50 dark:bg-white/5">
                                    <button
                                        onClick={checkoutHandler}
                                        className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3.5 rounded-xl font-bold uppercase shadow-lg hover:shadow-pink-600/40 transition-all text-sm tracking-widest transform hover:-translate-y-0.5"
                                    >
                                        Place Order
                                    </button>
                                </div>
                                <div className="p-4 flex items-center gap-3 justify-center text-gray-500 dark:text-gray-400 text-xs opacity-70 bg-gray-50 dark:bg-white/5 border-t border-gray-100 dark:border-white/10">
                                    <ShieldCheck size={18} />
                                    <span className="font-medium">Safe and Secure Payments. 100% Authentic products.</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartPage;
