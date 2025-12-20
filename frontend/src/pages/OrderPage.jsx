import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const OrderPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [order, setOrder] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState('');

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                const { data } = await axios.get(`/api/orders/${id}`, config);
                setOrder(data);
                setLoading(false);
            } catch (err) {
                setError(
                    err.response && err.response.data.message
                        ? err.response.data.message
                        : err.message
                );
                setLoading(false);
            }
        };

        if (userInfo) {
            fetchOrder();
        }
    }, [id, userInfo]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-6 md:py-8">
            <h1 className="text-xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white font-display uppercase tracking-widest border-b border-gray-200 dark:border-white/10 pb-4 block break-all">
                Order <span className="text-pink-600 dark:text-pink-400">#{order._id}</span>
            </h1>

            <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                <div className="lg:w-2/3 space-y-6 md:space-y-8">
                    {/* Shipping Info */}
                    <div className="bg-white dark:bg-gray-900/60 dark:backdrop-blur-xl p-5 md:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 transition-all duration-300">
                        <h2 className="text-lg md:text-xl font-bold mb-4 text-gray-800 dark:text-white border-b border-gray-100 dark:border-white/10 pb-2 uppercase tracking-wide">Shipping</h2>
                        <div className="space-y-2 text-sm md:text-base">
                            <p className="text-gray-600 dark:text-gray-300">
                                <strong className="text-gray-900 dark:text-white font-bold block md:inline md:w-24">Name: </strong> {order.user.name}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300">
                                <strong className="text-gray-900 dark:text-white font-bold block md:inline md:w-24">Email: </strong>
                                <a href={`mailto:${order.user.email}`} className="text-pink-600 dark:text-pink-400 hover:underline break-all">{order.user.email}</a>
                            </p>
                            <p className="text-gray-600 dark:text-gray-300">
                                <strong className="text-gray-900 dark:text-white font-bold block md:inline md:w-24">Address: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                            </p>
                        </div>
                        <div className="mt-4">
                            {order.isDelivered ? (
                                <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 p-3 rounded-xl border border-green-200 dark:border-green-900/50 font-bold text-center md:text-left">
                                    Delivered on {order.deliveredAt}
                                </div>
                            ) : (
                                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-xl border border-red-100 dark:border-red-900/30 font-bold text-center md:text-left">
                                    Not Delivered
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="bg-white dark:bg-gray-900/60 dark:backdrop-blur-xl p-5 md:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 transition-all duration-300">
                        <h2 className="text-lg md:text-xl font-bold mb-4 text-gray-800 dark:text-white border-b border-gray-100 dark:border-white/10 pb-2 uppercase tracking-wide">Payment Method</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm md:text-base">
                            <strong className="text-gray-900 dark:text-white font-bold">Method: </strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid ? (
                            <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 p-3 rounded-xl border border-green-200 dark:border-green-900/50 font-bold text-center md:text-left">
                                Paid on {order.paidAt}
                            </div>
                        ) : (
                            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-xl border border-red-100 dark:border-red-900/30 font-bold text-center md:text-left">
                                Not Paid
                            </div>
                        )}
                    </div>

                    {/* Order Items */}
                    <div className="bg-white dark:bg-gray-900/60 dark:backdrop-blur-xl p-5 md:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 transition-all duration-300">
                        <h2 className="text-lg md:text-xl font-bold mb-4 text-gray-800 dark:text-white border-b border-gray-100 dark:border-white/10 pb-2 uppercase tracking-wide">Order Items</h2>
                        {order.orderItems.length === 0 ? (
                            <div className="text-gray-500 dark:text-gray-400 italic">Order is empty</div>
                        ) : (
                            <div className="space-y-4">
                                {order.orderItems.map((item, index) => (
                                    <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 dark:border-white/5 pb-4 last:border-0 last:pb-0 gap-3">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-50 p-1 border border-gray-200 dark:border-white/10 shrink-0">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                            </div>
                                            <Link to={`/product/${item.product}`} className="font-bold text-sm md:text-base text-gray-900 dark:text-white hover:text-pink-600 dark:hover:text-pink-400 transition-colors line-clamp-2">
                                                {item.name}
                                            </Link>
                                        </div>
                                        <div className="text-gray-600 dark:text-gray-300 font-medium text-sm sm:text-right pl-20 sm:pl-0">
                                            {item.qty} x ₹{item.price} = <span className="font-bold text-gray-900 dark:text-white ml-1">₹{(item.qty * item.price).toFixed(2)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Summary Panel */}
                <div className="lg:w-1/3">
                    <div className="bg-white dark:bg-gray-900/60 dark:backdrop-blur-xl p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 sticky top-24 transition-all duration-300">
                        <h2 className="text-lg md:text-xl font-bold mb-6 text-center text-gray-800 dark:text-white font-display uppercase tracking-widest border-b border-gray-200 dark:border-white/10 pb-4">Order Summary</h2>
                        <div className="space-y-4 text-sm md:text-base text-gray-600 dark:text-gray-300">
                            <div className="flex justify-between items-center">
                                <span className="font-medium">Items</span>
                                <span className="font-bold text-gray-900 dark:text-white">₹{order.itemsPrice}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-medium">Shipping</span>
                                <span className="font-bold text-gray-900 dark:text-white">₹{order.shippingPrice}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-medium">Tax</span>
                                <span className="font-bold text-gray-900 dark:text-white">₹{order.taxPrice}</span>
                            </div>
                            <div className="border-t border-gray-200 dark:border-white/10 pt-4 flex justify-between font-bold text-lg text-gray-900 dark:text-white">
                                <span>Total</span>
                                <span className="text-pink-600 dark:text-pink-400">₹{order.totalPrice}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
