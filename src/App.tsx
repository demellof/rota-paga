import React, { useState } from 'react';
import Header from './components/Header';
import NavBar from './components/NavBar';
import ContentSection from './components/ContentSection';
import AuthPage from './pages/AuthPage';
import { useAuth } from './context/AuthContext';
import JornadaSection from './components/JornadaSection';
import ServicesPage from './pages/ServicesPage';
import SoprosDeVidaPage from './pages/SoprosDeVidaPage';
import HomePage from './pages/HomePage'; // Importar a HomePage
import PillarSection from './components/PillarSection'; // Importar PillarSection

// ... other data imports can be added here as sections are built out

const App: React.FC = () => {
    const { currentUser, loading } = useAuth();
    const [activeSection, setActiveSection] = useState('main-section');
    const [showAuth, setShowAuth] = useState(false); // Estado para mostrar a página de autenticação

    const handleTabClick = (sectionId: string) => {
        if (!currentUser && sectionId !== 'home-section') {
            setShowAuth(true); // Mostra a autenticação se o utilizador não estiver logado e clicar numa secção premium
        } else if (sectionId === 'auth-section') {
            setShowAuth(true);
        }
        else {
            setActiveSection(sectionId);
            setShowAuth(false);
        }
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

    // Se o utilizador não estiver autenticado e o showAuth for verdadeiro, mostramos a página de autenticação
    if (!currentUser && showAuth) {
        return <AuthPage />;
    }

    return (
        <div id="app-container">
            <Header userDisplayName={
                currentUser
                ? <><strong>Guardião:</strong><br /><span className="text-xs text-gray-500">{currentUser.email}</span></>
                : "Desperte o seu caminho"
            } />
            <NavBar activeSection={activeSection} onTabClick={handleTabClick} />

            <main className="container mx-auto p-4 md:p-8">
                {currentUser ? (
                    <>
                        <ContentSection id="main-section" isActive={activeSection === 'main-section'}>
                           <PillarSection />
                        </ContentSection>

                        <ContentSection id="jornada-section" isActive={activeSection === 'jornada-section'}>
                            <JornadaSection />
                        </ContentSection>

                        <ContentSection id="pranayama-section" isActive={activeSection === 'pranayama-section'}>
                            <SoprosDeVidaPage />
                        </ContentSection>

                        <ContentSection id="consultas-section" isActive={activeSection === 'consultas-section'}>
                            <ServicesPage />
                        </ContentSection>
                    </>
                ) : (
                    // Se não houver utilizador, mostramos a HomePage
                    <ContentSection id="home-section" isActive={true}>
                        <HomePage />
                    </ContentSection>
                )}
            </main>
        </div>
    );
};

export default App;
