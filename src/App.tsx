import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import AuthPage from './pages/AuthPage';

// Layout Components
import StarrySky from './components/layout/StarrySky';
import Sidebar from './components/layout/Sidebar';

// Page Components
import OraclePage from './pages/OraclePage';
import PillarsOverviewPage from './pages/PillarsOverviewPage';
import JornadaPage from './pages/JornadaPage';
import SigilosPage from './pages/SigilosPage';
import HerbarioPage from './pages/HerbarioPage';
import CristaisPage from './pages/CristaisPage';
import SoprosPage from './pages/SoprosPage';
import RodaDoAnoPage from './pages/RodaDoAnoPage';
import PanteaoPage from './pages/PanteaoPage';
import GaleriaPage from './pages/GaleriaPage';

const GuardiaoPage = () => <div className="content-card glass-effect"><h1 className="page-title">Guardião</h1></div>;


const App: React.FC = () => {
    const { currentUser, loading } = useAuth();
    const [activePage, setActivePage] = useState('page-oracle'); // Default to the new Oracle page

    const navigate = (pageId: string) => {
        setActivePage(pageId);
        // On mobile, close the sidebar after navigation
        const sidebar = document.getElementById('sidebar');
        if (window.innerWidth < 1024) {
            sidebar?.classList.add('-translate-x-full');
        }
    };

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-[#0f0524]">
                <div className="spinner" style={{ borderTopColor: '#fff' }}></div>
            </div>
        );
    }

    if (!currentUser) {
        return <AuthPage />;
    }

    const renderActivePage = () => {
        switch (activePage) {
            case 'page-oracle': return <OraclePage />;
            case 'page-pillars-overview': return <PillarsOverviewPage />;
            case 'page-jornada': return <JornadaPage />;
            case 'page-sigilos': return <SigilosPage />;
            case 'page-herbario': return <HerbarioPage />;
            case 'page-cristais': return <CristaisPage />;
            case 'page-sopros': return <SoprosPage />;
            case 'page-roda-do-ano': return <RodaDoAnoPage />;
            case 'page-panteao': return <PanteaoPage />;
            case 'page-galeria': return <GaleriaPage />;
            case 'page-guardiao': return <GuardiaoPage />;
            default: return <OraclePage />;
        }
    };

    return (
        <div className="relative">
            <StarrySky />
            <Sidebar navigate={navigate} activePage={activePage} />
            <main id="main-content" className="main-content p-4 pt-16 lg:pt-8 transition-all duration-300 ease-in-out">
                {renderActivePage()}
            </main>
        </div>
    );
};

export default App;
