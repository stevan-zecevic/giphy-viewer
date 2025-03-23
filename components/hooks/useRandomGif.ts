import { api } from '@/utils/api';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useRandomGif = () => {
  return useSuspenseQuery({
    queryKey: ['random-gif'],
    queryFn: api.fetchRandomGif,
    refetchInterval: 10000,
  });
};
