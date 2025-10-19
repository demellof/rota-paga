import { useQuery } from '@tanstack/react-query';
import { getNatalChart, BirthData } from '../services/astrologyService';

export const useNatalChart = (userData: BirthData | null, options = {}) => {
  return useQuery({
    queryKey: ['natalChart', userData?.dob, userData?.time, userData?.lat, userData?.lon],
    queryFn: () => {
        if (!userData) {
            // This should not happen if `enabled` is false and userData is null
            return Promise.reject(new Error("Birth data is required to fetch natal chart."));
        }
        return getNatalChart(userData)
    },
    ...options,
  });
};
