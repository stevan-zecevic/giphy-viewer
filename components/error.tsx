import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
  refetch: () => void;
}

export const Error = ({ refetch }: Props) => (
  <View className="flex-1 justify-center items-center">
    <Text className="text-red-500 text-2xl font-bold mb-4">Error trying to load GIF/s</Text>

    <TouchableOpacity
      onPress={() => refetch()}
      className="h-11 w-fit bg-blue-500 p-2 items-center justify-center rounded-md"
    >
      <Text className="text-white">Retry</Text>
    </TouchableOpacity>
  </View>
);
