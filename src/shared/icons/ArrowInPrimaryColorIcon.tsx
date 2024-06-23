import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const ArrowInPrimaryColorIcon = ({ style }: { style?: StyleProp<ViewStyle> }): JSX.Element => {
  const { colors } = useTheme();

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" fill="none">
      <Circle cx={14} cy={14} r={14} fill={colors.primaryColor} />
      <Path
        d="M12.9749 9.99972L16.088 13.2741C16.45 13.6548 16.4557 14.2507 16.101 14.6382L13.0251 17.9998"
        stroke="white"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 28,
    height: 28,
  },
});

export default ArrowInPrimaryColorIcon;
