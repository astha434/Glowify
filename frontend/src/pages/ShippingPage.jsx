import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../redux/slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';
import { MapPin, Phone, User, Plus, CheckCircle } from 'lucide-react';

const ShippingPage = () => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [fullName, setFullName] = useState(shippingAddress.fullName || '');
    const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber || '');
    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');

    // Modes: 'saved' (show card), 'edit' (show form)
    const [mode, setMode] = useState(shippingAddress.address ? 'saved' : 'edit');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ fullName, phoneNumber, address, city, postalCode, country }));
        navigate('/payment');
    };

    const deliverHereHandler = () => {
        navigate('/payment');
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <CheckoutSteps step1 step2 />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-8">
                {/* Left Side - Address Selection */}
                <div className="md:col-span-8 space-y-4">

                    {/* Saved Address Card */}
                    {mode === 'saved' && (
                        <div className="bg-white dark:bg-gray-900/60 dark:backdrop-blur-xl border border-blue-500 dark:border-blue-500/50 rounded-sm shadow-sm overflow-hidden transition-colors">
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 flex items-center justify-between border-b border-blue-100 dark:border-blue-800/30">
                                <div className="flex items-center gap-2">
                                    <div className="h-4 w-4 rounded-full bg-blue-600 flex items-center justify-center">
                                        <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
                                    </div>
                                    <h3 className="font-medium text-gray-800 dark:text-gray-100 uppercase text-sm tracking-wide">Deliver to this address</h3>
                                </div>
                                <button
                                    onClick={() => setMode('edit')}
                                    className="text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase hover:underline"
                                >
                                    Edit
                                </button>
                            </div>
                            <div className="p-6">
                                <div className="flex flex-col gap-1 mb-4">
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="font-bold text-gray-900 dark:text-white">{fullName || 'User'}</span>
                                        <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-0.5 rounded-full font-medium">HOME</span>
                                        <span className="text-gray-900 dark:text-white font-bold ml-2">{phoneNumber}</span>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                        {address}, {city}, {postalCode}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm uppercase font-medium mt-1">
                                        {city}, {country}
                                    </p>
                                </div>
                                <button
                                    onClick={deliverHereHandler}
                                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 text-sm uppercase shadow-sm rounded-sm transition-colors"
                                >
                                    Deliver Here
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Add New Address Form */}
                    {mode === 'edit' && (
                        <div className="bg-white dark:bg-gray-900/60 dark:backdrop-blur-xl p-6 rounded-sm shadow-md border border-gray-100 dark:border-white/10 transition-colors">
                            <h2 className="text-blue-600 dark:text-blue-400 font-bold uppercase text-sm mb-6 flex items-center gap-2">
                                <Plus size={16} /> Add New Address
                            </h2>

                            <form onSubmit={submitHandler} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="relative">
                                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1 block">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full p-3 border border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-white rounded-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            placeholder="Name"
                                        />
                                    </div>
                                    <div className="relative">
                                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1 block">Phone Number</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full p-3 border border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-white rounded-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            placeholder="10-digit mobile number"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1 block">Pincode</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full p-3 border border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-white rounded-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                            value={postalCode}
                                            onChange={(e) => setPostalCode(e.target.value)}
                                            placeholder="Pincode"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1 block">Locality</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full p-3 border border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-white rounded-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            placeholder="City"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1 block">Address (Area and Street)</label>
                                    <textarea
                                        required
                                        className="w-full p-3 border border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-white rounded-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors min-h-[80px]"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="Address area and street"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1 block">Country</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full p-3 border border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-white rounded-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        placeholder="Country"
                                    />
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 text-sm uppercase shadow-md rounded-sm transition-colors w-full md:w-auto"
                                    >
                                        Save and Deliver Here
                                    </button>
                                    {shippingAddress.address && (
                                        <button
                                            type="button"
                                            onClick={() => setMode('saved')}
                                            className="ml-0 md:ml-4 mt-4 md:mt-0 text-blue-600 dark:text-blue-400 font-bold uppercase text-sm hover:underline"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Add New Address Placeholder (when in saved mode) */}
                    {mode === 'saved' && (
                        <div
                            className="bg-white dark:bg-gray-900/60 dark:backdrop-blur-xl p-4 border border-gray-100 dark:border-white/10 shadow-sm flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-blue-600 dark:text-blue-400"
                            onClick={() => {
                                setFullName('');
                                setPhoneNumber('');
                                setAddress('');
                                setCity('');
                                setPostalCode('');
                                setCountry('');
                                setMode('edit');
                            }}
                        >
                            <Plus size={18} />
                            <span className="font-semibold text-sm uppercase">Add a new address</span>
                        </div>
                    )}

                </div>

                {/* Right Side - Price Details (Placeholder representation like Flipkart) */}
                <div className="md:col-span-4">
                    <div className="bg-white dark:bg-gray-900/60 dark:backdrop-blur-xl p-4 rounded-sm shadow-sm border border-gray-100 dark:border-white/10 transition-colors">
                        <h4 className="text-gray-500 dark:text-gray-400 font-bold uppercase text-sm mb-4 border-b border-gray-200 dark:border-white/10 pb-2">Price Details</h4>
                        <div className="space-y-3 text-sm text-gray-800 dark:text-gray-200">
                            <div className="flex justify-between">
                                <span>Price ({cart.cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                                <span>₹{cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-green-600 dark:text-green-400">
                                <span>Delivery Charges</span>
                                <span>Free</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg border-t border-dashed border-gray-200 dark:border-white/10 pt-3 mt-3">
                                <span>Total Amount</span>
                                <span>₹{cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-gray-500 text-xs">
                        <CheckCircle size={14} className="text-gray-400" />
                        Safe and Secure Payments. 100% Authentic products.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippingPage;
