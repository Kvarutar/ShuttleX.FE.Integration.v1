import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';

import { useTheme } from '../../core/themes/v2/themeContext';

const MapPinIcon = ({ style }: { style?: StyleProp<ViewStyle> }): JSX.Element => {
  const { colors } = useTheme();

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 37 54" fill="none">
      <Rect opacity="0.381569" x="17" y="33" width="3" height="21" rx="1.5" fill="#000" />
      <Rect x="2" y="2" width="33" height="33" rx="16" fill={colors.primaryColor} stroke="#FFF" strokeWidth="3.28563" />
      <Circle cx="18.5" cy="18.5" r="4.5" fill="#000" />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 37,
    height: 54,
  },
});

export default MapPinIcon;
