import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { getUserSigils, Sigil } from '../services/firestore';

export const useUserSigils = () => {
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;

  return useQuery<Sigil[], Error>({
    // The query will only execute if the uid is available
    queryKey: ['userSigils', uid],
    queryFn: () => getUserSigils(uid!),
    // The `enabled` option ensures the query does not run until the user ID is available.
    enabled: !!uid,
  });
};