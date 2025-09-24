import React from 'react';

const CristaisPage: React.FC = () => {
    return (
        <>
            <h1 className="page-title text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-400">Guia de Cristais</h1>
            <p className="page-subtitle">Aprimorando o uso, limpeza e programação das suas ferramentas minerais.</p>

            <div className="content-panel p-6">
                <h2 className="text-2xl font-bold mb-4 text-white">1. A Prática: Como Usar Cristais</h2>

                <h3 className="section-title border-ajna">Passo 1: Limpeza Energética</h3>
                <p className="mb-3">Cristais absorvem energia. Antes de usar, limpe-os.</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                    <li><strong>Defumação:</strong> Passe o cristal pela fumaça de Sálvia, Palo Santo ou Olíbano. (Método universal).</li>
                    <li><strong>Selenita:</strong> Deixe o cristal repousando sobre uma placa de Selenita.</li>
                </ul>
                <div className="warning-box text-sm mt-4">
                    <strong>Cuidado:</strong> Não molhe Selenita, Pirita, Cianita. Na dúvida, use Defumação.
                </div>

                <h3 className="section-title border-manipura mt-6">Passo 2: Energização</h3>
                <p className="mb-3">Após limpar, é preciso "recarregar" o cristal.</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                    <li><strong>Luz da Lua (Cheia):</strong> Ideal para pedras de Intuição (Ametista, Quartzo Rosa).</li>
                    <li><strong>Luz do Sol (da manhã):</strong> Ideal para pedras de Ação (Citrino, Pirita).</li>
                </ul>

                <h3 className="section-title border-sahasrara mt-6">Passo 3: Programação (Intenção)</h3>
                <p className="text-sm">Segure o cristal limpo e energizado. Respire fundo e conecte-se com ele. Diga em voz alta sua intenção. Ex: "Eu programo esta Ametista para acalmar minha mente e abrir minha intuição."</p>
            </div>
        </>
    );
};

export default CristaisPage;
