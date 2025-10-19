import React from 'react';
import { useArchetypes } from '../hooks/useArchetypes';
import { useUserProfile } from '../hooks/useUserProfile';
import { useToggleFavoriteArchetype } from '../hooks/useToggleFavoriteArchetype';
import { Archetype } from '../data/archetypeData';

const ArchetypeCard: React.FC<{
  archetype: Archetype;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  isMutating: boolean;
}> = ({ archetype, isFavorite, onToggleFavorite, isMutating }) => (
  <div className="content-card glass-effect mb-6 overflow-hidden transform transition-transform hover:scale-105">
    <img src={archetype.imageUrl} alt={archetype.name} className="w-full h-48 object-cover" />
    <div className="p-4">
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-300 mb-2">{archetype.name}</h2>
        <button
          onClick={onToggleFavorite}
          disabled={isMutating}
          className="p-2 rounded-full hover:bg-yellow-400/20 transition-colors disabled:opacity-50"
          aria-label={isFavorite ? 'Desfavoritar' : 'Favoritar'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isFavorite ? 'text-yellow-400' : 'text-gray-400'}`} fill={isFavorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118L2.05 10.1c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.95-.69L11.049 2.927z" />
          </svg>
        </button>
      </div>
      <h3 className="text-lg font-semibold text-amber-200 mb-2">{archetype.title}</h3>
      <p className="text-gray-300">{archetype.description}</p>
    </div>
  </div>
);

const PanteaoPage: React.FC = () => {
    const { data: archetypes, isLoading: isLoadingArchetypes, error: errorArchetypes } = useArchetypes();
    const { data: userProfile, isLoading: isLoadingProfile, error: errorProfile } = useUserProfile();
    const { mutate: toggleFavorite, isPending: isMutating } = useToggleFavoriteArchetype();

    if (isLoadingArchetypes || isLoadingProfile) {
        return <div className="text-center p-10">Carregando o Panteão...</div>;
    }

    if (errorArchetypes || errorProfile) {
        return <div className="text-center p-10 text-red-500">Erro ao carregar dados. Tente novamente mais tarde.</div>;
    }

    const favoriteArchetypeIds = new Set(userProfile?.favoriteArchetypes || []);

    return (
        <section className="content-panel p-6">
            <h1 className="page-title text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-300">O Panteão</h1>
            <p className="page-subtitle">Conecte-se com os arquétipos que ressoam com sua jornada. Favorite aqueles que te guiam.</p>

            <div className="mt-8">
                {archetypes?.map(archetype => (
                    <ArchetypeCard
                        key={archetype.id}
                        archetype={archetype}
                        isFavorite={favoriteArchetypeIds.has(archetype.id)}
                        onToggleFavorite={() => toggleFavorite(archetype.id)}
                        isMutating={isMutating}
                    />
                ))}
            </div>
        </section>
    );
};

export default PanteaoPage;