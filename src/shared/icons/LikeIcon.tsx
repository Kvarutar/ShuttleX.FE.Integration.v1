import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useThemeV1 } from '../../core/themes/v1/themeContext';

const LikeIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useThemeV1();
  const svgColor = color ?? colors.primaryColor;

  return (
    <Svg style={[styles.LikeIcon, style]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" fill="none">
      <Path
        d="M21.4936 4.00058C18.9911 3.98712 16.612 5.09341 15 7.02021C13.398 5.08024 11.0123 3.97081 8.50628 4.00058C3.80838 4.00058 0 7.83392 0 12.5626C0 20.666 14.0506 28.5782 14.6203 28.8841C14.8501 29.0386 15.1498 29.0386 15.3797 28.8841C15.9494 28.5782 30 20.7807 30 12.5626C30 7.83392 26.1916 4.00058 21.4936 4.00058Z"
        fill={svgColor}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  LikeIcon: {
    width: 30,
    height: 30,
  },
});

export default LikeIcon;
