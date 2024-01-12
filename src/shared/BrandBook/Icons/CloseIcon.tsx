import React from 'react';
import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

import sizes from '../../../core/themes/sizes';
import { useTheme } from '../../../core/themes/themeContext';

const CloseIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconPrimaryColor;

  return (
    <Svg style={[styles.CloseIcon, style]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#clip0_117_2818)">
        <Path d="M18.3642 18.3848L5.98985 6.01043" stroke={svgColor} strokeWidth={2} strokeLinecap="round" />
        <Path d="M5.6357 18.3847L18.0101 6.01036" stroke={svgColor} strokeWidth={2} strokeLinecap="round" />
      </G>
      <Defs>
        <ClipPath id="clip0_117_2818">
          <Rect width={24} height={24} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

const styles = StyleSheet.create({
  CloseIcon: {
    width: sizes.iconSize,
    height: sizes.iconSize,
  },
});

export default CloseIcon;
