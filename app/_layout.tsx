import { ErrorBoundaryProps, Stack } from 'expo-router';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { GifProvider } from '@/components/gif-provider';
import '@/global.css';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';

const queryClient = new QueryClient();

export const ErrorBoundary = ({ error, retry }: ErrorBoundaryProps) => (
  <View className="flex-1 bg-white justify-center items-center">
    <Text className="text-red-500 text-2xl font-bold mb-4">Error has occurred:</Text>
    <Text className="text-red-400 text-lg mb-10">{error.message}</Text>
    <TouchableOpacity className="p-4 rounded-md bg-gray-100" onPress={retry}>
      <Text>Try Again?</Text>
    </TouchableOpacity>
  </View>
);

const RootLayout = () => (
  <QueryClientProvider client={queryClient}>
    <GifProvider>
      <View className="flex-1 p-4 bg-white">
        <StatusBar barStyle="dark-content" />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="gif" options={{ headerShown: false }} />
        </Stack>
      </View>
    </GifProvider>
  </QueryClientProvider>
);

export default RootLayout;
