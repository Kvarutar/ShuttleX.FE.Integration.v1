import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useThemeV1 } from '../../core/themes/v1/themeContext';

const PassengerIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useThemeV1();
  const svgColor = color ?? colors.iconSecondaryColor;

  return (
    <Svg style={[styles.PassengerIcon, style]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17" fill="none">
      <Path
        d="M5.10039 9.34863L4.85236 9.47265C3.9625 9.91758 3.40039 10.8271 3.40039 11.822V11.822C3.40039 13.2726 4.57638 14.4486 6.02703 14.4486H10.9737C12.4244 14.4486 13.6004 13.2726 13.6004 11.822V11.822C13.6004 10.8271 13.0383 9.91758 12.1484 9.47265L11.9004 9.34863"
        stroke={svgColor}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path
        d="M11.0492 5.94834V5.09834C11.0492 3.69001 9.90754 2.54834 8.49922 2.54834C7.09089 2.54834 5.94922 3.69002 5.94922 5.09834V5.94834C5.94922 7.35667 7.09089 8.49834 8.49922 8.49834C9.90754 8.49834 11.0492 7.35666 11.0492 5.94834Z"
        stroke={svgColor}
        strokeWidth={1.5}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  PassengerIcon: {
    width: 17,
    height: 17,
  },
});

export default PassengerIcon;
