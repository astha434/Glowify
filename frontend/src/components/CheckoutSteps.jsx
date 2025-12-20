import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <nav className="flex items-center justify-center mb-8 w-full overflow-x-auto">
            <ol className="flex items-center w-full max-w-2xl text-xs sm:text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                <li className={`flex items-center ${step1 ? 'text-pink-600 dark:text-pink-400' : ''}`}>
                    <Link to="/login" className="flex items-center gap-1 sm:gap-2">
                        <span className={`flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full border ${step1 ? 'border-pink-600 bg-pink-50 dark:bg-pink-900/20 dark:border-pink-400' : 'border-gray-300 dark:border-gray-600'} shrink-0`}>
                            {step1 ? '✓' : '1'}
                        </span>
                        <span>Sign In</span>
                    </Link>
                </li>
                <li className="flex-1 border-b border-gray-200 dark:border-gray-700 mx-2 sm:mx-4"></li>
                <li className={`flex items-center ${step2 ? 'text-pink-600 dark:text-pink-400' : ''}`}>
                    <Link to="/shipping" className={`flex items-center gap-1 sm:gap-2 ${!step2 && 'pointer-events-none opacity-60'}`}>
                        <span className={`flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full border ${step2 ? 'border-pink-600 bg-pink-50 dark:bg-pink-900/20 dark:border-pink-400' : 'border-gray-300 dark:border-gray-600'} shrink-0`}>
                            {step2 ? '✓' : '2'}
                        </span>
                        <span>Shipping</span>
                    </Link>
                </li>
                <li className="flex-1 border-b border-gray-200 dark:border-gray-700 mx-2 sm:mx-4"></li>
                <li className={`flex items-center ${step3 ? 'text-pink-600 dark:text-pink-400' : ''}`}>
                    <Link to="/payment" className={`flex items-center gap-1 sm:gap-2 ${!step3 && 'pointer-events-none opacity-60'}`}>
                        <span className={`flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full border ${step3 ? 'border-pink-600 bg-pink-50 dark:bg-pink-900/20 dark:border-pink-400' : 'border-gray-300 dark:border-gray-600'} shrink-0`}>
                            {step3 ? '✓' : '3'}
                        </span>
                        <span>Payment</span>
                    </Link>
                </li>
                <li className="flex-1 border-b border-gray-200 dark:border-gray-700 mx-2 sm:mx-4"></li>
                <li className={`flex items-center ${step4 ? 'text-pink-600 dark:text-pink-400' : ''}`}>
                    <Link to="/placeorder" className={`flex items-center gap-1 sm:gap-2 ${!step4 && 'pointer-events-none opacity-60'}`}>
                        <span className={`flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full border ${step4 ? 'border-pink-600 bg-pink-50 dark:bg-pink-900/20 dark:border-pink-400' : 'border-gray-300 dark:border-gray-600'} shrink-0`}>
                            {step4 ? '✓' : '4'}
                        </span>
                        <span>Place Order</span>
                    </Link>
                </li>
            </ol>
        </nav>
    );
};

export default CheckoutSteps;
