import React from 'react';
import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const MinusIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.primaryColor;

  return (
    <Svg style={[styles.icon, style]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 2" fill="none">
      <Path d="M17 1L1 1" stroke={svgColor} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 18,
    height: 2,
  },
});

export default MinusIcon;
