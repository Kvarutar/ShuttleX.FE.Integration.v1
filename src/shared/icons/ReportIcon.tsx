import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import sizes from '../../core/themes/sizes';
import { useTheme } from '../../core/themes/themeContext';

const ReportIcon = ({ style }: { style?: StyleProp<ViewStyle> }): JSX.Element => {
  const { colors } = useTheme();

  const svgColor = colors.iconPrimaryColor;

  return (
    <Svg style={[styles.ReportIcon, style]} viewBox="0 0 24 22" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 0V2H24V18C24 20.209 22.209 22 20 22H4C1.791 22 0 20.209 0 18V0H20ZM20 20C21.105 20 22 19.105 22 18V4H20V18H18V2H2V18C2 19.105 2.895 20 4 20H20ZM6 4H4V7H6V4ZM4 10H6V8H4V10ZM7 4H16V6H7V4ZM16 8H7V10H16V8ZM4 12H16V14H4V12ZM16 16H4V18H16V16Z"
        fill={svgColor}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  ReportIcon: {
    width: sizes.iconSize,
    height: 22,
  },
});

export default ReportIcon;
