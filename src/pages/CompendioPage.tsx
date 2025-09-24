import React from 'react';

const compendioItems = [
    { id: 'muladhara', chakra: "1. Muladhara (Raiz)", tema: "Aterramento", ritual: "Banho de Descarrego (Sal Grosso + Arruda)" },
    { id: 'svadhisthana', chakra: "2. Svadhisthana (Sacral)", tema: "Fluidez", ritual: "Chá de Camomila e Erva-Cidreira" },
    { id: 'manipura', chakra: "3. Manipura (Plexo Solar)", tema: "Vontade", ritual: "Chá de Alecrim com Canela" },
    { id: 'anahata', chakra: "4. Anahata (Coração)", tema: "Compaixão", ritual: "Banho de Pétalas de Rosa" },
    { id: 'vishuddha', chakra: "5. Vishuddha (Garganta)", tema: "Verdade", ritual: "Chá de Hortelã" },
    { id: 'ajna', chakra: "6. Ajna (Frontal)", tema: "Intuição", ritual: "Saquinho de Lavanda no travesseiro" },
    { id: 'sahasrara', chakra: "7. Sahasrara (Coroa)", tema: "Unidade", ritual: "Meditação com Incenso de Olíbano" },
];

const CompendioPage: React.FC = () => {
    return (
        <section className="content-panel p-6">
            <h1 className="page-title text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-sky-400">Compêndio Sincrético</h1>
            <p className="page-subtitle">Correspondências práticas de Ervas, Cristais e Rituais para os 7 Pilares.</p>

            {compendioItems.map(item => (
                <div key={item.id} className="content-card glass-effect mb-4">
                    <h2 className={`text-2xl font-bold mb-3 text-${item.id}`}>{item.chakra}: {item.tema}</h2>
                    <p className="text-sm mt-3"><strong>Ritual Sugerido:</strong> {item.ritual}.</p>
                </div>
            ))}
        </section>
    );
};

export default CompendioPage;
