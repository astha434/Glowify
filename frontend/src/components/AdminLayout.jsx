
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, LogOut, Sparkles, Sun, Moon, Menu, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { toggleTheme } from '../redux/slices/themeSlice';

const AdminLayout = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const theme = useSelector((state) => state.theme);
    const { mode } = theme;

    const isActive = (path) => {
        return location.pathname === path || location.pathname.startsWith(`${path}/`);
    };

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        window.location.href = '/login';
    };

    const menuItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Products', path: '/admin/productlist', icon: Package },
        { name: 'Orders', path: '/admin/orderlist', icon: ShoppingCart },
        { name: 'Users', path: '/admin/userlist', icon: Users },
    ];

    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    return (
        <div className="flex h-screen font-sans transition-colors duration-300">
            {/* Desktop Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-900/60 dark:backdrop-blur-xl border-r border-gray-200 dark:border-white/10 hidden md:flex flex-col transition-all duration-300 shadow-xl z-20">
                <Link to="/" className="p-6 flex items-center gap-2 border-b border-gray-100 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <Sparkles className="w-8 h-8 text-pink-600 dark:text-pink-500" />
                    <span className="text-xl font-black tracking-tighter text-gray-800 dark:text-white font-display">GLOWIFY Admin</span>
                </Link>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all uppercase tracking-wide ${isActive(item.path)
                                ? 'bg-pink-50 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400 shadow-sm border border-pink-100 dark:border-pink-500/10'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                                }`}
                        >
                            <item.icon size={20} />
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/5 rounded-t-2xl mx-2 mb-2">
                    <button
                        onClick={() => dispatch(toggleTheme())}
                        className="w-full flex items-center gap-3 px-4 py-2 mb-2 text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-white/10 rounded-lg transition-colors"
                    >
                        {mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    </button>

                    <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-lg bg-white/50 dark:bg-black/20">
                        <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-600 dark:text-pink-400 font-bold text-xs ring-2 ring-white dark:ring-white/10">
                            {userInfo?.name?.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{userInfo?.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{userInfo?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={logoutHandler}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors border border-transparent hover:border-red-100 dark:hover:border-red-900/30"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setMobileMenuOpen(false)} />
                    <div className="fixed inset-y-0 left-0 w-72 bg-white dark:bg-[#0f172a] shadow-2xl transform transition-transform duration-300 flex flex-col border-r border-gray-200 dark:border-white/10">
                        <div className="p-6 flex items-center justify-between border-b border-gray-100 dark:border-white/10">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-6 h-6 text-pink-600" />
                                <span className="text-lg font-black tracking-tighter text-gray-800 dark:text-white">GLOWIFY Admin</span>
                            </div>
                            <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full">
                                <X size={24} />
                            </button>
                        </div>

                        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all uppercase tracking-wide ${isActive(item.path)
                                        ? 'bg-pink-50 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400 shadow-sm border border-pink-100 dark:border-pink-500/10'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                                        }`}
                                >
                                    <item.icon size={20} />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        <div className="p-4 border-t border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
                            <button
                                onClick={() => {
                                    dispatch(toggleTheme());
                                    setMobileMenuOpen(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2 mb-2 text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-white/10 rounded-lg transition-colors"
                            >
                                {mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                                {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
                            </button>
                            <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-lg bg-white/50 dark:bg-black/20">
                                <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-600 dark:text-pink-400 font-bold text-xs">
                                    {userInfo?.name?.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{userInfo?.name}</p>
                                </div>
                            </div>
                            <button
                                onClick={logoutHandler}
                                className="w-full flex items-center gap-3 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors bg-white dark:bg-white/5 shadow-sm"
                            >
                                <LogOut size={20} />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Header (Visible only on small screens) */}
            <div className="md:hidden fixed top-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-white/10 p-4 z-40 flex justify-between items-center transition-colors shadow-sm">
                <Link to="/" className="flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-pink-600" />
                    <span className="text-lg font-black tracking-tighter text-gray-800 dark:text-white">GLOWIFY Admin</span>
                </Link>
                <button
                    onClick={() => setMobileMenuOpen(true)}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors"
                >
                    <Menu size={24} />
                </button>
            </div>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative bg-gray-50 dark:bg-[#020617]">
                <div className="flex-1 overflow-y-auto p-4 md:p-8 pt-20 md:pt-8 scroll-smooth scrollbar-hide">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
