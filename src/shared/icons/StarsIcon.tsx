import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const StarsIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();

  const svgColor = color ?? colors.iconPrimaryColor;

  return (
    <Svg style={[style, styles.StarsIcon]} viewBox="0 0 13 13" fill="none">
      <Path
        d="M5.5 0L6.13918 1.81052C6.64249 3.23616 7.76384 4.35751 9.18948 4.86082L11 5.5L9.18948 6.13918C7.76384 6.64249 6.64249 7.76384 6.13918 9.18948L5.5 11L4.86082 9.18948C4.35751 7.76384 3.23616 6.64249 1.81052 6.13918L0 5.5L1.81052 4.86082C3.23616 4.35751 4.35751 3.23616 4.86082 1.81052L5.5 0Z"
        fill={svgColor}
      />
      <Path
        d="M9.5 6C9.45277 7.95222 11.0478 9.54723 13 9.5C11.0478 9.45277 9.45277 11.0478 9.5 13C9.54723 11.0478 7.95222 9.45277 6 9.5C7.95222 9.54723 9.54723 7.95222 9.5 6Z"
        fill={svgColor}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  StarsIcon: {
    width: 13,
    height: 13,
  },
});

export default StarsIcon;
