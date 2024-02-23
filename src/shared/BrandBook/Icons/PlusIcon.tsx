import React from 'react';
import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import sizes from '../../../core/themes/sizes';
import { useTheme } from '../../../core/themes/themeContext';

const PlusIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.primaryColor;

  return (
    <Svg style={[styles.icon, style]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <Path d="M20 12L4 12" stroke={svgColor} strokeWidth={2} strokeLinecap="round" />
      <Path d="M12 20L12 4" stroke={svgColor} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: sizes.iconSize,
    height: sizes.iconSize,
  },
});

export default PlusIcon;
