import React from 'react';

const HerbarioPage: React.FC = () => {
    return (
        <section className="content-panel p-6">
            <h1 className="page-title text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Herbário Sazonal</h1>
            <p className="page-subtitle">Um guia sincrético de ervas encontradas no Brasil, organizadas por bioma.</p>
             <div className="content-card glass-effect">
                <h2 className="text-2xl font-bold mb-4 text-green-400">Bioma: Mata Atlântica</h2>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-white">Arruda (Ruta graveolens)</h3>
                    <div className="syncretic-box text-sm">
                        <strong>Uso Tradicional (Sincrético):</strong> A grande erva de proteção e banimento.
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HerbarioPage;
