import { ActivityIndicator, Text, View } from 'react-native';

const Results = () => (
  <View className="flex-1">
    <Text className="h-fit text-xl mb-4">Search results:</Text>
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#3b82f6" className="mb-3" />
      <Text>Loading GIFs...</Text>
    </View>
  </View>
);

const Random = () => (
  <View className="flex-1">
    <Text className="h-fit text-xl mb-4">Random selected GIF:</Text>
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#3b82f6" className="mb-3" />
      <Text>Loading Random GIF...</Text>
    </View>
  </View>
);

export const Loader = {
  Results,
  Random,
};
