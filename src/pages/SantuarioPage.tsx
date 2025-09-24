import React from 'react';

const SantuarioPage: React.FC = () => {
    return (
        <section className="content-panel p-6">
            <h2 className="font-fantasy text-4xl text-yellow-200 mb-4">Bem-vindo ao Santuário</h2>
            <p className="text-lg leading-relaxed mb-4">
                Este é o seu Grimório Virtual, um repositório vivo de conhecimento místico e prático. Cada "livro" na prateleira à esquerda abre um portal para um pilar diferente da sua jornada.
            </p>
            <p className="mb-6">
                Explore os Pantáculos antigos, forje seus próprios Sigilos de intenção, ou consulte o Oráculo Astral para alinhar sua jornada com os cosmos. Este espaço combina sabedoria ancestral com ferramentas modernas.
            </p>
            <div className="border-t border-yellow-800/50 pt-4">
                <p className="text-sm text-yellow-200/70">Use a "prateleira" (navegação) para selecionar um tópico.</p>
            </div>
        </section>
    );
};

export default SantuarioPage;
