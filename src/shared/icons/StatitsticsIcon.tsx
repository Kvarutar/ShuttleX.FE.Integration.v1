import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Mask, Rect } from 'react-native-svg';

import sizes from '../../core/themes/sizes';
import { useThemeV1 } from '../../core/themes/v1/themeContext';

const StatisticsIcon = ({ style }: { style?: StyleProp<ViewStyle> }): JSX.Element => {
  const { colors } = useThemeV1();

  return (
    <Svg xmlns="http://www.w3.org/2000/svg" style={[styles.StatisticsIcon, style]} fill="none" viewBox="0 0 24 24">
      <Mask id="path-1-inside-1_775_764" fill="white">
        <Rect x={2} y={12} width={6} height={8} rx={1} />
      </Mask>
      <Rect
        x={2}
        y={12}
        width={6}
        height={8}
        rx={1}
        stroke={colors.iconPrimaryColor}
        strokeWidth={3}
        mask="url(#path-1-inside-1_775_764)"
      />
      <Mask id="path-2-inside-2_775_764" fill="white">
        <Rect x={16} y={4} width={6} height={16} rx={1} />
      </Mask>
      <Rect
        x={16}
        y={4}
        width={6}
        height={16}
        rx={1}
        stroke={colors.iconPrimaryColor}
        strokeWidth={3}
        mask="url(#path-2-inside-2_775_764)"
      />
      <Mask id="path-3-inside-3_775_764" fill="white">
        <Rect x={9} y={8} width={6} height={12} rx={1} />
      </Mask>
      <Rect
        x={9}
        y={8}
        width={6}
        height={12}
        rx={1}
        stroke={colors.iconPrimaryColor}
        strokeWidth={3}
        mask="url(#path-3-inside-3_775_764)"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  StatisticsIcon: {
    width: sizes.iconSize,
    height: sizes.iconSize,
  },
});

export default StatisticsIcon;
