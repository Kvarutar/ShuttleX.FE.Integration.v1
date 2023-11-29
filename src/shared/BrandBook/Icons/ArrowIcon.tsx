import React from 'react';
import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import sizes from '../../../core/themes/sizes';

const ArrowIcon = ({ style }: { style?: StyleProp<ViewStyle> }): JSX.Element => (
  <Svg xmlns="http://www.w3.org/2000/svg" style={[styles.ArrowIcon, style]} fill="none">
    <Path
      d="M4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13L4 11ZM20.7071 12.7071C21.0976 12.3166 21.0976 11.6834 20.7071 11.2929L14.3431 4.92893C13.9526 4.53841 13.3195 4.53841 12.9289 4.92893C12.5384 5.31946 12.5384 5.95262 12.9289 6.34315L18.5858 12L12.9289 17.6569C12.5384 18.0474 12.5384 18.6805 12.9289 19.0711C13.3195 19.4616 13.9526 19.4616 14.3431 19.0711L20.7071 12.7071ZM4 13L20 13L20 11L4 11L4 13Z"
      fill="white"
    />
  </Svg>
);

const styles = StyleSheet.create({
  ArrowIcon: {
    width: sizes.iconSize,
    height: sizes.iconSize,
  },
});

export default ArrowIcon;
