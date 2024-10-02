import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/v2/themeContext';

const BigCameraIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.primaryColor;

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 96 86" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M3 67V29c0-5.6 0-8.4 1.09-10.54a10 10 0 014.37-4.37C10.6 13 13.4 13 19 13h5.273c.615 0 .922 0 1.206-.033a5 5 0 003.62-2.237c.155-.239.293-.514.568-1.063.55-1.1.824-1.65 1.136-2.128a10 10 0 017.24-4.474C38.608 3 39.223 3 40.453 3h15.093c1.23 0 1.845 0 2.412.065a10 10 0 017.239 4.474c.311.478.587 1.028 1.136 2.128.275.55.413.824.569 1.063a5 5 0 003.619 2.237c.284.033.591.033 1.206.033H77c5.6 0 8.401 0 10.54 1.09a10 10 0 014.37 4.37C93 20.6 93 23.4 93 29v38c0 5.6 0 8.401-1.09 10.54a9.998 9.998 0 01-4.37 4.37C85.401 83 82.6 83 77 83H19c-5.6 0-8.4 0-10.54-1.09a9.999 9.999 0 01-4.37-4.37C3 75.401 3 72.6 3 67z"
        fill="#F6FFD3"
        stroke={svgColor}
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M48 63c8.285 0 15-6.715 15-15s-6.715-15-15-15-15 6.715-15 15 6.715 15 15 15z"
        fill="#fff"
        stroke={svgColor}
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 96,
    height: 86,
  },
});

export default BigCameraIcon;
