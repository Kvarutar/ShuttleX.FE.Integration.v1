import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const ClockIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconPrimaryColor;

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 16 16" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM8 14.5405C4.38779 14.5405 1.45951 11.6122 1.45951 8C1.45951 4.38779 4.38779 1.45951 8 1.45951C11.6122 1.45951 14.5405 4.38779 14.5405 8C14.5405 11.6122 11.6122 14.5405 8 14.5405Z"
        fill={svgColor}
      />
      <Path
        d="M7.99973 2.91016C7.59806 2.91016 7.27246 3.23576 7.27246 3.63743V8.34048C7.27246 8.34048 7.27246 8.53008 7.36461 8.6727C7.42628 8.79365 7.52242 8.89874 7.64875 8.97168L11.0086 10.9115C11.3565 11.1123 11.8013 10.9931 12.0021 10.6453C12.2029 10.2974 12.0837 9.85263 11.7359 9.65183L8.72701 7.91467V3.63743C8.72701 3.23577 8.40141 2.91016 7.99973 2.91016Z"
        fill={svgColor}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 16,
    height: 16,
  },
});

export default ClockIcon;
