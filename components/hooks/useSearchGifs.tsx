import { api } from '@/utils/api';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useSearchGifs = (search: string) => {
  return useSuspenseQuery({
    queryKey: ['search-gifs', search],
    queryFn: () => (search.length >= 2 ? api.fetchSearchGif(search) : null),
  });
};
