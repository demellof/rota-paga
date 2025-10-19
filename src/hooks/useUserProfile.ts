import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { getUserProfile, UserProfile } from '../services/firestore';

export function useUserProfile() {
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;

  return useQuery<UserProfile | null, Error>({
    // A chave da query é um array. Ela identifica unicamente esta busca.
    // Se 'uid' mudar, o react-query fará a busca novamente.
    queryKey: ['userProfile', uid],

    // A função que faz a busca. Só será executada se a chave 'uid' existir.
    queryFn: () => getUserProfile(uid!),

    // A opção 'enabled' é crucial: ela garante que a query só rode
    // se o usuário estiver logado (ou seja, se 'uid' não for undefined).
    enabled: !!uid,

    // Opções de cache (opcional, mas recomendado):
    staleTime: 1000 * 60 * 5, // 5 minutos. Os dados são considerados "frescos" por 5 min.
    cacheTime: 1000 * 60 * 15, // 15 minutos. Mantém os dados inativos em memória por 15 min.
  });
}