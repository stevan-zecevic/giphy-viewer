import React from 'react';
import { Path, Svg, SvgProps } from 'react-native-svg';

export const ChevronLeftIcon = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
  </Svg>
);
