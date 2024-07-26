import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Mask, Path, Rect } from 'react-native-svg';

import sizes from '../../core/themes/sizes';
import { useTheme } from '../../core/themes/themeContext';

const PreferencesIcon = ({ style }: { style?: StyleProp<ViewStyle> }): JSX.Element => {
  const { colors } = useTheme();

  return (
    <Svg xmlns="http://www.w3.org/2000/svg" style={[styles.PreferencesIcon, style]} fill="none" viewBox="0 0 24 24">
      <Path d="M19.0779 7.54297H5" stroke={colors.iconPrimaryColor} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M18.7192 12.9995L5 13.0434" stroke={colors.iconPrimaryColor} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M15.9116 18.523L5 18.5669" stroke={colors.iconPrimaryColor} strokeWidth={1.5} strokeLinecap="round" />
      <Mask id="path-4-inside-1_115_1740" fill="white">
        <Rect x={14} y={10} width={6} height={6} rx={1} />
      </Mask>
      <Rect
        x={14}
        y={10}
        width={6}
        height={6}
        rx={1}
        fill={colors.backgroundPrimaryColor}
        stroke={colors.iconPrimaryColor}
        strokeWidth={3}
        mask="url(#path-4-inside-1_115_1740)"
      />
      <Mask id="path-5-inside-2_115_1740" fill="white">
        <Rect x={4} y={4} width={6} height={6} rx={1} />
      </Mask>
      <Rect
        x={4}
        y={4}
        width={6}
        height={6}
        rx={1}
        fill={colors.backgroundPrimaryColor}
        stroke={colors.iconPrimaryColor}
        strokeWidth={3}
        mask="url(#path-5-inside-2_115_1740)"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  PreferencesIcon: {
    width: sizes.iconSize,
    height: sizes.iconSize,
  },
});

export default PreferencesIcon;
