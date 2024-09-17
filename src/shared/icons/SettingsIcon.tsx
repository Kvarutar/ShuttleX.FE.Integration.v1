import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import sizes from '../../core/themes/sizes';
import { useTheme } from '../../core/themes/v2/themeContext';

const SettingsIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.textSecondaryColor;

  return (
    <Svg style={[styles.icon, style]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <Path
        d="M13.6006 21.0751L19.0608 17.9226C19.6437 17.5861 19.9346 17.4178 20.1465 17.1824C20.3341 16.9741 20.4759 16.7287 20.5625 16.4622C20.6602 16.1616 20.6602 15.8257 20.6602 15.1558V8.8417C20.6602 8.17179 20.6602 7.83596 20.5625 7.5354C20.4759 7.26884 20.3341 7.0233 20.1465 6.81502C19.9355 6.58063 19.6453 6.41307 19.0674 6.07945L13.5996 2.92261C13.0167 2.58608 12.7259 2.41815 12.416 2.3523C12.1419 2.29402 11.8584 2.29402 11.5843 2.3523C11.2744 2.41816 10.9826 2.58608 10.3997 2.92261L4.93843 6.07568C4.35623 6.41181 4.06535 6.57975 3.85352 6.81502C3.66597 7.0233 3.52434 7.26884 3.43773 7.5354C3.33984 7.83667 3.33984 8.17338 3.33984 8.84644V15.1514C3.33984 15.8244 3.33984 16.1609 3.43773 16.4622C3.52434 16.7287 3.66597 16.9741 3.85352 17.1824C4.06548 17.4178 4.35657 17.5861 4.93945 17.9226L10.3997 21.0751C10.9826 21.4116 11.2744 21.5796 11.5843 21.6455C11.8584 21.7037 12.1419 21.7037 12.416 21.6455C12.7259 21.5796 13.0177 21.4116 13.6006 21.0751Z"
        stroke={svgColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 12C9 13.6568 10.3431 15 12 15C13.6569 15 15 13.6568 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12Z"
        stroke={svgColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: sizes.iconSize,
    height: sizes.iconSize,
  },
});

export default SettingsIcon;
