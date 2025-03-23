import HomeScreen from '@/app/index';
import { RandomGifResponse, SearchGifResponse } from '@/utils/giphy-types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import React, { FC, ReactNode, Suspense } from 'react';

const randomResponse: RandomGifResponse = {
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

const searchResponse: SearchGifResponse = {
  data: [
    {
      images: {
        original: { url: 'https://example.com/search.gif', width: '500', height: '300' },
        fixed_width_small: { url: 'https://example.com/search.gif', width: '200', height: '150' },
      },
      title: 'Search GIF',
      bitly_url: 'https://example.com/bitly',
      rating: 'g',
      id: '123',
    },
  ],
};

const server = setupServer(
  http.get('https://api.giphy.com/v1/gifs/random', () => {
    return HttpResponse.json(randomResponse);
  }),
  http.get('https://api.giphy.com/v1/gifs/search', () => {
    return HttpResponse.json(searchResponse);
  }),
);

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => server.close());

describe('HomeScreen', () => {
  let queryClient: QueryClient;
  let wrapper: FC<{ children: ReactNode }>;

  beforeEach(() => {
    queryClient = new QueryClient();

    wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={null}>{children}</Suspense>
      </QueryClientProvider>
    );
  });

  test('shows random GIF section initially', async () => {
    render(<HomeScreen />, { wrapper });

    // Verify random GIF section is visible
    const randomTitle = await screen.findByText(/Random selected GIF/i);
    expect(randomTitle).toBeTruthy();

    // Verify search results are not shown
    expect(screen.queryByText(/Search results/i)).toBeNull();
  });

  test('switches to search results when search is focused', async () => {
    render(<HomeScreen />, { wrapper });

    // Find search input and focus it
    const searchInput = await screen.findByPlaceholderText(/Search GIFs/i);
    expect(searchInput).toBeTruthy();

    await act(async () => {
      fireEvent(searchInput, 'focus');
    });

    // Verify search results are now visible
    const resultsTitle = await screen.findByText(/Search results/i);
    expect(resultsTitle).toBeTruthy();

    // Verify random GIF section is hidden
    expect(screen.queryByText(/Random selected GIF/i)).toBeNull();
  });

  test('clears search and returns to random GIF when cancel is pressed', async () => {
    render(<HomeScreen />, { wrapper });

    // Find search input, focus it and type
    const searchInput = await screen.findByPlaceholderText(/Search/i);
    await act(async () => {
      fireEvent(searchInput, 'focus');
      fireEvent.changeText(searchInput, 'test');
    });

    // Find and press cancel button
    const cancelButton = await screen.findByTestId('search-cancel-button');
    await act(async () => {
      fireEvent.press(cancelButton);
    });

    // Verify we're back to random GIF
    const randomTitle = await screen.findByText(/Random selected GIF/i);
    expect(randomTitle).toBeTruthy();

    // Verify search input is cleared
    expect(searchInput.props.value).toBe('');
  });
});
