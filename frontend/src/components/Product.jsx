import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cartAddItem } from '../redux/slices/cartSlice';
import { Heart, Star } from 'lucide-react';

const Product = ({ product }) => {
    const dispatch = useDispatch();

    const addToCartHandler = (e) => {
        e.preventDefault(); // Prevent navigation if clicked on button
        dispatch(cartAddItem({
            product: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            countInStock: product.countInStock,
            quantity: 1
        }));
    };

    return (
        <div className="group bg-white rounded-md overflow-hidden hover:shadow-[0_8px_16px_0_rgba(0,0,0,0.2)] transition-all duration-300 relative border border-gray-100 flex flex-col h-full">
            <Link to={`/product/${product._id}`} className="block relative flex-grow-0">
                <div className="relative overflow-hidden aspect-square p-4 flex items-center justify-center">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
            </Link>

            <div className="p-4 flex flex-col flex-grow">
                <Link to={`/product/${product._id}`} className="hover:text-primary transition-colors">
                    <h3 className="text-gray-800 font-medium text-sm line-clamp-2 leading-tight h-10 mb-1" title={product.name}>{product.name}</h3>
                </Link>

                <div className="flex items-center space-x-2 mb-2">
                    <div className="bg-green-700 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                        4.3 <Star size={8} fill="currentColor" />
                    </div>
                    <span className="text-xs text-gray-400 font-medium">(1,240)</span>
                </div>

                <div className="mt-auto">
                    <div className="flex items-center space-x-2 gap-1 flex-wrap">
                        <span className="font-bold text-lg text-gray-900">₹{product.price}</span>
                        <span className="text-gray-400 line-through text-xs">₹{Math.round(product.price * 1.2)}</span>
                        <span className="text-green-700 text-xs font-bold">20% off</span>
                    </div>
                    {product.countInStock > 0 ? (
                        <div className="text-[11px] text-green-700 font-medium mt-1">Free delivery</div>
                    ) : (
                        <div className="text-[11px] text-red-600 font-medium mt-1">Out of Stock</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Product;
