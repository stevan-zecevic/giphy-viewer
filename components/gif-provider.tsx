import { useRouter } from 'expo-router';
import { createContext, useContext, useState } from 'react';
import { AgeRatingType } from '../utils/age-rating';

export type GifType = {
  url: string;
  width: string;
  height: string;
  title: string;
  bitly_url: string;
  rating: AgeRatingType;
};

type GifContextType = {
  gif: GifType | null;
  selectGif: (gif: GifType) => void;
};

const GifContext = createContext<GifContextType>({
  gif: null,
  selectGif: (gif: GifType) => {},
});

export const GifProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [gif, setGif] = useState<GifType | null>(null);

  const selectGif = (gif: GifType) => {
    setGif(gif);
    router.push('/gif');
  };

  return <GifContext.Provider value={{ gif, selectGif }}>{children}</GifContext.Provider>;
};

export const useGif = () => {
  const context = useContext(GifContext);
  if (!context) {
    throw new Error('useGif must be used within a GifProvider');
  }

  return context;
};
