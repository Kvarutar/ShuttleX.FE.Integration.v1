import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import sizes from '../../core/themes/sizes';
import { useTheme } from '../../core/themes/v2/themeContext';

const SettingsIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.textSecondaryColor;

  return (
    <Svg style={[styles.icon, style]} xmlns="http://www.w3.org/2000/svg" viewBox="2 0 24 24" fill="none">
      <Path
        d="M12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15Z"
        stroke={svgColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.6 21.075L19.061 17.923C19.644 17.5865 19.9348 17.4186 20.1467 17.1832C20.3343 16.975 20.476 16.7295 20.5627 16.463C20.6603 16.1624 20.6603 15.8265 20.6603 15.1566V8.8417C20.6603 8.17179 20.6603 7.83596 20.5627 7.5354C20.476 7.26884 20.3343 7.0233 20.1467 6.81502C19.9357 6.58063 19.6455 6.41307 19.0676 6.07945L13.5997 2.92261C13.0168 2.58608 12.7259 2.41815 12.416 2.3523C12.1419 2.29402 11.8584 2.29402 11.5843 2.3523C11.2744 2.41816 10.9826 2.58608 10.3997 2.92261L4.93843 6.07568C4.35623 6.41181 4.06535 6.57975 3.85352 6.81502C3.66597 7.0233 3.52434 7.26884 3.43773 7.5354C3.33984 7.83667 3.33984 8.17338 3.33984 8.84644V15.1514C3.33984 15.8244 3.33984 16.1609 3.43773 16.4622C3.52434 16.7287 3.66597 16.9741 3.85352 17.1824C4.06548 17.4178 4.35657 17.5861 4.93945 17.9226L10.3997 21.0751C10.9826 21.4116 11.2744 21.5796 11.5843 21.6455C11.8584 21.7037 12.1419 21.7037 12.416 21.6455C12.7259 21.5796 13.0177 21.4116 13.6006 21.0751Z"
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
