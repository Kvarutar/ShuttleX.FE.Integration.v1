import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const PointIcon2 = ({
  style,
  innerColor,
  outerColor,
}: {
  style?: StyleProp<ViewStyle>;
  innerColor?: string;
  outerColor?: string;
}): JSX.Element => {
  const { colors } = useTheme();
  const innerSvgColor = outerColor ?? colors.textSecondaryColor;
  const outerSvgColor = innerColor ?? '#ECEFF2';

  return (
    <Svg style={[styles.DropOffIcon, style]} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Circle cx="9.5" cy="9.5" r="9.5" fill={outerSvgColor} />
      <Circle cx="9.5" cy="9.5" r="3.5" fill={innerSvgColor} />
    </Svg>
  );
};

const styles = StyleSheet.create({
  DropOffIcon: {
    width: 19,
    height: 19,
  },
});

export default PointIcon2;
