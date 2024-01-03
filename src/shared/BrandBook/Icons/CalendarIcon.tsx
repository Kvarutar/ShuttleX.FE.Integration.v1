import * as React from 'react';
import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import sizes from '../../../core/themes/sizes';

const CalendarIcon = ({ style }: { style?: StyleProp<ViewStyle> }) => {
  return (
    <Svg style={[styles.calendarIcon, style]} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M3.75 8A2.25 2.25 0 016 5.75h12A2.25 2.25 0 0120.25 8v8A2.25 2.25 0 0118 18.25H6A2.25 2.25 0 013.75 16V8z"
        stroke="#000"
        strokeWidth={1.5}
      />
      <Path d="M8 4v1.5M16 4v1.5" stroke="#000" strokeWidth={1.5} strokeLinecap="round" />
      <Circle cx={8} cy={14} r={1} fill="#000" />
      <Circle cx={12} cy={14} r={1} fill="#000" />
      <Circle cx={16} cy={14} r={1} fill="#000" />
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
