import React from 'react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
    navigate: (pageId: string) => void;
    activePage: string;
}

const mainNavLinks = [
    { id: 'page-santuario', label: 'Santuário (Início)', color: 'book-color-1' },
    { id: 'page-jornada', label: 'Jornada Florescer', color: 'book-color-2' },
    { id: 'page-pantaculos', label: 'Pantáculos Planetários', color: 'book-color-3' },
    { id: 'page-forjador', label: 'O Forjador de Sigilos', color: 'book-color-4' },
    { id: 'page-pilares', label: 'Pilares da Dieta', color: 'book-color-2' },
    { id: 'page-compendio', label: 'Compêndio Sincrético', color: 'book-color-5' },
    { id: 'page-sopros', label: 'Sopros de Vida (Prana)', color: 'book-color-1' },
    { id: 'page-roda', label: 'A Roda do Ano', color: 'book-color-4' },
    { id: 'page-panteao', label: 'O Panteão', color: 'book-color-5' },
    { id: 'page-galeria', label: 'Galeria Onírica', color: 'book-color-3' },
];

const secondaryNavLinks = [
    { id: 'page-oraculo', label: 'Oráculo Astral (API)', color: 'border-yellow-500 border-l-8' },
    { id: 'page-guardiao', label: 'O Guardião (Sobre)', color: '' },
];

const ElfVine: React.FC = () => (
    <svg className="elf-vine" viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="0.5">
        <path d="M 50,5 C 40,5 40,15 30,15 S 20,5 10,5 M 50,5 C 60,5 60,15 70,15 S 80,5 90,5">
            <animate attributeName="d" values="M 50,5 C 40,5 40,15 30,15 S 20,5 10,5 M 50,5 C 60,5 60,15 70,15 S 80,5 90,5; M 50,10 C 40,10 40,20 30,20 S 20,10 10,10 M 50,10 C 60,10 60,20 70,20 S 80,10 90,10; M 50,5 C 40,5 40,15 30,15 S 20,5 10,5 M 50,5 C 60,5 60,15 70,15 S 80,5 90,5" dur="15s" repeatCount="indefinite" />
        </path>
        <path d="M 10,5 C 5,15 5,25 10,35 M 90,5 C 95,15 95,25 90,35">
                <animate attributeName="d" values="M 10,5 C 5,15 5,25 10,35 M 90,5 C 95,15 95,25 90,35; M 10,5 C 8,15 8,25 10,35 M 90,5 C 92,15 92,25 90,35; M 10,5 C 5,15 5,25 10,35 M 90,5 C 95,15 95,25 90,35" dur="12s" repeatCount="indefinite" />
        </path>
    </svg>
);


const Sidebar: React.FC<SidebarProps> = ({ navigate, activePage }) => {
    const { currentUser, logout } = useAuth();

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, pageId: string) => {
        e.preventDefault();
        navigate(pageId);
    };

    return (
        <aside id="sidebar" className="sidebar elf-shelf fixed top-0 left-0 w-full md:w-72 h-screen pt-4 transform -translate-x-full md:translate-x-0">
            <div className="h-full px-2 pb-4 overflow-y-auto">
                <ElfVine />
                <h1 className="brand-title text-3xl text-center py-2">Rota Pagã</h1>
                <div style={{transform: 'rotate(180deg)'}}><ElfVine /></div>
                <p className="text-center text-sm text-gray-400 mb-4 mt-2 px-4">{currentUser?.email}</p>

                <nav className="mt-4">
                    {mainNavLinks.map(link => (
                        <a href="#" key={link.id} className={`book-spine font-fantasy text-lg p-3 rounded-md ${link.color} ${activePage === link.id ? 'active' : ''}`} onClick={(e) => handleLinkClick(e, link.id)}>
                            {link.label}
                        </a>
                    ))}

                    <div className="border-t-4 border-stone-600 my-4 shadow-inner"></div>

                    {secondaryNavLinks.map(link => (
                         <a href="#" key={link.id} className={`book-spine font-fantasy text-lg p-3 rounded-md ${link.color} ${activePage === link.id ? 'active' : ''}`} onClick={(e) => handleLinkClick(e, link.id)}>
                            {link.label}
                        </a>
                    ))}
                    <a href="#" onClick={logout} className="book-spine font-fantasy text-lg p-3 rounded-md">
                        Sair
                    </a>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
