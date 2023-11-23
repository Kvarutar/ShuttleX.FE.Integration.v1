import React from 'react';
import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import sizes from '../../../core/themes/sizes';

const BackIcon = ({ style }: { style?: StyleProp<ViewStyle> }): JSX.Element => (
  <Svg style={[styles.BackIcon, style]} xmlns="http://www.w3.org/2000/svg" fill="none">
    <Path
      d="M13.0112 16.5962L9.03677 12.4132C8.67488 12.0324 8.66945 11.4364 9.02434 11.049L13.0112 6.69674"
      stroke="black"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

const styles = StyleSheet.create({
  BackIcon: {
    width: sizes.iconSize,
    height: sizes.iconSize,
  },
});

export default BackIcon;
