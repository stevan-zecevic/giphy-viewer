import { RandomGifResponse, SearchGifResponse } from '@/utils/giphy-types';

const fetchRandomGif = async (): Promise<RandomGifResponse> => {
  try {
    const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_API_KEY}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching random GIF:', error);

    throw error;
  }
};

const fetchSearchGif = async (search: string): Promise<SearchGifResponse> => {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${search}&limit=21`,
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching search GIF:', error);

    throw error;
  }
};

export const api = { fetchRandomGif, fetchSearchGif };
