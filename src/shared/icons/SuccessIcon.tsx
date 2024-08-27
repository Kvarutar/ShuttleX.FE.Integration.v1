import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { useThemeV1 } from '../../core/themes/v1/themeContext';

const SuccessIcon = ({ style }: { style?: StyleProp<ViewStyle> }): JSX.Element => {
  const { colors } = useThemeV1();

  return (
    <Svg style={[styles.icon, style]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none">
      <Circle cx={40} cy={40} r={34.5} stroke={colors.iconPrimaryColor} strokeWidth={3} />
      <Path
        d="M26 40.7548L32.8311 47.4046C34.3338 48.8673 36.7111 48.9213 38.2785 47.5281L58 30"
        stroke={colors.primaryColor}
        strokeWidth={3}
        strokeLinecap="round"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 80,
    height: 80,
  },
});

export default SuccessIcon;
