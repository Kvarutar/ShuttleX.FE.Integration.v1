import React from 'react';
import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import sizes from '../../../core/themes/sizes';
import { useTheme } from '../../../core/themes/themeContext';

const ClockIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconSecondaryColor;

  return (
    <Svg style={[styles.ClockIcon, style]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <Circle cx={11.5} cy={11.5} r={8.75} stroke={svgColor} strokeWidth={1.5} />
      <Path d="M11.5 7.40234V11.5009L14.3174 14.3182" stroke={svgColor} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
};

const styles = StyleSheet.create({
  ClockIcon: {
    width: sizes.iconSize,
    height: sizes.iconSize,
  },
});

export default ClockIcon;
