import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import sizes from '../../core/themes/sizes';
import { useTheme } from '../../core/themes/themeContext';

const LocationIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconSecondaryColor;

  return (
    <Svg style={[styles.LocationIcon, style]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <Circle cx={11.5} cy={9} r={2.25} stroke={svgColor} strokeWidth={1.5} />
      <Path
        d="M18.25 10.5C18.25 13.0258 16.916 15.7413 15.3017 17.8675C14.5022 18.9206 13.6581 19.7966 12.9249 20.4011C12.5576 20.704 12.2312 20.9278 11.9635 21.0721C11.6766 21.2267 11.5297 21.25 11.5 21.25C11.4702 21.25 11.3234 21.2267 11.0365 21.0721C10.7687 20.9278 10.4424 20.704 10.0751 20.4011C9.34185 19.7966 8.49779 18.9206 7.69828 17.8675C6.084 15.7413 4.75 13.0258 4.75 10.5C4.75 7.86598 5.44932 5.94178 6.59348 4.6835C7.72962 3.43404 9.38693 2.75 11.5 2.75C13.613 2.75 15.2703 3.43404 16.4065 4.6835C17.5507 5.94179 18.25 7.86598 18.25 10.5Z"
        stroke={svgColor}
        strokeWidth={1.5}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  LocationIcon: {
    width: sizes.iconSize,
    height: sizes.iconSize,
  },
});

export default LocationIcon;
