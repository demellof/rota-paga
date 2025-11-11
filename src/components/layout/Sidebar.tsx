import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { navigationData } from '../../data/navigationData';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
    navigate: (pageId: string) => void;
    activePage: string;
}

const ElfVine: React.FC = () => (
    <svg width="30" height="40" viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-yellow-400 mx-auto">
        <path d="M50 130C50 130 50 99.5 50 90C40 85 10 75 10 50C10 25 40 15 50 10C50 0 50 0 50 0M50 130C50 130 50 99.5 50 90C60 85 90 75 90 50C90 25 60 15 50 10" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const Sidebar: React.FC<SidebarProps> = ({ navigate, activePage }) => {
    const { logout } = useAuth();
    const [openBook, setOpenBook] = useState('O GRIMÓRIO VIRTUAL');

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        e.preventDefault();
        const pageId = `page-${path.substring(1) || 'santuario'}`;
        navigate(pageId);
    };

    return (
        <aside className="w-full md:w-72 bg-gray-900 p-5 overflow-y-auto shadow-lg flex-shrink-0 z-20" style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/wood-pattern.png)'}}>
            <div className="flex items-center justify-center space-x-2 mb-6">
                <ElfVine />
                <h1 className="text-3xl font-fantasy text-yellow-200">Rota Pagã</h1>
            </div>
            <div className="space-y-2">
                {navigationData.map((book) => (
                    <div key={book.category}>
                        <div className="h-1 bg-black bg-opacity-20"></div>
                        <h2
                            className="book-spine font-fantasy text-lg p-3 rounded-md cursor-pointer text-yellow-400 hover:shadow-lg hover:shadow-yellow-400/50 transition-shadow"
                            onClick={() => setOpenBook(openBook === book.category ? '' : book.category)}
                        >
                            {book.category}
                        </h2>
                        <AnimatePresence>
                            {openBook === book.category && (
                                <motion.div
                                    className="ml-4"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    {book.pages.map((page) => (
                                        <a
                                            href="#"
                                            key={page.path}
                                            onClick={(e) => handleLinkClick(e, page.path)}
                                            className={`block p-2 rounded-md hover:bg-yellow-900/10 text-yellow-200 ${activePage === `page-${page.path.substring(1) || 'santuario'}` ? 'active' : ''}`}
                                        >
                                            {page.title}
                                        </a>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
                <div className="h-1 bg-black bg-opacity-20"></div>
                <a href="#" onClick={logout} className="book-spine font-fantasy text-lg p-3 rounded-md text-yellow-400 hover:shadow-lg hover:shadow-yellow-400/50 transition-shadow">
                    Sair
                </a>
            </div>
        </aside>
    );
};

export default Sidebar;
