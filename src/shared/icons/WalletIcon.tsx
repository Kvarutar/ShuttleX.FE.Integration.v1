import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

import sizes from '../../core/themes/sizes';
import { useThemeV1 } from '../../core/themes/v1/themeContext';

const WalletIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useThemeV1();
  const svgColor = color ?? colors.iconPrimaryColor;

  return (
    <Svg style={[styles.icon, style]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <Rect x={3.75} y={4.75} width={16.5} height={13.5} rx={2.25} stroke={svgColor} strokeWidth={1.5} />
      <Path
        d="M20 9H14.5C13.1193 9 12 10.1193 12 11.5V11.5C12 12.8807 13.1193 14 14.5 14H20"
        stroke={svgColor}
        strokeWidth={1.5}
      />
      <Path d="M14 11.5H16" stroke={svgColor} strokeLinecap="round" />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: sizes.iconSize,
    height: sizes.iconSize,
  },
});

export default WalletIcon;
