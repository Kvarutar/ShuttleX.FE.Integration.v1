import React from 'react';
import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import sizes from '../../../core/themes/sizes';
import { useTheme } from '../../../core/themes/themeContext';

const LocationIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconSecondaryColor;

  return (
    <Svg style={[styles.LocationIcon, style]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <Circle cx={11.5} cy={9} r={2.25} stroke={svgColor} strokeWidth={1.5} />
      <Path
        d="M17.9116 12C17.9116 14.6227 17.1491 16.9659 15.9542 18.6344C14.7584 20.3042 13.1734 21.25 11.5 21.25C9.82656 21.25 8.24157 20.3042 7.04572 18.6344C5.85083 16.9659 5.08838 14.6227 5.08838 12C5.08838 9.3773 5.85083 7.03409 7.04572 5.36562C8.24157 3.69581 9.82656 2.75 11.5 2.75C13.1734 2.75 14.7584 3.69581 15.9542 5.36562C17.1491 7.03409 17.9116 9.3773 17.9116 12Z"
        stroke={svgColor}
        strokeWidth={1.5}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  LocationIcon: {
    width: sizes.iconSize,
    height: sizes.iconSize,
  },
});

export default LocationIcon;
