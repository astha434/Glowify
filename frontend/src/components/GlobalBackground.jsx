import React from 'react';

const GlobalBackground = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none hidden dark:block overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-500/30 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-blob"></div>
            <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-pink-500/30 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-blue-500/30 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
            <div className="absolute bottom-[-10%] right-[20%] w-96 h-96 bg-indigo-500/30 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
            <div className="absolute top-[40%] left-[40%] w-72 h-72 bg-fuchsia-500/25 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            <div className="absolute top-[20%] right-[30%] w-64 h-64 bg-cyan-500/25 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
        </div>
    );
};

export default GlobalBackground;
