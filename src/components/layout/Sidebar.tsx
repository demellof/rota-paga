import React from 'react';

interface SidebarProps {
    navigate: (pageId: string) => void;
    activePage: string;
}

const navLinks = [
    { id: 'page-oracle', icon: 'ph-planet', label: 'Oráculo Astral', color: 'book-color-1' },
    { id: 'page-pillars-overview', icon: 'ph-books', label: 'Pilares (Dieta)', color: 'book-color-2' },
    { id: 'page-jornada', icon: 'ph-spiral', label: 'Jornada Florescer', color: 'book-color-3' },
    { id: 'page-sigilos', icon: 'ph-magic-wand', label: 'Forjador de Sigilos', color: 'book-color-4' },
    { id: 'page-herbario', icon: 'ph-flower-lotus', label: 'Herbário Sazonal', color: 'book-color-2' },
    { id: 'page-cristais', icon: 'ph-atom', label: 'Guia de Cristais', color: 'book-color-5' },
    { id: 'page-sopros', icon: 'ph-wind', label: 'Sopros de Vida', color: 'book-color-1' },
    { id: 'page-roda-do-ano', icon: 'ph-yin-yang', label: 'Roda do Ano', color: 'book-color-4' },
    { id: 'page-panteao', icon: 'ph-key', label: 'O Panteão', color: 'book-color-5' },
    { id: 'page-galeria', icon: 'ph-eye', label: 'Galeria Onírica', color: 'book-color-3' },
];

const accountLinks = [
     { id: 'page-guardiao', icon: 'ph-user-circle', label: 'O Guardião', color: 'book-color-2' },
];

const Sidebar: React.FC<SidebarProps> = ({ navigate, activePage }) => {

    // In a real app, this would come from useAuth()
    const userEmail = "leandromellof@gmail.com";

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, pageId: string) => {
        e.preventDefault();
        navigate(pageId);
    };

    const ElfVine = () => (
        <svg className="elf-vine" viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="0.5">
            <path d="M 50,5 C 40,5 40,15 30,15 S 20,5 10,5 M 50,5 C 60,5 60,15 70,15 S 80,5 90,5">
                <animate attributeName="d" values="M 50,5 C 40,5 40,15 30,15 S 20,5 10,5 M 50,5 C 60,5 60,15 70,15 S 80,5 90,5; M 50,10 C 40,10 40,20 30,20 S 20,10 10,10 M 50,10 C 60,10 60,20 70,20 S 80,10 90,10; M 50,5 C 40,5 40,15 30,15 S 20,5 10,5 M 50,5 C 60,5 60,15 70,15 S 80,5 90,5" dur="15s" repeatCount="indefinite" />
            </path>
            <path d="M 10,5 C 5,15 5,25 10,35 M 90,5 C 95,15 95,25 90,35">
                    <animate attributeName="d" values="M 10,5 C 5,15 5,25 10,35 M 90,5 C 95,15 95,25 90,35; M 10,5 C 8,15 8,25 10,35 M 90,5 C 92,15 92,25 90,35; M 10,5 C 5,15 5,25 10,35 M 90,5 C 95,15 95,25 90,35" dur="12s" repeatCount="indefinite" />
            </path>
        </svg>
    );

    return (
        <>
            <button id="menu-button" className="lg:hidden text-white glass-effect" onClick={() => {
                const sidebar = document.getElementById('sidebar');
                sidebar?.classList.toggle('-translate-x-full');
            }}>
                <i className="ph ph-list text-2xl"></i>
            </button>
            <aside id="sidebar" className="sidebar elf-shelf fixed top-0 left-0 w-72 h-screen pt-4 transform -translate-x-full lg:translate-x-0">
                <div className="h-full px-2 pb-4 overflow-y-auto">
                    <ElfVine />
                    <h1 className="brand-title text-3xl text-center py-2">
                        Rota Pagã
                    </h1>
                    <div style={{transform: 'rotate(180deg)'}}><ElfVine /></div>
                    <p className="text-center text-sm text-gray-400 mb-4 mt-2 px-4">{userEmail}</p>

                    <nav className="mt-4">
                        {navLinks.map(link => (
                             <a href="#" key={link.id} className={`book-link ${link.color} ${activePage === link.id ? 'active' : ''}`} onClick={(e) => handleLinkClick(e, link.id)}>
                                <i className={`ph-fill ${link.icon}`}></i> {link.label}
                            </a>
                        ))}

                        <div className="pt-4 mt-4 border-t border-gray-700/50">
                             {accountLinks.map(link => (
                                <a href="#" key={link.id} className={`book-link ${link.color} ${activePage === link.id ? 'active' : ''}`} onClick={(e) => handleLinkClick(e, link.id)}>
                                    <i className={`ph-fill ${link.icon}`}></i> {link.label}
                                </a>
                            ))}
                        </div>
                    </nav>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
