import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import AuthPage from './pages/AuthPage';

// Layout Components
import StarrySky from './components/layout/StarrySky';
import Sidebar from './components/layout/Sidebar';

// Page Components
import SantuarioPage from './pages/SantuarioPage';
import JornadaPage from './pages/JornadaPage';
import PantaculosPage from './pages/PantaculosPage';
import ForjadorPage from './pages/ForjadorPage';
import PilaresDietaPage from './pages/PilaresDietaPage';
import CompendioPage from './pages/CompendioPage';
import SoprosPage from './pages/SoprosPage';
import RodaDoAnoPage from './pages/RodaDoAnoPage';
import PanteaoPage from './pages/PanteaoPage';
import GaleriaPage from './pages/GaleriaPage';
import OraclePage from './pages/OraclePage';
import GuardiaoPage from './pages/GuardiaoPage';

const App: React.FC = () => {
    const { currentUser, loading } = useAuth();
    const [activePage, setActivePage] = useState('page-santuario'); // Default to Santuario
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigate = (pageId: string) => {
        setActivePage(pageId);
        if (window.innerWidth < 768) {
            setIsMenuOpen(false);
        }
    };

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

    const renderActivePage = () => {
        switch (activePage) {
            case 'page-santuario': return <SantuarioPage />;
            case 'page-jornada': return <JornadaPage />;
            case 'page-pantaculos': return <PantaculosPage />;
            case 'page-forjador': return <ForjadorPage />;
            case 'page-pilares': return <PilaresDietaPage />;
            case 'page-compendio': return <CompendioPage />;
            case 'page-sopros': return <SoprosPage />;
            case 'page-roda': return <RodaDoAnoPage />;
            case 'page-panteao': return <PanteaoPage />;
            case 'page-galeria': return <GaleriaPage />;
            case 'page-oraculo': return <OraclePage />;
            case 'page-guardiao': return <GuardiaoPage />;
            default: return <SantuarioPage />;
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen relative">
            <StarrySky />

            <button
                className="md:hidden fixed top-4 left-4 z-50 p-2 glass-effect rounded-md"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <i className="ph ph-list text-2xl text-white"></i>
            </button>

            <div className={`fixed md:relative top-0 left-0 h-full z-40 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <Sidebar navigate={navigate} activePage={activePage} />
            </div>

            <main className="flex-1 p-4 md:p-8 overflow-y-auto h-full z-10">
                {renderActivePage()}
            </main>
        </div>
    );
};

export default App;
