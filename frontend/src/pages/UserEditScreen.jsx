import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const UserEditScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login');
        } else {
            const fetchUser = async () => {
                try {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${userInfo.token}`,
                        },
                    };
                    const { data } = await axios.get(`/api/users/${id}`, config);
                    setName(data.name);
                    setEmail(data.email);
                    setIsAdmin(data.isAdmin);
                    setLoading(false);
                } catch (err) {
                    setError('User not found or error loading data');
                    setLoading(false);
                }
            };
            fetchUser();
        }
    }, [id, navigate, userInfo]);

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
                `/api/users/${id}`,
                { name, email, isAdmin },
                config
            );
            navigate('/admin/userlist');
        } catch (error) {
            console.error(error);
            alert('Error updating user');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Link to="/admin/userlist" className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 mb-6 inline-flex items-center gap-2 font-medium transition-colors">
                <span>&larr;</span> Go Back
            </Link>
            <div className="max-w-md mx-auto bg-white dark:bg-gray-900/60 dark:backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-white/10 transition-all duration-300">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white font-display">Edit User</h1>
                {loading ? <div className="dark:text-white text-center">Loading...</div> : error ? <div className="text-red-500 text-center">{error}</div> : (
                    <form onSubmit={submitHandler} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide text-xs">Name</label>
                            <input
                                type="text"
                                className="block w-full px-4 py-3 border border-gray-200 dark:border-white/10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-white/5 dark:text-white transition-all"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide text-xs">Email Address</label>
                            <input
                                type="email"
                                className="block w-full px-4 py-3 border border-gray-200 dark:border-white/10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-white/5 dark:text-white transition-all"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center bg-gray-50 dark:bg-white/5 p-4 rounded-lg border border-gray-100 dark:border-white/5">
                            <input
                                id="isadmin"
                                type="checkbox"
                                className="h-5 w-5 text-pink-600 focus:ring-pink-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            />
                            <label htmlFor="isadmin" className="ml-3 block text-sm font-medium text-gray-900 dark:text-white cursor-pointer select-none">
                                Is Admin
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all transform hover:-translate-y-0.5 uppercase tracking-wider"
                        >
                            Update User
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UserEditScreen;
