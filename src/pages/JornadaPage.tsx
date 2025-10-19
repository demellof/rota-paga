import React, { useState } from 'react';
import { jornadaData } from '../data/jornadaData';
import { useJornadaProgress } from '../hooks/useJornadaProgress'; // Importar nosso novo hook

const JornadaPage: React.FC = () => {
    const [openAccordion, setOpenAccordion] = useState<string | null>(null);
    const { data: progress, isLoading, isError, error } = useJornadaProgress();

    const toggleAccordion = (etapa: string) => {
        setOpenAccordion(openAccordion === etapa ? null : etapa);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="loader h-12 w-12 border-t-4 border-yellow-200 rounded-full animate-spin"></div>
                <p className="ml-4 text-yellow-200">Carregando seu progresso...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center text-red-400">
                <p>Ocorreu um erro ao buscar seu progresso:</p>
                <p className="text-sm">{error.message}</p>
            </div>
        );
    }

    return (
        <section className="content-panel p-6">
            <h2 className="font-fantasy text-4xl text-yellow-200 mb-6">A Jornada Florescer: As 7 Etapas</h2>
            <div id="jornada-container" className="space-y-4">
                {jornadaData.map((etapa) => {
                    // Lógica para verificar se a etapa está concluída (exemplo)
                    const isCompleted = progress?.completedSteps?.[etapa.numero] ?? false;

                    return (
                        <div key={etapa.etapa}>
                            <button
                                onClick={() => toggleAccordion(etapa.etapa)}
                                className={`accordion-button w-full text-left p-4 rounded-lg flex justify-between items-center ${openAccordion === etapa.etapa ? 'open' : ''}`}
                            >
                                <span className="flex items-center">
                                    {isCompleted && <span className="text-green-400 mr-3 text-2xl">✓</span>}
                                    <span className="font-fantasy text-xl text-yellow-200">{etapa.etapa}</span>
                                </span>
                                <span className={`accordion-arrow text-yellow-200 text-2xl transform transition-transform duration-300 ${openAccordion === etapa.etapa ? 'rotate-180' : ''}`}>
                                    &darr;
                                </span>
                            </button>
                            <div className={`accordion-content bg-gray-900/30 rounded-b-lg text-yellow-100/90 ${openAccordion === etapa.etapa ? 'open' : ''}`}>
                                 <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
                                    <div>
                                        <h4 className="font-fantasy text-lg text-yellow-300 mb-2">Alinhamentos</h4>
                                        <p><strong>Pilar:</strong> {etapa.pilar}</p>
                                        <p><strong>Chakra:</strong> {etapa.chakra}</p>
                                        <p><strong>Cor:</strong> {etapa.cor_principal}</p>
                                        <p><strong>Orixá:</strong> {etapa.orixa}</p>
                                        <p><strong>Ciclo Sazonal:</strong> {etapa.ciclo_sazonal}</p>
                                        <p><strong>Ciclo Lunar:</strong> {etapa.ciclo_lunar}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-fantasy text-lg text-yellow-300 mb-2">Arquétipos</h4>
                                        <ul className="space-y-1 list-disc list-inside ml-4">{etapa.mitologia.map(m => <li key={m}>{m}</li>)}</ul>
                                        <p className="mt-2"><strong>Deuses:</strong> {etapa.deuses_associados}</p>
                                    </div>
                                    <div className="md:col-span-2">
                                         <h4 className="font-fantasy text-lg text-yellow-300 mb-2">Ferramentas e Ações</h4>
                                         <p><strong>Qualidade:</strong> {etapa.qualidade_desejada}</p>
                                         <p><strong>Ação Principal:</strong> {etapa.acao}</p>
                                         <p><strong>Prática de Integração:</strong> {etapa.integracao_pratica}</p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <h4 className="font-fantasy text-lg text-yellow-300 mb-2">Correspondências Sensoriais</h4>
                                        <ul className="space-y-1 list-disc list-inside ml-4">{etapa.elementos_sensoriais.map(s => <li key={s}>{s}</li>)}</ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default JornadaPage;