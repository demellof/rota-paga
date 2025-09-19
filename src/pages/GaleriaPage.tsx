import React from 'react';

const GaleriaPage: React.FC = () => {
    return (
        <>
            <h1 className="page-title text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-pink-400">Galeria Onírica</h1>
            <p className="page-subtitle">A Arte da Percepção: Conectando o Surrealismo à Jornada Interior.</p>

            <div className="content-card glass-effect">
                <h2 className="text-2xl font-bold mb-4 text-blue-300">René Magritte: O Mapa Não é o Território</h2>
                <p className="mb-4">Uma lição direta do <strong>Pilar da Luz (Percepção)</strong>. Magritte nos ensina que a <em>representação</em> de uma coisa não é a coisa em si. Nosso grimório busca nos dar o poder de redesenhar nossos mapas mentais.</p>
                <img src="https://placehold.co/600x400/0f0524/c7c8cc?text=Representação+Onírica+de+Magritte" alt="[Imagem de um cachimbo flutuando]" className="w-full rounded-lg mt-2 opacity-75 placeholder-img h-48" />
            </div>

            <div className="content-card glass-effect">
                <h2 className="text-2xl font-bold mb-4 text-yellow-400">Salvador Dalí: A Fluidez do Tempo</h2>
                <p className="mb-4">Uma exploração visual do <strong>Pilar da Mente (Finito & Infinito)</strong>. Dalí pintou a <em>experiência psicológica</em> do tempo, não o tempo do relógio. Nosso grimório é uma ferramenta para aprender a navegar nesse tempo interior.</p>
                <img src="https://placehold.co/600x400/0f0524/c7c8cc?text=Representação+Onírica+de+Dalí" alt="[Imagem de relógios derretendo]" className="w-full rounded-lg mt-2 opacity-75 placeholder-img h-48" />
            </div>
        </>
    );
};

export default GaleriaPage;
