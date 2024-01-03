import React from 'react';
import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import sizes from '../../../core/themes/sizes';

const DropOffIcon = ({ style }: { style?: StyleProp<ViewStyle> }): JSX.Element => (
  <Svg xmlns="http://www.w3.org/2000/svg" style={[styles.DropOffIcon, style]} fill="none" viewBox="0 0 24 24">
    <Path d="M11.5 16V21.4167" stroke="#B4B4B4" strokeWidth={1.5} strokeLinecap="round" />
    <Circle cx={11.5} cy={9.5} r={5.75} fill="#5295F7" stroke="#F4F4F4" strokeWidth={1.5} />
    <Path
      d="M8.25 8.41667C8.43056 7.69444 9.33333 6.25 10.9583 6.25"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
);

const styles = StyleSheet.create({
  DropOffIcon: {
    width: sizes.iconSize,
    height: sizes.iconSize,
  },
});

export default DropOffIcon;
