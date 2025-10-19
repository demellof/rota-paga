import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { saveSigil, Sigil } from '../services/firestore';

// The data needed to create a new sigil, excluding server-generated fields
type SigilCreationData = Omit<Sigil, 'id' | 'createdAt'>;

export const useSaveSigil = () => {
  const queryClient = useQueryClient();
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;

  return useMutation<void, Error, SigilCreationData>({
    mutationFn: (sigilData) => {
      if (!uid) {
        throw new Error("Usuário não autenticado para salvar o sigilo.");
      }
      return saveSigil(uid, sigilData);
    },
    onSuccess: () => {
      console.log('Sigilo salvo com sucesso! Invalidando a query de sigilos do usuário...');
      // When the mutation is successful, invalidate the userSigils query.
      // This will trigger a re-fetch in any component using `useUserSigils`,
      // thus updating the gallery automatically.
      queryClient.invalidateQueries({ queryKey: ['userSigils', uid] });
    },
    onError: (error) => {
      console.error("Erro ao salvar o sigilo:", error);
    },
  });
};