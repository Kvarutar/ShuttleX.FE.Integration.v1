import React from 'react';
import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import sizes from '../../../core/themes/sizes';

const ReportIcon = ({ style }: { style?: StyleProp<ViewStyle> }): JSX.Element => (
  <Svg style={[styles.ReportIcon, style]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
    <Path
      d="M7 16C7.28333 16 7.52083 15.9042 7.7125 15.7125C7.90417 15.5208 8 15.2833 8 15C8 14.7167 7.90417 14.4792 7.7125 14.2875C7.52083 14.0958 7.28333 14 7 14C6.71667 14 6.47917 14.0958 6.2875 14.2875C6.09583 14.4792 6 14.7167 6 15C6 15.2833 6.09583 15.5208 6.2875 15.7125C6.47917 15.9042 6.71667 16 7 16ZM6 13H8V8H6V13ZM10 15H18V13H10V15ZM10 11H18V9H10V11ZM4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM4 18H20V6H4V18Z"
      fill="black"
    />
  </Svg>
);

const styles = StyleSheet.create({
  ReportIcon: {
    width: sizes.iconSize,
    height: sizes.iconSize,
  },
});

export default ReportIcon;
