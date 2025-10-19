import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { getJornadaProgress, JornadaProgress } from '../services/firestore';

export function useJornadaProgress() {
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;

  return useQuery<JornadaProgress | null, Error>({
    // Chave de query única para o progresso da jornada do usuário
    queryKey: ['jornadaProgress', uid],

    // Função de busca, executada apenas se o uid existir
    queryFn: () => getJornadaProgress(uid!),

    // A query só é ativada se o usuário estiver logado
    enabled: !!uid,

    // Configurações de cache similares ao perfil do usuário
    staleTime: 1000 * 60 * 5, // 5 minutos
    cacheTime: 1000 * 60 * 15, // 15 minutos
  });
}