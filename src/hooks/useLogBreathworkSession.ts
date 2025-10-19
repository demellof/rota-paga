// src/hooks/useLogBreathworkSession.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

interface LogVariables {
  pranayamaId: string;
  durationInSeconds: number;
}

export function useLogBreathworkSession() {
  const queryClient = useQueryClient();
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;

  return useMutation({
    mutationFn: async ({ pranayamaId, durationInSeconds }: LogVariables) => {
      if (!uid) throw new Error("Usuário não autenticado.");

      const historyCollectionRef = collection(db, 'users', uid, 'breathwork_history');

      await addDoc(historyCollectionRef, {
        pranayamaId,
        durationInSeconds,
        practicedAt: serverTimestamp(), // Registra a data/hora exata no servidor
      });
    },
    onSuccess: () => {
      // Se tivéssemos uma página de histórico, invalidaríamos a query aqui
      // queryClient.invalidateQueries({ queryKey: ['breathworkHistory', uid] });
      console.log("Prática de respiração registrada com sucesso!");
    },
    onError: (error) => {
      console.error("Erro ao registrar prática:", error);
    }
  });
}
