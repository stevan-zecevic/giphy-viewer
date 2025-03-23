import React from 'react';
import { Text, View } from 'react-native';

import { Error } from '@/components/error';
import { GifList } from '@/components/gif-list';
import { useGif } from '@/components/gif-provider';
import { useSearchGifs } from '@/components/hooks/useSearchGifs';
import { api } from '@/utils/api';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  search: Parameters<typeof api.fetchSearchGif>[0];
}

export const SearchGifs = ({ search }: Props) => {
  const queryClient = useQueryClient();
  const { selectGif } = useGif();

  const { data, isError, isRefetching, refetch } = useSearchGifs(search);

  if (isError && !isRefetching) {
    return (
      <Error
        refetch={() => {
          queryClient.removeQueries({ queryKey: ['search-gifs', search] }); // Remove cached data and show loading spinner again
          refetch();
        }}
      />
    );
  }
  return (
    <View className="flex-1" data-testid="search-gifs">
      <Text className="text-xl mb-4">Search results:</Text>
      {data && <GifList data={data.data} selectGif={selectGif} />}
    </View>
  );
};
