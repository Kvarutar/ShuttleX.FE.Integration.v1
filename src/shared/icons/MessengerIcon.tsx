import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/v2/themeContext';

const MessengerIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconPrimaryColor;

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M8.2133 15.2734L3.23517 13.6703C2.39142 13.4172 2.30705 12.2359 3.1508 11.8984L22.9789 3.88281C23.8227 3.54531 24.6664 4.30469 24.4133 5.14844L20.532 22.6984C20.3633 23.3734 19.5195 23.7109 19.0133 23.2047L12.9383 18.3953"
        stroke={svgColor}
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.6702 19.776L18.0273 12.0039L8.39498 11.5612C13.713 11.8056 17.8655 15.4832 17.6702 19.776Z"
        fill={svgColor}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 28,
    height: 27,
  },
});

export default MessengerIcon;
