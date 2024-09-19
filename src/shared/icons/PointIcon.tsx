import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import sizes from '../../core/themes/sizes';
import { useTheme } from '../../core/themes/v2/themeContext';

const PointIcon = ({
  style,
  innerColor,
  outerColor,
}: {
  style?: StyleProp<ViewStyle>;
  innerColor?: string;
  outerColor?: string;
}): JSX.Element => {
  const { colors } = useTheme();
  const outerSvgColor = outerColor ? outerColor : colors.primaryColor;
  const innerSvgColor = innerColor ? innerColor : colors.iconPrimaryColor;

  return (
    <Svg style={[styles.DropOffIcon, style]} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path fill={outerSvgColor} d="M24 12A12 12 0 0 1 12 24A12 12 0 0 1 0 12A12 12 0 0 1 24 12z" />
      <Path
        fill={innerSvgColor}
        d="M15.36 12A3.36 3.36 0 0 1 12 15.36A3.36 3.36 0 0 1 8.64 12A3.36 3.36 0 0 1 15.36 12z"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  DropOffIcon: {
    width: sizes.iconSize,
    height: sizes.iconSize,
  },
});

export default PointIcon;
