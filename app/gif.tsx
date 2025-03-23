import { Gif } from '@/components/gif';
import { useGif } from '@/components/gif-provider';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ChevronLeftIcon } from '../icons/chevron-left-icon';

const GifScreen = () => {
  const { gif } = useGif();

  if (!gif) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <Text>No GIF selected</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center mb-8">
        <TouchableOpacity onPress={() => router.back()} testID="back-icon">
          <ChevronLeftIcon width={24} height={24} color="#000" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-xl">{gif.title}</Text>
      </View>
      <Gif {...gif} />
    </View>
  );
};

export default GifScreen;
