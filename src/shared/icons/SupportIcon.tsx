import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const SupportIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconPrimaryColor;

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 17 17" fill="none">
      <Path
        d="M8.5 0C3.8131 0 0 3.8131 0 8.5V12.0216C0 12.8919 0.76245 13.6 1.7 13.6H2.55C2.77543 13.6 2.99163 13.5104 3.15104 13.351C3.31045 13.1916 3.4 12.9754 3.4 12.75V8.37845C3.4 8.15302 3.31045 7.93682 3.15104 7.77741C2.99163 7.618 2.77543 7.52845 2.55 7.52845H1.7782C2.2508 4.23895 5.0813 1.7 8.5 1.7C11.9187 1.7 14.7492 4.23895 15.2218 7.52845H14.45C14.2246 7.52845 14.0084 7.618 13.849 7.77741C13.6896 7.93682 13.6 8.15302 13.6 8.37845V13.6C13.6 14.5375 12.8376 15.3 11.9 15.3H10.2V14.45H6.8V17H11.9C13.7751 17 15.3 15.4751 15.3 13.6C16.2376 13.6 17 12.8919 17 12.0216V8.5C17 3.8131 13.1869 0 8.5 0Z"
        fill={svgColor}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 17,
    height: 17,
  },
});

export default SupportIcon;
