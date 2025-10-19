import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { updateJornadaProgress } from '../services/firestore';
import { updateMockProgress } from './useJornadaProgress'; // Importar a função de atualização do mock

interface MutationVariables {
  etapa: number;
  isCompleted: boolean;
}

// --- MOCK IMPLEMENTATION ---
export function useUpdateJornadaProgress() {
  const queryClient = useQueryClient();
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;

  return useMutation<void, Error, MutationVariables>({
    mutationFn: async ({ etapa, isCompleted }) => {
      // Simular uma pequena demora da rede
      await new Promise(resolve => setTimeout(resolve, 200));
      // Atualizar nosso estado mockado
      updateMockProgress(etapa, isCompleted);
    },
    onSuccess: () => {
      // Invalidar a query para simular a re-busca
      queryClient.invalidateQueries({ queryKey: ['jornadaProgress', uid] });
    },
  });
}
// --- END MOCK ---