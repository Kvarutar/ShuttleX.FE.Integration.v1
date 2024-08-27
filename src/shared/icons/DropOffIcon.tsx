import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import sizes from '../../core/themes/sizes';
import { useThemeV1 } from '../../core/themes/v1/themeContext';

const DropOffIcon = ({ style }: { style?: StyleProp<ViewStyle> }): JSX.Element => {
  const { colors } = useThemeV1();

  return (
    <Svg xmlns="http://www.w3.org/2000/svg" style={[styles.DropOffIcon, style]} fill="none" viewBox="0 0 24 24">
      <Path d="M12 15V21" stroke="#B4B4B4" strokeWidth={1.5} strokeLinecap="round" />
      <Circle cx={12} cy={9} r={5.25} fill={colors.primaryColor} stroke="#F4F4F4" strokeWidth={1.5} />
      <Path
        d="M9.10028 8.13622C9.20702 7.4353 10.3588 6.00891 11.8996 5.86387"
        stroke="white"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  DropOffIcon: {
    width: sizes.iconSize,
    height: sizes.iconSize,
  },
});

export default DropOffIcon;
