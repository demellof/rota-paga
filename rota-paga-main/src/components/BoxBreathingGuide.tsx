import React, { useState, useEffect } from 'react';

const BoxBreathingGuide: React.FC = () => {
    const [isActive, setIsActive] = useState(false);
    const [phaseIndex, setPhaseIndex] = useState(0);
    const [scale, setScale] = useState(1);

    const phases = [
        { name: 'Inspire', scale: 1.5 },
        { name: 'Segure', scale: 1.5 },
        { name: 'Expire', scale: 1 },
        { name: 'Segure', scale: 1 },
    ];

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isActive) {
            interval = setInterval(() => {
                setPhaseIndex(prevIndex => (prevIndex + 1) % 4);
            }, 4000);
        } else {
            setPhaseIndex(0);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isActive]);

    useEffect(() => {
        setScale(phases[phaseIndex].scale);
    }, [phaseIndex]);


    const toggleAnimation = () => {
        setIsActive(!isActive);
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-[#1f1f1f] rounded-lg mt-4">
            <div className="relative w-48 h-48 flex items-center justify-center">
                <div
                    className="absolute bg-[#a37e2c] rounded-lg transition-transform duration-3000 ease-in-out"
                    style={{
                        transform: `scale(${isActive ? scale : 1})`,
                        width: '100%',
                        height: '100%',
                        transitionDuration: '4s'
                    }}
                ></div>
                <p className="relative text-2xl font-cinzel text-white z-10">
                    {isActive ? phases[phaseIndex].name : 'Sama Vritti'}
                </p>
            </div>
            <button
                onClick={toggleAnimation}
                className="btn-primary mt-6 py-2 px-6 rounded-lg"
            >
                {isActive ? 'Parar' : 'Iniciar'}
            </button>
        </div>
    );
};

export default BoxBreathingGuide;
