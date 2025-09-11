import React, { useState } from 'react';
import Header from './components/Header';
import NavBar from './components/NavBar';
import ContentSection from './components/ContentSection';
import AuthPage from './pages/AuthPage';
import { useAuth } from './context/AuthContext';
import JornadaSection from './components/JornadaSection';
import ServicesPage from './pages/ServicesPage';

// Data imports
import { pillarData, pillarZeroData } from './data/pillarData';
// ... other data imports can be added here as sections are built out

const App: React.FC = () => {
    const { currentUser, loading } = useAuth();
    const [activeSection, setActiveSection] = useState('main-section');

    const handleTabClick = (sectionId: string) => {
        setActiveSection(sectionId);
    };

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-[#1a1a1a] z-50">
                <div className="text-center p-8 rounded-lg">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#a37e2c] mx-auto mb-4"></div>
                    <p className="text-lg font-semibold font-cinzel text-[#a37e2c]">Despertando a Rota Pagã...</p>
                </div>
            </div>
        );
    }

    if (!currentUser) {
        return <AuthPage />;
    }

    return (
        <div id="app-container">
            <Header userDisplayName={<><strong>Guardião:</strong><br /><span className="text-xs text-gray-500">{currentUser.email}</span></>} />
            <NavBar activeSection={activeSection} onTabClick={handleTabClick} />

            <main className="container mx-auto p-4 md:p-8">
                <ContentSection id="main-section" isActive={activeSection === 'main-section'}>
                    <h2 className="text-2xl font-bold font-cinzel text-center text-[#c8a44d] mb-6">Os Sete Pilares da Ascensão</h2>
                    <div id="pillar-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="pillar-card rounded-lg p-4 text-center md:col-span-2 lg:col-span-4 cursor-pointer" data-pillar="zero">
                            <div className="text-3xl mb-2">{pillarZeroData.symbol}</div>
                            <h3 className="font-cinzel font-bold">{pillarZeroData.title}</h3>
                            <p className="text-xs text-gray-400">A Cosmovisão Sincrética</p>
                        </div>
                        {Object.keys(pillarData).map(key => {
                            const p = pillarData[key as keyof typeof pillarData];
                            return (
                                <div key={key} className="pillar-card rounded-lg p-4 text-center" data-pillar={key}>
                                    <div className="text-3xl mb-2">{p.title.split(' ')[0]}</div>
                                    <h3 className="font-cinzel font-bold">{p.title.split(' ').slice(2).join(' ')}</h3>
                                    <p className="text-xs text-gray-400">{p.chakra}</p>
                                </div>
                            );
                        })}
                    </div>
                </ContentSection>

                <ContentSection id="jornada-section" isActive={activeSection === 'jornada-section'}>
                    <JornadaSection />
                </ContentSection>

                <ContentSection id="consultas-section" isActive={activeSection === 'consultas-section'}>
                    <ServicesPage />
                </ContentSection>

                {/* Other sections can be added here */}

            </main>
        </div>
    );
};

export default App;
