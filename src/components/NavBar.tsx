import React from 'react';
import { useAuth } from '../context/AuthContext';

interface NavButtonProps {
    sectionId: string;
    activeSection: string;
    onClick: (sectionId: string) => void;
    icon: string;
    label: string;
    isPrimary?: boolean; // For styling login/logout differently
}

const NavButton: React.FC<NavButtonProps> = ({ sectionId, activeSection, onClick, icon, label, isPrimary = false }) => (
    <button
        className={`tab py-4 px-6 font-semibold transition-colors text-sm ${activeSection === sectionId ? 'active' : ''} ${isPrimary ? 'btn-primary rounded-md mx-2' : ''}`}
        onClick={() => onClick(sectionId)}
    >
        <i className={`${icon} mr-2`}></i>{label}
    </button>
);

interface NavBarProps {
    activeSection: string;
    onTabClick: (sectionId: string) => void;
}

const premiumNavItems = [
    { sectionId: 'main-section', icon: 'fas fa-home', label: 'Santuário' },
    { sectionId: 'compendio-section', icon: 'fas fa-scroll', label: 'Compêndio' },
    { sectionId: 'jornada-section', icon: 'fas fa-seedling', label: 'Jornada Florescer' },
    { sectionId: 'pranayama-section', icon: 'fas fa-wind', label: 'Sopros de Vida' },
    { sectionId: 'consultas-section', icon: 'fas fa-comments-dollar', label: 'Consultas' },
];

const publicNavItems = [
    { sectionId: 'home-section', icon: 'fas fa-door-open', label: 'Início' },
];

const NavBar: React.FC<NavBarProps> = ({ activeSection, onTabClick }) => {
    const { currentUser, logout } = useAuth();

    return (
        <nav id="main-nav" className="bg-[#222] flex flex-wrap justify-center items-center shadow-md p-2">
            {currentUser ? (
                <>
                    {premiumNavItems.map(item => (
                        <NavButton
                            key={item.sectionId}
                            sectionId={item.sectionId}
                            activeSection={activeSection}
                            onClick={onTabClick}
                            icon={item.icon}
                            label={item.label}
                        />
                    ))}
                    <button onClick={logout} className="btn-secondary py-2 px-4 rounded-lg text-sm ml-4">
                        <i className="fas fa-sign-out-alt mr-2"></i>Sair
                    </button>
                </>
            ) : (
                <>
                    {publicNavItems.map(item => (
                        <NavButton
                            key={item.sectionId}
                            sectionId={item.sectionId}
                            activeSection={activeSection}
                            onClick={onTabClick}
                            icon={item.icon}
                            label={item.label}
                        />
                    ))}
                    <NavButton
                        sectionId="auth-section"
                        activeSection={activeSection}
                        onClick={onTabClick}
                        icon="fas fa-sign-in-alt"
                        label="Login / Registrar"
                        isPrimary={true}
                    />
                </>
            )}
        </nav>
    );
};

export default NavBar;
