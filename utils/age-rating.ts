export type AgeRatingType = 'g' | 'pg' | 'pg-13' | 'r' | 'y';

const AgeRatingMap: Record<AgeRatingType, string> = {
  y: '0+',
  g: '5+',
  pg: '8+',
  'pg-13': '13+',
  r: '17+',
};

export const getAgeRating = (rating: AgeRatingType) => {
  return AgeRatingMap[rating];
};
