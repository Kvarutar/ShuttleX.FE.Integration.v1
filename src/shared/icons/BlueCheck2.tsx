import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const BlueCheck2 = ({ style }: { style?: StyleProp<ViewStyle> }): JSX.Element => {
  const { colors } = useTheme();

  return (
    <Svg style={[styles.BlueCheck2, style]} viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" fill="none">
      <Circle cx={18} cy={18} r={18} fill={colors.primaryColor} />
      <Path
        d="M13.5 18.6431L16.2854 21.0304C16.573 21.277 17.004 21.253 17.2625 20.976L23.4 14.4004"
        stroke="white"
        strokeWidth={2.12139}
        strokeLinecap="round"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  BlueCheck2: {
    width: 36,
    height: 36,
  },
});

export default BlueCheck2;
