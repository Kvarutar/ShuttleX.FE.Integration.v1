import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { useThemeV1 } from '../../core/themes/v1/themeContext';

const BlueCheck1 = ({ style }: { style?: StyleProp<ViewStyle> }): JSX.Element => {
  const { colors } = useThemeV1();

  return (
    <Svg style={[styles.BlueCheck1, style]} viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" fill="none">
      <Circle cx={15} cy={15} r={10} fill={colors.primaryColor} />
      <Path
        d="M12 16L13.9694 17.6881C14.1729 17.8624 14.4776 17.8455 14.6604 17.6496L19 13"
        stroke="white"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  BlueCheck1: {
    width: 30,
    height: 30,
  },
});

export default BlueCheck1;
