import { AgeRatingType, getAgeRating } from '@/utils/age-rating';
import { calculateAspectRatio } from '@/utils/helper-functions';
import { Href, Link } from 'expo-router';
import React from 'react';
import { Image, Text, View } from 'react-native';

type Props = {
  url: string;
  width: string;
  height: string;
  title: string;
  bitly_url: string;
  rating: AgeRatingType;
};

export const Gif = ({ url, width, height, title, bitly_url, rating }: Props) => (
  <View className="rounded-2xl">
    <Image
      source={{
        uri: url,
      }}
      resizeMode="contain"
      className={`w-full h-[undefined] rounded-2xl mb-4`}
      style={{
        aspectRatio: calculateAspectRatio(width, height),
      }}
    />
    <View className="flex-row items-center justify-between gap-x-2">
      <View>
        <Text className="text-sm text-gray-500">{title || 'This GIF has no title'}</Text>
        <Link href={bitly_url as Href} className="text-sm text-blue-500">
          {bitly_url.toString()}
        </Link>
      </View>
      <View className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-500">
        <Text className="text-md text-white">{getAgeRating(rating)}</Text>
      </View>
    </View>
  </View>
);
