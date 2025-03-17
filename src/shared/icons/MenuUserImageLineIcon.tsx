import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const MenuUserImageLineIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.primaryColor;

  return (
    <Svg
      style={[styles.MenuUserImageLineIcon, style]}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 72"
      fill="none"
    >
      <Path
        d="M51 1H23C10.8497 1 1 10.8497 1 23V49C1 61.1503 10.8497 71 23 71H36.0936"
        stroke={svgColor}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  MenuUserImageLineIcon: {
    width: 52,
    height: 72,
  },
});

export default MenuUserImageLineIcon;
