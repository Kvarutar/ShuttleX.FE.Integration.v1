import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useThemeV1 } from '../../core/themes/v1/themeContext';

const ShortArrowSmallIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useThemeV1();
  const svgColor = color ?? colors.iconPrimaryColor;

  return (
    <Svg style={[styles.ShortArrowSmallIcon, style]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none">
      <Path
        d="M6.97489 3.99972L10.088 7.27412C10.45 7.65483 10.4557 8.25068 10.101 8.63823L7.02515 11.9998"
        stroke={svgColor}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  ShortArrowSmallIcon: {
    width: 16,
    height: 16,
  },
});

export default ShortArrowSmallIcon;
