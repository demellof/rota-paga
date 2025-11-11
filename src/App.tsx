import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import AuthPage from './pages/AuthPage';

// Layout Components
import StarrySky from './components/layout/StarrySky';

// Page Components
import GrimorioPage from './pages/GrimorioPage';

const App: React.FC = () => {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-[#0f0524]">
                <div className="loader h-12 w-12 border-t-4 border-yellow-200 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!currentUser) {
        return (
            <>
                <StarrySky />
                <AuthPage />
            </>
        );
    }

    return <GrimorioPage />;
};

export default App;
