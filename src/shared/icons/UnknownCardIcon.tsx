import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const UnknownCardIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();

  const svgColor = color ?? colors.iconPrimaryColor;

  return (
    <Svg xmlns="http://www.w3.org/2000/svg" style={[styles.icon, style]} fill="none" viewBox="0 0 32 32">
      <Path
        d="M7.16667 13.8929H25.8333V12.3929H7.16667V13.8929ZM9 8.75H24C25.2426 8.75 26.25 9.75736 26.25 11V21C26.25 22.2426 25.2426 23.25 24 23.25H9C7.75736 23.25 6.75 22.2426 6.75 21V11C6.75 9.75736 7.75736 8.75 9 8.75Z"
        stroke={svgColor}
        strokeWidth={1.5}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  },
});

export default UnknownCardIcon;
