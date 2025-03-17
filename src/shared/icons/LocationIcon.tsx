import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const LocationIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconPrimaryColor;

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M3.98937 0C1.7861 0 0 1.79084 0 3.99996C0 7.48793 3.28724 10.8239 3.42288 10.9679C3.5727 11.1193 3.77663 11.2045 3.98937 11.2045C4.20212 11.2045 4.40605 11.1193 4.55587 10.9679C4.6915 10.8239 7.97875 7.48793 7.97875 3.99996C7.97875 1.79084 6.19265 0 3.98937 0V0Z"
        fill={svgColor}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 8,
    height: 12,
  },
});

export default LocationIcon;
