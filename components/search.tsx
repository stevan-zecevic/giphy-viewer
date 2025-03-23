import clsx from 'clsx';
import React, { forwardRef } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SearchIcon } from '../icons/search-icon';
import { XIcon } from '../icons/x-icon';

type Props = {
  ref: React.RefObject<TextInput>;
  isFocused: boolean;
  value: string;
  onChange: (text: string) => void;
  onFocus: () => void;
  onCancel: () => void;
  className?: string;
};

export const Search = forwardRef<TextInput, Props>(
  ({ isFocused, value, onChange, onFocus, onCancel, className }, ref) => (
    <View className="h-12 w-full flex-row justify-start items-center gap-x-4" testID="search">
      <View
        className={clsx(
          'h-full flex-row flex-[4] items-center justify-start gap-x-2 px-4 border border-gray-100 bg-gray-100 rounded-2xl',
          {
            '!max-w-full !border-blue-500 !bg-white': isFocused,
          },
          className,
        )}
      >
        <SearchIcon width={24} height={24} color={isFocused ? '#000' : '#757575'} />
        <TextInput
          testID="search-input"
          ref={ref}
          className="flex-1 py-2"
          placeholder="Search GIFs"
          placeholderTextColor="#9ca3af"
          value={value}
          onChangeText={onChange}
          onFocus={onFocus}
        />
        {value.length > 0 && <XIcon width={24} height={24} color="#757575" onPress={() => onChange('')} />}
      </View>
      {isFocused && (
        <TouchableOpacity
          testID="search-cancel-button"
          className="flex-1 h-full flex-row items-center justify-center px-4 py-2 rounded-2xl bg-gray-100"
          onPress={() => onCancel()}
        >
          <Text>Cancel</Text>
        </TouchableOpacity>
      )}
    </View>
  ),
);

Search.displayName = 'Search';
