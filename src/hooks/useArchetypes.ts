import { useQuery } from '@tanstack/react-query';
import { archetypes, Archetype } from '../data/archetypeData';

// Simulates fetching data from Firestore with a delay
const fetchArchetypes = async (): Promise<Archetype[]> => {
  console.log('Fetching archetypes...');
  // In a real scenario, this would be a call to Firestore
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  console.log('Archetypes fetched:', archetypes);
  return archetypes;
};

export const useArchetypes = () => {
  return useQuery({
    queryKey: ['archetypes'],
    queryFn: fetchArchetypes,
  });
};