import React from 'react';
import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import sizes from '../../../core/themes/sizes';
import { useTheme } from '../../../core/themes/themeContext';

const BaggageIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconSecondaryColor;

  return (
    <Svg style={[styles.BaggageIcon, style]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 19.571V8.21387C4 7.66158 4.44772 7.21387 5 7.21387H20C20.5523 7.21387 21 7.66158 21 8.21387V19.571C21 20.1233 20.5523 20.571 20 20.571H5C4.44772 20.571 4 20.1233 4 19.571Z"
        stroke={svgColor}
        strokeWidth={1.25}
        strokeLinecap="round"
      />
      <Path
        d="M10.0723 5.21429C10.8818 4.36686 12.9056 2.96832 14.9294 5.21429"
        stroke={svgColor}
        strokeWidth={1.25}
        strokeLinecap="round"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  BaggageIcon: {
    width: sizes.iconSize,
    height: sizes.iconSize,
  },
});

export default BaggageIcon;
