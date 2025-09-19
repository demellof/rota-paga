import React from 'react';

const CristaisPage: React.FC = () => {
    return (
        <>
            <h1 className="page-title text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-400">Guia de Cristais</h1>
            <p className="page-subtitle">Aprimorando o uso, limpeza e programação das suas ferramentas minerais.</p>

            <div className="content-card glass-effect">
                <h2 className="text-2xl font-bold mb-4 text-white">1. A Prática: Como Usar Cristais</h2>

                <h3 className="section-title border-ajna">Passo 1: Limpeza Energética</h3>
                <p className="mb-3">Cristais absorvem energia. Antes de usar, limpe-os.</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                    <li><strong>Defumação:</strong> Passe na fumaça de Sálvia, Palo Santo ou Olíbano. (Método universal).</li>
                    <li><strong>Selenita:</strong> Deixe o cristal repousando sobre uma placa de Selenita.</li>
                </ul>
                <div className="warning-box text-sm mt-4">
                    <strong>Cuidado:</strong> Não molhe Selenita, Pirita, Cianita. Na dúvida, use Defumação.
                </div>

                {/* Other steps would be here */}
            </div>

            <div className="content-card glass-effect">
                <h2 className="text-2xl font-bold mb-4 text-white">2. Grimório de Cristais (Aprofundado)</h2>
                {/* Crystal details would be mapped here */}
            </div>
        </>
    );
};

export default CristaisPage;
