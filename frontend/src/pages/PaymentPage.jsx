import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../redux/slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('PayPal'); // Default

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart || {};

    useEffect(() => {
        if (!shippingAddress || !shippingAddress.address) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    if (!cart) {
        return <div className="p-4">Loading...</div>; // Handle case where cart state is not yet available
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <CheckoutSteps step1 step2 step3 />
            <div className="max-w-md mx-auto bg-white dark:bg-gray-900/60 dark:backdrop-blur-xl p-8 rounded-xl shadow-lg border border-gray-100 dark:border-white/10 transition-colors">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Payment Method</h1>
                <form onSubmit={submitHandler} className="space-y-6">
                    <div>
                        <legend className="text-base font-medium text-gray-900 dark:text-gray-200 mb-4">Select Method</legend>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <input
                                    id="PayPal"
                                    name="paymentMethod"
                                    type="radio"
                                    value="PayPal"
                                    checked={paymentMethod === 'PayPal'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="focus:ring-pink-500 h-4 w-4 text-pink-600 border-gray-300 dark:border-gray-600 bg-transparent"
                                />
                                <label htmlFor="PayPal" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    PayPal or Credit Card
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="Stripe"
                                    name="paymentMethod"
                                    type="radio"
                                    value="Stripe"
                                    checked={paymentMethod === 'Stripe'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="focus:ring-pink-500 h-4 w-4 text-pink-600 border-gray-300 dark:border-gray-600 bg-transparent"
                                />
                                <label htmlFor="Stripe" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Stripe
                                </label>
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                    >
                        Continue
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PaymentPage;
