import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
// Correctly import the functions from the service layer
import { getUserProfile, updateDocument } from '../services/firestore';

// This logic properly uses the functions from the service layer
const toggleFavoriteInFirestore = async (userId: string, archetypeId: string): Promise<void> => {
    console.log(`Toggling favorite for user ${userId} and archetype ${archetypeId}`);

    // 1. Get the user document using the service function
    const userProfile = await getUserProfile(userId);
    if (!userProfile) {
        throw new Error("User profile not found.");
    }

    // 2. Check if the archetype is already a favorite
    const favorites: string[] = userProfile.favoriteArchetypes || [];
    const isFavorite = favorites.includes(archetypeId);

    // 3. Add or remove it
    const newFavorites = isFavorite
        ? favorites.filter(id => id !== archetypeId)
        : [...favorites, archetypeId];

    // 4. Update the document using the service function
    await updateDocument('users', userId, { favoriteArchetypes: newFavorites });

    console.log('User favorites updated:', newFavorites);
};


export const useToggleFavoriteArchetype = () => {
  const queryClient = useQueryClient();
  const { currentUser } = useAuth();

  return useMutation({
    mutationFn: (archetypeId: string) => {
      if (!currentUser) {
        throw new Error("Usuário não autenticado");
      }
      // Call the corrected logic
      return toggleFavoriteInFirestore(currentUser.uid, archetypeId);
    },
    onSuccess: () => {
      // When the mutation is successful, invalidate the userProfile query
      // This will cause components using useUserProfile to re-fetch the data
      console.log('Invalidating userProfile query...');
      queryClient.invalidateQueries({ queryKey: ['userProfile', currentUser?.uid] });
    },
    onError: (error) => {
        console.error("Erro ao favoritar arquétipo:", error);
    }
  });
};