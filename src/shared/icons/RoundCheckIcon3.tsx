import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Ellipse, Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const RoundCheckIcon3 = ({
  style,
  innerColor,
  outerColor,
}: {
  style?: StyleProp<ViewStyle>;
  innerColor?: string;
  outerColor?: string;
}): JSX.Element => {
  const { colors } = useTheme();

  const innerSvgColor = innerColor ?? colors.iconPrimaryColor;
  const outerSvgColor = outerColor ?? colors.primaryColor;

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 35 35" fill="none">
      <Ellipse cx={17.2664} cy={17.2765} rx={17.2664} ry={17.2765} fill={outerSvgColor} />
      <Path d="M13 18.5945L14.6989 20.1307L21.3928 14" stroke={innerSvgColor} strokeWidth={3} strokeLinecap="round" />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 35,
    height: 35,
  },
});

export default RoundCheckIcon3;
