import React from 'react';
import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const ArrowIcon = ({ style }: { style?: StyleProp<ViewStyle> }): JSX.Element => (
  <Svg xmlns="http://www.w3.org/2000/svg" style={[styles.ArrowIcon, style]} fill="none">
    <Path stroke="#000" strokeLinecap="round" strokeWidth={1.5} d="m4 6.975 3.274 3.113a1 1 0 0 0 1.364.013L12 7.025" />
  </Svg>
);

const styles = StyleSheet.create({
  ArrowIcon: {
    width: 16,
    height: 16,
  },
});

export default ArrowIcon;
