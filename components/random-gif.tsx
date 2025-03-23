import { Text, View } from 'react-native';

import { Error } from '@/components/error';
import { Gif } from '@/components/gif';
import { useRandomGif } from '@/components/hooks/useRandomGif';
import { useQueryClient } from '@tanstack/react-query';

export const RandomGif = () => {
  const queryClient = useQueryClient();

  const { data, isError, isRefetching, refetch } = useRandomGif();

  if (isError && !isRefetching) {
    return (
      <Error
        refetch={() => {
          queryClient.removeQueries({ queryKey: ['random-gif'] }); // Remove cached data and show loading spinner again
          refetch();
        }}
      />
    );
  }

  return (
    <View className="h-fit" data-testid="random-gif">
      <Text className="text-xl mb-4">Random selected GIF:</Text>
      <Gif
        url={data.data.images.original.url}
        width={data.data.images.original.width}
        height={data.data.images.original.height}
        title={data.data.title}
        bitly_url={data.data.bitly_url}
        rating={data.data.rating}
      />
    </View>
  );
};
