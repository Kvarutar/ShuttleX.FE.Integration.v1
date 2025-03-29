import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import sizes from '../../core/themes/sizes';
import { useTheme } from '../../core/themes/themeContext';

const RouteIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();

  const svgColor = color ?? colors.iconPrimaryColor;

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7 21C8.10457 21 9 20.1046 9 19C9 17.8954 8.10457 17 7 17C5.89543 17 5 17.8954 5 19C5 20.1046 5.89543 21 7 21Z"
        stroke={svgColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18 7C19.1046 7 20 6.10457 20 5C20 3.89543 19.1046 3 18 3C16.8954 3 16 3.89543 16 5C16 6.10457 16.8954 7 18 7Z"
        stroke={svgColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10 19H16.5C17.4283 19 18.3185 18.6313 18.9749 17.9749C19.6313 17.3185 20 16.4283 20 15.5C20 14.5717 19.6313 13.6815 18.9749 13.0251C18.3185 12.3687 17.4283 12 16.5 12H8.5C7.57174 12 6.6815 11.6313 6.02513 10.9749C5.36875 10.3185 5 9.42826 5 8.5C5 7.57174 5.36875 6.6815 6.02513 6.02513C6.6815 5.36875 7.57174 5 8.5 5H15"
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
    width: sizes.iconSize,
    height: sizes.iconSize,
  },
});

export default RouteIcon;
