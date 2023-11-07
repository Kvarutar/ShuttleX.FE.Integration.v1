import React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { type StyleProps } from '../../../utils/react-native-props';

const BrandFavIcon = ({ style }: StyleProps): JSX.Element => (
  <Svg style={[styles.BrandFavIcon, style]} xmlns="http://www.w3.org/2000/svg" fill="none">
    <Path
      fill="#000"
      fillRule="evenodd"
      d="M57.473 2.436A24.315 24.315 0 0 0 48.709.813H24.662C11.135.813.168 11.841.168 25.447v24.24c0 5.293 1.66 10.197 4.486 14.213l16.108-17.604a4.947 4.947 0 0 0-.195-6.875l-7.84-7.64c-2.914-2.84-2.987-7.518-.163-10.45a7.32 7.32 0 0 1 10.391-.164l7.84 7.64c7.63 7.436 7.977 19.633.782 27.497L16.404 72.885c2.58.93 5.36 1.436 8.259 1.436h24.046c13.528 0 24.495-11.03 24.495-24.634v-24.24c0-5.11-1.547-9.856-4.195-13.79l-15.6 17.05a4.947 4.947 0 0 0 .195 6.874l7.84 7.639c2.913 2.84 2.987 7.519.162 10.45a7.32 7.32 0 0 1-10.391.164l-7.839-7.64c-7.63-7.436-7.977-19.633-.783-27.496l14.88-16.262Z"
      clipRule="evenodd"
    />
  </Svg>
);

const styles = StyleSheet.create({
  BrandFavIcon: {
    width: 73,
    height: 73,
  },
});

export default BrandFavIcon;
