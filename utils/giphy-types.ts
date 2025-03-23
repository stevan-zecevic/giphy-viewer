import { AgeRatingType } from '@/utils/age-rating';

type ImageType = {
  url: string;
  width: string;
  height: string;
};

export type RandomGifResponse = {
  data: {
    images: {
      original: ImageType;
    };
    title: string;
    bitly_url: string;
    rating: AgeRatingType;
  };
};

export type SearchGifResponse = {
  data: {
    id: string;
    images: {
      original: ImageType;
      fixed_width_small: ImageType;
    };
    title: string;
    bitly_url: string;
    rating: AgeRatingType;
  }[];
};
