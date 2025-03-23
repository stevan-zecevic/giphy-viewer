/// <reference types="jest" />

import { useRandomGif } from '@/components/hooks/useRandomGif';
import { RandomGifResponse } from '@/utils/giphy-types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react-native';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { FC, ReactNode, Suspense } from 'react';

const initialResponse: RandomGifResponse = {
  data: {
    images: {
      original: {
        url: 'https://example.com/initial.gif',
        width: '500',
        height: '300',
      },
    },
    title: 'Initial GIF',
    bitly_url: 'https://example.com/bitly',
    rating: 'g',
  },
};

const refetchedResponse: RandomGifResponse = {
  data: {
    images: {
      original: {
        url: 'https://example.com/refetch.gif',
        width: '500',
        height: '300',
      },
    },
    title: 'Refetched GIF',
    bitly_url: 'https://example.com/bitly',
    rating: 'g',
  },
};

let callCount = 0;

const server = setupServer(
  http.get('https://api.giphy.com/v1/gifs/random', () => {
    callCount++;

    if (callCount === 1) {
      return HttpResponse.json(initialResponse);
    }
    return HttpResponse.json(refetchedResponse);
  }),
);

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
  callCount = 0;
});

afterAll(() => server.close());

describe('useRandomGif', () => {
  let queryClient: QueryClient;
  let wrapper: FC<{ children: ReactNode }>;

  beforeEach(() => {
    jest.useFakeTimers();

    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          refetchInterval: 10000,
        },
      },
    });

    wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={null}>{children}</Suspense>
      </QueryClientProvider>
    );
  });

  afterEach(() => {
    jest.useRealTimers();
    queryClient.clear();
  });

  it('fetches initialResponse on first render', async () => {
    const { result } = renderHook(() => useRandomGif(), { wrapper });

    await waitFor(() => result.current.isSuccess || result.current.isError);
    expect(result.current.data.data.title).toBe('Initial GIF');
    expect(callCount).toBe(1);
  });

  it('refetches data after the interval', async () => {
    const { result } = renderHook(() => useRandomGif(), { wrapper });

    await waitFor(() => result.current.isSuccess || result.current.isError);
    expect(result.current.data.data.title).toBe('Initial GIF');
    expect(callCount).toBe(1);

    await act(async () => {
      jest.advanceTimersByTime(10000);
    });

    await waitFor(() => result.current.isSuccess || result.current.isError);

    expect(callCount).toBe(2);
  });
});
