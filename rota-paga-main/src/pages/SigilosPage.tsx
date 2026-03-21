import React, { useState, useMemo } from 'react';

const SigilosPage: React.FC = () => {
    const [intention, setIntention] = useState('MINHA VONTADE FLORESCE');

    const processedIntention = useMemo(() => {
        const uppercase = intention.toUpperCase();
        const noVowels = uppercase.replace(/[AEIOU]/g, '');
        const noRepeats = [...new Set(noVowels.replace(/\s/g, ''))].join('');
        return {
            original: uppercase,
            noVowels: noVowels.replace(/\s/g, ''),
            noRepeats: noRepeats,
        };
    }, [intention]);

    return (
        <>
            <h1 className="page-title text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">O Forjador de Sigilos</h1>
            <p className="page-subtitle">Um Guia Prático para Manifestar Intenção.</p>

            <div className="content-panel p-6">
                <h2 className="font-fantasy text-2xl text-yellow-200 mb-4">Método 1: O Glifo da Intenção (PNL / Magia do Caos)</h2>
                <p className="mb-4">Este método programa seu subconsciente, transformando linguagem em um símbolo abstrato. Perfeito para **mudança de hábitos**.</p>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="intention" className="block text-sm font-medium text-yellow-200 mb-1">Passo 1: Escreva sua Intenção</label>
                        <input
                            type="text"
                            id="intention"
                            value={intention}
                            onChange={(e) => setIntention(e.target.value)}
                            className="astro-input w-full"
                            placeholder="Escreva seu desejo no presente..."
                        />
                    </div>

                    <div>
                        <h3 className="font-fantasy text-lg text-yellow-300">Passo 2: A Redução</h3>
                        <p className="text-sm">Removemos as vogais e as letras repetidas para ofuscar o significado da mente consciente.</p>
                        <div className="mt-2 p-4 bg-gray-900/50 rounded-md font-mono text-center tracking-widest">
                            <p className="line-through text-gray-500">{processedIntention.original}</p>
                            <p className="text-2xl text-yellow-200">{processedIntention.noRepeats}</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-fantasy text-lg text-yellow-300">Passo 3: A Criação</h3>
                        <p className="text-sm">Combine as letras restantes em um único símbolo gráfico. Gire, sobreponha e estilize as letras até que a origem seja esquecida.</p>
                    </div>
                </div>
            </div>

            <div className="content-panel p-6 mt-6">
                 <h2 className="font-fantasy text-2xl text-yellow-200 mb-4">Método 2: O Pantáculo Cerimonial (Magia Planetária)</h2>
                <p className="mb-4 text-sm">Criação de um talismã persistente, alinhado com as forças planetárias. Perfeito para **Abundância**.</p>
                 <ol className="list-decimal list-inside space-y-3 pl-4">
                    <li><strong>Intenção e Alinhamento:</strong> Escolha a intenção (Abundância) e o planeta regente (Júpiter).</li>
                    <li><strong>O Desenho:</strong> Crie o sigilo usando um método (letras, símbolos) e prepare-se para a consagração.</li>
                    <li><strong>A Consagração:</strong> Realize o ritual no dia e hora do planeta (Quinta-feira para Júpiter), usando cores (Azul/Roxo) e incensos (Sândalo) correspondentes.</li>
                    <li><strong>A Ativação:</strong> Invoque a energia planetária e carregue o sigilo com sua Vontade. Não o destrua; guarde-o como um pantáculo.</li>
                </ol>
            </div>
        </>
    );
};

export default SigilosPage;
