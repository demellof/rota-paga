// src/components/guidance/BreathingGuide.tsx

import React, { useState, useEffect, useMemo } from 'react';
import { Pranayama } from '../../data/pranayamaData';
import { useLogBreathworkSession } from '../../hooks/useLogBreathworkSession';

interface BreathingGuideProps {
  pranayama: Pranayama;
  onBack: () => void;
}

const BreathingGuide: React.FC<BreathingGuideProps> = ({ pranayama, onBack }) => {
  const [phase, setPhase] = useState<'inspire' | 'hold' | 'exhale' | 'wait' | 'finished'>('inspire');
  const [instruction, setInstruction] = useState('Comece inspirando...');
  const [cycles, setCycles] = useState(0);
  const totalCycles = 10; // Definimos um total de 10 ciclos por sessão, por exemplo

  const logSessionMutation = useLogBreathworkSession();

  const phaseDurations = useMemo(() => pranayama.passos, [pranayama]);

  useEffect(() => {
    if (phase === 'finished') {
      setInstruction('Sessão Concluída.');
      return;
    }

    let timer: NodeJS.Timeout;

    const sequence = () => {
      switch (phase) {
        case 'inspire':
          setInstruction('Inspire...');
          timer = setTimeout(() => setPhase('hold'), phaseDurations.inspiracao * 1000);
          break;
        case 'hold':
          setInstruction('Segure');
          timer = setTimeout(() => setPhase('exhale'), phaseDurations.retencaoCheio * 1000);
          break;
        case 'exhale':
          setInstruction('Expire...');
          timer = setTimeout(() => setPhase('wait'), phaseDurations.expiracao * 1000);
          break;
        case 'wait':
          setInstruction('Aguarde');
          timer = setTimeout(() => {
            if (cycles + 1 >= totalCycles) {
              setPhase('finished');
            } else {
              setCycles(c => c + 1);
              setPhase('inspire');
            }
          }, phaseDurations.retencaoVazio * 1000);
          break;
      }
    };

    sequence();
    return () => clearTimeout(timer);
  }, [phase, cycles, phaseDurations, totalCycles]);

  const handleLogPractice = () => {
    const totalDuration = totalCycles * phaseDurations.totalCiclo;
    logSessionMutation.mutate({ pranayamaId: pranayama.id, durationInSeconds: totalDuration });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <div className="absolute top-4 left-4 z-20">
        <button onClick={onBack} className="bg-gray-800/50 hover:bg-gray-700/70 text-yellow-200 py-2 px-4 rounded-full">
          &larr; Voltar
        </button>
      </div>

      <h1 className="text-3xl font-fantasy text-yellow-200 mb-4">{pranayama.nome}</h1>
      <p className="text-gray-400 mb-8">Ciclo {cycles + 1} de {totalCycles}</p>

      <div className="relative w-64 h-64 flex items-center justify-center my-8">
        <div className="absolute w-full h-full border-2 border-purple-400/20 rounded-full animate-pulse-slow"></div>
        <div
          className="absolute w-1/2 h-1/2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full shadow-2xl shadow-purple-500/50 transition-transform ease-in-out"
          style={{
            transform: phase === 'inspire' || phase === 'hold' ? 'scale(1.5)' : 'scale(0.8)',
            transitionDuration: `${phase === 'inspire' ? phaseDurations.inspiracao : phaseDurations.expiracao}s`,
          }}
        ></div>
      </div>

      <p className="font-fantasy text-white text-3xl z-10 h-12 transition-opacity duration-500">{instruction}</p>

      {phase === 'finished' && (
        <div className="mt-8 flex flex-col items-center gap-4">
          <p className="text-green-400">Bom trabalho!</p>
          <button
            onClick={handleLogPractice}
            disabled={logSessionMutation.isPending}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg disabled:bg-gray-500"
          >
            {logSessionMutation.isPending ? 'Registrando...' : 'Registrar Prática'}
          </button>
          {logSessionMutation.isSuccess && <p className="text-green-300">Prática registrada com sucesso!</p>}
        </div>
      )}

      <div className="absolute bottom-4 left-4 right-4 text-center max-w-md mx-auto">
        <h3 className="text-md text-red-400/80 mb-1">Atenção</h3>
        <p className="text-xs text-gray-500">{pranayama.contraindicacoes.join('. ')}</p>
      </div>
    </div>
  );
};

export default BreathingGuide;
