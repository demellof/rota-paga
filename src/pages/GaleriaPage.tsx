import React from 'react';

const GaleriaPage: React.FC = () => {
    return (
        <section className="content-panel p-6">
            <h1 className="page-title text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-pink-400">Galeria Onírica</h1>
            <p className="page-subtitle">A Arte da Percepção: Conectando o Surrealismo à Jornada Interior.</p>

            <div className="content-card glass-effect mb-6">
                <h2 className="text-2xl font-bold mb-4 text-blue-300">René Magritte: O Mapa Não é o Território</h2>
                <p className="mb-4">Uma lição direta do <strong>Pilar da Luz (Percepção)</strong>. Magritte nos ensina que a <em>representação</em> de uma coisa não é a coisa em si. Nosso grimório busca nos dar o poder de redesenhar nossos mapas mentais.</p>
            </div>

            <div className="content-card glass-effect">
                <h2 className="text-2xl font-bold mb-4 text-yellow-400">Salvador Dalí: A Fluidez do Tempo</h2>
                <p className="mb-4">Uma exploração visual do <strong>Pilar da Mente (Finito & Infinito)</strong>. Dalí pintou a <em>experiência psicológica</em> do tempo, não o tempo do relógio. Nosso grimório é uma ferramenta para aprender a navegar nesse tempo interior.</p>
            </div>
        </section>
    );
};

export default GaleriaPage;
