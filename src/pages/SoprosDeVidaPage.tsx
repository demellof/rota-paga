import React from 'react';
import { pranayamaData } from '../data/pranayamaData';
import BoxBreathingGuide from '../components/BoxBreathingGuide';

const SoprosDeVidaPage: React.FC = () => {
    return (
        <>
            <h2 className="text-2xl font-bold font-cinzel text-center text-[#c8a44d] mb-8">Sopros de Vida: A Arte do Pranayama</h2>
            <div className="space-y-8">
                {pranayamaData.map(pranayama => (
                    <div key={pranayama.id} className="card p-6 no-hover">
                        <div className="flex items-center mb-4">
                            <span className="text-4xl mr-4">{pranayama.icon}</span>
                            <div>
                                <h3 className="text-xl font-bold font-cinzel text-[#c8a44d]">{pranayama.name}</h3>
                                <p className="text-sm text-gray-400 italic">{pranayama.translation}</p>
                            </div>
                        </div>
                        <p className="text-gray-300 mb-4">{pranayama.purpose}</p>

                        <h4 className="font-semibold text-[#a37e2c] mb-2">Como Praticar:</h4>
                        <ul className="list-disc list-inside text-gray-400 space-y-1 mb-4">
                            {pranayama.comoPraticar.map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ul>

                        <h4 className="font-semibold text-[#a37e2c] mb-2">Ponto de Foco:</h4>
                        <p className="text-gray-400 italic">"{pranayama.pontoFoco}"</p>

                        {pranayama.id === 'sama-vritti' && (
                            <BoxBreathingGuide />
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default SoprosDeVidaPage;
