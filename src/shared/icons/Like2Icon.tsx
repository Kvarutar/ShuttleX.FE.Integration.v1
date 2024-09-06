import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useThemeV1 } from '../../core/themes/v1/themeContext';

const Like2Icon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useThemeV1();
  const svgColor = color ?? colors.iconSecondaryColor;

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M8.082 0.57c-0.99 1.438 -2.408 3.684 -3.112 4.706a1.3 1.3 0 0 0 -0.232 0.722c-0.026 2.67 -0.28 7.224 0.002 7.66 0.209 0.32 1.002 0.834 1.618 1.192 0.173 0.1 0.369 0.15 0.568 0.15h3.606c0.464 0 0.966 -0.398 1.159 -0.597 0.82 -1.094 2.751 -3.7 3.91 -5.371 1.07 -1.545 -0.25 -2.783 -1.217 -3.315a1 1 0 0 0 -0.49 -0.117h-2.443c-0.765 0 -1.33 -0.722 -1.154 -1.475l0.48 -2.061q0.047 -0.195 0.022 -0.393C10.524 -0.315 9.213 -0.153 8.418 0.26a0.95 0.95 0 0 0 -0.336 0.31"
        fill={svgColor}
      />
      <Path
        d="M1.185 4.799h1.778c0.655 0 1.185 0.537 1.185 1.2v7.2c0 0.662 -0.53 1.2 -1.185 1.2H1.185A1.19 1.19 0 0 1 0 13.198v-7.2c0 -0.663 0.53 -1.2 1.185 -1.2"
        fill={svgColor}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 16,
    height: 15,
  },
});

export default Like2Icon;
