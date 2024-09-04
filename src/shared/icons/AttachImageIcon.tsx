import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/v2/themeContext';

const AttachImageIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconSecondaryColor;

  return (
    <Svg style={[styles.icon, style]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 17" fill="none">
      <Path
        d="M16.0003 1.43702C14.0842 -0.479372 11.0212 -0.478955 9.10561 1.43796L1.07162 9.65045C-0.381082 11.1704 -0.353319 13.6064 1.13364 15.0914C2.59613 16.552 4.93182 16.552 6.39432 15.0914L13.6692 7.65488C14.615 6.68812 14.615 5.12066 13.6692 4.1539C12.7235 3.18714 11.1901 3.18714 10.2443 4.1539L3.28571 11.2671C3.043 11.5239 3.04997 11.9333 3.30128 12.1814C3.54643 12.4235 3.93507 12.4235 4.18023 12.1814L11.1388 5.06826C11.6002 4.61638 12.3327 4.63249 12.7747 5.10418C13.2034 5.56162 13.2034 6.28308 12.7747 6.74052L5.49983 14.177C4.51705 15.1673 2.93495 15.1557 1.96615 14.1511C1.00713 13.1567 1.00713 11.5593 1.96615 10.5648L10.0001 2.35232C11.4312 0.888941 13.7518 0.888524 15.1833 2.35133C16.6149 3.81414 17.4894 6.18631 16.0584 7.64968L8.02438 15.8622C7.75903 16.0945 7.72811 16.5027 7.95537 16.774C8.18262 17.0452 8.58197 17.0768 8.84733 16.8445C8.87209 16.8228 8.89515 16.7993 8.91635 16.774L16.9504 8.56146C18.854 6.57267 17.9459 3.38292 16.0003 1.43702Z"
        stroke={svgColor}
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

export default AttachImageIcon;
