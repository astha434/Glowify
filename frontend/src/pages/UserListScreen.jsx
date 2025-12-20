import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Trash2, Edit, Check, X } from 'lucide-react';
import { listUsers, deleteUser } from '../redux/slices/userListSlice';

const UserListScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userList = useSelector((state) => state.userList);
    const { loading, error, users, successDelete, deleteError } = userList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers());
        } else {
            navigate('/login');
        }
    }, [dispatch, navigate, userInfo, successDelete]); // Refetch on successDelete

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(id));
        }
    };

    return (
        <div className="bg-white dark:bg-gray-900/60 dark:backdrop-blur-xl rounded-2xl shadow-lg border border-gray-100 dark:border-white/10 overflow-hidden transition-all duration-300">
            <div className="p-6 border-b border-gray-100 dark:border-white/10 flex justify-between items-center bg-gray-50/50 dark:bg-white/5">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white font-display uppercase tracking-wide">Users</h2>
                <span className="text-xs font-bold bg-pink-100 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400 px-3 py-1 rounded-full uppercase tracking-wider">{users ? users.length : 0} Total</span>
            </div>

            {deleteError && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 p-4 mx-6 mt-4 rounded-lg text-sm font-medium border border-red-100 dark:border-red-900/30">
                    Error deleting user: {deleteError}
                </div>
            )}

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
                </div>
            ) : error ? (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 p-4 m-4 rounded-lg text-sm font-medium border border-red-100 dark:border-red-900/30">{error}</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-white/5">
                        <thead className="bg-gray-50 dark:bg-white/5">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest text-[10px]">ID</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest text-[10px]">Name</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest text-[10px]">Email</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest text-[10px]">Admin</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest text-[10px]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-transparent divide-y divide-gray-200 dark:divide-white/5">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 dark:text-gray-500 font-mono">#{user._id.substring(0, 8)}...</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white font-display">{user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        <a href={`mailto:${user.email}`} className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors">{user.email}</a>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        {user.isAdmin ? (
                                            <div className="flex justify-center">
                                                <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full">
                                                    <Check size={16} className="text-green-600 dark:text-green-400" />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex justify-center">
                                                <div className="bg-gray-100 dark:bg-gray-700/50 p-1 rounded-full opacity-50">
                                                    <X size={16} className="text-gray-400 dark:text-gray-500" />
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center justify-center gap-3">
                                            <Link to={`/admin/user/${user._id}/edit`} className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                                                <Edit size={16} />
                                            </Link>
                                            {!user.isAdmin && (
                                                <button
                                                    className="p-2 bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                                                    onClick={() => deleteHandler(user._id)}
                                                    disabled={loading}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserListScreen;
