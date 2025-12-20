import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { User, Package, LogOut, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { logout } from '../redux/slices/userSlice';

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'settings'
    const [orders, setOrders] = useState([]);

    // User Info State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            setName(userInfo.name);
            setEmail(userInfo.email);

            const fetchOrders = async () => {
                try {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${userInfo.token}`,
                        },
                    };
                    const { data } = await axios.get('/api/orders/myorders', config);
                    setOrders(data);
                } catch (error) {
                    console.error("Error fetching orders:", error);
                }
            };
            fetchOrders();
        }
    }, [navigate, userInfo]);

    const logoutHandler = () => {
        dispatch(logout());
        navigate('/login');
    };

    const SidebarItem = ({ icon: Icon, label, active, onClick, isLogout }) => (
        <div
            onClick={onClick}
            className={`flex items-center gap-4 p-4 cursor-pointer transition-all duration-300 border-b border-gray-100 dark:border-white/5 last:border-0 rounded-lg mx-2 mb-1
            ${active ? 'bg-pink-50 dark:bg-pink-500/20 text-pink-600 dark:text-pink-300 font-bold shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'}
            ${isLogout ? 'text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10' : ''}
            `}
        >
            <Icon size={20} className={active ? 'text-pink-600 dark:text-pink-300' : isLogout ? 'text-gray-400 group-hover:text-red-500' : 'text-gray-400 dark:text-gray-500'} />
            <span className="flex-1">{label}</span>
            {!isLogout && <ChevronRight size={16} className={`text-gray-300 dark:text-gray-600 transition-transform ${active ? 'translate-x-1 text-pink-300' : ''}`} />}
        </div>
    );

    return (
        <div className="min-h-screen py-8 transition-colors duration-300 font-sans">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex flex-col md:flex-row gap-6">

                    {/* Sidebar */}
                    <div className="md:w-1/4 space-y-4">
                        {/* Hello User User Card */}
                        <div className="bg-white dark:bg-gray-900/60 dark:backdrop-blur-xl border border-gray-100 dark:border-white/10 p-5 rounded-2xl shadow-lg flex items-center gap-4 transition-all duration-300 hover:transform hover:scale-[1.02]">
                            <div className="w-12 h-12 bg-pink-100 dark:bg-pink-500/20 rounded-full flex items-center justify-center shadow-inner">
                                <User className="text-pink-600 dark:text-pink-400" size={24} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Hello,</p>
                                <h3 className="font-bold text-gray-800 dark:text-white line-clamp-1 font-display">{name}</h3>
                            </div>
                        </div>

                        {/* Navigation Menu */}
                        <div className="bg-white dark:bg-gray-900/60 dark:backdrop-blur-xl border border-gray-100 dark:border-white/10 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 py-2">
                            <SidebarItem
                                icon={Package}
                                label="My Orders"
                                active={activeTab === 'orders'}
                                onClick={() => setActiveTab('orders')}
                            />
                            <SidebarItem
                                icon={User}
                                label="Account Settings"
                                active={activeTab === 'settings'}
                                onClick={() => setActiveTab('settings')}
                            />
                            <div className="my-1 border-t border-gray-100 dark:border-white/10 mx-4"></div>
                            <SidebarItem
                                icon={LogOut}
                                label="Logout"
                                active={false}
                                onClick={logoutHandler}
                                isLogout
                            />
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:w-3/4">
                        {activeTab === 'orders' && (
                            <div className="space-y-4">
                                {orders.length === 0 ? (
                                    <div className="bg-white dark:bg-gray-900/60 dark:backdrop-blur-xl border border-gray-100 dark:border-white/10 p-12 rounded-2xl shadow-lg text-center transition-all duration-300 flex flex-col items-center">
                                        <div className="inline-block p-6 bg-gray-50 dark:bg-white/5 rounded-full mb-6 shadow-inner">
                                            <Package size={56} className="text-gray-300 dark:text-gray-500" />
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-200 text-xl font-bold mb-2">No orders found</p>
                                        <p className="text-gray-400 dark:text-gray-400 text-sm">Looks like you haven't placed any orders yet.</p>
                                    </div>
                                ) : (
                                    orders.map((order) => (
                                        <div key={order._id} className="bg-white dark:bg-gray-900/60 dark:backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-white/10 overflow-hidden group">
                                            {/* Order Header */}
                                            <div className="bg-gray-50/50 dark:bg-white/5 px-6 py-4 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-opacity-50">
                                                <div className="flex items-center gap-4">
                                                    <span className="bg-pink-600 text-white text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-widest shadow-lg shadow-pink-600/20">Order</span>
                                                    <span className="text-sm font-bold text-gray-700 dark:text-white tracking-wide">#{order._id.substring(0, 10).toUpperCase()}</span>
                                                </div>
                                                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                                    Placed on <span className="text-gray-800 dark:text-gray-300">{order.createdAt.substring(0, 10)}</span>
                                                </div>
                                            </div>

                                            {/* Order Items & Status */}
                                            <a href={`/order/${order._id}`} className="block p-6">
                                                <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                                                    {/* Items Preview */}
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-3">
                                                            {/* Show status dot */}
                                                            <div className={`w-3 h-3 rounded-full shadow-lg ${order.isDelivered ? 'bg-green-500 shadow-green-500/50' : 'bg-orange-500 shadow-orange-500/50'}`}></div>
                                                            <h4 className="font-bold text-gray-800 dark:text-white text-lg font-display">
                                                                {order.isDelivered ? 'Delivered' : 'Processing'}
                                                            </h4>
                                                        </div>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 pl-6 border-l-2 border-gray-100 dark:border-gray-700">
                                                            {order.isDelivered ? 'Your item has been delivered' : 'Your item is being processed'}
                                                        </p>

                                                        {/* Images Row */}
                                                        <div className="flex gap-3 mt-2 pl-6">
                                                            {order.orderItems && order.orderItems.slice(0, 3).map((item, index) => (
                                                                <div key={index} className="w-16 h-16 border border-gray-100 dark:border-white/10 rounded-lg bg-white dark:bg-white/5 flex items-center justify-center relative shadow-sm overflow-hidden p-1">
                                                                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                                                    {index === 2 && order.orderItems.length > 3 && (
                                                                        <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px] flex items-center justify-center text-white text-xs font-bold">
                                                                            +{order.orderItems.length - 3}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Price and Details button placeholder */}
                                                    <div className="text-right flex flex-col items-end gap-2">
                                                        <p className="text-xl font-bold text-gray-900 dark:text-white">₹{order.totalPrice}</p>
                                                        <span className="text-xs text-pink-600 dark:text-pink-400 font-bold uppercase tracking-wider hover:underline flex items-center gap-1 group-hover:gap-2 transition-all">View Details <ChevronRight size={12} /></span>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="bg-white dark:bg-gray-900/60 dark:backdrop-blur-xl rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-white/10 transition-all duration-300">
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 font-display border-b border-gray-100 dark:border-white/10 pb-4">Personal Information</h2>
                                <form className="space-y-6 max-w-2xl">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">First Name</label>
                                            <input
                                                type="text"
                                                value={name}
                                                disabled
                                                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-sm rounded-lg block p-3 cursor-not-allowed opacity-70"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Last Name</label>
                                            <input
                                                type="text"
                                                value="" // Assuming name is full name, separating is complex without logic. Leaving blank or "User"
                                                placeholder="User"
                                                disabled
                                                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-sm rounded-lg block p-3 cursor-not-allowed opacity-70"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            value={email}
                                            disabled
                                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-sm rounded-lg block p-3 cursor-not-allowed opacity-70"
                                        />
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
                                            To update your personal information, please <span className="text-blue-600 dark:text-blue-400 font-bold cursor-pointer hover:underline">contact support</span>.
                                        </p>
                                    </div>
                                </form>

                                <div className="mt-10 pt-8 border-t border-gray-100 dark:border-white/10 transition-colors">
                                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">FAQs</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">What happens when I update my email address (or mobile number)?</h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
