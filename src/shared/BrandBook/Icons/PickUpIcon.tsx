import React from 'react';
import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import sizes from '../../../core/themes/sizes';

const PickUpIcon = ({ style }: { style?: StyleProp<ViewStyle> }): JSX.Element => (
  <Svg xmlns="http://www.w3.org/2000/svg" style={[styles.PickUpIcon, style]} fill="none" viewBox="0 0 24 24">
    <Circle cx={12} cy={12} r={5.75} fill="#5295F7" stroke="#F4F4F4" strokeWidth={1.5} />
  </Svg>
);

const styles = StyleSheet.create({
  PickUpIcon: {
    width: sizes.iconSize,
    height: sizes.iconSize,
  },
});

export default PickUpIcon;
