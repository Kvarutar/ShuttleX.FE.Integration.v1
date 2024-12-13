import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';

import { useTheme } from '../../core/themes/v2/themeContext';

export type MapPinIconProps = {
  style?: StyleProp<ViewStyle>;
  colorMode?: 'mode1' | 'mode2';
};

const MapPinIcon = ({ style, colorMode = 'mode1' }: MapPinIconProps): JSX.Element => {
  const { colors } = useTheme();

  const fillColor = colorMode === 'mode1' ? colors.primaryColor : colors.errorColor;
  const dotColor = colorMode === 'mode1' ? '#000' : '#FFF';

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 37 54" fill="none">
      <Rect opacity="0.381569" x="17" y="33" width="3" height="21" rx="1.5" fill="#000" />
      <Rect x="2" y="2" width="33" height="33" rx="16" fill={fillColor} stroke="#FFF" strokeWidth="3.28563" />
      <Circle cx="18.5" cy="18.5" r="4.5" fill={dotColor} />
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
