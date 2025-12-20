import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminRoute from './components/AdminRoute';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import ProfilePage from './pages/ProfilePage';
import UserListScreen from './pages/UserListScreen';
import ProductListScreen from './pages/ProductListScreen';
import ProductEditScreen from './pages/ProductEditScreen';
import OrderListScreen from './pages/OrderListScreen';
import UserEditScreen from './pages/UserEditScreen';

import AdminLayout from './components/AdminLayout';
import AdminDashboardScreen from './pages/AdminDashboardScreen';
import CategoryShopPage from './pages/CategoryShopPage';

const FooterWithCondition = () => {
  const location = useLocation();
  if (location.pathname === '/login' || location.pathname === '/register' || location.pathname.startsWith('/admin')) {
    return null;
  }
  return <Footer />;
};

const HeaderWithCondition = () => {
  const location = useLocation();
  if (location.pathname === '/login' || location.pathname === '/register' || location.pathname.startsWith('/admin')) {
    return null;
  }
  return <Header />;
};

import GlobalBackground from './components/GlobalBackground';
import { useSelector } from 'react-redux';

function App() {
  const theme = useSelector((state) => state.theme);
  const { mode } = theme;

  React.useEffect(() => {
    const root = window.document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [mode]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-[#0B1120] transition-colors duration-300 relative selection:bg-pink-500 selection:text-white">
        <GlobalBackground />
        <HeaderWithCondition />
        <main className="flex-grow flex flex-col relative w-full">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search/:keyword" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/placeorder" element={<PlaceOrderPage />} />
            <Route path="/order/:id" element={<OrderPage />} />
            <Route path="/profile" element={<ProfilePage />} />

            {/* Admin Routes */}
            <Route element={<AdminRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin/dashboard" element={<AdminDashboardScreen />} />
                <Route path="/admin/userlist" element={<UserListScreen />} />
                <Route path="/admin/productlist" element={<ProductListScreen />} />
                <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
                <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
                <Route path="/admin/orderlist" element={<OrderListScreen />} />
                <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
              </Route>
            </Route>

            <Route path="/shop" element={<CategoryShopPage category="All" />} />
            <Route path="/collection/men" element={<CategoryShopPage category="Male" />} />
            <Route path="/collection/women" element={<CategoryShopPage category="Female" />} />
          </Routes>
        </main>
        <FooterWithCondition />
      </div>
    </Router>
  );
}

export default App;
