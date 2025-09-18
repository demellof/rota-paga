import React, { useState } from 'react';
import { pillarData, pillarZeroData } from '../data/pillarData';
import { pillarContentData, PillarContent } from '../data/pillarContent';

interface PillarDetailProps {
    content: PillarContent;
    onClose: () => void;
}

const PillarDetail: React.FC<PillarDetailProps> = ({ content, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="card w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-white">&times;</button>
                <h2 className="font-cinzel text-3xl text-[#daa520] mb-4">{`Etapa ${content.etapa}: ${content.title}`}</h2>
                <div className="space-y-4 text-gray-300">
                    <div>
                        <h3 className="font-bold text-lg text-gray-200">Foco:</h3>
                        <p>{content.foco}</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-gray-200">Pilares:</h3>
                        <p>{content.pilares}</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-gray-200">Centros Energéticos:</h3>
                        <p>{content.centros}</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-gray-200">Arquétipos:</h3>
                        <p>{content.arquetipos}</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-gray-200">Ferramentas:</h3>
                        <p>{content.ferramentas}</p>
                    </div>
                     <div>
                        <h3 className="font-bold text-lg text-gray-200">Ciclos:</h3>
                        <p>{content.ciclos}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};


const PillarSection: React.FC = () => {
    const [selectedPillar, setSelectedPillar] = useState<string | null>(null);

    const handlePillarClick = (pillarKey: string) => {
        setSelectedPillar(pillarKey);
    };

    const handleCloseDetail = () => {
        setSelectedPillar(null);
    };

    return (
        <div>
            <h2 className="text-3xl font-bold font-cinzel text-center text-[#daa520] mb-8">Os Sete Pilares da Ascensão</h2>
            <div id="pillar-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div onClick={() => handlePillarClick('etapa0')} className="pillar-card rounded-lg p-4 text-center md:col-span-2 lg:col-span-4 cursor-pointer" data-pillar="zero">
                    <div className="text-3xl mb-2">{pillarZeroData.symbol}</div>
                    <h3 className="font-cinzel font-bold">{pillarZeroData.title}</h3>
                    <p className="text-xs text-gray-400">A Cosmovisão Sincrética</p>
                </div>
                {Object.keys(pillarData).map((key, index) => {
                    const p = pillarData[key as keyof typeof pillarData];
                    const etapaKey = `etapa${index + 1}`;
                    return (
                        <div key={key} onClick={() => handlePillarClick(etapaKey)} className="pillar-card rounded-lg p-4 text-center" data-pillar={key}>
                            <div className="text-3xl mb-2">{p.title.split(' ')[0]}</div>
                            <h3 className="font-cinzel font-bold">{p.title.split(' ').slice(2).join(' ')}</h3>
                            <p className="text-xs text-gray-400">{p.chakra}</p>
                        </div>
                    );
                })}
            </div>

            {selectedPillar && pillarContentData[selectedPillar] && (
                <PillarDetail content={pillarContentData[selectedPillar]} onClose={handleCloseDetail} />
            )}
        </div>
    );
};

export default PillarSection;
