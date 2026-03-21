import React from 'react';

const SoprosPage: React.FC = () => {
    return (
        <section className="content-panel p-6">
            <h1 className="page-title text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-400">Sopros de Vida</h1>
            <p className="page-subtitle">Guia de Pranayamas por Nível de Proficiência.</p>

            <div className="content-card glass-effect mb-4">
                <h2 className="text-2xl font-bold mb-4 text-green-400">Nível 1: Fundacional (Iniciante)</h2>
                <div className="mb-3">
                    <h3 className="text-lg font-semibold text-white">Dirga Pranayama (Respiração Completa)</h3>
                    <p className="text-sm"><strong>Efeito:</strong> Calmante/Base. Ensina o uso total da capacidade pulmonar.</p>
                </div>
            </div>
             <div className="content-card glass-effect mb-4">
                <h2 className="text-2xl font-bold mb-4 text-yellow-400">Nível 2: Equilíbrio e Purificação (Intermediário)</h2>
                 <div className="mb-3">
                    <h3 className="text-lg font-semibold text-white">Nadi Shodhana (Narinas Alternadas)</h3>
                    <p className="text-sm"><strong>Efeito:</strong> Equilibrante/Calmante. Reduz ansiedade e equilibra os hemisférios.</p>
                </div>
            </div>
             <div className="content-card glass-effect">
                <h2 className="text-2xl font-bold mb-4 text-orange-400">Nível 3: Energização e Expansão (Avançado)</h2>
                <div className="warning-box text-sm">
                    <strong>Atenção:</strong> Estas técnicas devem ser praticadas com cautela e preferencialmente com orientação.
                </div>
            </div>
        </section>
    );
};

export default SoprosPage;
