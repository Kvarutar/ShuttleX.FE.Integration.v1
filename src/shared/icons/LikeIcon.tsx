import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const LikeIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconPrimaryColor;

  return (
    <Svg style={[styles.LikeIcon, style]} viewBox="0 0 27 22" fill="none">
      <Path
        d="M18.7544 0.000517495C16.5705 -0.0116931 14.4947 0.952945 13.0882 2.63365C11.6903 0.941607 9.60845 -0.0256481 7.42185 0.000517495C3.32265 0.000517495 0 3.34361 0 7.46818C0 14.5355 12.2601 21.4362 12.7566 21.7031C12.9573 21.8383 13.219 21.8383 13.4197 21.7031C13.9162 21.4362 26.1763 14.6358 26.1763 7.46818C26.1763 3.34361 22.8537 0.000517495 18.7544 0.000517495Z"
        fill={svgColor}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  LikeIcon: {
    width: 27,
    height: 22,
  },
});

export default LikeIcon;
