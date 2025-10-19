import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Mapeamento dos IDs de página antigos para as novas rotas
const pageIdToPath: { [key: string]: string } = {
    'page-santuario': '/santuario',
    'page-jornada': '/jornada',
    'page-pantaculos': '/pantaculos',
    'page-pilares': '/pilares-dieta',
    'page-compendio': '/compendio',
    'page-sopros': '/sopros',
    'page-roda': '/roda-do-ano',
    'page-panteao': '/panteao',
    'page-galeria': '/galeria',
    'page-oraculo': '/oracle',
    'page-forjador': '/forjador',
    'page-guardiao': '/guardiao',
};

const grimoireLinks = [
    { id: 'page-santuario', label: 'Santuário (Início)', color: 'book-color-1' },
    { id: 'page-jornada', label: 'Jornada Florescer', color: 'book-color-2' },
    { id: 'page-pantaculos', label: 'Pantáculos Planetários', color: 'book-color-3' },
    { id: 'page-pilares', label: 'Pilares da Dieta', color: 'book-color-4' },
    { id: 'page-compendio', label: 'Compêndio Sincrético', color: 'book-color-5' },
    { id: 'page-sopros', label: 'Sopros de Vida (Prana)', color: 'book-color-1' },
    { id: 'page-roda', label: 'A Roda do Ano', color: 'book-color-4' },
    { id: 'page-panteao', label: 'O Panteão', color: 'book-color-5' },
    { id: 'page-galeria', label: 'Galeria Onírica', color: 'book-color-3' },
];

const appLinks = [
    { id: 'page-oraculo', label: 'Oráculo Astral (API)', special: true },
    { id: 'page-forjador', label: 'Forjador de Sigilos' },
    { id: 'page-guardiao', label: 'O Guardião (Sobre)' },
];

const ElfVine: React.FC = () => (
    <svg width="30" height="40" viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-yellow-400 mx-auto">
        <path d="M50 130C50 130 50 99.5 50 90C40 85 10 75 10 50C10 25 40 15 50 10C50 0 50 0 50 0M50 130C50 130 50 99.5 50 90C60 85 90 75 90 50C90 25 60 15 50 10" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const Sidebar: React.FC = () => {
    const { logout } = useAuth();
    const location = useLocation(); // Hook para obter a localização atual

    return (
        <aside className="w-full md:w-72 bookshelf-bg p-5 overflow-y-auto shadow-lg flex-shrink-0 z-20">
            <div className="flex items-center justify-center space-x-2 mb-6">
                <ElfVine />
                <h1 className="text-3xl font-fantasy text-yellow-200">Rota Pagã</h1>
            </div>
            <div className="space-y-2">
                <h2 className="font-fantasy text-sm text-yellow-200/50 uppercase tracking-widest mb-2 px-3">O Grimório Virtual</h2>
                {grimoireLinks.map(link => (
                    <Link to={pageIdToPath[link.id]} key={link.id} className={`block book-spine font-fantasy text-lg p-3 rounded-md ${link.color} ${location.pathname === pageIdToPath[link.id] ? 'active' : ''}`}>
                        {link.label}
                    </Link>
                ))}
                <div className="border-t-4 border-stone-600 my-4 shadow-inner"></div>
                <h2 className="font-fantasy text-sm text-yellow-200/50 uppercase tracking-widest mb-2 px-3">A Rota Pagã (App)</h2>
                {appLinks.map(link => (
                     <Link to={pageIdToPath[link.id]} key={link.id} className={`block book-spine font-fantasy text-lg p-3 rounded-md ${link.special ? 'border-yellow-500 border-l-8' : ''} ${location.pathname === pageIdToPath[link.id] ? 'active' : ''}`}>
                        {link.label}
                    </Link>
                ))}
                 <a href="#" onClick={logout} className="block book-spine font-fantasy text-lg p-3 rounded-md">
                    Sair
                </a>
            </div>
        </aside>
    );
};

export default Sidebar;