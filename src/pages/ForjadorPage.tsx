import React from 'react';

const ForjadorPage: React.FC = () => {
    // This could be made interactive in a future step
    return (
        <section className="content-panel p-6">
            <h1 className="page-title text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">O Forjador de Sigilos</h1>
            <p className="page-subtitle">Um Guia Visual Prático para Manifestar Intenção.</p>
            <p className="text-sm mb-6 -mt-6 text-gray-400">Sintetizando a PNL com a Magia Cerimonial.</p>

            <div className="content-card glass-effect mb-6">
                <h2 className="text-2xl font-bold mb-4 text-white">O que é um Sigilo?</h2>
                <p>Um sigilo é um símbolo mágico criado para representar uma intenção específica. O objetivo é destilar um desejo complexo em um glifo abstrato que age como um "comando" visual, bypassando sua mente consciente e programando diretamente seu subconsciente para manifestar essa intenção.</p>
            </div>

            <div className="content-card glass-effect mb-6">
                <h2 className="font-fantasy text-2xl text-yellow-300 mb-2">Método 1: O Glifo da Intenção (PNL / Magia do Caos)</h2>
                <p className="mb-4">Este método programa seu subconsciente. Perfeito para **mudança de hábitos**.</p>
                <ol className="list-decimal list-inside space-y-3 pl-4">
                    <li><strong>Formule a Intenção:</strong> Escreva seu desejo em tempo presente, de forma positiva. Ex: "MINHA VONTADE FLORESCE COM PODER E ALEGRIA".</li>
                    <li><strong>Remova Vogais e Letras Repetidas:</strong> MNHVNTDFLRSCMPDRG</li>
                    <li><strong>Crie o Glifo:</strong> Combine as letras restantes em um único símbolo gráfico abstrato.</li>
                    <li><strong>Carregue e Esqueça:</strong> Ative o sigilo em um momento de pico emocional ou gnose e depois "esqueça-o" conscientemente.</li>
                </ol>
            </div>

            <div className="content-card glass-effect">
                <h3 className="font-fantasy text-2xl text-yellow-300 mb-2">Método 2: O Selo Planetário (Cabala / Salomão)</h3>
                <p className="mb-4">Criação de um talismã persistente, alinhado com as forças planetárias. Perfeito para **Abundância**.</p>
                 <ol className="list-decimal list-inside space-y-3 pl-4">
                    <li><strong>Formule a Intenção:</strong> Ex: "FLORESCER".</li>
                    <li><strong>Traduza para Números:</strong> Use a tabela Cabalística para converter as letras em números.</li>
                    <li><strong>Reduza os Números:</strong> Reduza os números para caber no quadrado mágico do seu ciclo (Júpiter, 1-16).</li>
                    <li><strong>Trace no Quadrado Mágico:</strong> Desenhe uma linha contínua conectando os números da sua intenção no Kamea de Júpiter.</li>
                    <li><strong>Consagre no Tempo Certo:</strong> Use o dia, hora, cor e incenso de Júpiter.</li>
                </ol>
            </div>
        </section>
    );
};

export default ForjadorPage;
