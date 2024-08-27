import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useThemeV1 } from '../../core/themes/v1/themeContext';

const CloseIconMini = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useThemeV1();
  const svgColor = color ?? colors.iconPrimaryColor;

  return (
    <Svg style={[styles.icon, style]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none">
      <Path d="M9 9L3 3" stroke={svgColor} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M3 9L9 3" stroke={svgColor} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 12,
    height: 12,
  },
});

export default CloseIconMini;
