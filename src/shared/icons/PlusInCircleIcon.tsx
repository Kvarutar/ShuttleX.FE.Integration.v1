import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

type PlusInCircleIconProps = {
  style?: StyleProp<ViewStyle>;
  color?: string;
  background?: string;
};

const PlusInCircleIcon = ({ style, color, background }: PlusInCircleIconProps): JSX.Element => {
  const { colors } = useTheme();
  const svgColorCircle = background ?? colors.errorColor;
  const svgColorPlus = color ?? colors.iconTertiaryColor;

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 16 16" fill="none">
      <Circle cx="8" cy="8" r="8" fill={svgColorCircle} />
      <Path d="M7.412 5H8.636V7.424H11.048V8.648H8.636V11.072H7.412V8.648H5V7.424H7.412V5Z" fill={svgColorPlus} />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 16,
    height: 16,
  },
});

export default PlusInCircleIcon;
