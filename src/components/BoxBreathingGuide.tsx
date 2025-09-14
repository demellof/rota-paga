import React, { useState, useEffect } from 'react';

const BoxBreathingGuide: React.FC = () => {
    const [isActive, setIsActive] = useState(false);
    const [phaseIndex, setPhaseIndex] = useState(0);
    const [countdown, setCountdown] = useState(4);

    const phases = ['Inspire', 'Segure', 'Expire', 'Segure'];
    const scales = [1.2, 1.2, 1, 1];

    useEffect(() => {
        if (!isActive) {
            return;
        }

        const interval = setInterval(() => {
            setCountdown(prev => {
                if (prev > 1) {
                    return prev - 1;
                } else {
                    setPhaseIndex(pIndex => (pIndex + 1) % 4);
                    return 4;
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isActive]);

    const handleToggle = () => {
        if (isActive) {
            // Reset state when stopping
            setPhaseIndex(0);
            setCountdown(4);
        }
        setIsActive(!isActive);
    };

    const currentPhase = phases[phaseIndex];
    const currentScale = scales[phaseIndex];

    return (
        <div className="breathing-guide-container mt-6 p-4 border-t-2 border-dashed border-[#a37e2c] text-center">
            <h4 className="font-semibold text-lg font-cinzel mb-4">Guia Interativo</h4>
            <div className="relative w-32 h-32 mx-auto">
                <div
                    className="absolute inset-0 bg-[#a37e2c] transition-transform ease-in-out"
                    style={{ transform: `scale(${isActive ? currentScale : 1})`, transitionDuration: isActive ? '4s' : '0.5s' }}
                ></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <p className="text-xl font-semibold text-black">{isActive ? currentPhase : 'Pressione Iniciar'}</p>
                    <p className="text-4xl font-cinzel text-black font-bold">{isActive ? countdown : ''}</p>
                </div>
            </div>
            <button onClick={handleToggle} className="btn-primary py-2 px-6 rounded-lg mt-4">
                {isActive ? 'Parar' : 'Iniciar'}
            </button>
        </div>
    );
};

export default BoxBreathingGuide;
