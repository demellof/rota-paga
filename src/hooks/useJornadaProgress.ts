import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { getJornadaProgress, JornadaProgress } from '../services/firestore';

// --- MOCK IMPLEMENTATION ---
let mockProgress: JornadaProgress = { completedSteps: { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false } };

// Função para atualizar o mock, que será usada no mock da mutação
export const updateMockProgress = (etapa: number, isCompleted: boolean) => {
    mockProgress = {
        ...mockProgress,
        completedSteps: {
            ...mockProgress.completedSteps,
            [etapa]: isCompleted,
        },
    };
};

export function useJornadaProgress() {
  return {
    data: mockProgress,
    isLoading: false,
    isError: false,
    error: null,
  };
}
// --- END MOCK ---