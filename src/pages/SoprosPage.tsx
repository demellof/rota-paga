import React from 'react';

const SoprosPage: React.FC = () => {
    return (
        <>
            <h1 className="page-title text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-400">Sopros de Vida</h1>
            <p className="page-subtitle">Guia de Pranayamas por Nível de Proficiência.</p>

            <div className="content-card glass-effect">
                <h2 className="text-2xl font-bold mb-4 text-green-400">Nível 1: Fundacional (Iniciante)</h2>
                <div className="mb-3">
                    <h3 className="text-lg font-semibold text-white">Dirga Pranayama (Respiração Completa)</h3>
                    <p className="text-sm"><strong>Efeito:</strong> Calmante/Base. Ensina o uso total da capacidade pulmonar.</p>
                </div>
                <div className="mb-3">
                    <h3 className="text-lg font-semibold text-white">Ujjayi Pranayama (Respiração Vitoriosa - Suave)</h3>
                    <p className="text-sm"><strong>Efeito:</strong> Calmante/Foco. Gera calor interno suave.</p>
                </div>
            </div>
            {/* Other levels would be here */}
        </>
    );
};

export default SoprosPage;
