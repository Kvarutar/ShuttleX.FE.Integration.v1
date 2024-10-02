import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/v2/themeContext';

const ArrowIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconPrimaryColor;

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M10.9462 7.95964L6.82173 12.4615C6.48841 12.8549 6.53671 13.4444 6.92962 13.7782C7.32253 14.1119 7.91126 14.0636 8.24458 13.6702L13.7293 7.68348C13.8082 7.60414 13.8721 7.51119 13.918 7.4091C13.975 7.2822 14.0029 7.14412 13.9998 7.005L13.9997 7.00414C13.9966 6.86532 13.9626 6.72894 13.9003 6.60489C13.8943 6.59288 13.8879 6.581 13.8814 6.56926C13.8434 6.50115 13.7969 6.43813 13.7431 6.38169L8.11256 0.29913C7.7623 -0.0792486 7.17202 -0.101668 6.79414 0.249028C6.41626 0.599725 6.39385 1.19077 6.7441 1.56914L10.9303 6.09137H0.932943C0.417693 6.09137 0 6.5096 0 7.02551C0 7.54143 0.417693 7.95965 0.932943 7.95965H10.9462V7.95964Z"
        fill={svgColor}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 14,
    height: 14,
  },
});

export default ArrowIcon;
