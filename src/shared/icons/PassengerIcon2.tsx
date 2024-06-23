import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import sizes from '../../core/themes/sizes';
import { useTheme } from '../../core/themes/themeContext';

const PassengerIcon2 = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconSecondaryColor;

  return (
    <Svg style={[styles.PassengerIcon2, style]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <Path
        d="M16 8.5V6.5C16 4.567 14.433 3 12.5 3C10.567 3 9 4.567 9 6.5V8.5C9 10.433 10.567 12 12.5 12C14.433 12 16 10.433 16 8.5Z"
        stroke={svgColor}
        strokeWidth={1.2}
      />
      <Path
        d="M7.5 13L7.20588 13.1569C5.84812 13.881 5 15.2945 5 16.8333V16.8333C5 19.1345 6.86548 21 9.16667 21H15.8333C18.1345 21 20 19.1345 20 16.8333V16.8333C20 15.2945 19.1519 13.881 17.7941 13.1569L17.5 13"
        stroke={svgColor}
        strokeWidth={1.2}
        strokeLinecap="round"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  PassengerIcon2: {
    width: sizes.iconSize,
    height: sizes.iconSize,
  },
});

export default PassengerIcon2;
