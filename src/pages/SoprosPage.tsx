// src/pages/SoprosPage.tsx

import React, { useState } from 'react';
import { pranayamaData, Pranayama } from '../data/pranayamaData';
import BreathingGuide from '../components/guidance/BreathingGuide';

const SoprosPage = () => {
  const [selectedPranayama, setSelectedPranayama] = useState<Pranayama | null>(null);

  if (selectedPranayama) {
    return <BreathingGuide pranayama={selectedPranayama} onBack={() => setSelectedPranayama(null)} />;
  }

  return (
    <section className="p-4 md:p-6">
      <h1 className="font-fantasy text-4xl text-yellow-200 mb-8 text-center">Sopros de Vida: Guias de Pranayama</h1>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {pranayamaData.map(pranayama => (
          <div key={pranayama.id} className="bg-gray-800/50 border border-purple-400/20 rounded-xl shadow-lg p-6 flex flex-col justify-between hover:border-purple-400/50 transition-all">
            <div>
              <h2 className="text-2xl font-fantasy text-yellow-300 mb-2">{pranayama.nome}</h2>
              <p className="text-gray-400 mb-4">{pranayama.descricao}</p>
            </div>
            <button
              onClick={() => setSelectedPranayama(pranayama)}
              className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg self-start"
            >
              Iniciar Prática
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SoprosPage;
