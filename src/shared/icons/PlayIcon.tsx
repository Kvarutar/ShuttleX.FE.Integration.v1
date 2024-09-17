import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/v2/themeContext';

const PlayIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }) => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconPrimaryColor;
  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 10 13" fill="black" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M8.94293 5.56313C9.47287 5.96323 9.47287 6.7592 8.94293 7.1593L1.85255 12.5125C1.19372 13.0099 0.249999 12.5399 0.249999 11.7144L0.25 1.008C0.25 0.182484 1.19372 -0.287495 1.85255 0.209919L8.94293 5.56313Z"
        stroke={svgColor}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 10,
    height: 13,
  },
});

export default PlayIcon;
