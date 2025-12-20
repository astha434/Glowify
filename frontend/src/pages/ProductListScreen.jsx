import React, { useEffect, useState } from 'react'; // Added useState
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts, deleteProduct } from '../redux/slices/productSlice';
import axios from 'axios';

const ProductListScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [deleteConfirmId, setDeleteConfirmId] = useState(null); // Local state for confirmation

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, deleteSuccess } = productList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login');
        } else {
            dispatch(listProducts());
        }
    }, [dispatch, navigate, userInfo, deleteSuccess]);

    const maleProducts = products ? products.filter(p => p.category === 'Male') : [];
    const femaleProducts = products ? products.filter(p => p.category === 'Female') : [];
    const otherProducts = products ? products.filter(p => p.category !== 'Male' && p.category !== 'Female') : [];

    const deleteHandler = (id) => {
        if (deleteConfirmId === id) {
            // User confirmed
            console.log('Dispatching deleteProduct for:', id);
            dispatch(deleteProduct(id))
                .then((result) => {
                    if (result.meta.requestStatus === 'fulfilled') {
                        setDeleteConfirmId(null);
                        // Optional: Toast or small notification instead of blocking alert
                        console.log('Product deleted successfully');
                    } else {
                        console.error('Delete failed:', result.error);
                        alert(`Delete failed: ${result.payload || result.error.message}`);
                    }
                });
        } else {
            // First click - Ask for confirmation
            setDeleteConfirmId(id);
            // Auto-reset confirmation after 3 seconds
            setTimeout(() => {
                setDeleteConfirmId((prev) => (prev === id ? null : prev));
            }, 3000);
        }
    };

    const createProductHandler = async (category) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const { data } = await axios.post('/api/products', {}, config);
            navigate(`/admin/product/${data._id}/edit?category=${category}`);
        } catch (error) {
            alert(error.response && error.response.data.message ? error.response.data.message : error.message);
        }
    };

    const ProductTable = ({ products, title, category }) => (
        <div className="mb-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-gray-100 dark:border-white/10 pb-4 gap-4">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white font-display">{title}</h2>
                <button
                    className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 md:py-2.5 md:px-6 rounded-lg shadow-lg shadow-pink-600/20 transition-all flex items-center justify-center gap-2 font-bold uppercase tracking-wide text-xs hover:transform hover:-translate-y-0.5"
                    onClick={() => createProductHandler(category)}
                >
                    <span className="text-lg leading-none">+</span> Add {category} Product
                </button>
            </div>
            {products.length === 0 ? (
                <div className="bg-white dark:bg-gray-900/60 dark:backdrop-blur-xl rounded-2xl p-12 text-center border border-gray-100 dark:border-white/10">
                    <p className="text-gray-500 dark:text-gray-400 italic">No products in this category.</p>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white dark:bg-gray-900/60 dark:backdrop-blur-xl rounded-2xl shadow-lg border border-gray-100 dark:border-white/10 transition-all duration-300">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-white/5">
                        <thead className="bg-gray-50 dark:bg-white/5">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest text-[10px]">Image</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest text-[10px]">Name</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest text-[10px]">Price</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest text-[10px]">Brand</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest text-[10px]">Stock</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest text-[10px]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-transparent divide-y divide-gray-200 dark:divide-white/5">
                            {products.map((product) => (
                                <tr key={product._id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="h-12 w-12 rounded-lg bg-white p-1 border border-gray-100 dark:border-white/10 overflow-hidden">
                                            <img src={product.image} alt={product.name} className="h-full w-full object-contain" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white font-display">{product.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">₹{product.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{product.brand}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${product.countInStock > 0 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
                                            {product.countInStock}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link to={`/admin/product/${product._id}/edit`} className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-4 font-bold transition-colors">Edit</Link>
                                        <button
                                            onClick={() => deleteHandler(product._id)}
                                            className={`${deleteConfirmId === product._id
                                                ? 'bg-red-600 text-white px-3 py-1 rounded shadow-sm hover:bg-red-700'
                                                : 'text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300'
                                                } transition-all duration-200 font-bold`}
                                        >
                                            {deleteConfirmId === product._id ? 'Confirm?' : 'Delete'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10 text-center text-gray-900 dark:text-white font-display uppercase tracking-widest border-b border-gray-200 dark:border-white/10 pb-4 w-fit mx-auto">Product Management</h1>
            {loading ? <div>Loading...</div> : error ? <div className="text-red-500">{error}</div> : (
                <>
                    <ProductTable products={maleProducts} title="Male Collection" category="Male" />
                    <ProductTable products={femaleProducts} title="Female Collection" category="Female" />

                    {/* Other products section if needed */}
                    {otherProducts.length > 0 && (
                        <ProductTable products={otherProducts} title="Other Products" category="Unisex" />
                    )}
                </>
            )}
        </div>
    );
};

export default ProductListScreen;
