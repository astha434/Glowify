import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ProductEditScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('Male'); // Default
    const [gender, setGender] = useState('Unisex');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login');
        } else {
            const fetchProduct = async () => {
                const { data } = await axios.get(`/api/products/${id}`);
                setName(data.name);
                setPrice(data.price);
                setImage(data.image);
                setBrand(data.brand);
                setCategory(data.category);
                setGender(data.gender || 'Unisex');
                setCountInStock(data.countInStock);
                setDescription(data.description);
                setLoading(false);

                // If coming from "Add Male" button (we'll implement this logic later),
                // we might want to override. But for now, let's trust the fetch.
                // Or better, check query param to override if creating new? 
                // Since backend creates "Sample category", we might want to ignore that if we have a preference?
                const params = new URLSearchParams(location.search);
                const categoryParam = params.get('category');
                if (categoryParam) {
                    setCategory(categoryParam);
                }
            };
            fetchProduct();
        }
    }, [id, navigate, userInfo, location.search]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            await axios.put(
                `/api/products/${id}`,
                {
                    name,
                    price,
                    image,
                    brand,
                    category,
                    gender,
                    countInStock,
                    description,
                },
                config
            );
            navigate('/admin/productlist');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Link to="/admin/productlist" className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 mb-6 inline-flex items-center gap-2 font-medium transition-colors">
                <span>&larr;</span> Go Back
            </Link>
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900/60 dark:backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-white/10 transition-all duration-300">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white font-display">Edit Product</h1>
                {loading ? <div className="dark:text-white text-center">Loading...</div> : (
                    <form onSubmit={submitHandler} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide text-xs">Name</label>
                                <input
                                    type="text"
                                    className="block w-full px-4 py-3 border border-gray-200 dark:border-white/10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-white/5 dark:text-white transition-all"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide text-xs">Price</label>
                                <input
                                    type="number"
                                    className="block w-full px-4 py-3 border border-gray-200 dark:border-white/10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-white/5 dark:text-white transition-all"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide text-xs">Count In Stock</label>
                                <input
                                    type="number"
                                    className="block w-full px-4 py-3 border border-gray-200 dark:border-white/10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-white/5 dark:text-white transition-all"
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide text-xs">Image URL</label>
                                <input
                                    type="text"
                                    className="block w-full px-4 py-3 border border-gray-200 dark:border-white/10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-white/5 dark:text-white transition-all"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    placeholder="Enter image URL"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide text-xs">Brand</label>
                                <input
                                    type="text"
                                    className="block w-full px-4 py-3 border border-gray-200 dark:border-white/10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-white/5 dark:text-white transition-all"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide text-xs">Category</label>
                                <select
                                    className="block w-full px-4 py-3 border border-gray-200 dark:border-white/10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-white/5 dark:text-white transition-all"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="" className="dark:bg-gray-800">Select Category</option>
                                    <option value="Bangles" className="dark:bg-gray-800">Bangles</option>
                                    <option value="Fashion" className="dark:bg-gray-800">Fashion</option>
                                    <option value="Lockets" className="dark:bg-gray-800">Lockets</option>
                                    <option value="Home" className="dark:bg-gray-800">Home</option>
                                    <option value="Beauty" className="dark:bg-gray-800">Beauty</option>
                                    <option value="Ear Rings" className="dark:bg-gray-800">Ear Rings</option>
                                    <option value="Toys" className="dark:bg-gray-800">Toys</option>
                                    <option value="Finger Rings" className="dark:bg-gray-800">Finger Rings</option>
                                    <option value="Top Offers" className="dark:bg-gray-800">Top Offers</option>
                                    {/* Legacy Categories */}
                                    <option value="Male" className="dark:bg-gray-800">Male</option>
                                    <option value="Female" className="dark:bg-gray-800">Female</option>
                                    <option value="Kids" className="dark:bg-gray-800">Kids</option>
                                    <option value="Accessories" className="dark:bg-gray-800">Accessories</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide text-xs">Gender Category</label>
                                <select
                                    className="block w-full px-4 py-3 border border-gray-200 dark:border-white/10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-white/5 dark:text-white transition-all"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <option value="Unisex" className="dark:bg-gray-800">Unisex</option>
                                    <option value="Male" className="dark:bg-gray-800">Male</option>
                                    <option value="Female" className="dark:bg-gray-800">Female</option>
                                    <option value="Kids" className="dark:bg-gray-800">Kids</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-6">
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide text-xs">Description</label>
                            <textarea
                                className="block w-full px-4 py-3 border border-gray-200 dark:border-white/10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-white/5 dark:text-white transition-all min-h-[120px]"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all transform hover:-translate-y-0.5 uppercase tracking-wider mt-6"
                        >
                            Update Product
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ProductEditScreen;
