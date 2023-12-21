import React from 'react';
import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

const BlueCheck1 = ({ style }: { style?: StyleProp<ViewStyle> }): JSX.Element => (
  <Svg style={[styles.BlueCheck1, style]} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
    <Circle cx={10} cy={10} r={10} fill="#5295F7" />
    <Path
      d="M7 11L8.96943 12.6881C9.17285 12.8624 9.47755 12.8455 9.66036 12.6496L14 8"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
);

const styles = StyleSheet.create({
  BlueCheck1: {
    width: 20,
    height: 20,
  },
});

export default BlueCheck1;
