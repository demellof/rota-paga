import React from 'react';

const PillarsOverviewPage: React.FC = () => {
    return (
        <>
            <h1 className="page-title text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-lime-300">Pilares do Conhecimento</h1>
            <p className="page-subtitle">A base de conteúdo público do Grimório Virtual (seu modelo Freemium).</p>

            <div className="content-card glass-effect">
                <h2 className="text-2xl font-bold mb-4 text-white">A Base da Jornada: Os 4 Pilares da Dieta</h2>
                <p className="text-sm text-gray-400 mb-6">Esta é a base do conhecimento freemium que oferecemos, baseado em seus documentos de pesquisa sobre nutrição e planejamento.</p>

                <div className="space-y-4">
                    <div className="syncretic-box border-l-red-400">
                        <h3 className="text-lg font-semibold text-white">Pilar 1: Fundamentos da Dieta</h3>
                        <p className="text-sm">Foco no equilíbrio calórico correto, balanço de macronutrientes (Proteínas, Carboidratos, Gorduras), e hidratação vital.</p>
                    </div>
                    <div className="syncretic-box border-l-blue-400">
                        <h3 className="text-lg font-semibold text-white">Pilar 2: Planejamento e Preparação</h3>
                        <p className="text-sm">A estratégia semanal. Inclui o planejamento de refeições, listas de compras inteligentes, e "Meal Prep" para garantir consistência.</p>
                    </div>
                    <div className="syncretic-box border-l-orange-400">
                        <h3 className="text-lg font-semibold text-white">Pilar 3: Timing Nutricional</h3>
                        <p className="text-sm">Otimizando a performance. O que comer Pré-Treino (energia), Durante o Treino (manutenção), e Pós-Treino (recuperação e reparo muscular).</p>
                    </div>
                    <div className="syncretic-box border-l-gray-400">
                        <h3 className="text-lg font-semibold text-white">Pilar 4: Limitações e Moderação</h3>
                        <p className="text-sm">A chave para a sustentabilidade. Identifica alimentos a limitar (ultraprocessados) e aplica o Princípio 80/20 para flexibilidade sem culpa.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PillarsOverviewPage;
