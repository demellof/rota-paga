import React, { useState, useEffect } from 'react';
import { jornadaFlorescerData } from '../data/jornadaFlorescerData';
import JornadaStep from './JornadaStep';
import { useAuth } from '../context/AuthContext';
import { getJornadaProgress, updateJornadaProgress } from '../services/firestore';

const JornadaSection: React.FC = () => {
    const { currentUser } = useAuth();
    const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!currentUser) return;

        const fetchProgress = async () => {
            setLoading(true);
            const progress = await getJornadaProgress(currentUser.uid);
            if (progress && progress.completedSteps) {
                setCompletedSteps(progress.completedSteps);
            }
            setLoading(false);
        };

        fetchProgress();
    }, [currentUser]);

    const handleToggleComplete = async (etapa: number) => {
        if (!currentUser) return;

        const newCompletedState = !completedSteps[etapa];

        // Optimistically update UI
        const newSteps = { ...completedSteps, [etapa]: newCompletedState };
        setCompletedSteps(newSteps);

        try {
            await updateJornadaProgress(currentUser.uid, etapa, newCompletedState);
        } catch (error) {
            console.error("Failed to update progress:", error);
            // Revert UI change on error
            setCompletedSteps(completedSteps);
        }
    };

    if (loading) {
        return <p className="text-center">Carregando seu progresso...</p>
    }

    return (
        <>
            <h2 className="text-2xl font-bold font-cinzel text-center text-[#c8a44d] mb-6">A Jornada do Florescer</h2>
            <p className="text-sm text-gray-400 mb-8 text-center max-w-3xl mx-auto">
                Este é o seu mapa sagrado, um organograma vivo que detalha as 7 Etapas da jornada de "Florescer - Domando a Fera Interior". Cada etapa é um portal, clique para desvendar seus mistérios.
            </p>
            <div className="space-y-4">
                {jornadaFlorescerData.map(step => (
                    <JornadaStep
                        key={step.etapa}
                        etapa={step.etapa}
                        title={step.title}
                        arquétipos={step.arquétipos}
                        pilares={step.pilares}
                        praticas={step.praticas}
                        isCompleted={!!completedSteps[step.etapa]}
                        onToggleComplete={() => handleToggleComplete(step.etapa)}
                        isPremium={step.premium || false}
                    />
                ))}
            </div>
        </>
    );
};

export default JornadaSection;
