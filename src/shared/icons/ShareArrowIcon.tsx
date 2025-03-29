import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const ShareArrowIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconPrimaryColor;

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 20 17" fill="none">
      <Path
        d="M11.2931 4.73188V0L16.1255 5.14625L20 9.27243L16.0567 12.7721L11.2931 17V12.3698C2.93003 11.6985 0 16.8524 0 16.8524C0 13.6413 0.248446 10.3089 2.61896 7.78552C5.37447 4.84996 9.36502 4.64223 11.2931 4.73188Z"
        fill={svgColor}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 17,
  },
});

export default ShareArrowIcon;
