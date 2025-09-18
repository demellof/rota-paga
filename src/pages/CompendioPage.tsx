import React from 'react';
import { compendioData } from '../data/compendioData';
import ChakraCard from '../components/compendio/ChakraCard';
import '../styles/compendio.css';

const CompendioPage: React.FC = () => {
    return (
        <div className="container mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
            <header className="text-center mb-10">
                <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-sky-400 mb-2">
                    Compêndio Sincrético
                </h1>
                <p className="text-xl text-cyan-100">Um Guia de Ervas, Cristais e Rituais para os 7 Pilares</p>
                <p className="mt-4 text-sm text-gray-400">Este guia une a sabedoria tradicional (usos energéticos e rituais) com o conhecimento científico (compostos ativos e benefícios estudados) para uma abordagem holística.</p>
            </header>

            <main>
                {compendioData.map(item => (
                    <ChakraCard key={item.id} item={item} />
                ))}
            </main>

            <footer className="text-center mt-12 text-gray-500 text-sm">
                <p>Este compêndio é uma ferramenta de apoio ao bem-estar e não substitui aconselhamento médico, psicológico ou nutricional profissional. Sempre consulte um profissional de saúde qualificado para tratar condições de saúde.</p>
            </footer>
        </div>
    );
};

export default CompendioPage;
