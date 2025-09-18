import React from 'react';

interface HeaderProps {
    userDisplayName: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ userDisplayName }) => {
    return (
        <header className="bg-transparent text-white p-6 text-center border-b-2 border-[#8c7853]/50">
            <h1 className="text-5xl font-bold font-cinzel tracking-wider text-shadow" style={{ textShadow: '0 0 10px rgba(218, 165, 32, 0.7)' }}>Rota Pagã</h1>
            <div className="text-sm mt-2 text-gray-300">{userDisplayName}</div>
        </header>
    );
};

export default Header;
