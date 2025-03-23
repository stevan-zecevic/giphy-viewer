import { GifProvider, GifType, useGif } from '@/components/gif-provider';
import { act, render, renderHook, screen } from '@testing-library/react-native';
import { FC, ReactNode } from 'react';
import GifScreen from '../app/gif';

const mockGif: GifType = {
  url: 'https://example.com/gif.gif',
  width: '500',
  height: '300',
  title: 'Test GIF',
  bitly_url: 'https://example.com/bitly',
  rating: 'g',
};

// Mock the routerrenderHook,
jest.mock('expo-router', () => ({
  useRouter: () => ({
    back: jest.fn(),
    push: jest.fn(),
  }),
}));

describe('GifScreen', () => {
  let wrapper: FC<{ children: ReactNode }>;

  beforeEach(() => {
    wrapper = ({ children }: { children: ReactNode }) => <GifProvider>{children}</GifProvider>;

    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('provides initial state with gif as null', () => {
    const { result } = renderHook(() => useGif(), { wrapper });
    expect(result.current.gif).toBeNull();
  });

  it('shows "No GIF selected" when no gif is in context', async () => {
    render(<GifScreen />);

    const noGifMessage = await screen.findByText('No GIF selected');
    expect(noGifMessage).toBeTruthy();
  });

  it('fills the gif context with the selected gif', async () => {
    const { result } = renderHook(() => useGif(), { wrapper });

    await act(async () => {
      result.current.selectGif(mockGif);
    });

    expect(result.current.gif?.title).toBe(mockGif.title);
  });
});
