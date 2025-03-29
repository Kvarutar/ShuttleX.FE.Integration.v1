import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const ArrowSendMessageIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconPrimaryColor;

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 13 12" fill="none">
      <Path
        d="M11.4223 4.21115C12.8964 4.9482 12.8964 7.05181 11.4223 7.78885L3.6115 11.6942C1.97842 12.5108 0.195054 10.8919 0.850307 9.18764L2.07592 6L0.850308 2.81236C0.195054 1.10815 1.97842 -0.51079 3.6115 0.305752L11.4223 4.21115Z"
        fill={svgColor}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 16,
    height: 16,
  },
});

export default ArrowSendMessageIcon;
