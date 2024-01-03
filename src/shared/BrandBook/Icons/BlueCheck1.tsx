import React from 'react';
import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import sizes from '../../../core/themes/sizes';

const BlueCheck1 = ({ style }: { style?: StyleProp<ViewStyle> }): JSX.Element => (
  <Svg style={[styles.BlueCheck1, style]} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
    <Circle cx={12} cy={12} r={10} fill="#5295F7" />
    <Path d="M12 8V12.1484L15 15" stroke="white" strokeWidth={1.5} strokeLinecap="round" />
  </Svg>
);

const styles = StyleSheet.create({
  BlueCheck1: {
    width: sizes.iconSize,
    height: sizes.iconSize,
  },
});

export default BlueCheck1;
