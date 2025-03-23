import React from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';

import { GifType } from '@/components/gif-provider';
import { api } from '@/utils/api';

interface Props {
  data: Awaited<ReturnType<typeof api.fetchSearchGif>>['data'];
  selectGif: (gif: GifType) => void;
}

export const GifList = ({ data, selectGif }: Props) => {
  if (data.length === 0) {
    return null;
  }

  return (
    <FlatList
      numColumns={3}
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      renderItem={({ item }) => (
        <TouchableOpacity
          className="w-1/3 h-fit justify-center items-center"
          onPress={() =>
            selectGif({
              url: item.images.original.url,
              width: item.images.original.width,
              height: item.images.original.height,
              title: item.title,
              bitly_url: item.bitly_url,
              rating: item.rating,
            })
          }
        >
          <Image
            source={{
              uri: item.images.fixed_width_small.url,
            }}
            resizeMode="contain"
            className="w-[100px] h-[100px] rounded-2xl"
          />
        </TouchableOpacity>
      )}
    />
  );
};
