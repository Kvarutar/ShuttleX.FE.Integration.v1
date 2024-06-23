import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import sizes from '../../core/themes/sizes';
import { useTheme } from '../../core/themes/themeContext';

const ShortArrowIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconPrimaryColor;

  return (
    <Svg style={[styles.BackIcon, style]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <Path
        d="M13.0102 16.5962L9.0358 12.4132C8.67391 12.0324 8.66848 11.4364 9.02337 11.049L13.0102 6.69674"
        stroke={svgColor}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  BackIcon: {
    width: sizes.iconSize,
    height: sizes.iconSize,
  },
});

export default ShortArrowIcon;
