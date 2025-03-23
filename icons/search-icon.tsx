import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const SearchIcon = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
    />
  </Svg>
);
