import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layout Components
import StarrySky from './components/layout/StarrySky';
import Sidebar from './components/layout/Sidebar';

// Page Components
import HomePage from './pages/HomePage';
import HerbarioPage from './pages/HerbarioPage';
import RodaDoAnoPage from './pages/RodaDoAnoPage';
import PanteaoPage from './pages/PanteaoPage';
import JornadaPage from './pages/JornadaPage';
import CompendioPage from './pages/CompendioPage';
import SantuarioPage from './pages/SantuarioPage';
import CristaisPage from './pages/CristaisPage';
import PantaculosPage from './pages/PantaculosPage';
import ForjadorPage from './pages/ForjadorPage';
import PilaresDietaPage from './pages/PilaresDietaPage';
import SigilosPage from './pages/SigilosPage';
import GaleriaPage from './pages/GaleriaPage';
import OraclePage from './pages/OraclePage';
import AuthPage from './pages/AuthPage';
import SoprosPage from './pages/SoprosPage';
import GuardiaoPage from './pages/GuardiaoPage';

// Um layout para as páginas protegidas que inclui a Sidebar e o conteúdo principal
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex flex-col md:flex-row h-screen relative">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto h-full z-10">
            {children}
        </main>
    </div>
);

function App() {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-[#0f0524]">
                <div className="loader h-12 w-12 border-t-4 border-yellow-200 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <>
            <StarrySky />
            <Routes>
                {!currentUser ? (
                    // Se não houver usuário, a única rota é a de autenticação
                    <Route path="*" element={<AuthPage />} />
                ) : (
                    // Se houver usuário, renderiza as rotas da aplicação principal
                    <Route path="/*" element={
                        <MainLayout>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/herbario" element={<HerbarioPage />} />
                                <Route path="/roda-do-ano" element={<RodaDoAnoPage />} />
                                <Route path="/panteao" element={<PanteaoPage />} />
                                <Route path="/jornada" element={<JornadaPage />} />
                                <Route path="/compendio" element={<CompendioPage />} />
                                <Route path="/santuario" element={<SantuarioPage />} />
                                <Route path="/cristais" element={<CristaisPage />} />
                                <Route path="/pantaculos" element={<PantaculosPage />} />
                                <Route path="/forjador" element={<ForjadorPage />} />
                                <Route path="/pilares-dieta" element={<PilaresDietaPage />} />
                                <Route path="/sigilos" element={<SigilosPage />} />
                                <Route path="/galeria" element={<GaleriaPage />} />
                                <Route path="/oracle" element={<OraclePage />} />
                                <Route path="/sopros" element={<SoprosPage />} />
                                <Route path="/guardiao" element={<GuardiaoPage />} />
                                <Route path="*" element={<div>Página não encontrada</div>} />
                            </Routes>
                        </MainLayout>
                    } />
                )}
            </Routes>
        </>
    );
}

export default App;