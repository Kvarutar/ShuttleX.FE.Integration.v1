import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/v2/themeContext';

const ActivityIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.textSecondaryColor;

  return (
    <Svg style={[styles.icon, style]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 16" fill="none">
      <Path
        d="M1 8.35094H4.53628C4.72789 8.35094 4.89802 8.22829 4.95861 8.04649L7.26786 1.1188C7.32091 0.959655 7.5466 0.961146 7.60394 1.1188L12.4107 14.3375L12.4236 14.3728C12.4754 14.5154 12.6758 14.5185 12.7321 14.3777L14.9938 8.72354C15.0838 8.49854 15.3018 8.35094 15.5443 8.35094H19"
        stroke={svgColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 16,
  },
});

export default ActivityIcon;
