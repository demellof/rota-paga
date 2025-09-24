import React, { useState } from 'react';

const pilaresData = [
    { id: 'pilar1', title: "Pilar 1: Fundamentos da Dieta", content: [ { "Equilíbrio Calórico": "Meta Inicial: 2200-2600 kcal/dia. Ajuste monitorando peso e energia." }, { "Macronutrientes": "Proteínas (1-1.5g/kg), Carboidratos integrais, Gorduras Saudáveis." } ] },
    { id: 'pilar2', title: "Pilar 2: Planejamento e Preparação", content: [ { "Planejamento Semanal": "Reserve um tempo para planejar refeições." }, { "Meal Prep": "Cozinhe componentes com antecedência." } ] },
    { id: 'pilar3', title: "Pilar 3: Timing Nutricional", content: [ { "Pré-Treino": "Carboidratos Complexos + Proteína moderada." }, { "Pós-Treino": "Proteína de boa qualidade + Carboidratos." } ] },
    { id: 'pilar4', title: "Pilar 4: Limitações e Moderação", content: [ { "Alimentos a Limitar": "Ultraprocessados, bebidas açucaradas, excesso de sal." }, { "Princípio 80/20": "80% siga o plano, 20% permita-se exceções conscientes." } ] }
];

const PilaresDietaPage: React.FC = () => {
    const [openAccordion, setOpenAccordion] = useState<string | null>(null);

    const toggleAccordion = (id: string) => {
        setOpenAccordion(openAccordion === id ? null : id);
    };

    return (
        <section className="content-panel p-6">
            <h2 className="font-fantasy text-4xl text-yellow-200 mb-6">Os 4 Pilares da Dieta</h2>
            <div className="space-y-4">
                {pilaresData.map(pilar => (
                    <div key={pilar.id}>
                        <button onClick={() => toggleAccordion(pilar.id)} className={`accordion-button w-full text-left p-4 rounded-lg flex justify-between items-center ${openAccordion === pilar.id ? 'open' : ''}`}>
                            <span className="font-fantasy text-xl text-yellow-200">{pilar.title}</span>
                            <span className={`accordion-arrow text-yellow-200 text-2xl transform transition-transform duration-300 ${openAccordion === pilar.id ? 'rotate-180' : ''}`}>&darr;</span>
                        </button>
                        <div className={`accordion-content bg-gray-900/30 rounded-b-lg ${openAccordion === pilar.id ? 'open' : ''}`}>
                            {pilar.content.map((item, index) => {
                                const [key, value] = Object.entries(item)[0];
                                return (
                                <div key={index} className="mb-3">
                                    <h4 className="font-bold text-lg text-yellow-300">{key}:</h4>
                                    <p className="text-sm">{value}</p>
                                </div>
                            )})}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PilaresDietaPage;
