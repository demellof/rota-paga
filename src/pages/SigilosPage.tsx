import React from 'react';

const SigilosPage: React.FC = () => {
    return (
        <>
            <h1 className="page-title text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">O Forjador de Sigilos</h1>
            <p className="page-subtitle">Um Guia Visual Prático para Manifestar Intenção (Mudança de Hábitos & Abundância).</p>
            <p className="text-sm mb-6 -mt-6 text-gray-400">Sintetizando a PNL (intenção linguística) com a Magia Cerimonial (correspondências planetárias).</p>

            <div className="content-card glass-effect">
                <h2 className="text-2xl font-bold mb-4 text-white">O que é um Sigilo?</h2>
                <p>Um sigilo é um símbolo mágico criado para representar uma intenção específica. O objetivo é destilar um desejo complexo (como "mudar meus hábitos" ou "ter abundância") em um glifo abstrato. Este glifo age como um "comando" visual, bypassando sua mente consciente (o "censor") e programando diretamente seu subconsciente para manifestar essa intenção.</p>
            </div>

            <div className="content-card glass-effect">
                <h2 className="text-2xl font-bold mb-4 text-white">Método 1: A Vontade Abstrata (Magia Psicológica / PNL)</h2>
                <p className="mb-4 text-sm">Este método foca em criar um símbolo, carregá-lo intensamente e depois esquecê-lo, permitindo que o subconsciente faça o trabalho. Perfeito para **mudança de hábitos**.</p>
                {/* Detailed steps would be mapped here */}
            </div>

            <div className="content-card glass-effect">
                <h2 className="text-2xl font-bold mb-4 text-white">Método 2: O Pantáculo Cerimonial (Magia Planetária / Salomão)</h2>
                <p className="mb-4 text-sm">Este método não busca o esquecimento, mas a criação de um talismã/pantáculo persistente, alinhado com as forças planetárias. Perfeito para **Abundância e Fartura**.</p>
                 {/* Detailed steps would be mapped here */}
            </div>
        </>
    );
};

export default SigilosPage;
