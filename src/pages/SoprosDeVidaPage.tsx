import React from 'react';
import { pranayamaData } from '../data/pranayamaData';
import BoxBreathingGuide from '../components/BoxBreathingGuide';

const SoprosDeVidaPage: React.FC = () => {
  return (
    <>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold font-cinzel text-center text-[#c8a44d] mb-4">Sopros de Vida</h2>
        <p className="text-sm text-gray-400 max-w-3xl mx-auto">
          Domine a ciência sagrada da respiração. Pranayamas são chaves para controlar sua energia vital (Prana), purificar sua mente e expandir sua consciência.
        </p>
      </div>
      <div className="space-y-8">
        {pranayamaData.map(pranayama => (
          <div key={pranayama.id} className="card p-6 no-hover">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-1">
                <div className="flex items-center justify-center md:justify-start mb-2">
                  <span className="text-3xl mr-4">{pranayama.icon}</span>
                  <h3 className="text-xl font-bold font-cinzel text-[#c8a44d]">{pranayama.name}</h3>
                </div>
                <p className="text-sm text-gray-400 mb-3 italic text-center md:text-left">({pranayama.translation})</p>
                <p className="text-sm text-gray-300 mb-4"><strong>Para que serve:</strong> {pranayama.purpose}</p>
                <p className="text-sm text-[#a37e2c] mb-4"><strong>Ponto de Foco:</strong> {pranayama.pontoFoco}</p>
              </div>
            </div>
            <div className="mt-4 border-t border-[#444] pt-4">
              <h4 className="font-semibold mb-2">Como Praticar:</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-400">
                {pranayama.comoPraticar.map((step, index) => <li key={index}>{step}</li>)}
              </ol>
            </div>

            {pranayama.id === 'sama-vritti' && <BoxBreathingGuide />}

            <div className="mt-4 border-t border-[#444] pt-4">
              <p className="text-xs text-gray-500"><strong>Termos de Pesquisa:</strong> <em>{pranayama.termosPesquisa}</em></p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SoprosDeVidaPage;
