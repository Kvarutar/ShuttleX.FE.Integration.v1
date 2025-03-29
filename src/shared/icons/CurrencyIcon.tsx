import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import sizes from '../../core/themes/sizes';
import { useTheme } from '../../core/themes/themeContext';

const CurrencyIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconSecondaryColor;

  return (
    <Svg style={[styles.CurrencyIcon, style]} viewBox="0 0 24 24" fill="none">
      <Circle cx={11.5} cy={12.5} r={8.75} stroke={svgColor} strokeWidth={1.5} />
      <Path
        d="M14 9.82837L12.5472 8.24889C11.9174 7.56415 10.8472 7.53255 10.1781 8.17894V8.17894C9.52543 8.80947 9.5019 9.8479 10.1254 10.5073L12.8318 13.3699C13.4782 14.0536 13.4515 15.1309 12.7719 15.7817V15.7817C12.0754 16.4489 10.9656 16.409 10.3187 15.6937L9 14.2355"
        stroke={svgColor}
        strokeWidth={1.25}
        strokeLinecap="round"
      />
      <Path d="M11.5 6V18" stroke={svgColor} strokeWidth={1.25} strokeLinecap="round" />
    </Svg>
  );
};

const styles = StyleSheet.create({
  CurrencyIcon: {
    width: sizes.iconSize,
    height: sizes.iconSize,
  },
});

export default CurrencyIcon;
