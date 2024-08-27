import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import sizes from '../../core/themes/sizes';
import { useThemeV1 } from '../../core/themes/v1/themeContext';

const SvgComponent = ({ style }: { style?: StyleProp<ViewStyle> }) => {
  const { colors } = useThemeV1();

  return (
    <Svg style={[styles.timeIcon, style]} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Circle cx={12} cy={12} r={8.25} stroke={colors.iconPrimaryColor} strokeWidth={1.5} />
      <Path d="M12 7v4a1 1 0 001 1h2" stroke={colors.iconPrimaryColor} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
};

const styles = StyleSheet.create({
  timeIcon: {
    width: sizes.iconSize,
    height: sizes.iconSize,
  },
});

export default SvgComponent;
