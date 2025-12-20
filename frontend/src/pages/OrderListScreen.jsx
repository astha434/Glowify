import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders } from '../redux/slices/orderSlice';

const OrderListScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const orderList = useSelector((state) => state.order);
    const { loading, error, orders } = orderList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders());
        } else {
            navigate('/login');
        }
    }, [dispatch, navigate, userInfo]);

    return (
        <div className="bg-white dark:bg-gray-900/60 dark:backdrop-blur-xl rounded-2xl shadow-lg border border-gray-100 dark:border-white/10 overflow-hidden transition-all duration-300">
            <div className="p-6 border-b border-gray-100 dark:border-white/10 flex justify-between items-center bg-gray-50/50 dark:bg-white/5">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white font-display uppercase tracking-wide">Orders</h2>
                <span className="text-xs font-bold bg-pink-100 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400 px-3 py-1 rounded-full uppercase tracking-wider">{orders ? orders.length : 0} Total</span>
            </div>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
                </div>
            ) : error ? (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 p-4 m-4 rounded-lg text-sm font-medium border border-red-100 dark:border-red-900/30">{error}</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-white/5">
                        <thead className="bg-gray-50 dark:bg-white/5">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest text-[10px]">ID</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest text-[10px]">User</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest text-[10px]">Date</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest text-[10px]">Total</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest text-[10px]">Paid</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest text-[10px]">Delivered</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest text-[10px]">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-transparent divide-y divide-gray-200 dark:divide-white/5">
                            {orders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 dark:text-gray-500 font-mono">#{order._id.substring(0, 8)}...</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white font-display">{order.user && order.user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{order.createdAt.substring(0, 10)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">₹{order.totalPrice}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {order.isPaid ? (
                                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 border border-green-200 dark:border-green-900/50">Paid</span>
                                        ) : (
                                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 border border-red-200 dark:border-red-900/50">Pending</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {order.isDelivered ? (
                                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 border border-green-200 dark:border-green-900/50">Delivered</span>
                                        ) : (
                                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-900/50">Processing</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link to={`/order/${order._id}`} className="text-pink-600 dark:text-pink-400 hover:text-white hover:bg-pink-600 border border-pink-200 dark:border-pink-500/30 px-4 py-1.5 rounded-lg transition-all shadow-sm hover:shadow-md uppercase text-xs font-bold tracking-wider">Details</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OrderListScreen;
