import React from 'react';
import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { useTheme } from '../../../core/themes/themeContext';

const MapPinIcon = ({ style }: { style?: StyleProp<ViewStyle> }): JSX.Element => {
  const { colors } = useTheme();

  return (
    <Svg xmlns="http://www.w3.org/2000/svg" style={[styles.icon, style]} fill="none" viewBox="0 0 48 48">
      <Path d="M24 31V44" stroke="#B4B4B4" strokeWidth={4} strokeLinecap="round" />
      <Circle cx={24} cy={18} r={12} fill={colors.primaryColor} stroke="white" strokeWidth={4} />
      <Path d="M17 16C17.5 14.5 20 11 23 11" stroke="white" strokeWidth={2.5} strokeLinecap="round" />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 48,
    height: 48,
  },
});

export default MapPinIcon;
