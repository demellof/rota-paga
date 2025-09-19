import React, { useState } from 'react';
import { jornadaData } from '../data/jornadaData';

const JornadaPage: React.FC = () => {
    const [openAccordion, setOpenAccordion] = useState<string | null>(null);

    const toggleAccordion = (etapa: string) => {
        if (openAccordion === etapa) {
            setOpenAccordion(null);
        } else {
            setOpenAccordion(etapa);
        }
    };

    return (
        <>
            <h1 className="page-title text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Jornada Florescer</h1>
            <p className="page-subtitle">As 7 Etapas da Jornada para Domar a Fera Interior.</p>

            <div className="space-y-4">
                {jornadaData.map((etapa) => (
                    <div key={etapa.etapa}>
                        <button
                            onClick={() => toggleAccordion(etapa.etapa)}
                            className={`accordion-button w-full text-left p-4 rounded-lg flex justify-between items-center ${openAccordion === etapa.etapa ? 'open' : ''}`}
                        >
                            <span className="font-fantasy text-xl text-yellow-200">{etapa.etapa}</span>
                            <span className="accordion-arrow text-yellow-200 text-2xl transform">&darr;</span>
                        </button>
                        <div className={`accordion-content bg-gray-900/30 rounded-b-lg text-yellow-100/90 ${openAccordion === etapa.etapa ? 'open' : ''}`}>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-fantasy text-lg text-yellow-300 mb-2">Alinhamentos</h4>
                                    <p><strong>Pilar:</strong> {etapa.pilar}</p>
                                    <p><strong>Chakra:</strong> {etapa.chakra}</p>
                                    <p><strong>Cor:</strong> {etapa.cor_principal}</p>
                                    <p><strong>Orixá:</strong> {etapa.orixa}</p>
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
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default JornadaPage;
