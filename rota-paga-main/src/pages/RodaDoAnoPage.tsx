import React from 'react';

const RodaDoAnoPage: React.FC = () => {
    return (
        <section className="content-panel p-6">
            <h1 className="page-title text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">A Roda do Ano</h1>
            <p className="page-subtitle">Alinhando sua jornada com os ciclos Solares (Sabbaths) e Lunares (Esbats).</p>

            <div className="content-card glass-effect mb-6">
                <h2 className="text-2xl font-bold mb-4 text-yellow-300">O Calendário Solar (Sabbaths - Hemisfério Sul)</h2>
                <p className="mb-4 text-sm">Os Sabbaths marcam a jornada do Sol. Eles são baseados nos Solstícios e Equinócios.</p>
            </div>

            <div className="content-card glass-effect">
                <h2 className="text-2xl font-bold mb-4 text-cyan-300">O Calendário Lunar (Esbats)</h2>
                <p className="mb-4 text-sm">As fases da Lua guiam os rituais de manifestação e liberação.</p>
            </div>
        </section>
    );
};

export default RodaDoAnoPage;
