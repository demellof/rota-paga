import React, { useState } from 'react';
import PremiumContent from './PremiumContent';

interface JornadaStepProps {
    etapa: number;
    title: string;
    arquétipos: string;
    pilares: string;
    praticas: string;
    isCompleted: boolean;
    onToggleComplete: () => void;
    isPremium: boolean;
}

const JornadaStep: React.FC<JornadaStepProps> = ({
    etapa,
    title,
    arquétipos,
    pilares,
    praticas,
    isCompleted,
    onToggleComplete,
    isPremium,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    // This is a simplified version of the completion-toggle from the original CSS
    const toggleStyle: React.CSSProperties = {
        width: '24px',
        height: '24px',
        border: '2px solid #a37e2c',
        borderRadius: '50%',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        backgroundColor: isCompleted ? '#a37e2c' : 'transparent',
    };

    const checkmarkStyle: React.CSSProperties = {
        fontSize: '12px',
        opacity: isCompleted ? 1 : 0,
        transition: 'opacity 0.3s ease',
        color: '#1a1a1a',
    };

    const headerStyle: React.CSSProperties = {
        textDecoration: isCompleted ? 'line-through' : 'none',
        opacity: isCompleted ? 0.7 : 1,
    };

    return (
        <div className={`jornada-step ${isCompleted ? 'completed' : ''}`}>
            <div className="border-l-4 border-gray-700">
                <div
                    className="accordion-header flex justify-between items-center p-4 bg-[#1f1f1f] rounded-r-lg cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                    style={headerStyle}
                >
                    <div className="flex items-center">
                        <div style={toggleStyle} onClick={(e) => { e.stopPropagation(); onToggleComplete(); }}>
                            <i className="fas fa-check" style={checkmarkStyle}></i>
                        </div>
                        <h3 className="font-semibold font-cinzel text-lg text-[#a37e2c] ml-4">{title}</h3>
                    </div>
                    <i className={`fas ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'} text-xs`}></i>
                </div>
                {isOpen && (
                    <div className="accordion-content bg-[#1f1f1f] px-4 pb-4 rounded-b-lg text-sm text-gray-400 space-y-2" style={{maxHeight: isOpen ? '1000px' : '0', overflow: 'hidden', transition: 'max-height 0.5s ease-out' }}>
                        {isPremium ? (
                            <PremiumContent>
                                <p><strong>Arquétipos-Guia:</strong> {arquétipos}</p>
                                <p><strong>Pilares de Foco:</strong> {pilares}</p>
                                <p><strong>Rituais e Práticas Sugeridas:</strong> {praticas}</p>
                            </PremiumContent>
                        ) : (
                            <>
                                <p><strong>Arquétipos-Guia:</strong> {arquétipos}</p>
                                <p><strong>Pilares de Foco:</strong> {pilares}</p>
                                <p><strong>Rituais e Práticas Sugeridas:</strong> {praticas}</p>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default JornadaStep;
