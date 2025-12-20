
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slices/userSlice';
import { Mail, Lock, Loader, Sparkles, ArrowRight, Eye, EyeOff, User } from 'lucide-react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const sp = new URLSearchParams(location.search);
    const redirect = sp.get('redirect') || '/';

    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    return (
        <div className="flex-grow w-full flex items-center justify-center bg-gray-900 relative overflow-hidden font-sans">
            {/* Abstract Background Image */}
            <img
                src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Abstract Background"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
            />

            {/* Floating Shapes for Depth (Optional flair) */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

            {/* Glass Card */}
            <div className="relative z-10 w-full max-w-md p-8 sm:p-10 mx-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
                {/* Noise Texture Overlay for realism */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

                <div className="relative z-20 flex flex-col items-center">
                    {/* Brand Logo */}
                    <div className="mb-6 flex items-center gap-2">
                        <Sparkles className="w-8 h-8 text-white" />
                        <span className="text-2xl font-black tracking-tighter text-white">
                            GLOWIFY
                        </span>
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                    <p className="text-white/70 text-sm mb-8 text-center">Enter your details to access your account</p>

                    {error && (
                        <div className="w-full bg-red-500/20 border border-red-500/50 text-white px-4 py-3 rounded-xl mb-6 text-sm backdrop-blur-sm">
                            {error}
                        </div>
                    )}

                    <form className="w-full space-y-5" onSubmit={submitHandler}>
                        <div className="space-y-4">
                            <div className="group">
                                <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5 ml-1">
                                    Email
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-pink-400 group-focus-within:text-pink-300 transition-colors">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        className="block w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all duration-300"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5 ml-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-pink-400 group-focus-within:text-pink-300 transition-colors">
                                        <Lock className="h-5 w-5" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        className="block w-full pl-11 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all duration-300"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/50 hover:text-white transition-colors focus:outline-none"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center text-white/80 cursor-pointer hover:text-white transition-colors">
                                <input type="checkbox" className="form-checkbox h-4 w-4 text-pink-500 rounded border-white/30 bg-white/10 focus:ring-0 focus:ring-offset-0" />
                                <span className="ml-2">Remember me</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center py-4 px-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/30 transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent"
                        >
                            {loading ? <Loader className="h-5 w-5 animate-spin" /> : (
                                <>
                                    Sign In <ArrowRight className="ml-2 h-5 w-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-white/60 text-sm">
                        Don't have an account?{' '}
                        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="text-white font-bold hover:underline decoration-pink-500 decoration-2 underline-offset-4 transition-all">
                            Register for new user
                        </Link>
                    </div>

                    <div className="mt-6 text-center">
                        <button
                            type="button"
                            onClick={() => {
                                setEmail('admin@example.com');
                                setPassword('password123');
                            }}
                            className="text-white/70 hover:text-white text-sm font-medium flex items-center justify-center gap-2 mx-auto transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg border border-white/10"
                        >
                            <User className="w-4 h-4" />
                            Admin Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
