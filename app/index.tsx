import { Loader } from '@/components/loader';
import { RandomGif } from '@/components/random-gif';
import { Search } from '@/components/search';
import { SearchGifs } from '@/components/search-gifs';
import { api } from '@/utils/api';
import { Suspense, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';

type SearchType = Parameters<typeof api.fetchSearchGif>[0];

const HomeScreen = () => {
  const searchRef = useRef<TextInput>(null);

  const [search, setSearch] = useState<SearchType>('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const showRandomGif = !isSearchFocused && !search;
  const showSearchResults = isSearchFocused;

  return (
    <View className="flex-1 bg-white">
      <Search
        ref={searchRef}
        isFocused={isSearchFocused}
        value={search}
        onChange={(text) => setSearch(text)}
        onFocus={() => setIsSearchFocused(true)}
        onCancel={() => {
          setIsSearchFocused(false);
          setSearch('');
          searchRef.current?.blur();
        }}
      />

      <View className="flex-1 pt-8">
        {showRandomGif && (
          <Suspense fallback={<Loader.Random />}>
            <RandomGif />
          </Suspense>
        )}
        {showSearchResults && (
          <Suspense fallback={<Loader.Results />}>
            <SearchGifs search={search} />
          </Suspense>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;
