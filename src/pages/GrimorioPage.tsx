import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import StarrySky from '../components/layout/StarrySky';
import ContentPage from '../components/layout/ContentPage';
import SantuarioPage from './SantuarioPage';
import JornadaPage from './JornadaPage';
import PantaculosPage from './PantaculosPage';
import ForjadorPage from './ForjadorPage';
import PilaresDietaPage from './PilaresDietaPage';
import CompendioPage from './CompendioPage';
import SoprosPage from './SoprosPage';
import RodaDoAnoPage from './RodaDoAnoPage';
import PanteaoPage from './PanteaoPage';
import GaleriaPage from './GaleriaPage';
import OraclePage from './OraclePage';
import GuardiaoPage from './GuardiaoPage';

const GrimorioPage: React.FC = () => {
    const [activePage, setActivePage] = useState('page-santuario');

    const navigate = (pageId: string) => {
        setActivePage(pageId);
    };

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
        <div className="flex h-screen relative">
            <StarrySky />
            <Sidebar navigate={navigate} activePage={activePage} />
            <main className="flex-1 overflow-y-auto">
                <ContentPage>
                    {renderActivePage()}
                </ContentPage>
            </main>
        </div>
    );
};

export default GrimorioPage;
