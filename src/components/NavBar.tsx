import React from 'react';

interface NavButtonProps {
    sectionId: string;
    activeSection: string;
    onClick: (sectionId: string) => void;
    icon: string;
    label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ sectionId, activeSection, onClick, icon, label }) => (
    <button
        className={`tab py-4 px-6 font-semibold transition-colors text-sm ${activeSection === sectionId ? 'active' : ''}`}
        onClick={() => onClick(sectionId)}
    >
        <i className={`${icon} mr-2`}></i>{label}
    </button>
);

interface NavBarProps {
    activeSection: string;
    onTabClick: (sectionId: string) => void;
}

const navItems = [
    { sectionId: 'main-section', icon: 'fas fa-home', label: 'Santuário' },
    { sectionId: 'jornada-section', icon: 'fas fa-seedling', label: 'Jornada Florescer' },
    { sectionId: 'cosmograma-section', icon: 'fas fa-star', label: 'Cosmograma' },
    { sectionId: 'tomo-de-poder-section', icon: 'fas fa-book-dead', label: 'Tomo de Poder' },
    { sectionId: 'herbario-sazonal-section', icon: 'fas fa-leaf', label: 'Herbário Sazonal' },
    { sectionId: 'cristalopedia-arcana-section', icon: 'fas fa-gem', label: 'Cristalopedia Arcana' },
    { sectionId: 'chakra-section', icon: 'fas fa-atom', label: 'Centros de Poder' },
    { sectionId: 'pranayama-section', icon: 'fas fa-wind', label: 'Sopros de Vida' },
    { sectionId: 'consultas-section', icon: 'fas fa-comments-dollar', label: 'Consultas' },
];

const NavBar: React.FC<NavBarProps> = ({ activeSection, onTabClick }) => {
    return (
        <nav id="main-nav" className="bg-[#222] flex flex-wrap justify-center shadow-md">
            {navItems.map(item => (
                <NavButton
                    key={item.sectionId}
                    sectionId={item.sectionId}
                    activeSection={activeSection}
                    onClick={onTabClick}
                    icon={item.icon}
                    label={item.label}
                />
            ))}
        </nav>
    );
};

export default NavBar;
