import React, { useState } from 'react';

const pilaresData = [
    {
        id: 'pilar1',
        title: "Pilar 1: Fundamentos da Dieta (Base para Energia e Saúde)",
        content: {
            "Equilíbrio Calórico (Ajuste Individual)": "Meta Inicial: 2200-2600 kcal/dia (para homem 40+, moderadamente ativo). Ajuste monitorando o peso e energia.",
            "Macronutrientes Balanceados": "Proteínas (1-1.5g/kg), Carboidratos (grãos integrais), Gorduras Saudáveis (abacate, azeite)."
        }
    },
    {
        id: 'pilar2',
        title: "Pilar 2: Planejamento e Preparação (Estratégia Semanal)",
        content: {
            "Planejamento Semanal": "Reserve um tempo para planejar refeições e lanches.",
            "Lista de Compras Inteligente": "Crie a lista baseada no planejamento para evitar desperdício.",
            "Meal Prep": "Cozinhe componentes com antecedência para montar refeições rapidamente."
        }
    },
    {
        id: 'pilar3',
        title: "Pilar 3: Timing Nutricional (Otimizando Treinos)",
        content: {
            "Pré-Treino (1-2h antes)": "Foco em Carboidratos Complexos + Proteína moderada.",
            "Pós-Treino (1-2h após)": "Essencial para recuperação. Foco em Proteína de boa qualidade + Carboidratos."
        }
    },
    {
        id: 'pilar4',
        title: "Pilar 4: Limitações e Moderação (Sustentabilidade)",
        content: {
            "Alimentos a Limitar": "Ultraprocessados, bebidas açucaradas, excesso de sal, álcool, gorduras ruins.",
            "Princípio 80/20 (Flexibilidade)": "80% do tempo, siga o plano. 20% permita-se exceções conscientes e sem culpa."
        }
    }
];

const PilaresDietaPage: React.FC = () => {
    const [openAccordion, setOpenAccordion] = useState<string | null>('pilar1');

    const toggleAccordion = (id: string) => {
        setOpenAccordion(openAccordion === id ? null : id);
    };

    return (
        <>
            <h1 className="page-title text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-lime-300">Pilares do Conhecimento</h1>
            <p className="page-subtitle">A base do conhecimento freemium do Grimório, focado em nutrição e planejamento.</p>

            <div className="content-card glass-effect">
                <h2 className="text-2xl font-bold mb-4 text-white">A Base da Jornada: Os 4 Pilares da Dieta</h2>
                <div className="space-y-4">
                    {pilaresData.map(pilar => (
                        <div key={pilar.id}>
                            <button onClick={() => toggleAccordion(pilar.id)} className={`accordion-button w-full text-left p-4 rounded-lg flex justify-between items-center ${openAccordion === pilar.id ? 'open' : ''}`}>
                                <span className="font-fantasy text-xl text-yellow-200">{pilar.title}</span>
                                <span className="accordion-arrow text-yellow-200 text-2xl transform">&darr;</span>
                            </button>
                            <div className={`accordion-content bg-gray-900/30 rounded-b-lg ${openAccordion === pilar.id ? 'open' : ''}`}>
                                {Object.entries(pilar.content).map(([key, value]) => (
                                    <div key={key} className="mb-3">
                                        <h4 className="font-bold text-lg text-yellow-300">{key}:</h4>
                                        <p className="text-sm">{value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default PilaresDietaPage;
