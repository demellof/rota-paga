import React from 'react';
import { useAuth } from './context/AuthContext';
import AuthPage from './pages/AuthPage';

// Layout Components
import StarrySky from './components/layout/StarrySky';
import AudioPlayer from './components/layout/AudioPlayer';

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

    return (
        <div className="h-screen relative">
            <StarrySky />
            <button className="fixed top-4 left-4 z-50 p-2 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            <AudioPlayer />
        </div>
    );
};

export default App;
