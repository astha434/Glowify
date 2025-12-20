import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../redux/slices/orderSlice';
import { clearCart, cartClearItems } from '../redux/slices/cartSlice';

const PlaceOrderPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);

    // Safety check just in case
    if (!cart) {
        return <div>Loading...</div>;
    }

    const orderCreate = useSelector((state) => state.order);
    const { order, success, error } = orderCreate;

    const { cartItems } = cart;

    // Calculate prices
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };

    const itemsPrice = cartItems ? addDecimals(
        cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    ) : 0;
    const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100);
    const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
    const totalPrice = (
        Number(itemsPrice) +
        Number(shippingPrice) +
        Number(taxPrice)
    ).toFixed(2);

    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}`);
            dispatch(cartClearItems()); // Clear local state immediately for visual feedback
            dispatch(clearCart());     // Clear backend cart
        }
        // eslint-disable-next-line
    }, [navigate, success, order]);

    const placeOrderHandler = () => {
        dispatch(
            createOrder({
                orderItems: cart.cartItems.map((item) => ({
                    product: item.product,
                    name: item.name,
                    image: item.image,
                    price: item.price,
                    qty: item.quantity
                })),
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: itemsPrice,
                shippingPrice: shippingPrice,
                taxPrice: taxPrice,
                totalPrice: totalPrice,
            })
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <CheckoutSteps step1 step2 step3 step4 />
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-2/3 space-y-8">
                    <div className="bg-white dark:bg-gray-900/60 dark:backdrop-blur-xl p-6 rounded-xl shadow-sm border border-gray-100 dark:border-white/10 transition-colors">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white border-b border-gray-100 dark:border-white/10 pb-2">Shipping</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            <strong className="text-gray-800 dark:text-white">Address: </strong>
                            {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                            {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-900/60 dark:backdrop-blur-xl p-6 rounded-xl shadow-sm border border-gray-100 dark:border-white/10 transition-colors">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white border-b border-gray-100 dark:border-white/10 pb-2">Payment Method</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            <strong className="text-gray-800 dark:text-white">Method: </strong>
                            {cart.paymentMethod}
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-900/60 dark:backdrop-blur-xl p-6 rounded-xl shadow-sm border border-gray-100 dark:border-white/10 transition-colors">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white border-b border-gray-100 dark:border-white/10 pb-2">Order Items</h2>
                        {cart.cartItems.length === 0 ? (
                            <div className="text-gray-500 dark:text-gray-400">Your cart is empty</div>
                        ) : (
                            <div className="space-y-4">
                                {cart.cartItems.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-4 last:border-0 last:pb-0">
                                        <div className="flex items-center space-x-4">
                                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                            <Link to={`/product/${item.product}`} className="font-medium text-pink-600 dark:text-pink-400 hover:underline">
                                                {item.name}
                                            </Link>
                                        </div>
                                        <div className="text-gray-600 dark:text-gray-400">
                                            {item.quantity} x ₹{item.price} = <span className="font-bold text-gray-800 dark:text-white">₹{(item.quantity * item.price).toFixed(2)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="md:w-1/3">
                    <div className="bg-white dark:bg-gray-900/60 dark:backdrop-blur-xl p-6 rounded-xl shadow-lg border border-gray-100 dark:border-white/10 sticky top-4 transition-colors">
                        <h2 className="text-xl font-bold mb-6 text-center text-gray-800 dark:text-white">Order Summary</h2>
                        <div className="space-y-3 text-gray-600 dark:text-gray-300">
                            <div className="flex justify-between">
                                <span>Items</span>
                                <span>₹{itemsPrice}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>₹{shippingPrice}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span>₹{taxPrice}</span>
                            </div>
                            <div className="border-t border-gray-200 dark:border-white/10 pt-3 flex justify-between font-bold text-lg text-gray-900 dark:text-white">
                                <span>Total</span>
                                <span>₹{totalPrice}</span>
                            </div>
                        </div>

                        {error && <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm">{error}</div>}

                        <button
                            type="button"
                            className="mt-6 w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-bold shadow-md transition disabled:opacity-50"
                            disabled={cart.cartItems.length === 0}
                            onClick={placeOrderHandler}
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrderPage;
