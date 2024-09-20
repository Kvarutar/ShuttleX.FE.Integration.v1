import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/v2/themeContext';

const CloseIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconPrimaryColor;

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M8.85909 0.842487L9.72459 1.70799L5.88924 5.54333L9.7161 9.37019L8.8506 10.2357L5.02374 6.40883L1.18839 10.2442L0.322896 9.37868L4.15824 5.54333L0.331381 1.71647L1.19688 0.850972L5.02374 4.67783L8.85909 0.842487Z"
        fill={svgColor}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 10,
    height: 11,
  },
});

export default CloseIcon;
