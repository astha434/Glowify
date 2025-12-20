
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders } from '../redux/slices/orderSlice';
import { listProducts } from '../redux/slices/productSlice';
import { listUsers } from '../redux/slices/userListSlice';
import { DollarSign, ShoppingBag, Package, Users, TrendingUp, CreditCard } from 'lucide-react';

const AdminDashboardScreen = () => {
    const dispatch = useDispatch();

    const orderList = useSelector((state) => state.order);
    const { orders } = orderList;

    const productList = useSelector((state) => state.productList);
    const { products } = productList;

    const userList = useSelector((state) => state.userList);
    const { users } = userList;

    useEffect(() => {
        dispatch(listOrders());
        dispatch(listProducts());
        dispatch(listUsers());
    }, [dispatch]);

    // Calculate Stats
    const totalSales = orders ? orders.reduce((acc, order) => acc + order.totalPrice, 0) : 0;
    const totalOrders = orders ? orders.length : 0;
    const totalProducts = products ? products.length : 0;
    const totalUsers = users ? users.length : 0;
    const paidOrders = orders ? orders.filter(o => o.isPaid).length : 0;

    const StatCard = ({ title, value, icon: Icon, color, subtext }) => (
        <div className="bg-white dark:bg-gray-900/60 dark:backdrop-blur-xl rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 p-6 flex items-start justify-between hover:shadow-lg hover:transform hover:-translate-y-1 transition-all duration-300">
            <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">{title}</p>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white font-display mb-1">{value}</h3>
                {subtext && <p className="text-xs text-green-500 mt-1 flex items-center font-bold bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full w-fit">{subtext}</p>}
            </div>
            <div className={`p-3 rounded-xl shadow-lg ${color}`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
        </div>
    );

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 font-display">Dashboard Overview</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total Sales"
                    value={`₹${totalSales.toFixed(2)}`}
                    icon={DollarSign}
                    color="bg-gradient-to-br from-blue-500 to-blue-600 shadow-blue-500/30"
                    subtext="+12% from last month"
                />
                <StatCard
                    title="Total Orders"
                    value={totalOrders}
                    icon={ShoppingBag}
                    color="bg-gradient-to-br from-purple-500 to-purple-600 shadow-purple-500/30"
                    subtext={`${paidOrders} Paid Orders`}
                />
                <StatCard
                    title="Total Products"
                    value={totalProducts}
                    icon={Package}
                    color="bg-gradient-to-br from-orange-500 to-orange-600 shadow-orange-500/30"
                    subtext="Across 4 Categories"
                />
                <StatCard
                    title="Total Customers"
                    value={totalUsers}
                    icon={Users}
                    color="bg-gradient-to-br from-pink-500 to-pink-600 shadow-pink-500/30"
                    subtext="Active Users"
                />
            </div>

            {/* Recent Orders Preview */}
            <div className="bg-white dark:bg-gray-900/60 dark:backdrop-blur-xl rounded-2xl shadow-lg border border-gray-100 dark:border-white/10 overflow-hidden transition-all duration-300">
                <div className="p-6 border-b border-gray-100 dark:border-white/10 flex justify-between items-center bg-gray-50/50 dark:bg-white/5">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white font-display">Recent Orders</h2>
                    <Link to="/admin/orderlist" className="text-sm text-pink-600 dark:text-pink-400 font-bold hover:underline uppercase tracking-wider">View All</Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-white/5">
                        <thead className="bg-gray-50 dark:bg-white/5">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest text-[10px]">Order ID</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest text-[10px]">User</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest text-[10px]">Date</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest text-[10px]">Total</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest text-[10px]">Paid</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest text-[10px]">Delivered</th>
                            </tr>
                        </thead>
                        <tbody className="bg-transparent divide-y divide-gray-200 dark:divide-white/5">
                            {orders && orders.slice(0, 5).map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">#{order._id.substring(0, 8)}...</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{order.user && order.user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{order.createdAt && order.createdAt.substring(0, 10)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">₹{order.totalPrice}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {order.isPaid ? (
                                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">Paid</span>
                                        ) : (
                                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400">Pending</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {order.isDelivered ? (
                                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">Delivered</span>
                                        ) : (
                                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400">Processing</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardScreen;
