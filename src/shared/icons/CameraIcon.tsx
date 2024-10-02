import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/v2/themeContext';

const CameraIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconPrimaryColor;

  return (
    <Svg style={[styles.icon, style]} viewBox="0 -2 32 32" fill="none">
      <Path
        d="M286 471h-3l-1-2c-.589-1.163-.896-2-2-2h-12c-1.104 0-1.47.954-2 2l-1 2h-3a4 4 0 00-4 4v16a4 4 0 004 4h24a4 4 0 004-4v-16a4 4 0 00-4-4zm-12 20a8 8 0 110-16 8 8 0 010 16zm0-14a6 6 0 000 12 6 6 0 000-12z"
        transform="translate(-258 -467)"
        fill={svgColor}
        stroke="none"
        strokeWidth={1}
        fillRule="evenodd"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  },
});

export default CameraIcon;
