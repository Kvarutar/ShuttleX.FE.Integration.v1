import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const CrownIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.errorColor;

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M11.4386 6.74427L11.5723 5.32367C11.6773 4.20799 11.7298 3.65014 11.5389 3.41954C11.4357 3.2948 11.2953 3.21837 11.1452 3.20518C10.8677 3.18081 10.5192 3.57752 9.82222 4.37096C9.46178 4.78129 9.28159 4.98645 9.08052 5.01824C8.96916 5.0358 8.85564 5.01772 8.75274 4.96597C8.56712 4.87252 8.44334 4.6189 8.19577 4.11163L6.89097 1.43783C6.4232 0.479278 6.18928 0 5.83333 0C5.47738 0 5.24347 0.479278 4.77569 1.43783L3.47087 4.11164C3.22332 4.6189 3.09955 4.87252 2.9139 4.96597C2.81104 5.01772 2.69753 5.0358 2.58613 5.01824C2.38509 4.98645 2.20486 4.78129 1.84442 4.37096C1.14746 3.57752 0.798979 3.18081 0.521493 3.20518C0.371384 3.21837 0.230987 3.2948 0.127743 3.41954C-0.0631179 3.65014 -0.010618 4.20799 0.0943878 5.32367L0.228082 6.74427C0.448378 9.08495 0.558529 10.2553 1.24838 10.9609C1.93825 11.6667 2.97218 11.6667 5.04006 11.6667H6.62661C8.69447 11.6667 9.72842 11.6667 10.4183 10.9609C11.1081 10.2553 11.2183 9.08495 11.4386 6.74427Z"
        fill={svgColor}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 12,
    height: 12,
  },
});

export default CrownIcon;
