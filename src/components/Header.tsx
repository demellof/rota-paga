import React from 'react';

interface HeaderProps {
    userDisplayName: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ userDisplayName }) => {
    return (
        <header className="bg-[#111] text-white p-6 text-center shadow-lg border-b-2 border-[#a37e2c]">
            <h1 className="text-3xl font-bold font-cinzel tracking-wider">Rota Pagã</h1>
            <p className="text-sm mt-2 text-gray-400">{userDisplayName}</p>
        </header>
    );
};

export default Header;
