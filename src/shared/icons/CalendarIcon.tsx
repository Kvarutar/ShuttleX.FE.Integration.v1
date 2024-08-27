import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import sizes from '../../core/themes/sizes';
import { useThemeV1 } from '../../core/themes/v1/themeContext';

const CalendarIcon = ({ style }: { style?: StyleProp<ViewStyle> }) => {
  const { colors } = useThemeV1();

  return (
    <Svg style={[styles.calendarIcon, style]} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M3.75 8A2.25 2.25 0 016 5.75h12A2.25 2.25 0 0120.25 8v8A2.25 2.25 0 0118 18.25H6A2.25 2.25 0 013.75 16V8z"
        stroke={colors.iconPrimaryColor}
        strokeWidth={1.5}
      />
      <Path d="M8 4v1.5M16 4v1.5" stroke={colors.iconPrimaryColor} strokeWidth={1.5} strokeLinecap="round" />
      <Circle cx={8} cy={14} r={1} fill={colors.iconPrimaryColor} />
      <Circle cx={12} cy={14} r={1} fill={colors.iconPrimaryColor} />
      <Circle cx={16} cy={14} r={1} fill={colors.iconPrimaryColor} />
    </Svg>
  );
};

const styles = StyleSheet.create({
  calendarIcon: {
    width: sizes.iconSize,
    height: sizes.iconSize,
  },
});

export default CalendarIcon;
