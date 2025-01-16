import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/v2/themeContext';

const UserIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.textSecondaryColor;

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M15.027 8.73061C15.027 10.9045 13.4842 12.4612 11.8201 12.4612C10.1561 12.4612 8.61328 10.9045 8.61328 8.73061C8.61328 6.55671 10.1561 5 11.8201 5C13.4842 5 15.027 6.55671 15.027 8.73061Z"
        stroke={svgColor}
        strokeWidth={2}
      />
      <Path
        d="M4.26953 17.3542C4.26953 15.5096 6.15099 14.1703 7.99218 14.7733C8.7403 15.0183 9.48011 15.2441 10.123 15.4096C10.7355 15.5674 11.3558 15.6968 11.8195 15.6968C12.2833 15.6968 12.9035 15.5674 13.5161 15.4096C14.1589 15.2441 14.8988 15.0183 15.6469 14.7733C17.4881 14.1703 19.3695 15.5096 19.3695 17.3542C19.3695 18.8154 18.1849 20 16.7237 20H6.91537C5.45411 20 4.26953 18.8154 4.26953 17.3542Z"
        stroke={svgColor}
        strokeWidth={2}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 26,
  },
});

export default UserIcon;
